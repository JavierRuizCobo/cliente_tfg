import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private apiUrl = 'http://localhost:3000/mail/send';

  constructor(private http: HttpClient) {}

  sendMail(mailData: { subject: string; message: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, mailData);
  }

}
