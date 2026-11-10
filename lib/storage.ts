import type { Product } from './data';
const KEY='maktub-products-v1'; const DB='maktub-assets-v1'; const STORE='images';
export function readProducts(seed:Product[]):Product[]{ if(typeof window==='undefined') return seed; try { const raw=localStorage.getItem(KEY); return raw?JSON.parse(raw):seed; } catch { return seed; } }
export function saveProducts(products:Product[]){ if(typeof window!=='undefined') localStorage.setItem(KEY,JSON.stringify(products)); }
export function resetProducts(){ if(typeof window!=='undefined') localStorage.removeItem(KEY); }
function openDb():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export async function saveImage(file:File){const db=await openDb();const key=crypto.randomUUID();return new Promise<string>((resolve,reject)=>{const tx=db.transaction(STORE,'readwrite');tx.objectStore(STORE).put(file,key);tx.oncomplete=()=>{db.close();resolve(`idb:${key}`)};tx.onerror=()=>reject(tx.error)});}
export async function readImage(ref:string){if(!ref.startsWith('idb:'))return ref;try{const db=await openDb();const blob=await new Promise<Blob>((resolve,reject)=>{const r=db.transaction(STORE).objectStore(STORE).get(ref.slice(4));r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});db.close();return URL.createObjectURL(blob)}catch{return '/brand/maktub-poster.webp'}}
