import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthServiceService } from "../auth-service.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthServiceService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    if (authToken) {
      const authRequest = req.clone({
        headers: req.headers.set("x-access-token", authToken),
      });
      return next.handle(authRequest).pipe(
        catchError((error:HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.authService.onLogout();
            return throwError(error);
          } else {
            return throwError(error);
          }
        })
      );
    } else {
      return next.handle(req).pipe(
        catchError((error:HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            this.authService.onLogout();
            return throwError(error);
          } else {
            return throwError(error);
          }
        })
      );
    }
  }


}
