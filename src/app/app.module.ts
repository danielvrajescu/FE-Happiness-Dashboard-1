import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from "primeng/button";
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PollDetailsComponent } from './poll-details/poll-details.component';
import { ErrorComponent } from './error/error.component';
import { PollsComponent } from './polls/polls.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PollDetailsComponent,
    ErrorComponent,
    PollsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MdbCollapseModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
