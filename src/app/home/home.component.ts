import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Poll } from '../models/poll';
import { PollService } from '../services/poll-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router){
  }
  
  public goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    
  }

}
