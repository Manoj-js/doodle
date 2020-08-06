import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ManagerService } from 'src/app/Services/manager/manager.service';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { ProfileDetailsApi_Response } from 'src/app/models/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  p = 1;
 public params: any;
 dateTimeFormat: string = 'YYYY-MM-DD HH:mm';
 effectiveTill: string;
 workersList =  []
 public userprofileDetails:ProfileDetailsApi_Response;
 @ViewChild('model') public Model: ModalDirective;
  constructor(private managerService: ManagerService,
    private _auth: AuthServiceService) { }

  ngOnInit(): void {
    if(this._auth.getToken){
      this._auth.getProfileDetails().subscribe((res) => {
       this.userprofileDetails = res
      })
    }
    this.managerService.getWorkersList().subscribe((res) => {
      this.workersList = res.data
    })
  }

  addContact(){

  }

  getDateSelection(e) {
    // converting datetime to 24 hrs format
    let selectedDateTime = moment(e.value).utcOffset(environment.UTC).format(this.dateTimeFormat);
    this.effectiveTill = selectedDateTime;
  };

}