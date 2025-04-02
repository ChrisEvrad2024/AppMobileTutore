import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'homeionic',
    loadComponent: () => import('./pages/homeionic/homeionic.page').then( m => m.HomeionicPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'place-detail',
    loadComponent: () => import('./pages/places/place-detail/place-detail.page').then( m => m.PlaceDetailPage)
  },
  {
    path: 'article-list',
    loadComponent: () => import('./pages/articles/article-list/article-list.page').then( m => m.ArticleListPage)
  },
  {
    path: 'article-detail',
    loadComponent: () => import('./pages/articles/article-detail/article-detail.page').then( m => m.ArticleDetailPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
];
