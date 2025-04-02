// src/app/components/search-filter/search-filter.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
  @Output() searchChange = new EventEmitter<string>();
  @Output() filterClick = new EventEmitter<void>();

  public searchTerm: string = '';
  public isSearchFocused: boolean = false;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }

  openFilters() {
    this.filterClick.emit();
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange();
  }

  onSearchFocus() {
    this.isSearchFocused = true;
  }

  onSearchBlur() {
    this.isSearchFocused = false;
  }
}