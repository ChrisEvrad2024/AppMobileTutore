// src/app/components/article-card/article-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../services/article.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {
  @Input() article: Article;
  @Input() horizontal = false;

  constructor(private router: Router) {
    // Initialize with empty article to avoid errors
    this.article = {
      idArticle: 0,
      titre: '',
      description: '',
      date_publication: '',
      photo: null,
      isEnabled: false,
      isDelete: false,
      certification: false,
      createur: '',
      modificateur: '',
      rubrique: null,
      transport: false
    };
  }

  ngOnInit() {}

  viewArticleDetails() {
    this.router.navigate(['/tabs/articles', this.article.idArticle]);
  }

  getImageUrl() {
    if (this.article.photo && this.article.photo.id) {
      return `${environment.apiUrl}/images/${this.article.photo.id}`;
    }
    return 'assets/images/article-placeholder.jpg';
  }

  // Format date from ISO string
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  // Helper method to display truncated description
  truncateDescription(text: string, maxLength = 120): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}