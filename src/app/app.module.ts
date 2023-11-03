import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ShareModule } from './Shared/shared.module';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClientModule } from "@angular/common/http";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        ShareModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatGridListModule,
        MatButtonToggleModule,
        HttpClientModule,
        MatBadgeModule,
        MatSnackBarModule,
        MatDividerModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
