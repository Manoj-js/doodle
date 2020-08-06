import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  taskUrl = environment.taskUrl
  baseUrl = environment.baseUrl
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) { }

  getAssignedList(): Observable<any>{
    return this.http.get<any>(this.taskUrl + '/assigned/list?limit=10&page=0', this.httpOptions)
    .pipe(map((res: Response) => res));
  }
  getApprovedList(): Observable<any>{
    return this.http.get<any>(this.taskUrl + '/approved/list?limit=10&page=0', this.httpOptions)
    .pipe(map((res: Response) => res));
  }
  getRejectedList(): Observable<any>{
    return this.http.get<any>(this.taskUrl + '/rejected/list?limit=10&page=0', this.httpOptions)
    .pipe(map((res: Response) => res));
  }
  getCompletedList(): Observable<any>{
    return this.http.get<any>(this.taskUrl + '/completed/list?limit=10&page=0', this.httpOptions)
    .pipe(map((res: Response) => res));
  }
  getAcceptedList(): Observable<any>{
    return this.http.get<any>(this.taskUrl + '/accepted/list?limit=10&page=0', this.httpOptions)
    .pipe(map((res: Response) => res));
  }
  getWorkersList(): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/workers/list?limit=10&page=0', this.httpOptions)
    .pipe(map((res: Response) => res));
  }
  getWorkersDropDownList(): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/workers/dropdown', this.httpOptions)
    .pipe(map((res: Response) => res));
  }
}
