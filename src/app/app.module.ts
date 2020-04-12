import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MapComponent } from './components/map/map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {ApiKeyService} from './services/api-key.service';
import {LoginService} from './services/login.service';
import {MatButtonModule} from '@angular/material/button';
import {AppsService} from './services/apps.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import {RefreshTokenInterceptorService} from './services/refreshtokeninterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent
  ],
  imports: [
    LeafletModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    ApiKeyService,
    LoginService,
    AppsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptorService,
      multi: true
    },
    {provide: APP_BASE_HREF, useValue: '/apps/datawhere'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
