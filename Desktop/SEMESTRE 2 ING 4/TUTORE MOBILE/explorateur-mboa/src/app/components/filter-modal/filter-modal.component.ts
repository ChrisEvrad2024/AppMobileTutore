// src/app/components/filter-modal/filter-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {
  filters = {
    categories: [],
    bookable: false,
    transport: false,
    restaurant: false,
    stadium: false,
    recommand: false,
    rating: 0,
    priceRange: { lower: 0, upper: 100000 }
  };

  selectedCategoryFilter = 'all';
  categories = [
    { id: 'all', name: 'All' },
    { id: 'popular', name: 'Popular' },
    { id: 'recent', name: 'Recent' }
  ];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  applyFilters() {
    this.modalController.dismiss(this.filters);
  }

  resetFilters() {
    this.filters = {
      categories: [],
      bookable: false,
      transport: false,
      restaurant: false,
      stadium: false,
      recommand: false,
      rating: 0,
      priceRange: { lower: 0, upper: 100000 }
    };
    this.selectedCategoryFilter = 'all';
  }

  selectCategory(categoryId: string) {
    this.selectedCategoryFilter = categoryId;
  }
}