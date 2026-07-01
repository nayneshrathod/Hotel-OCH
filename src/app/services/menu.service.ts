// ─────────────────────────────────────────────────────────────────────────────
//  menu.service.ts — Signal-based menu management (no Firebase needed)
// ─────────────────────────────────────────────────────────────────────────────

import { Injectable, signal, computed } from '@angular/core';
import { MenuItem, MenuCategory, MENU_ITEMS } from '../models/billing.model';

@Injectable({ providedIn: 'root' })
export class MenuService {

  // ── All menu items loaded from the local database ─────────────────────────
  readonly allItems = signal<MenuItem[]>(MENU_ITEMS);

  // ── Search and filter state ───────────────────────────────────────────────
  readonly searchQuery    = signal<string>('');
  readonly activeCategory = signal<MenuCategory | 'All'>('All');

  // ── Derived: list of unique categories with 'All' at front ────────────────
  readonly categories = computed<Array<MenuCategory | 'All'>>(() => {
    const cats = [...new Set(this.allItems().map(i => i.category))];
    return ['All', ...cats] as Array<MenuCategory | 'All'>;
  });

  // ── Derived: filtered items based on search + category ────────────────────
  readonly filteredItems = computed<MenuItem[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const cat   = this.activeCategory();

    return this.allItems().filter(item => {
      const matchCat    = cat === 'All' || item.category === cat;
      const matchSearch = !query
        || item.name.toLowerCase().includes(query)
        || item.category.toLowerCase().includes(query)
        || item.description.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  });

  // ── Actions ───────────────────────────────────────────────────────────────
  setSearch(query: string): void {
    this.searchQuery.set(query);
  }

  setCategory(cat: MenuCategory | 'All'): void {
    this.activeCategory.set(cat);
  }

  getItemById(id: string): MenuItem | undefined {
    return this.allItems().find(item => item.id === id);
  }

  getItemsByCategory(category: MenuCategory): MenuItem[] {
    return this.allItems().filter(item => item.category === category);
  }
}
