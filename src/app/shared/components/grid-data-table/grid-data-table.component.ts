import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ColumnGridModel,
  ConfigurationGridTableModel,
} from 'src/app/core/models/config-grid-table.mode';
import { SuggestionItemsModel } from 'src/app/core/models/suggestion-items.model';

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
  }

  ngOnInit(): void {}

  setDisplayColumn() {
    this.displayedColumns = [];
    this.configGrid.columnGrid.forEach((colum) => {
      this.displayedColumns.push(colum.columnDefine);
    });
  }

  goNextRow() {
    // tslint:disable-next-line:semicolon
    this.dataSource.subscribe((list) => {
      const validList = list.every((item: FormGroup) => {
        return item.valid;
      });
      if (validList) {
        this.addNewRow.emit(true);
      }
    });
  }

  displayFn(item: SuggestionItemsModel): string {
    return item && item.text ? item.text : '';
  }

  callBackRow(item: ColumnGridModel, row: any) {
    console.log(row, item);

    if (item.callback) {
      item.callback(row);
    }
  }

  getListForMatOptionAsync(options: Observable<any>) {
    console.log(options);

    return options.subscribe();
  }
}
