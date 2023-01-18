import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { TransfersPageComponent } from './components/transfers-page/transfers-page.component';
import { PaymentsPageComponent } from './components/payments-page/payments-page.component';
import { AccountPageComponent } from './components/account-page/account-page.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'transfers',
        component: TransfersPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'payments',
        component: PaymentsPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'account',
        component: AccountPageComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
