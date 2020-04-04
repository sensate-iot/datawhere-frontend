import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login.service';
import {AppsService} from './services/apps.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public constructor(private readonly auth: LoginService,
                     private readonly apps: AppsService) {
  }

  public ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.apps.forward('login');
    }
  }
}
