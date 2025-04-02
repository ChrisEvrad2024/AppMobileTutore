// src/app/pages/articles/article-detail/article-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, Platform } from '@ionic/angular';
import { ArticleService, Article } from '../../../services/article.service';
import { environment } from '../../../../environments/environment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.page.html',
  styleUrls: ['./article-detail.page.scss'],
})
export class ArticleDetailPage implements OnInit {
  article: Article;
  loading = true;
  formattedContent: SafeHtml;
  textSize = 'medium'; // small, medium, large

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private sanitizer: DomSanitizer,
    private platform: Platform
  ) {
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
    this.formattedContent = '';
  }

  ngOnInit() {
    this.loadArticleData();
  }

  async loadArticleData() {
    const loading = await this.loadingController.create({
      message: 'Chargement de l\'article...',
      spinner: 'circles'
    });
    await loading.present();

    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.articleService.getArticleById(parseInt(articleId)).subscribe(
        (article) => {
          this.article = article;
          this.formatArticleContent();
          this.loading = false;
          loading.dismiss();
        },
        async (error) => {
          this.loading = false;
          loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Erreur lors du chargement de l\'article. Veuillez réessayer.',
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

  formatArticleContent() {
    // This function would enhance the article text with proper HTML formatting
    // For now, we'll use a simple approach
    if (this.article.description) {
      // Replace newlines with paragraph tags
      let content = this.article.description.replace(/\n\n/g, '</p><p>');
      content = '<p>' + content + '</p>';
      
      // Make URLs clickable
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      content = content.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
      
      // Sanitize the content to prevent XSS
      this.formattedContent = this.sanitizer.bypassSecurityTrustHtml(content);
    }
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
      month: 'long',
      year: 'numeric'
    });
  }

  shareArticle() {
    const title = this.article.titre;
    const articleUrl = window.location.href;
    
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      // Native sharing for mobile apps
      (window as any).plugins.socialsharing.share(
        'Découvrez cet article sur Explorateur MBOA: ' + title,
        title,
        null,
        articleUrl
      );
    } else {
      // Web sharing API
      if (navigator.share) {
        navigator.share({
          title: title,
          text: 'Découvrez cet article sur Explorateur MBOA',
          url: articleUrl,
        });
      } else {
        // Fallback if Web Share API is not available
        this.copyLinkToClipboard();
      }
    }
  }

  async copyLinkToClipboard() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const toast = await this.toastController.create({
        message: 'Lien copié dans le presse-papier',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    } catch (err) {
      const toast = await this.toastController.create({
        message: 'Impossible de copier le lien',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      });
      await toast.present();
    }
  }

  changeTextSize(size: string) {
    this.textSize = size;
  }
}