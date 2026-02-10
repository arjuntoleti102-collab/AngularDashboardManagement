import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list';
import { UserDetailsComponent } from './components/user-details';

export const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
        pathMatch: 'full'
    },
    {
        path: 'user/:id',
        component: UserDetailsComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
