import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { ProfileDetailsApi_Response } from 'src/app/models/models';
import { ManagerService } from 'src/app/Services/manager/manager.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  p = 1;
  public params: any;
  dateTimeFormat: string = 'YYYY-MM-DD HH:mm';
  effectiveTill: string;
  list = []
  dropDown = []
  public userprofileDetails: ProfileDetailsApi_Response;
  @ViewChild('model') public Model: ModalDirective;
  @ViewChild('profile') public Profile: ModalDirective;
  constructor(public _auth: AuthServiceService,
    private managerService: ManagerService) { }

  ngOnInit(): void {
    let effectiveDate = moment().utcOffset(environment.UTC).format('DD:MM:YYYY');
    this.params = {
      'effective_till': effectiveDate
    }
    if (this._auth.getToken) {
      this._auth.getProfileDetails().subscribe((res) => {
        this.userprofileDetails = res;
      });
    }
    this.managerService.getWorkersDropDownList().subscribe((res) => {
      this.dropDown = res.data
    })
  }

  addContact() {

  }

  onChange(event) {
    switch (event) {
      case "Completed": {
        this.managerService.getCompletedList().subscribe((res) => {
          this.list = res.data
          console.log(res)
        })
        break;
      }
      case "Accepted": {
        this.managerService.getAcceptedList().subscribe((res) => {
          this.list = res.data
        })
        break;
      }
      case "Approved": {
        this.managerService.getApprovedList().subscribe((res) => {
          this.list = res.data
        })
        break;
      }
      case "Rejected": {
        this.managerService.getRejectedList().subscribe((res) => {
          this.list = res.data
        })
        break;
      }
      case "Assigned": {
        this.managerService.getAssignedList().subscribe((res) => {
          this.list = res.data
        })
        break;
      }

      default: {
        this.managerService.getCompletedList().subscribe((res) => {
          this.list = res.data
        })
      }
    }
  }
  getDateSelection(e) {
    // converting datetime to 24 hrs format
    let selectedDateTime = moment(e.value).utcOffset(environment.UTC).format(this.dateTimeFormat);
    this.effectiveTill = selectedDateTime;
    console.log(this.effectiveTill, e);
  };

}
