import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full'
    },
    {
        path: 'form',
        loadComponent: () => import('./app-form/app-form').then(m => m.AppForm)
    },
    {
        path: 'mansonry',
        loadComponent: () => import('./mansory-grid/mansory-grid').then(m => m.MansoryGrid)
    },
    {
        path: 'menu',
        loadComponent: () => import('./html-menu/html-menu').then(m => m.HtmlMenu)
    },
    {
        path: 'vanilla-patterns',
        loadComponent: () => import('./vanilla-patterns/vanilla-patterns').then(m => m.VanillaPatterns),
        children: [
            {
                path: '',
                redirectTo: 'todos',
                pathMatch: 'full'
            },
            {
                path: 'todos',
                loadComponent: () => import('./vanilla-patterns/manage-todos/manage-todos').then(m => m.ManageTodos)
            },
            {
                path: 'html-attributes',
                loadComponent: () => import('./vanilla-patterns/html-attributes/html-attributes').then(m => m.HtmlAttributes)
            }
        ]
    }
];