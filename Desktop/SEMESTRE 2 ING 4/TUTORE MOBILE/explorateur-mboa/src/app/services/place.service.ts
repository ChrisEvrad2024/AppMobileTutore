// src/app/services/place.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Place {
  id: number;
  nom: string;
  description: string;
  adresse: string;
  longitude: number;
  latitude: number;
  photo: any;
  etoile: number;
  bookable: boolean;
  transport: boolean;
  restaurant: boolean;
  stadium: boolean;
  recommand: boolean;
  verify: boolean;
  categorie: any;
  quartier: any;
  contacts: any[];
  prix: any[];
  services: any[];
}

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  constructor(private http: HttpClient) {}

  getPlaces(page = 0, size = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(
      `${environment.apiUrl}${environment.endpoints.places.all}`,
      { params }
    );
  }

  getPlaceById(id: number): Observable<Place> {
    return this.http.get<Place>(
      `${environment.apiUrl}${environment.endpoints.places.all}`,
      { params: { id: id.toString() } }
    );
  }

  getPlacesByCategory(categoryId: number, langue = 'fr'): Observable<Place[]> {
    const params = new HttpParams()
      .set('categoryId', categoryId.toString())
      .set('langue', langue);

    return this.http.get<Place[]>(
      `${environment.apiUrl}${environment.endpoints.places.byCategory}/${categoryId}`,
      { params }
    );
  }

  getFilteredPlaces(filters: any, page = 0, size = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Add filter parameters
    if (filters.bookable) params = params.set('bookable', 'true');
    if (filters.transport) params = params.set('transport', 'true');
    if (filters.restaurant) params = params.set('restaurant', 'true');
    if (filters.stadium) params = params.set('stadium', 'true');
    if (filters.recommand) params = params.set('recommand', 'true');
    if (filters.langue) params = params.set('langue', filters.langue);

    return this.http.get<any>(
      `${environment.apiUrl}${environment.endpoints.places.byFilter}`,
      { params }
    );
  }

  searchPlaces(query: string, langue = 'fr'): Observable<Place[]> {
    const params = new HttpParams()
      .set('nom', query)
      .set('langue', langue);

    return this.http.get<Place[]>(
      `${environment.apiUrl}${environment.endpoints.places.all}/search`,
      { params }
    );
  }
}