class BaijiaxingEngine{
  constructor(index){this.index=index;this.cache=new Map();this.loaded=[];}
  getMeta(){return this.index.meta||{};}
  getCount(){return this.index.count||0;}
  getChunks(){return this.index.chunks||[];}
  async loadChunk(n){
    const info=this.getChunks()[n-1]; if(!info) return [];
    if(this.cache.has(n)) return this.cache.get(n);
    const r=await fetch(info.file,{cache:"no-cache"}); if(!r.ok) throw new Error("Unable to load surname chunk "+n);
    const d=await r.json(), list=d.surnames||[]; this.cache.set(n,list);
    this.loaded=[...new Map([...this.loaded,...list].map(x=>[x.id,x])).values()].sort((a,b)=>a.order-b.order);
    return list;
  }
  async loadAll(){for(let i=1;i<=this.getChunks().length;i++) await this.loadChunk(i); return this.loaded.slice();}
  async getByOrder(order){
    const n=Math.ceil(Number(order)/(this.index.chunkSize||56)); await this.loadChunk(n);
    return this.loaded.find(x=>x.order===Number(order))||null;
  }
  async search(q){
    const s=String(q||"").trim(); if(!s) return this.loaded.slice();
    await this.loadAll();
    return this.loaded.filter(x=>x.name.includes(s)||x.type.includes(s)||String(x.order)===s||x.originalGroup.includes(s)||x.note.includes(s));
  }
}
async function loadBaijiaxingEngine(url="./data/baijiaxing.json"){
  const r=await fetch(url,{cache:"no-cache"}); if(!r.ok) throw new Error("Unable to load 百家姓 index");
  return new BaijiaxingEngine(await r.json());
}
if(typeof window!=="undefined"){window.BaijiaxingEngine=BaijiaxingEngine;window.loadBaijiaxingEngine=loadBaijiaxingEngine;}
if(typeof module!=="undefined"&&module.exports)module.exports={BaijiaxingEngine,loadBaijiaxingEngine};