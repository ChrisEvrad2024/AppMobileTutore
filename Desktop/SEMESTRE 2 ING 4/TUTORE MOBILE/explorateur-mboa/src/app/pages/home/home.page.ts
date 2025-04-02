// src/app/pages/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlaceService, Place } from '../../services/place.service';
import { FilterModalComponent } from '../../components/filter-modal/filter-modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  places: Place[] = [];
  filteredPlaces: Place[] = [];
  categories = [
    { id: 'all', name: 'All', icon: 'apps-outline', active: true },
    { id: 'visited', name: 'Plus visités', icon: 'eye-outline', active: false },
    { id: 'favorites', name: 'À proximité', icon: 'location-outline', active: false },
    { id: 'recent', name: 'Récents', icon: 'time-outline', active: false }
  ];
  
  searchTerm: string = '';
  loading: boolean = false;
  currentPage: number = 0;
  totalPages: number = 0;
  activeFilters: any = null;

  constructor(
    private placeService: PlaceService,
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.loadPlaces();
  }

  getCurrentUser() {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  loadPlaces(event?: any) {
    this.loading = true;
    
    this.placeService.getPlaces(this.currentPage).subscribe(
      (response) => {
        this.places = this.currentPage === 0 ? response.content : [...this.places, ...response.content];
        this.filteredPlaces = [...this.places];
        this.totalPages = response.totalPages;
        this.loading = false;
        
        if (event) {
          event.target.complete();
          
          // Disable infinite scroll if all pages are loaded
          if (this.currentPage >= this.totalPages - 1) {
            event.target.disabled = true;
          }
        }
        
        // Apply search and filters
        this.applySearchAndFilters();
      },
      (error) => {
        console.error('Error loading places', error);
        this.loading = false;
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  loadMorePlaces(event: any) {
    this.currentPage++;
    this.loadPlaces(event);
  }

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      componentProps: {
        filters: this.activeFilters || {}
      }
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.activeFilters = data;
      this.applySearchAndFilters();
    }
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applySearchAndFilters();
  }

  selectCategory(categoryId: string) {
    this.categories.forEach(category => {
      category.active = category.id === categoryId;
    });
    
    // Reset page and reload based on category
    this.currentPage = 0;
    
    // Here you would implement logic to filter by category
    // For now, we'll just reload the places
    this.loadPlaces();
  }

  doRefresh(event: any) {
    this.currentPage = 0;
    this.loadPlaces();
    event.target.complete();
  }

  private applySearchAndFilters() {
    let results = [...this.places];
    
    // Apply search
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      results = results.filter(place => 
        place.nom.toLowerCase().includes(search) || 
        (place.description && place.description.toLowerCase().includes(search))
      );
    }
    
    // Apply active filters if any
    if (this.activeFilters) {
      if (this.activeFilters.bookable) {
        results = results.filter(place => place.bookable);
      }
      if (this.activeFilters.transport) {
        results = results.filter(place => place.transport);
      }
      if (this.activeFilters.restaurant) {
        results = results.filter(place => place.restaurant);
      }
      if (this.activeFilters.stadium) {
        results = results.filter(place => place.stadium);
      }
      if (this.activeFilters.recommand) {
        results = results.filter(place => place.recommand);
      }
      if (this.activeFilters.rating > 0) {
        results = results.filter(place => place.etoile >= this.activeFilters.rating);
      }
    }
    
    this.filteredPlaces = results;
  }
}