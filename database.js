const VaultDB={
 get(k,f=[]){try{return JSON.parse(localStorage.getItem('vault_'+k))??f}catch{return f}},
 set(k,v){localStorage.setItem('vault_'+k,JSON.stringify(v))},
 add(k,v,extra={}){const a=this.get(k);const item={id:Date.now(),text:v,date:new Date().toLocaleString('fr-FR'),...extra};a.unshift(item);this.set(k,a);return item},
 remove(k,id){this.set(k,this.get(k).filter(x=>x.id!==id))},
 log(type,text){this.add('activity',text,{type});const a=this.get('activity');if(a.length>60)this.set('activity',a.slice(0,60))},
 search(q){const term=q.toLowerCase().trim();if(!term)return[];const labels={notes:'Notes',tasks:'Tâches',projects:'Projets',inventory:'Inventaire'};return Object.keys(labels).flatMap(k=>this.get(k).filter(x=>x.text.toLowerCase().includes(term)).map(x=>({...x,key:k,label:labels[k]})))},
 stats(){return {notes:this.get('notes').length,tasks:this.get('tasks').length,projects:this.get('projects').length,inventory:this.get('inventory').length}}
};
