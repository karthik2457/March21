import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgentComponent } from './agent/agent.component';
import { CountdownComponent } from './countdown/countdown.component';
import { GtComponent } from './gt/gt.component';
import { InvitationComponent } from './invitation/invitation.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'agent', component: AgentComponent},
  { path: 'countdown', component: CountdownComponent},
  { path: 'gt', component: GtComponent},
  { path: 'invitation', component: InvitationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
