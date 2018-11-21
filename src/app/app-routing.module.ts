import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AuthModule } from './auth/auth.module'
//import { HomeModule } from './home/home.module'


const routes: Routes = [

    { path: '', redirectTo: 'auth', pathMatch: 'full' },

    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
    { path: 'user', loadChildren: './home/home.module#HomeModule' },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouringModule { }
