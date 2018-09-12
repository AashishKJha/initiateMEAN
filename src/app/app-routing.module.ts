import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module'


const routes: Routes = [

    { path: '', redirectTo: 'auth', pathMatch: 'full' },

    { path: 'auth', loadChildren: () => AuthModule },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouringModule { }
