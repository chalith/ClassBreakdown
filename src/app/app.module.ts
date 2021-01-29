import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { LocalStorageService } from './services/local-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectInputModule } from './shared/wrapped/select-input/select-input.module';
import { NumberInputModule } from './shared/wrapped/number-input/number-input.module';
import { ReportComponent } from './areas/report/report.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    FullLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SelectInputModule,
    NumberInputModule
  ],
  providers: [
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
