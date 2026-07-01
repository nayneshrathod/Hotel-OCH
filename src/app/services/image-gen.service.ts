// ─────────────────────────────────────────────────────────────────────────────
//  image-gen.service.ts — AI Image Generation (Mock + Replicate ready)
// ─────────────────────────────────────────────────────────────────────────────

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  timer,
  of,
  switchMap,
  map,
  catchError,
  interval,
  takeWhile,
  take,
} from 'rxjs';
import { environment } from '../../environments/environment';

export interface ReplicatePrediction {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  output?: string[];
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class ImageGenService {
  private readonly http = inject(HttpClient);

  /**
   * Generate a food image for the given item keyword.
   * Mock mode  → returns a picsum/unsplash photo after a simulated delay.
   * Real mode  → calls Replicate API and polls until done.
   */
  generateFoodImage(keyword: string): Observable<string> {
    if (!environment.useRealImageGen) {
      return this.mockGenerate(keyword);
    }
    return this.replicateGenerate(keyword).pipe(
      catchError(() => this.mockGenerate(keyword))
    );
  }

  // ── Mock: random food photo via picsum ───────────────────────────────────
  private mockGenerate(_keyword: string): Observable<string> {
    const seed = Math.floor(Math.random() * 9000) + 1000;
    // Simulate 0.8 – 2 second network delay
    const delay = 800 + Math.random() * 1200;
    return timer(delay).pipe(
      map(() => `https://picsum.photos/seed/${seed}/80/80`)
    );
  }

  // ── Replicate API ────────────────────────────────────────────────────────
  private replicateGenerate(keyword: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Token ${environment.replicateApiKey}`,
      'Content-Type': 'application/json',
    });

    const body = {
      version: environment.replicateModel,
      input: {
        prompt: `professional food photography, ${keyword}, Indian restaurant, white background, top view, 80x80`,
        negative_prompt: 'cartoon, blurry, low quality',
        width: 512,
        height: 512,
        num_inference_steps: 25,
      },
    };

    return this.http
      .post<ReplicatePrediction>('https://api.replicate.com/v1/predictions', body, { headers })
      .pipe(
        switchMap(prediction =>
          this.pollPrediction(prediction.id, headers)
        )
      );
  }

  private pollPrediction(id: string, headers: HttpHeaders): Observable<string> {
    return interval(2500).pipe(
      switchMap(() =>
        this.http.get<ReplicatePrediction>(
          `https://api.replicate.com/v1/predictions/${id}`,
          { headers }
        )
      ),
      takeWhile(p => p.status === 'starting' || p.status === 'processing', true),
      map(p => {
        if (p.status === 'succeeded' && p.output?.length) return p.output[0];
        throw new Error(`Replicate failed: ${p.error}`);
      }),
      take(16) // max ~40s
    );
  }

  /** Fetch image URL as Blob (for Firebase Storage upload) */
  async urlToBlob(url: string): Promise<Blob> {
    const res = await fetch(url);
    return res.blob();
  }
}
