import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthServiceService } from "src/app/Services/auth-service.service";
import { MustMatch } from "./custom-validator/custom-validator";
import { HttpErrorResponse } from "@angular/common/http";
import { errorAlert } from "src/app/shared/sweetalert/sweetalert";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  registerType: string;
  constructor(
    private _auth: AuthServiceService,
    private _router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.registerType = this.route.snapshot.params.name;
    this.registerForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        fullName: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.submitted = true;
      return;
    }
    if (this.registerType === "manager") {
      this._auth.managerSignup(this.registerForm.value).subscribe(
        (res) => {
          this._router.navigateByUrl("/login");
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.error.message, error.statusText);
          this.registerForm.reset();
        }
      );
    } else {
      this._auth.workerSignup(this.registerForm.value).subscribe(
        (res) => {
          this._router.navigateByUrl("/login");
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.error.message, error.statusText);
          this.registerForm.reset();
        }
      );
    }
  }
}
