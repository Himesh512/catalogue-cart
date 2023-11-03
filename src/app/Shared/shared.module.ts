import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonService } from "./services/common.service";
import { CompareProductComponent } from './components/compare-product/compare-product.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
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
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [
    CompareProductComponent,
    CompareProductComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule,
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
    providers: [
        CommonService
    ],
    exports: [
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule,
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
    ]
})

export class ShareModule { }