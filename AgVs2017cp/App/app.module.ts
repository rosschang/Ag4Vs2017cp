import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { UserService } from './Service/user.service';
import { UserComponent } from './components/user.component';
import { CurrencyComponent } from './components/currency.component';

import { CurrencyService } from './Service/currency.service';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { NavbarComponent } from "./Components/navbar.component"
import { FileuploadComponent } from './Components/fileupload/fileupload.component'

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, HomeComponent, UserComponent, CurrencyComponent, NavbarComponent, FileuploadComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService, CurrencyService],
    bootstrap: [AppComponent]
})

export class AppModule { }