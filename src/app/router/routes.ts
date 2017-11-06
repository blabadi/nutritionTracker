import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../auth/login.component';
import { AuthChecker } from './auth-checker'

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthChecker] },
    { path: 'login', component: LoginComponent },
    //{ path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);