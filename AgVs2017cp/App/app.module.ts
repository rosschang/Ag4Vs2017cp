import { NgModule, ErrorHandler } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule, MdCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { UserComponent } from './components/user.component';
import { CurrencyComponent } from './components/currency.component';
import { NavbarComponent } from "./Components/navbar.component";
import { FileuploadComponent } from './Components/fileupload/fileupload.component';
import { SearchComponent } from './Shared/search.component';

import { UserService } from './Service/user.service';
import { CurrencyService } from './Service/currency.service';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UserFilterPipe } from "./Pipe/user.pipe";
import AppErrorHandler from './Shared/errorhandler';

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, routing, Ng2Bs3ModalModule, MaterialModule],
    declarations: [AppComponent, HomeComponent, UserComponent, CurrencyComponent, NavbarComponent, FileuploadComponent, UserFilterPipe, SearchComponent],
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }, { provide: APP_BASE_HREF, useValue: '/' }, UserService, CurrencyService],
    bootstrap: [AppComponent]
})

export class AppModule { }