import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient, HttpBackend } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ManagerService {
  taskUrl = environment.taskUrl;
  baseUrl = environment.baseUrl;
  fileUrl = environment.fileUrl;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  httpOptions_file = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    responseType: "blob" as "json",
  };
  constructor(private http: HttpClient,
    private handler: HttpBackend) {}

  getAssignedList(): Observable<any> {
    return this.http
      .get<any>(
        this.taskUrl + "/assigned/list",
        this.httpOptions
      )
      .pipe(map((res: Response) => res));
  }
  getApprovedList(): Observable<any> {
    return this.http
      .get<any>(
        this.taskUrl + "/approved/list",
        this.httpOptions
      )
      .pipe(map((res: Response) => res));
  }
  getRejectedList(): Observable<any> {
    return this.http
      .get<any>(
        this.taskUrl + "/rejected/list",
        this.httpOptions
      )
      .pipe(map((res: Response) => res));
  }
  getCompletedList(): Observable<any> {
    return this.http
      .get<any>(
        this.taskUrl + "/completed/list",
        this.httpOptions
      )
      .pipe(map((res: Response) => res));
  }
  getAcceptedList(): Observable<any> {
    return this.http
      .get<any>(
        this.taskUrl + "/accepted/list",
        this.httpOptions
      )
      .pipe(map((res: Response) => res));
  }
  getWorkersList(): Observable<any> {
    return this.http
      .get<any>(
        this.baseUrl + "/workers/list",
        this.httpOptions
      )
      .pipe(map((res: Response) => res));
  }
  addTask(data): Observable<any> {
    return this.http
      .post<any>(this.taskUrl + "/add", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  UpdateTask(data): Observable<any> {
    return this.http
      .put<any>(this.taskUrl + "/update", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  gettaskById(id): Observable<any> {
    return this.http
      .get<any>(this.taskUrl + `/list/${id}`, this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  deleteTask(data): Observable<any> {
    return this.http
      .post<any>(this.taskUrl + "/delete", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  getWorkersDropDownList(): Observable<any> {
    return this.http
      .get<any>(this.baseUrl + "/workers/dropdown", this.httpOptions)
      .pipe(map((res: Response) => res));
  }

  acceptTask(data): Observable<any> {
    return this.http
      .post<any>(this.taskUrl + "/approve", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  rejectTask(data): Observable<any> {
    return this.http
      .post<any>(this.taskUrl + "/reject", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  activateUSer(data): Observable<any> {
    return this.http
      .put<any>(this.baseUrl + "/active", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }
  deactivateUSer(data): Observable<any> {
    return this.http
      .put<any>(this.baseUrl + "/deactive", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }

  fileDownload(data){
  
    return `${this.fileUrl}/${data}` 
    
    
  }

}

