import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ColumnGridTypeEnum } from 'src/app/core/models/config-grid-table.mode';
import { SuggestionItemsModel } from 'src/app/core/models/suggestion-items.model';
import { BaseGridDataComponent } from 'src/app/shared/components/grid-data-table/base-grid-data-table.componet';

export interface DashboardModel {
  productId: string;
  productName: string;
  category: string;
  price: number;
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
      productId: 'GAS-001',
      productName: 'Bình gas 001',
      category: null,
      price: 10000,
      note: '',
    },
    {
      productId: 'GAS-002',
      productName: null,
      category: null,
      price: 10000,
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

  initGridConfig() {
    this.gridConfig = {
      columnGrid: [
        {
          columnDefine: 'productId',
          columnName: 'Mã sản phẩm',
          columnType: ColumnGridTypeEnum.SUGGESTION,
          callback: (row: FormGroup) => {
            return;
          },
          options: (): SuggestionItemsModel[] => {
            return [
              {
                text: 'GAS-001',
                value: 'GAS-001',
              },
              {
                text: 'GAS-002',
                value: 'GAS-002',
              },
              {
                text: 'GAS-003',
                value: 'GAS-003',
              },
            ];
          },
        },
        {
          columnDefine: 'productName',
          columnName: 'Tên sản phẩm',
        },
        {
          columnDefine: 'category',
          columnName: 'Loại',
        },
        {
          columnDefine: 'price',
          columnName: 'Giá bán',
        },
        {
          columnDefine: 'note',
          columnName: 'Ghi chú',
        },
      ],
    };
  }

  addRow(d?: DashboardModel, updateView?: boolean) {
    const row = this.fb.group({
      productId: new FormControl(
        { value: d && d.productId ? d.productId : null, disabled: false },
        [Validators.required]
      ),
      productName: new FormControl(
        {
          value: d && d.productName ? d.productName : null,
          disabled: false,
        },
        [Validators.required]
      ),
      category: new FormControl(
        { value: d && d.category ? d.category : null, disabled: false },
        [Validators.required]
      ),

      price: new FormControl(
        { value: d && d.price ? d.price : null, disabled: false },
        [Validators.required]
      ),

      note: new FormControl(
        { value: d && d.note ? d.note : null, disabled: true },
        [Validators.required]
      ),
    });
    this.rows.push(row);
    console.log(row);

    if (updateView) {
      this.updateView();
    }
  }

  button() {
    this.addRow(null, true);
  }

  fromdata() {
    console.log(this.formGroup.getRawValue());
  }
}
