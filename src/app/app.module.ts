import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRouringModule } from './app-routing.module';
import { AppComponent } from './components/app.component';

@NgModule({
  declarations: [
    AppComponent  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRouringModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
