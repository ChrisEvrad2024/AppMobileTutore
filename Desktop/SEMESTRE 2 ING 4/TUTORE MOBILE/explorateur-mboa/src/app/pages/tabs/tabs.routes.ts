// src/app/tabs/tabs.routes.ts
import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../pages/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'places',
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/places/place-list/place-list.page').then(m => m.PlaceListPage)
          },
          {
            path: ':id',
            loadComponent: () => import('../pages/places/place-detail/place-detail.page').then(m => m.PlaceDetailPage)
          }
        ]
      },
      {
        path: 'articles',
        children: [
          {
            path: '',
            loadComponent: () => import('../pages/articles/article-list/article-list.page').then(m => m.ArticleListPage)
          },
          {
            path: ':id',
            loadComponent: () => import('../pages/articles/article-detail/article-detail.page').then(m => m.ArticleDetailPage)
          }
        ]
      },
      {
        path: 'profile',
        loadComponent: () => import('../pages/profile/profile.page').then(m => m.ProfilePage),
        canActivate: [authGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];