const C='vault-v5';
const S=['./index.html','./manifest.json','./sw.js','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(S).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=e.request.url;
  if(u.includes('api.anthropic.com')||u.includes('fonts.g')){e.respondWith(fetch(e.request));return;}
  e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{const cl=r.clone();caches.open(C).then(ca=>ca.put(e.request,cl));return r;}).catch(()=>caches.match('./index.html'))));
});
