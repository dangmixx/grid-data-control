import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseGridDataComponent } from 'src/app/shared/components/grid-data-table/base-grid-data-table.componet';

export interface DashboardModel {
  name: string;
  address: string;
  note: string;
}
@Component({
  selector: 'app-table-dashboard',
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.scss'],
})
export class TableDashboardComponent
  extends BaseGridDataComponent
  implements OnInit {
  data: DashboardModel[] = [
    {
      name: 'Name 1',
      address: 'Address 1',
      note: 'Note 1',
    },
    {
      name: 'Name 2',
      address: 'Address 2',
      note: 'Note 2',
    },
  ];
  constructor(public fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.data.forEach((data) => {
      this.addRow(data, true);
    });
    this.addRow(null, true);
  }

  addRow(d?: DashboardModel, updateView?: boolean) {
    console.log('Add new row');

    console.log(d);

    const row = this.fb.group({
      name: [d && d.name ? d.name : null, [Validators.required]],
      address: [d && d.address ? d.address : null, [Validators.required]],
      note: [d && d.note ? d.note : null, []],
    });
    this.rows.push(row);
    console.log(row);

    if (updateView) {
      this.updateView();
    }
  }

  initGridConfig() {
    this.gridConfig = {
      columnGrid: [
        {
          columnDefine: 'name',
          columnName: 'Name',
        },
        {
          columnDefine: 'address',
          columnName: 'Address',
        },
        {
          columnDefine: 'note',
          columnName: 'Note',
        },
      ],
    };
  }

  button() {
    this.addRow(null, true);
  }

  fromdata() {
    console.log(this.formGroup);
  }
}
