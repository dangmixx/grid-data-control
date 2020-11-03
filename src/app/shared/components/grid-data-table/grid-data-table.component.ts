import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ConfigurationGridTableModel } from 'src/app/core/models/config-grid-table.mode';
import { DataTableConfigModel } from 'src/app/core/models/config-table.models';
import { GridData } from 'src/app/core/models/grid-data.models';

@Component({
  selector: 'app-grid-data-table',
  templateUrl: './grid-data-table.component.html',
  styleUrls: ['./grid-data-table.component.scss'],
})
export class GridDataTableComponent implements OnInit, OnChanges {
  @Input() configGrid: ConfigurationGridTableModel;
  @Input() dataSource: BehaviorSubject<AbstractControl[]>;
  @Input() formGroup: FormGroup;
  @Output() addNewRow = new EventEmitter<any>();
  displayedColumns = [];
  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    this.setDisplayColumn();
    console.log(this.formGroup);

    console.log(this.dataSource);
  }

  ngOnInit(): void {}

  setDisplayColumn() {
    this.displayedColumns = [];
    this.configGrid.columnGrid.forEach((colum) => {
      this.displayedColumns.push(colum.columnDefine);
    });
  }

  onTabKey(indexColum, indexRow) {
    console.log(indexColum, indexRow);
    this.dataSource.subscribe((list) => {
      const validList = list.every((item: FormGroup) => {
        console.log(item.valid);

        return item.valid;
      });
      if (validList) {
        this.addNewRow.emit(true);
      }
    });
  }
}
