import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module'
import { HomeModule } from './home/home.module'


const routes: Routes = [

    { path: '', redirectTo: 'auth', pathMatch: 'full' },

    { path: 'auth', loadChildren: () => AuthModule },
    { path: 'user', loadChildren: () => HomeModule },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouringModule { }
