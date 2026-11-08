import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'archive-source');
const output = path.join(root, 'legacy-preview');
const rows = JSON.parse(fs.readFileSync(path.join(source, 'manifest.json'), 'utf8'));
const sha1 = bytes => crypto.createHash('sha1').update(bytes).digest('hex');
const rendered = path.join(source, 'rendered');
const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
fs.rmSync(output, {recursive:true, force:true});
fs.mkdirSync(path.join(output,'legacy'), {recursive:true});
fs.cpSync(path.join(root,'legacy-gallery'),path.join(output,'legacy'),{recursive:true});
const icon=rows[0].files.find(file=>file.path==='src/app/favicon.ico');
if(icon)fs.copyFileSync(path.join(source,'blobs',icon.uid),path.join(output,'favicon.ico'));
fs.writeFileSync(path.join(output,'index.html'), '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/legacy/"><a href="/legacy/">Legacy samples</a>');
fs.writeFileSync(path.join(output,'robots.txt'), 'User-agent: *\nDisallow: /\n');
const versions=[];
for (const row of rows) {
 const prefix='/legacy/snapshots/'+row.id;
 const resources=new Set();
 const mapping=new Map();
 for (const file of row.files) {
  const bytes=fs.readFileSync(path.join(source,'blobs',file.uid));
  if(sha1(bytes)!==file.uid) throw Error('Invalid archived source: '+file.path);
  if(file.path.startsWith('public/')) {
   const target='/legacy/files/'+file.uid+path.extname(file.path);
   const dest=path.join(output,target);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);
   mapping.set('/'+file.path.slice(7),target); resources.add(target);
  }
 }
 for(const file of walk(path.join(rendered,'assets'))) {
  const original='/'+path.relative(path.join(rendered,'assets'),file).split(path.sep).join('/');
  const target=prefix+original;mapping.set(original,target);resources.add(target);
 }
 for(const file of walk(path.join(rendered,'assets'))) {
  const original='/'+path.relative(path.join(rendered,'assets'),file).split(path.sep).join('/');
  let bytes=fs.readFileSync(file);
  if(file.endsWith('.css')) {
   let css=bytes.toString();
   css=css.replace(/url\(([^)]+)\)/g,(full,url)=> {
    const clean=url.replace(/^["']|["']$/g,'');
    const normalized=path.posix.normalize(path.posix.join(path.posix.dirname(original),clean));
    return mapping.has(normalized)?'url('+mapping.get(normalized)+')':full;
   });
   bytes=Buffer.from(css);
  }
  const dest=path.join(output,prefix+original);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);
 }
 const htmlFiles=walk(rendered).filter(f=>f.endsWith('.html'));
 const pages=htmlFiles.map(f=>prefix+'/'+path.relative(rendered,f).replace(/^home\.html$/,'index.html'));
 const routeToPage=new Map(htmlFiles.map((f,i)=>['/'+path.relative(rendered,f).replace(/^home\.html$/,'').replace(/\.html$/,''),pages[i]]));
 for(const file of htmlFiles) {
  let html=fs.readFileSync(file,'utf8');
  // These marketing routes are server-rendered. Preserve their markup and native
  // links/details while omitting Next hydration and all server action execution.
  html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
  html=html.replace(/<link\b(?=[^>]*\bas=["']script["'])[^>]*>/gi,'');
  html=html.replace(/<link\b(?=[^>]*\bas=["']image["'])[^>]*>/gi,'');
  html=html.replace(/\s(?:srcset|imagesrcset|imagesizes)="[^"]*"/gi,'');
  html=html.replace(/\b(src|href)="([^\"]*)"/gi,(full,attr,value)=> {
   const decoded=value.replaceAll('&amp;','&');
   if(decoded.startsWith('/_next/image?')) {
    const src=new URL(decoded,'https://archive.invalid').searchParams.get('url');
    if(!mapping.has(src)) throw Error('Missing original image: '+src);
    return attr+'="'+mapping.get(src)+'"';
   }
   if(mapping.has(decoded))return attr+'="'+mapping.get(decoded)+'"';
   if(attr.toLowerCase()==='href'&&routeToPage.has(decoded))return 'href="'+routeToPage.get(decoded)+'"';
   if(decoded.startsWith('/favicon')||decoded.startsWith('/icon.png'))return attr+'="data:,"';
   return full;
  });
  const target=routeToPage.get('/'+path.relative(rendered,file).replace(/^home\.html$/,'').replace(/\.html$/,''));
  const dest=path.join(output,target);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,html);
 }
 const created = row.id==='dpl_BScWjLP9Zw1grUqHMiJ9VbbJVF5X' ? 1774303791557 : 1774302501955;
 versions.push({id:row.id,project:row.project,date:new Date(created).toISOString(),path:prefix+'/index.html',resources:[...resources],pages});
}
fs.writeFileSync(path.join(output,'legacy/versions.json'),JSON.stringify(versions,null,2)+'\n');
console.log('Preserved '+versions.length+' source-identical versions, '+versions[0].pages.length+' public pages each.');
