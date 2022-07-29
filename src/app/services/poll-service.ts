import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Poll } from "../models/poll";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class PollService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getPolls(): Observable<Poll[]> {
        return this.http.get<Poll[]>(`${this.apiServerUrl}/polls`);
    }
    public addPoll(poll: Poll): Observable<Poll> {
        return this.http.post<Poll>(`${this.apiServerUrl}/polls`,poll);
    }
    public updatePoll(poll: Poll): Observable<Poll> {
        return this.http.put<Poll>(`${this.apiServerUrl}/polls`,poll);
    }
    public deletePoll(pollID: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/polls/${pollID}`);
    }
}