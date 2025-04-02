// src/app/components/place-card/place-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from '../../services/place.service';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
})
export class PlaceCardComponent implements OnInit {
  @Input() place: Place;
  @Input() showDetails = true;
  @Input() horizontal = false;

  constructor(private router: Router) {
    // Initialize with empty place to avoid errors
    this.place = {
      id: 0,
      nom: '',
      description: '',
      adresse: '',
      longitude: 0,
      latitude: 0,
      photo: null,
      etoile: 0,
      bookable: false,
      transport: false,
      restaurant: false,
      stadium: false,
      recommand: false,
      verify: false,
      categorie: null,
      quartier: null,
      contacts: [],
      prix: [],
      services: []
    };
  }

  ngOnInit() {}

  viewPlaceDetails() {
    this.router.navigate(['/tabs/places', this.place.id]);
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();
    // Implement favorite toggling logic
    console.log('Toggle favorite for place', this.place.id);
  }

  getImageUrl() {
    if (this.place.photo && this.place.photo.id) {
      return `${environment.apiUrl}/images/${this.place.photo.id}`;
    }
    return 'assets/images/placeholder.jpg';
  }

  // Helper method to display truncated description
  truncateDescription(text: string, maxLength = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}

// Don't forget to import environment
import { environment } from '../../../environments/environment';