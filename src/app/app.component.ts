import { Component, OnInit } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  socialUser!: SocialUser;
  userName!: string;
  photoUser!: string;
  isLoggedin?: boolean;
  private accessToken!: string;

  constructor(
    private authService: SocialAuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.accessToken = this.cookieService.get('token');
    if (this.accessToken !== '') {
      this.isLoggedin = true;
      this.userName = this.cookieService.get('name');
      this.photoUser = this.cookieService.get('photo');
    }
    this.authService.authState.subscribe((user: SocialUser): void => {
      console.log(user);
      this.socialUser = user;
      this.userName = user.name;
      this.photoUser = user.photoUrl;
      this.accessToken = user.idToken;
      this.isLoggedin = user !== null;
      this.cookieService.set('name', user.name);
      this.cookieService.set('photo', user.photoUrl);
      this.cookieService.set('token', user.idToken);
    });
  }
  logOut(): void {
    this.cookieService.deleteAll();
    this.authService.signOut();
    this.isLoggedin = false;
  }
}
