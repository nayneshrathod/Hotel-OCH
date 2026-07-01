// app.ts — Root component (shell only)
import { Component } from '@angular/core';
import { BillingComponent } from './billing/billing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BillingComponent],
  templateUrl: './app.html',
  styles: [`:host { display:block; height:100vh; overflow:hidden; }`],
})
export class App {}
