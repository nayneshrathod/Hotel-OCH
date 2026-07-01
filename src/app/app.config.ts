// ─────────────────────────────────────────────────────────────────────────────
//  app.config.ts — Firebase initialization + Angular providers + PWA Service Worker
// ─────────────────────────────────────────────────────────────────────────────

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';

// ── Firebase ──────────────────────────────────────────────────────────────────
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    // ── Angular Core ────────────────────────────────────────────────────────
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    // ── HTTP Client (for Replicate API calls) ────────────────────────────────
    provideHttpClient(withFetch()),

    // ── Animations (for toast / transitions) ─────────────────────────────────
    provideAnimationsAsync(),

    // ── Firebase App ─────────────────────────────────────────────────────────
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // ── Firestore (invoice storage) ───────────────────────────────────────────
    provideFirestore(() => getFirestore()),

    // ── Firebase Storage (image uploads) ─────────────────────────────────────
    provideStorage(() => getStorage()),

    // ── PWA Service Worker ────────────────────────────────────────────────────
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
