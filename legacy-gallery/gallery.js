const project=document.querySelector('#project'),revision=document.querySelector('#revision'),frame=document.querySelector('iframe');
const rows=await (await fetch('versions.json')).json();
let generation=0;
const files=new Map();
const types={js:'text/javascript',css:'text/css',json:'application/json',svg:'image/svg+xml',html:'text/html'};
async function resource(path){
 if(!path.startsWith('/legacy/'))throw Error('Invalid archive path');
 if(!files.has(path))files.set(path,fetch(path).then(async r=>{if(!r.ok)throw Error('Archive file unavailable');return new Blob([await r.arrayBuffer()],{type:types[path.split('.').at(-1)]||r.headers.get('content-type')||'application/octet-stream'});}));
 return files.get(path);
}
const dataURL=blob=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});
function rewrite(text,urls){for(const [path,url] of urls)text=text.replaceAll(path,url);return text;}
async function show(page){
 const version=rows.find(x=>x.id===revision.value);if(!version)return;
 const current=++generation;
 const paths=version.resources;
 const urls=new Map();
 await Promise.all(paths.filter(p=>!(/\.(js|css)$/.test(p))).map(async p=>urls.set(p,await dataURL(await resource(p)))));
 for(const p of paths.filter(p=>/\.(js|css)$/.test(p))){const source=await (await resource(p)).text();urls.set(p,await dataURL(new Blob([rewrite(source,urls)],{type:types[p.split('.').at(-1)]})));}
 const htmlPath=page||version.path;
 if(!version.pages.includes(htmlPath))throw Error('Invalid archive page');
 let html=await (await resource(htmlPath)).text();if(current!==generation)return;
 // Vercel may add its toolbar after serving the stored HTML. The archive has
 // no application scripts; keep that injected UI outside the isolated frame.
 html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
 html=html.replace(/<link\b(?=[^>]*\bas=["']font["'])[^>]*>/gi,'');
 html=rewrite(html,urls);
 const policy="default-src 'none'; script-src data: 'unsafe-inline'; style-src data: 'unsafe-inline' https://fonts.googleapis.com; img-src data:; font-src data: https://fonts.gstatic.com; connect-src data:; media-src data:; form-action 'none'; frame-src 'none'; worker-src 'none'";
 const sandbox=await (await resource('/legacy/sandbox.js')).text();
 const head=`<base href="${location.origin}${htmlPath.slice(0,htmlPath.lastIndexOf('/')+1)}"><meta http-equiv="Content-Security-Policy" content="${policy}"><meta name="robots" content="noindex,nofollow"><script>${sandbox}<\/script>`;
 html=html.replace(/<head[^>]*>/i,match=>match+head);if(current!==generation)return;
 frame.srcdoc=html;history.replaceState(null,'','#'+version.id);
}
for(const name of [...new Set(rows.map(x=>x.project))].sort())project.add(new Option(name,name));
function selectProject(id){revision.replaceChildren();for(const r of rows.filter(x=>x.project===project.value).sort((a,b)=>b.date.localeCompare(a.date)))revision.add(new Option(new Date(r.date).toLocaleString(),r.id));if(id&&[...revision.options].some(x=>x.value===id))revision.value=id;void show();}
project.addEventListener('change',()=>selectProject());revision.addEventListener('change',()=>show());
window.addEventListener('message',event=>{if(event.source!==frame.contentWindow||event.data?.type!=='legacyNavigate')return;const v=rows.find(x=>x.id===revision.value);const path=event.data.path;if(v?.pages.includes(path))void show(path);});
function fromHash(){const requested=rows.find(x=>x.id===location.hash.slice(1));if(requested){project.value=requested.project;selectProject(requested.id);}else selectProject();}
window.addEventListener('hashchange',fromHash);fromHash();
