import { Component, OnInit } from '@angular/core';
import {AppsService} from '../../services/apps.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public constructor(private readonly apps: AppsService,
                     private readonly auth: LoginService) { }

   private static loginAppName = 'login';

  public ngOnInit(): void { }

  public logout() {
    this.auth.logout().then(() => {
      this.apps.forward(HeaderComponent.loginAppName);
    }, ()  => {
      this.apps.forward(HeaderComponent.loginAppName);
    });
  }

  public revokeAll() {
    this.auth.revokeAllTokens().then(() => {
      this.apps.forward(HeaderComponent.loginAppName);
    }, ()  => {
      this.apps.forward(HeaderComponent.loginAppName);
    });
  }

  public navigate(dest: string) {
    if (dest === 'profile') {
      this.apps.forward('dashboard', `/${dest}`);
      return;
    }

    this.apps.forward(dest);
  }
}
