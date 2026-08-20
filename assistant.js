function vaultCommand(raw){const q=raw.trim(),l=q.toLowerCase();if(!q)return 'Je vous écoute.';
 const opens={note:'notes',tâche:'tasks',tache:'tasks',projet:'projects',inventaire:'inventory',comic:'comic',outil:'tools'};
 if(/^(ouvre|montre)/.test(l)){for(const [w,k] of Object.entries(opens))if(l.includes(w)){openModule(k);return 'Ouverture du module '+modules.find(x=>x[0]===k)[1]+'.'}}
 let m=q.match(/ajoute(?: une)? (?:note|idée|idee)\s*[:\-]?\s*(.+)/i);if(m){VaultDB.add('notes',m[1]);VaultDB.log('notes','Note : '+m[1]);return 'C’est enregistré dans votre mémoire.'}
 m=q.match(/ajoute(?: une)? (?:tâche|tache)\s*[:\-]?\s*(.+)/i);if(m){VaultDB.add('tasks',m[1]);VaultDB.log('tasks','Tâche : '+m[1]);return 'Tâche ajoutée.'}
 m=q.match(/ajoute(?: un)? projet\s*[:\-]?\s*(.+)/i);if(m){VaultDB.add('projects',m[1]);VaultDB.log('projects','Projet : '+m[1]);return 'Projet ajouté.'}
 m=q.match(/(?:mémorise|memorise|souviens-toi de|rappelle-toi de)\s*[:\-]?\s*(.+)/i);if(m){VaultDB.add('notes',m[1],{memory:true});VaultDB.log('memory','Mémoire : '+m[1]);return 'Information mémorisée.'}
 m=q.match(/(?:cherche|recherche|retrouve)\s+(?:dans (?:ma )?mémoire\s*)?[:\-]?\s*(.+)/i);if(m){return formatSearch(m[1])}
 if(l.includes('combien')){const s=VaultDB.stats();if(l.includes('tâche')||l.includes('tache'))return `Vous avez ${s.tasks} tâche(s).`;if(l.includes('note'))return `Vous avez ${s.notes} note(s).`;if(l.includes('projet'))return `Vous avez ${s.projects} projet(s).`;if(l.includes('inventaire')||l.includes('objet'))return `Votre inventaire contient ${s.inventory} élément(s).`;return `Mémoire locale : ${s.notes} notes, ${s.tasks} tâches, ${s.projects} projets et ${s.inventory} éléments d’inventaire.`}
 if(l.includes('quelle heure')||l==='heure')return 'Il est '+new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})+'.';
 if(l.includes('quelle date')||l.includes('quel jour'))return 'Nous sommes le '+new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})+'.';
 if(l.includes('que sais-tu')||l.includes('résume')||l.includes('resume')){const s=VaultDB.stats();return `Je conserve localement ${s.notes} notes, ${s.tasks} tâches, ${s.projects} projets et ${s.inventory} éléments d’inventaire sur cet appareil.`}
 return 'Je ne comprends pas encore cette commande. Essayez « mémorise : … », « recherche … », « ajoute une tâche : … » ou « combien ai-je de projets ? ».'}
function formatSearch(term){const r=VaultDB.search(term);if(!r.length)return `Je n’ai rien trouvé pour « ${term} » dans la mémoire locale.`;return `J’ai trouvé ${r.length} résultat(s) : `+r.slice(0,5).map(x=>`${x.label} — ${x.text}`).join(' ; ')+(r.length>5?'…':'')}
