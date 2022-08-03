import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { PollDetailsComponent } from './poll-details/poll-details.component';
import { PollsComponent } from './polls/polls.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'polls', component: PollsComponent},
  { path: 'polls/:id', component: PollDetailsComponent},

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            FormsModule],
  exports: [RouterModule,
            FormsModule],
})
export class AppRoutingModule { }
