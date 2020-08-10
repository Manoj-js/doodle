import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  taskUrl = environment.taskUrl;
  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  httpOptions_formdata = {
    headers: new HttpHeaders({ "Content-Type": "multipart/form-data;" }),
  };
  constructor(private http: HttpClient) {}

  getPendingList(): Observable<any> {
    return this.http
      .get<any>(this.taskUrl + "/mytask/list", this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  getApprovedList(): Observable<any> {
    return this.http
      .get<any>(this.taskUrl + "/mytask/approved/list", this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  getCompletedList(): Observable<any> {
    return this.http
      .get<any>(this.taskUrl + "/mytask/mycompleted/list", this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  submitTask(data: FormData): Observable<any> {
    return this.http
      .post<any>(this.taskUrl + "/mytask/submit", data)
      .pipe(map((res: Response) => res));
  }

  acceptTask(data): Observable<any> {
    return this.http
      .post<any>(this.taskUrl + "/mytask/accept", data)
      .pipe(map((res: Response) => res));
  }
  UpdateProfile(data): Observable<any> {
    return this.http
      .put<any>(this.baseUrl + "/update/profile", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }
}
