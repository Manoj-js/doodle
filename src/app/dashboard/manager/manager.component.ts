import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
 p = 1;
 public params: any;
 dateTimeFormat: string = 'YYYY-MM-DD HH:mm';
 effectiveTill: string;
 @ViewChild('model') public Model: ModalDirective;
  constructor() { }

  ngOnInit(): void {
  }

  addContact(){

  }

  getDateSelection(e) {
    // converting datetime to 24 hrs format
    let selectedDateTime = moment(e.value).utcOffset(environment.UTC).format(this.dateTimeFormat);
    this.effectiveTill = selectedDateTime;
  };

}
