import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AgentComponent } from './agent/agent.component';
import { CountdownComponent } from './countdown/countdown.component';
import { GtComponent } from './gt/gt.component';
import { InvitationComponent } from './invitation/invitation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgentComponent,
    CountdownComponent,
    GtComponent,
    InvitationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
