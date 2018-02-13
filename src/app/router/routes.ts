import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from '../auth/login.component';
import { AuthChecker } from './auth-checker'
import {ProfileFormComponent} from "../auth/profile-form.component";
import {LoggedInLayoutComponent} from "../home/layout.component";
import {DashboardComponent} from "../home/dashboard.component";

/*
* nested routing:
* https://stackoverflow.com/questions/41857876/angular-2-submodule-routing-and-nested-router-outlet
*/
const appRoutes: Routes = [
    { path: 'user', component: LoggedInLayoutComponent, canActivate: [AuthChecker],
        children:[
            { path : '', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: DashboardComponent },
            { path: 'profile', component: ProfileFormComponent},
        ]
    },
    { path: 'login', component: LoginComponent },
    //{ path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**',  redirectTo: 'user', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);