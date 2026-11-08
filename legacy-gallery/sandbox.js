for (const name of ['localStorage','sessionStorage']) {
  const values=new Map();
  Object.defineProperty(window,name,{value:{getItem:key=>values.get(String(key))??null,setItem:(key,value)=>values.set(String(key),String(value)),removeItem:key=>values.delete(String(key)),clear:()=>values.clear(),key:index=>[...values.keys()][index]??null,get length(){return values.size}}});
}
document.addEventListener('click',event=>{
  const link=event.target.closest('a');
  const href=link?.getAttribute('href')||'';
  if(href.startsWith('/legacy/snapshots/')&&!href.includes('#')){event.preventDefault();event.stopImmediatePropagation();const url=new URL(href,document.baseURI);parent.postMessage({type:'legacyNavigate',path:url.pathname.endsWith('/')?url.pathname+'index.html':url.pathname},'*');return;}
  if(/^(tel:|sms:|mailto:|https?:)/i.test(href)||href.startsWith('/')&&!href.startsWith('/legacy/')){event.preventDefault();event.stopImmediatePropagation();}
},true);
document.addEventListener('submit',event=>{event.preventDefault();event.stopImmediatePropagation();},true);
