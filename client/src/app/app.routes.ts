import { Routes } from '@angular/router';

export const routes: Routes = [


    {
        path:"auth/login",
        loadComponent: () =>import("./auth/login/login")
    },
    {
        path:"auth/registrarse",
        loadComponent: () =>import("./auth/registro/registro")
    },
    {
        path:"perfil/:id",
        loadComponent: () =>import("./pages/mi-perfil/mi-perfil")
    },
    {
        path:"publicaciones",
        loadComponent: () =>import("./pages/publicaciones/publicaciones")
    }
];
