import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ConfigurationGridTableModel } from 'src/app/core/models/config-grid-table.mode';

@Component({
  selector: 'app-base-grid-table',
  template: '',
})
export class BaseGridDataComponent implements OnInit {
  data = [];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);

  rows: FormArray = this.fb.array([]);
  formGroup: FormGroup = this.fb.group({ formArrayName: this.rows });
  gridConfig: ConfigurationGridTableModel;

  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.initGridConfig();
  }

  initGridConfig() {
    console.error('Are u sure method initGridConfig() was implemented');
  }

  addRow(d?: any, updateView?: boolean) {
    if (updateView) {
      this.updateView();
    }
    console.error('Are u sure method addRow() was implemented');
  }

  removeRowAtIndex(index: number) {
    this.rows.removeAt(index);
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }
}
