// src/app/pages/articles/article-list/article-list.page.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../../../services/article.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.page.html',
  styleUrls: ['./article-list.page.scss'],
})
export class ArticleListPage implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  searchTerm: string = '';
  loading = true;
  currentPage = 0;
  totalPages = 0;
  categories = [
    { id: 'all', name: 'Tous', active: true },
    { id: 'certified', name: 'Certifiés', active: false },
  ];
  selectedCategory = 'all';

  constructor(
    private articleService: ArticleService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loadArticles();
  }

  async loadArticles(event?: any) {
    if (!event) {
      const loading = await this.loadingController.create({
        message: 'Chargement des articles...',
        spinner: 'circles',
      });
      await loading.present();
      this.loading = true;
    }

    this.articleService.getArticles(this.currentPage).subscribe(
      (response) => {
        this.articles = this.currentPage === 0 ? response.content : [...this.articles, ...response.content];
        this.filteredArticles = [...this.articles];
        this.totalPages = response.totalPages;
        this.loading = false;
        
        if (event) {
          event.target.complete();
          
          // Disable infinite scroll if all pages are loaded
          if (this.currentPage >= this.totalPages - 1) {
            event.target.disabled = true;
          }
        } else {
          this.loadingController.dismiss();
        }
        
        this.applyFilters();
      },
      (error) => {
        console.error('Error loading articles', error);
        this.loading = false;
        if (event) {
          event.target.complete();
        } else {
          this.loadingController.dismiss();
        }
      }
    );
  }

  loadMoreArticles(event: any) {
    this.currentPage++;
    this.loadArticles(event);
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    this.applyFilters();
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    
    this.categories.forEach(category => {
      category.active = category.id === categoryId;
    });
    
    this.applyFilters();
  }

  doRefresh(event: any) {
    this.currentPage = 0;
    this.articleService.getArticles(this.currentPage).subscribe(
      (response) => {
        this.articles = response.content;
        this.filteredArticles = [...this.articles];
        this.totalPages = response.totalPages;
        this.applyFilters();
        event.target.complete();
      },
      (error) => {
        console.error('Error refreshing articles', error);
        event.target.complete();
      }
    );
  }

  private applyFilters() {
    let results = [...this.articles];
    
    // Apply search filter
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      results = results.filter(article => 
        article.titre.toLowerCase().includes(search) || 
        (article.description && article.description.toLowerCase().includes(search))
      );
    }
    
    // Apply category filter
    if (this.selectedCategory === 'certified') {
      results = results.filter(article => article.certification);
    }
    
    this.filteredArticles = results;
  }
}