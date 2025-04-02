// src/app/pages/places/place-detail/place-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Place, PlaceService } from '../../../services/place.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  loading = true;
  activeSegment = 'description';
  isFavorite = false;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 4000
    }
  };

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
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

  ngOnInit() {
    this.loadPlaceData();
  }

  async loadPlaceData() {
    const loading = await this.loadingController.create({
      message: 'Chargement des informations...',
      spinner: 'circles'
    });
    await loading.present();

    const placeId = this.route.snapshot.paramMap.get('id');
    if (placeId) {
      this.placeService.getPlaceById(parseInt(placeId)).subscribe(
        (place) => {
          this.place = place;
          this.loading = false;
          loading.dismiss();
        },
        async (error) => {
          this.loading = false;
          loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Erreur lors du chargement des informations. Veuillez réessayer.',
            duration: 3000,
            position: 'bottom',
            color: 'danger'
          });
          await toast.present();
        }
      );
    } else {
      this.loading = false;
      loading.dismiss();
    }
  }

  segmentChanged(event: any) {
    this.activeSegment = event.detail.value;
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Implement actual favorite logic here
  }

  openMap() {
    // Open map with location
    if (this.place.latitude && this.place.longitude) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${this.place.latitude},${this.place.longitude}`, '_blank');
    }
  }

  makePhoneCall(phoneNumber: string) {
    window.open(`tel:${phoneNumber}`, '_self');
  }

  openWhatsapp(whatsappNumber: string) {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  }

  getImageUrl() {
    if (this.place.photo && this.place.photo.id) {
      return `${environment.apiUrl}/images/${this.place.photo.id}`;
    }
    return 'assets/images/placeholder.jpg';
  }

  // Helper to format price
  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR').format(price);
  }
}