import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Poll } from '../models/poll';
import { PollService } from '../services/poll-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {
  public poll: Poll | undefined;
  public polls$: Observable<Poll[]>;
  public polls: Poll[];
  public editPoll: Poll;
  public deletePoll: Poll;
  public selectedId : number;

  constructor(private pollService: PollService,private router: Router,
    private route: ActivatedRoute) {};


  ngOnInit(): void {
    this.polls$ = this.pollService.getPolls();
  
  }

  public onAddPoll(addForm: NgForm): void {
    document.getElementById('add-poll-form')?.click();
    this.pollService.addPoll(addForm.value).subscribe(
      (response: Poll) => {
        console.log(response);
        this.reloadCurrentRoute();
        addForm.reset();
      }
    );
  }

  public onUpdatePoll(poll: Poll): void {
    this.pollService.updatePoll(poll).subscribe(
      (response: Poll) => {
        console.log(response);
        this.reloadCurrentRoute();
      }
    );
  }

  public onDeletePoll(pollId: number): void {
    this.pollService.deletePoll(pollId).subscribe(
      (response: void) => {
        console.log(response);
        this.reloadCurrentRoute();
      }
    );
  }

  public searchPolls(key: string): void {
    console.log(key);
    const results: Poll[] = [];
    for (const poll of this.polls) {
      if (poll.topic.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(poll);
      }
    }
    this.polls = results;
    if (results.length === 0 || !key) {
      this.reloadCurrentRoute();
    }
  }

  public onOpenModal(poll: Poll, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPollModal');
    }
    if (mode === 'edit') {
      this.editPoll = poll;
      button.setAttribute('data-target', '#updatePollModal');
    }
    if (mode === 'delete') {
      this.deletePoll = poll;
      button.setAttribute('data-target', '#deletePollModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public gotoItems(poll: Poll) {
    this.router.navigate(['/polls', poll.id]);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
