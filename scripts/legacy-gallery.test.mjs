import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'archive-source');
const output=path.join(root,'legacy-preview');
const manifest=JSON.parse(fs.readFileSync(path.join(source,'manifest.json')));
const versions=JSON.parse(fs.readFileSync(path.join(output,'legacy/versions.json')));
test('both old deployments retain every inventoried source file and exact hashes',()=>{
 assert.equal(manifest.length,2);
 assert.deepEqual(manifest[0].files,manifest[1].files);
 for(const row of manifest) for(const file of row.files) {
  const bytes=fs.readFileSync(path.join(source,'blobs',file.uid));
  assert.equal(crypto.createHash('sha1').update(bytes).digest('hex'),file.uid);
  assert.ok(!/^(?:data|tmp)\/|^\.env/.test(file.path));
 }
});
test('all 20 public page copies and their resources are self-contained',()=>{
 assert.equal(versions.length,2);
 for(const version of versions){
  assert.equal(version.pages.length,10);
  for(const resource of version.resources)assert.ok(fs.existsSync(path.join(output,resource)),resource);
  for(const page of version.pages){
   const html=fs.readFileSync(path.join(output,page),'utf8');
   assert.ok(html.includes('Rise Roofing'));
   assert.ok(!/<script\b|<form\b|srcset=|imagesrcset=/i.test(html));
   for(const [,url] of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) {
    assert.ok(version.pages.includes(url)||version.resources.includes(url),url);
   }
  }
 }
});
test('archive cannot reach attendance or execute customer actions',()=>{
 const gallery=fs.readFileSync(path.join(output,'legacy/index.html'),'utf8');
 assert.match(gallery,/sandbox="allow-scripts"/);
 assert.ok(!gallery.includes('allow-same-origin'));
 const guard=fs.readFileSync(path.join(output,'legacy/sandbox.js'),'utf8');
 assert.match(guard,/preventDefault/);
 assert.match(guard,/submit/);
 assert.ok(!versions.some(v=>v.pages.some(p=>/admin|api/.test(p))));
});
test('preview configuration does not schedule jobs or enable functions',()=>{
 const config=JSON.parse(fs.readFileSync(path.join(root,'legacy-preview.vercel.json')));
 assert.equal(config.framework,null);
 assert.ok(!config.crons&&!config.functions);
 assert.equal(config.outputDirectory,'legacy-preview');
});
