import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthServiceService } from "src/app/Services/auth-service.service";
import { Router } from "@angular/router";
import { errorAlert, successAlert } from "../../shared/sweetalert/sweetalert";
import { HttpErrorResponse } from "@angular/common/http";
import { loginApi_Response } from "src/app/models/models";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  submitted = false;

  loginForm: FormGroup;
  isManagerLogin = false;
  constructor(
    private _auth: AuthServiceService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  loginSwitch() {
    this.isManagerLogin = !this.isManagerLogin;
  }

  onRegister() {
    if (this.isManagerLogin) {
      this._router.navigate(["/register", "manager"]);
    } else {
      this._router.navigate(["/register", "user"]);
    }
  }
  onLoginSubmit() {
    if (!this.loginForm.valid) {
      this.submitted = true;
      return;
    }
    this._auth.login(this.loginForm.value).subscribe(
      (res: loginApi_Response) => {
        if (res.status === 200) {
          console.log(res);
          successAlert(res.message);
          this._auth.storeAuthToken(res.data.token);
          if (res.data.userType === 1) {
            this._router.navigateByUrl("/dashboard/manager/tasks");
          } else {
            this._router.navigateByUrl("/dashboard/user/tasks");
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        errorAlert(error.error.message, error.statusText);
        this._router.navigateByUrl("/login");
      }
    );
  }
}
