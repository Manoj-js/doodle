import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.html',
  styleUrls: ['./date-time.css']
})
export class DateTimePickerComponent implements OnInit {
  @Input() params: any;
  @Output() selectDate = new EventEmitter();

  selected: any;
  selectedDate: string;
  selectedTime: string;
  interval: number;

  dateFormat: string = 'DD/MM/YYYY';
  timeFormat: string = 'hh:mm A';
  dateTimeFormat: string = 'DD/MM/YYYY | hh:mm A';
  calendarFormat: string = 'dd/MM/yyyy | hh:mm a';
  isValidDateTime: boolean = true;
  constructor() { }

  ngOnInit() {
    let effectiveDate = moment().utcOffset(environment.UTC).format(this.dateFormat);
    let effectiveTime = moment().utcOffset(environment.UTC).format(this.timeFormat);

    if (!_.isUndefined(this.params.effective_till)
      && !_.isNull(_.isUndefined(this.params.effective_till))
      && !_.isEmpty(_.trim(this.params.effective_till))) {
      let effective_till = moment(this.params.effective_till, 'DD-MM-YYYY HH:mm:ss').isValid();
      if (!effective_till) {
        this.selected = `${effectiveDate} | ${effectiveTime}`;
      } else {
        effectiveDate = moment(this.params.effective_till, 'DD-MM-YYYY HH:mm:ss').format(this.dateFormat);
        effectiveTime = moment(this.params.effective_till, 'DD-MM-YYYY HH:mm:ss').format(this.timeFormat);
        this.selected = `${effectiveDate} | ${effectiveTime}`;
      }
    } else {
      this.selected = `${effectiveDate} | ${effectiveTime}`;
    }
    this.interval = environment.dateTimePickerTimeDifference;
  };

  change(e): void {
    let selectedDate = moment(e.value).utcOffset(environment.UTC).format(this.dateFormat);
    let selectedTime = moment(e.value).utcOffset(environment.UTC).format(this.timeFormat);
    this.selected = `${selectedDate} | ${selectedTime}`;
    this.selectDate.emit(e);
  };

  onFocusOut(e: any): void {
    this.isValidDateTime = moment(e.model.previousElementValue, this.dateTimeFormat, true).utcOffset(environment.UTC).isValid();
  }


}
