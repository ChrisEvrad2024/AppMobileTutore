// src/app/pages/profile/profile.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = null;
  
  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Déconnexion',
      message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Déconnexion',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Déconnexion...',
              spinner: 'circles'
            });
            await loading.present();
            
            try {
              await this.authService.logout();
              loading.dismiss();
              
              const toast = await this.toastController.create({
                message: 'Vous êtes déconnecté',
                duration: 2000,
                position: 'bottom',
                color: 'success'
              });
              await toast.present();
              
              this.router.navigateByUrl('/login');
            } catch (error) {
              loading.dismiss();
              
              const toast = await this.toastController.create({
                message: 'Erreur lors de la déconnexion',
                duration: 2000,
                position: 'bottom',
                color: 'danger'
              });
              await toast.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  goToSettings() {
    this.router.navigate(['/tabs/profile/settings']);
  }
}