import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ModalDirective, BsModalService } from "ngx-bootstrap/modal";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { AuthServiceService } from "src/app/Services/auth-service.service";
import { ProfileDetailsApi_Response } from "src/app/models/models";
import { ManagerService } from "src/app/Services/manager/manager.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ThrowStmt } from "@angular/compiler";
import {
  successAlert,
  deleteAlert,
  errorAlert,
} from "src/app/shared/sweetalert/sweetalert";
import { HttpErrorResponse } from "@angular/common/http";
import { saveAs } from 'file-saver';
@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  Task: any;
  p = 1;
  public params: any;
  dateTimeFormat: string = "YYYY-MM-DD HH:mm";
  effectiveTill: string;
  list = [];
  dropDown = [];
  documents: number
  searchvalue: any = { taskTitle: '' };
  comments: string;
  value: string;
  editMode: boolean = false;
  taskFormGroup: FormGroup;
  addMode: boolean = false;
  taskReview: boolean = false;
  taskReviewValue: string;
  downloadUri = []
  public userprofileDetails: ProfileDetailsApi_Response;
  @ViewChild("model") public Model: ModalDirective;
  @ViewChild("profile") public Profile: ModalDirective;
  @ViewChild("gtModal", { static: true })
  gtModal: TemplateRef<any>;
  @ViewChild("baseModal", { static: true })
  baseModal: TemplateRef<any>;
  @ViewChild("addModel", { static: true })
  addModel: TemplateRef<any>;
  effectiveDate;
  isShown: boolean = false;
  workerAttachments = []
  fileUrl = environment.fileUrl;
  constructor(
    public _auth: AuthServiceService,
    private managerService: ManagerService,
    private modelService: NgbModal,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    let effectiveDate = moment()
      .utcOffset(environment.UTC)
      .format("YYYY:MM:DD");
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
    this.managerService.getWorkersDropDownList().subscribe(
      (res) => {
        this.dropDown = res.data;
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.error.message, error.statusText);
      }
    );
    this.defaultList();
  }

  defaultList() {
    this.managerService.getAcceptedList().subscribe(
      (res) => {
        this.list = res.data;
        this.value = "Accepted";
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.error.message, error.statusText);
      }
    );
  }

  private initForm() {
    this.taskFormGroup = this.formBuilder.group({
      taskTitle: ["", [Validators.required]],
      taskDescription: ["", [Validators.required]],
      taskPoints: [100, [Validators.required]],
      userId: [null, [Validators.required]],
    });
  }
  onUpdate() {
    this.editMode = true;
  }
  onAddTask() {
    this.addMode = true;
    this.modelService.open(this.addModel);
  }
  onReview(item) {
    console.log(item);
    this.Task = item;
    this.documents = item.workerAttachments.length
    this.workerAttachments = item.workerAttachments
    this.modelService.open(this.baseModal);
  }
  downloadFiles(urls) {
    const interval = setInterval(download, 300, urls);
    function download() {
      console.log(urls);
      const url = urls.pop();
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', '');
      a.setAttribute('target', '_blank');
      a.click();
      console.log(url);
      if (urls.length === 0) {
        clearInterval(interval);
      }
    }
    // console.log(urls)

    // const link = document.createElement('a');
    // link.setAttribute('download', null);
    // link.style.display = 'none';


    // document.body.appendChild(link);
    // // urls.forEach((element) => {
    //   console.log(element.index);
    //   link.setAttribute('href', `${this.fileUrl}/${element.index}`);
    //   link.click();
    // });
    // urls.forEach(element => {
    //   link.setAttribute('href', `${this.fileUrl}/${element}`);
    //   link.click();
    // });

    // for (var i = 0; i < urls.length; i++) {
    //   link.setAttribute('href', `${this.fileUrl}/${urls[i]}`);
    //   link.setAttribute('target', '_blank');
    //   link.click();
    // }

    // document.body.removeChild(link);

    // let data = ''
    // let index: number = 0
    // data = this.workerAttachments[index]


    // var links = [ 'https://s3.amazonaws.com/Minecraft.Download/launcher/Minecraft.exe',
    //  'https://s3.amazonaws.com/Minecraft.Download/launcher/Minecraft.dmg',
    //   'https://s3.amazonaws.com/Minecraft.Download/launcher/Minecraft.jar' ];
    //    function downloadAll(urls) 

    //     if(this.documents !=0){
    //       for (var i = 0; i < this.workerAttachments.length; i++) {
    //         this.downloadUri.push ( `${this.fileUrl}/${this.workerAttachments[i]}`)
    //       }
    //     //  this.documents = this.documents -1
    //  index = index +1
    // this.managerService.fileDownload(data).subscribe((res: any) => {

    //   this.documents = this.documents -1
    //   index = index +1
    // },
    // (error: HttpErrorResponse) => {
    //   console.log(error)
    //   errorAlert(error.message, error.statusText)
    // })

  }

  onDelete(id: string) {
    console.log(id);
    deleteAlert().then((result) => {
      if (result.value) {
        const Data = {
          taskId: id,
        };
        this.managerService.deleteTask(Data).subscribe(
          (res) => {
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
  onAddSubmit() {
    const data = {
      ...this.taskFormGroup.value,
      taskExpiryAt: this.effectiveTill,
    };
    this.managerService.addTask(data).subscribe(
      (res) => {
        if (res.status === 200) {
          this.onChange(this.value);
          this.modelService.dismissAll();
        }
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.error.message, error.statusText);
      }
    );
  }
  onUpdateSubmit() {
    const data = {
      ...this.taskFormGroup.value,
      taskExpiryAt: this.effectiveTill,
      taskId: this.Task._id,
    };
    this.managerService.UpdateTask(data).subscribe(
      (res) => {
        if (res.status === 200) {
          this.onChange(this.value);
          this.taskFormGroup.reset();
          this.modelService.dismissAll();
        }
      },
      (error: HttpErrorResponse) => {
        errorAlert(error.error.message, error.statusText);
      }
    );
  }

  onClosePopup() {
    if (this.addMode) {
      this.modelService.dismissAll();
      this.addMode = false;
      this.taskFormGroup.reset();
      return;
    }
    this.modelService.dismissAll();
    this.editMode = false;
    this.taskFormGroup.reset();
  }
  ModelPopup(item) {
    this.Task = item;
    this.params = {
      effective_till: item.taskExpiryAt,
    };

    this.taskFormGroup.patchValue({
      taskTitle: item.taskTitle,
      taskDescription: item.taskDescription,
      taskPoints: item.taskPoints,
      userId: item.userId._id,
    });

    this.modelService.open(this.gtModal);
  }
  onChange(event) {
    switch (event) {
      case "Completed": {
        this.managerService.getCompletedList().subscribe(
          (res) => {
            this.list = res.data;
            this.value = "Completed";
          },
          (error: HttpErrorResponse) => {
            errorAlert(error.error.message, error.statusText);
          }
        );
        break;
      }
      case "Accepted": {
        this.managerService.getAcceptedList().subscribe(
          (res) => {
            this.list = res.data;
            this.value = "Accepted";
          },
          (error: HttpErrorResponse) => {
            errorAlert(error.error.message, error.statusText);
          }
        );
        break;
      }
      case "Approved": {
        this.managerService.getApprovedList().subscribe(
          (res) => {
            this.list = res.data;
            this.value = "Approved";
          },
          (error: HttpErrorResponse) => {
            errorAlert(error.error.message, error.statusText);
          }
        );
        break;
      }
      case "Rejected": {
        this.managerService.getRejectedList().subscribe(
          (res) => {
            this.list = res.data;
            this.value = "Rejected";
          },
          (error: HttpErrorResponse) => {
            errorAlert(error.error.message, error.statusText);
          }
        );
        break;
      }
      case "Assigned": {
        this.managerService.getAssignedList().subscribe(
          (res) => {
            this.list = res.data;
            this.value = "Assigned";
          },
          (error: HttpErrorResponse) => {
            errorAlert(error.error.message, error.statusText);
          }
        );
        break;
      }

      default: {
        this.defaultList();
      }
    }
  }
  getDateSelection(e) {
    // converting datetime to 24 hrs format
    let selectedDateTime = moment(e.value)
      .utcOffset(environment.UTC)
      .format(this.dateTimeFormat);
    this.effectiveTill = selectedDateTime;
    console.log(this.effectiveTill);
  }

  logout() {
    this._auth.onLogout();
  }
  approveReview() {
    this.taskReview = true;
    this.taskReviewValue = "approve";
  }

  rejectReview() {
    this.taskReview = true;
    this.taskReviewValue = "reject";
  }
  taskReviews(id) {
    console.log(id, this.comments);
    const data = {
      taskId: id,
      comments: this.comments,
    };
    if (this.taskReviewValue === "approve") {
      this.managerService.acceptTask(data).subscribe(
        (res) => {
          if (res.status === 200) {
            successAlert(res.message);
            this.onChange(this.value);
            this.modelService.dismissAll();
          }
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.error.message, error.statusText);
        }
      );
    } else {
      this.managerService.rejectTask(data).subscribe(
        (res) => {
          if (res.status === 200) {
            successAlert(res.message);
            this.onChange(this.value);
            this.modelService.dismissAll();
          }
        },
        (error: HttpErrorResponse) => {
          errorAlert(error.error.message, error.statusText);
        }
      );
    }
  }
}
