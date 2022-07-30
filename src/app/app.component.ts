import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Poll } from './models/poll';
import { UserService } from './services/user-service';
import { PollService } from './services/poll-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FE-Happiness-Dashboard-1';

  ngOnInit() {
     
  }

}
