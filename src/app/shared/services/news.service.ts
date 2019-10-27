import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewsResponse, Article } from './news-response';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiURL = "";
  constructor(private http:HttpClient) { }


  // get top news
  public getTopNews(): Observable<NewsResponse>{
    let topNewsUrl = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b3c533e9aa4d4d24be8f4a202ea80f08";
    return this.getResponse(topNewsUrl);
  }

  // get response
  getResponse(url):Observable<NewsResponse>{
    return this.http.get<NewsResponse>(url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
