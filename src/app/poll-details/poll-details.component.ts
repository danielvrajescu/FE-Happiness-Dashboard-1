import { Component, OnInit } from '@angular/core';
import { Poll } from '../models/poll';
import { Router,ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { PollService } from '../services/poll-service';
import { Observable } from 'rxjs';
import { Answer } from '../models/answer';
import { AnswerService } from '../services/answer-service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss']
})
export class PollDetailsComponent implements OnInit {
  public poll: Poll;
  public deleteAnswer: Answer;
  public body: Answer;
  public topic: string;
  public answers$: Observable<Answer[]>;
  public answers: Answer[];
  public pollId: string | null;

  constructor(private pollService: PollService,private router: Router,
    private route: ActivatedRoute, private answerService: AnswerService) {};

  ngOnInit(){
    this.pollId = this.route.snapshot.paramMap.get('id');
    this.getPollById(Number(this.pollId));
    this.answers$ = this.answerService.getAnswersByPollId(Number(this.pollId));
    
  }

  public getPollById(pollID: number) {
    this.pollService.getPollById(pollID)
      .subscribe((response: Poll) => {
        console.log(response);
        this.poll = response;
      });
  }

  public onAddAnswer(addForm: NgForm): void {
    document.getElementById('add-answer-form')?.click();
    this.body = addForm.value;
    this.body.pollId = Number(this.pollId);
    this.body.userId = 1;
    this.answerService.addAnswer(this.body).subscribe(
      (response: Answer) => {
        console.log(response);
        this.reloadCurrentRoute();
        addForm.reset();
      }
    );
  }

  public onDeleteAnswer(answerId: number): void {
    this.answerService.deleteAnswer(answerId).subscribe(
      (response: void) => {
        console.log(response);
        this.reloadCurrentRoute();
      }
    );
  }


  public searchAnswers(key: string): void {
    console.log(key);
    const results: Answer[] = [];
    for (const answer of this.answers) {
      if (answer.content.toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(answer);
      }
    }
    this.answers = results;
    if (results.length === 0 || !key) {
      this.reloadCurrentRoute();
    }
  }

  public onOpenModal(answer: Answer, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAnswerModal');
    }
    if (mode === 'edit') {
      //this.editAnswer = answer;
      button.setAttribute('data-target', '#updateAnswerModal');
    }
    if (mode === 'delete') {
      this.deleteAnswer = answer;
      button.setAttribute('data-target', '#deleteAnswerModal');
    }
    container?.appendChild(button);
    button.click();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
    });
  }
  public goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }


}
