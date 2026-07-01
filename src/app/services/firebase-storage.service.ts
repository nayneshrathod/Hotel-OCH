// ─────────────────────────────────────────────────────────────────────────────
//  firebase-storage.service.ts — Firebase Storage direct SDK (no @angular/fire)
// ─────────────────────────────────────────────────────────────────────────────
import { Injectable } from '@angular/core';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

@Injectable({ providedIn: 'root' })
export class FirebaseStorageService {

  async uploadFromUrl(url: string, billNo: string, itemId: string): Promise<string> {
    try {
      const res   = await fetch(url);
      const blob  = await res.blob();
      const path  = `bills/${billNo}/${itemId}.jpg`;
      const r     = ref(storage, path);
      await uploadBytes(r, blob, { contentType: 'image/jpeg' });
      return await getDownloadURL(r);
    } catch {
      return url; // fallback: return original URL
    }
  }
}
