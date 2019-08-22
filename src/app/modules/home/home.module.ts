import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileComponent, UpdateProfileComponent]
})
export class HomeModule { }
