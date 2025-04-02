// src/app/pages/auth/register/register.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  passwordVisible = false;
  rememberMe = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.pattern('^[0-9]{9}$')]
    });
  }

  ngOnInit() {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }

  async register() {
    if (this.registerForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Création de compte...',
        spinner: 'circles'
      });
      await loading.present();

      const userData = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        phoneNumber: this.registerForm.get('phoneNumber')?.value
      };

      this.authService.register(userData).subscribe(
        async (res) => {
          await loading.dismiss();
          
          if (res.success) {
            const toast = await this.toastController.create({
              message: 'Compte créé avec succès!',
              duration: 2000,
              position: 'bottom',
              color: 'success'
            });
            await toast.present();
            
            // Login the user with the newly created credentials
            this.authService.login({
              username: userData.email,
              password: userData.password
            }).subscribe(
              () => this.router.navigateByUrl('/tabs/home'),
              async (error) => {
                const toast = await this.toastController.create({
                  message: 'Compte créé, mais erreur de connexion automatique. Veuillez vous connecter manuellement.',
                  duration: 3000,
                  position: 'bottom'
                });
                await toast.present();
                this.router.navigateByUrl('/login');
              }
            );
          } else {
            const toast = await this.toastController.create({
              message: res.message || 'Erreur lors de la création du compte.',
              duration: 3000,
              position: 'bottom',
              color: 'danger'
            });
            await toast.present();
          }
        },
        async (error) => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: error.error?.message || 'Erreur lors de la création du compte.',
            duration: 3000,
            position: 'bottom',
            color: 'danger'
          });
          await toast.present();
        }
      );
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}