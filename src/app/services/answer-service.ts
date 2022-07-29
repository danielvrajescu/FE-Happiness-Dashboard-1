import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Answer } from "../models/answer";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AnswerService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getAnswers(): Observable<Answer[]> {
        return this.http.get<Answer[]>(`${this.apiServerUrl}/answers`);
    }
    public addAnswer(answer: Answer): Observable<Answer> {
        return this.http.post<Answer>(`${this.apiServerUrl}/answers`,answer);
    }
    public updateAnswer(answer: Answer): Observable<Answer> {
        return this.http.put<Answer>(`${this.apiServerUrl}/answers`,answer);
    }
    public deleteAnswer(answerID: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/answers/${answerID}`);
    }
}