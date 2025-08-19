import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Detailsview } from './components/detailsview/detailsview';

export const routes: Routes = [
    {
        path:'',component:Layout
    },
    {
        path:'details',component:Detailsview
    }
];
