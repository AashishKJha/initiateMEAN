import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
    { path: 'user', loadChildren: './modules/home/home.module#HomeModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRouringModule { }
