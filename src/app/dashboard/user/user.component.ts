import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ProfileDetailsApi_Response } from "src/app/models/models";
import { ModalDirective } from "ngx-bootstrap/modal";
import { AuthServiceService } from "src/app/Services/auth-service.service";
import { ManagerService } from "src/app/Services/manager/manager.service";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/Services/user/user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { successAlert, infoAlert, errorAlert } from "src/app/shared/sweetalert/sweetalert";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  editMode: boolean = false;
  fullName: string;
  value = "Pending";
  p = 1;
  Task;
  comments: string;
  onSubmit: boolean = false;
  public params: any;
  files: string[] = [];
  fileName: string[] = [];
  dateTimeFormat: string = "YYYY-MM-DD HH:mm";
  effectiveTill: string;
  list = [];
  searchvalue: any = { taskTitle: '' };
  dropDown = [];
  @ViewChild("baseModal", { static: true })
  baseModal: TemplateRef<any>;
  public userprofileDetails: ProfileDetailsApi_Response;
  @ViewChild("model") public Model: ModalDirective;
  @ViewChild("profile") public Profile: ModalDirective;
  fileData: FormData;
  constructor(
    public _auth: AuthServiceService,
    private userService: UserService,
    private modelService: NgbModal
  ) { }

  ngOnInit(): void {
    if (this._auth.getToken) {
      this._auth.getProfileDetails().subscribe((res) => {
        this.userprofileDetails = res;
        this.fullName = this.userprofileDetails.data.fullName;
      });
    }
    this.userService.getPendingList().subscribe((res) => {
      this.list = res.data;
      this.value = "Pending";
    });
  }

  logout() {
    this._auth.onLogout();
  }

  ModelPopup(item) {
    this.onSubmit = false;
    this.Task = item;
    this.modelService.open(this.baseModal);
  }

  taskSubmit(item) {
    this.Task = item;
    this.onSubmit = true;
    this.modelService.open(this.baseModal);
  }

  submitTask(id) {
    console.log(id, this.comments);
  }
  onClosePoup() {
    this.comments = ''
    this.fileData = null
    this.fileName = []
    this.modelService.dismissAll()
  }

  onUpdate() {
    this.editMode = true;
  }
  fileUpload(fileInput) {
    if (fileInput.target.files.length === 0) {
      return;
    }
    for (var i = 0; i < fileInput.target.files.length; i++) {
      this.files.push(fileInput.target.files[i]);
      this.fileName.push(fileInput.target.files[i].name);
    }

    const formData = new FormData();
    formData.append("comments", this.comments);
    formData.append("taskId", this.Task._id);
    for (var i = 0; i < this.files.length; i++) {
      formData.append('filename', this.files[i]);
    }
    this.fileData = formData;
  }

  OnSubmit() {
    if (this.files) {
      this.userService.submitTask(this.fileData).subscribe((res) => {
        if (res.status === 200) {
          this.onChange(this.value);
          successAlert(res.message);
          this.modelService.dismissAll();
        }
      });
    }
  }


  accepetTask(id: string) {

    infoAlert().then((result) => {
      if (result.value) {
        const Data = {
          taskId: id,
        };
        this.userService.acceptTask(Data).subscribe((res) => {
          if (res.status === 200) {
            this.onChange(this.value);
          }
        },
          (error: HttpErrorResponse) => {
            errorAlert(error.error.message, error.statusText);
          }
        );
      }
    });
  }

  onChange(event) {
    switch (event) {
      case "Completed": {
        this.userService.getCompletedList().subscribe((res) => {
          this.list = res.data;
          console.log(res);
          this.value = "Completed";
        });
        break;
      }
      case "Pending": {
        this.userService.getPendingList().subscribe((res) => {
          this.list = res.data;
          this.value = "Pending";
        });
        break;
      }
      case "Approved": {
        this.userService.getApprovedList().subscribe((res) => {
          this.list = res.data;
          this.value = "Approved";
        });
        break;
      }

      default: {
        this.userService.getCompletedList().subscribe((res) => {
          this.list = res.data;
        });
      }
    }
  }
}
