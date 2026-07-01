// ─────────────────────────────────────────────────────────────────────────────
//  firebase.ts — Firebase JS SDK direct initialization (no @angular/fire)
// ─────────────────────────────────────────────────────────────────────────────
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore }                    from 'firebase/firestore';
import { getStorage }                      from 'firebase/storage';
import { environment }                     from './environments/environment';

// Initialize only once (hot module reload safe)
const firebaseApp = getApps().length ? getApp() : initializeApp(environment.firebase);

export const db      = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
