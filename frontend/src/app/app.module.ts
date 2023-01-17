import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { RootComponent } from './components/root/root.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MovementsComponent } from './components/movements/movements.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
    declarations: [
        LoginComponent,
        NavbarComponent,
        RegisterComponent,
        MainComponent,
        HomeComponent,
        RootComponent,
        MovementsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatIconModule,
        NgbModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatListModule,
    ],
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule {}
