import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import {
  loginApi_Response,
  ProfileDetailsApi_Response,
} from "../models/models";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  baseUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
  };
  public userprofileDetails: ProfileDetailsApi_Response;
  constructor(private http: HttpClient, private router: Router) {}

  managerSignup(data) {
    return this.http
      .post(this.baseUrl + "/manager/signup", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }

  workerSignup(data) {
    return this.http
      .post(this.baseUrl + "/worker/signup", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }

  login(data): Observable<loginApi_Response> {
    return this.http
      .post(this.baseUrl + "/login", data, this.httpOptions)
      .pipe(map((data) => data as loginApi_Response));
  }

  getProfileDetails(): Observable<ProfileDetailsApi_Response> {
    return this.http
      .get(this.baseUrl + "/profile/details", this.httpOptions)
      .pipe(
        tap((data: ProfileDetailsApi_Response) => {
          this.userprofileDetails = data;
        }),
        map((data) => data as ProfileDetailsApi_Response)
      );
  }
  UpdateProfileDetails(data) {
    return this.http
      .put(this.baseUrl + "/update/profile", data, this.httpOptions)
      .pipe(map((res: Response) => res));
  }

  storeAuthToken(token) {
    localStorage.setItem("token", token);
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
