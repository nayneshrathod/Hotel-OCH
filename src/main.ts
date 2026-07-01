// ─────────────────────────────────────────────────────────────────────────────
//  main.ts — Bootstrap entry point (with Zone.js)
// ─────────────────────────────────────────────────────────────────────────────

import 'zone.js'; // MUST be imported first for Angular zone change detection

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
