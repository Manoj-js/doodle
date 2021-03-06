import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { ManagerService } from "src/app/Services/manager/manager.service";
import { AuthServiceService } from "src/app/Services/auth-service.service";
import { ProfileDetailsApi_Response } from "src/app/models/models";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";
import { errorAlert } from "src/app/shared/sweetalert/sweetalert";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  p = 1;
  public params: any;
  dateTimeFormat: string = "YYYY-MM-DD HH:mm";
  effectiveTill: string;
  searchvalue: any = { fullName: "" };
  workersList = [];
  public userprofileDetails: ProfileDetailsApi_Response;
  @ViewChild("model") public Model: ModalDirective;
  isShown: boolean = false;
  constructor(
    private managerService: ManagerService,
    private _auth: AuthServiceService
  ) {}

  ngOnInit(): void {
    let effectiveDate = moment()
      .utcOffset(environment.UTC)
      .format("DD:MM:YYYY");
    this.params = {
      effective_till: effectiveDate,
    };
    if (this._auth.getToken) {
      this._auth.getProfileDetails().subscribe(
        (res) => {
          this.userprofileDetails = res;
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.error.message, error.statusText);
        }
      );
    }
    this.defaultList();
  }

  defaultList() {
    this.managerService.getWorkersList().subscribe(
      (res) => {
        this.workersList = res.data;
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.error.message, error.statusText);
      }
    );
  }

  logout() {
    this._auth.onLogout();
  }

  getDateSelection(e) {
    // converting datetime to 24 hrs format
    let selectedDateTime = moment(e.value)
      .utcOffset(environment.UTC)
      .format(this.dateTimeFormat);
    this.effectiveTill = selectedDateTime;
  }

  handleStatus(name, id, status) {
    let data = {
      userId: id,
    };
    let statusText = status == 2 ? "Activate" : "Inactivate";
    Swal.fire({
      title: "Are you sure want to " + statusText + ' Worker"' + name + '"?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        if (status == 1) {
          this.managerService.deactivateUSer(data).subscribe(
            (res) => {
              this.defaultList();
            },
            (error: HttpErrorResponse) => {
              errorAlert(error.error.message, error.statusText);
            }
          );
        } else {
          this.managerService.activateUSer(data).subscribe(
            (res) => {
              this.defaultList();
            },
            (error: HttpErrorResponse) => {
              errorAlert(error.error.message, error.statusText);
            }
          );
        }
      }
    });
  }
}
