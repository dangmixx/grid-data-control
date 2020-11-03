import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  ColumnType,
  DataTableConfigModel,
} from 'src/app/core/models/config-table.models';
import { GridData } from 'src/app/core/models/grid-data.models';
import { PagingModel, SortTypeEnum } from 'src/app/core/models/paging.models';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('matSort') matSort: MatSort;
  columnType = ColumnType;
  @Input() configDataTable: DataTableConfigModel;
  @Input() dataSource: GridData<any>;
  @Input() displayedColumns: string[] = [];
  @Input() pageSizeOptions = [10, 20, 50, 100, 200];
  @Input() paging = new PagingModel({
    sortType: SortTypeEnum.ASC,
    sortBy: '',
    search: '',
  });

  @Input() listKeySelected: any[] = [];
  @Input() isLoading: boolean;

  public primaryKeySelect = 'serialNumber';

  @Output() actionColumnChange = new EventEmitter<{
    action: string;
    elementId: string;
  }>();
  @Output() pagingTableChange = new EventEmitter<PagingModel>();
  @Output() listItemSelectedChange = new EventEmitter<any[]>();
  @Output() inputColumnChange = new EventEmitter<any>();

  public modelColumnChangeSub: Subject<any> = new Subject<any>();

  listItemSelected = [];

  constructor() {}

  ngOnChanges(simps: SimpleChanges): void {
    if (simps.dataSource && this.configDataTable.selectTable) {
      this.mapDataSourceWithListKeySelected();
      this.mapGridDataSourceWithListItemSelected();
    }
  }

  ngOnInit(): void {
    this.primaryKeySelect = this.configDataTable.primaryColumns;
    this.modelColumnChangeSub.pipe(debounceTime(300)).subscribe((item) => {
      this.inputColumnChange.emit(item);
    });
  }

  ngOnDestroy(): void {
    this.modelColumnChangeSub.next();
    this.modelColumnChangeSub.complete();
  }

  onPaging(pageEvent: PageEvent): void {
    this.paging.pageIndex = pageEvent.pageIndex + 1;
    this.paging.pageSize = pageEvent.pageSize;
    this.pagingTableChange.emit(this.paging);
  }

  onAction(action: string, elementId: string): void {
    this.actionColumnChange.emit({ action, elementId });
  }

  handelSortChange(eventSort): void {
    this.paging.sortBy = eventSort.active;
    this.paging.sortType = eventSort.direction;
    this.pagingTableChange.emit(this.paging);
  }

  get indeterminateCheckHeader(): boolean {
    const isSomeChecked = (currentValue) => {
      return currentValue.checked === true;
    };
    const result =
      this.dataSource.items.some(isSomeChecked) &&
      !this.dataSource.items.every(isSomeChecked);
    return result;
  }

  get isCheckAllAtHeader(): boolean {
    const isSomeChecked = (currentValue) => {
      return currentValue.checked === true;
    };
    return this.dataSource.items.every(isSomeChecked);
  }

  checkAllAtHeader(event: MatCheckboxChange): void {
    if (event.checked) {
      this.dataSource.items.map((item) => {
        item.checked = true;
        return item;
      });
      this.pushItemWhenCheckAllAtHeader();
    } else {
      this.dataSource.items.map((item) => {
        item.checked = false;
        return item;
      });
      this.removeItemWhenCheckAllAtHeader();
    }

    this.listItemSelectedChange.emit(this.listItemSelected);
  }

  pushItemWhenCheckAllAtHeader(): any {
    if (this.listItemSelected.length === 0) {
      this.listItemSelected = this.dataSource.items;
      return;
    }

    const listConvertByPrimaryKey = this.listItemSelected.map(
      (itemSelected) => {
        return itemSelected[this.primaryKeySelect];
      }
    );

    const listDataIsNotYetOnListItemSelected = this.dataSource.items.filter(
      (itemDataSource) => {
        return (
          listConvertByPrimaryKey.indexOf(
            itemDataSource[this.primaryKeySelect]
          ) === -1
        );
      }
    );

    this.listItemSelected = [
      ...this.listItemSelected,
      ...listDataIsNotYetOnListItemSelected,
    ];
  }

  removeItemWhenCheckAllAtHeader() {
    if (
      this.listItemSelected.length === 0 ||
      this.dataSource.items.length === 0
    ) {
      return;
    }

    const listConvertByPrimaryKey = this.dataSource.items.map((dataSource) => {
      return dataSource[this.primaryKeySelect];
    });

    this.listItemSelected = this.listItemSelected.filter((itemSelected) => {
      return (
        listConvertByPrimaryKey.indexOf(itemSelected[this.primaryKeySelect]) ===
        -1
      );
    });
  }

  selectedItemOnRow(itemOnEvent) {
    if (itemOnEvent.checked) {
      this.listItemSelected.push(itemOnEvent);
    } else {
      if (this.listItemSelected.length === 0) {
        return;
      }
      const indexItem = this.getIndexOfInListItemChecked(
        itemOnEvent[this.primaryKeySelect]
      );
      if (indexItem === -1) {
        // push item
        this.listItemSelected.push(itemOnEvent);
      } else {
        // remove Item at index
        this.listItemSelected.splice(indexItem, 1);
      }
    }

    this.listItemSelectedChange.emit(this.listItemSelected);
  }

  getIndexOfInListItemChecked(primaryKeySelected): number {
    return this.listItemSelected.findIndex((itemOnList) => {
      return itemOnList[this.primaryKeySelect] === primaryKeySelected;
    });
  }

  mapGridDataSourceWithListItemSelected() {
    if (
      this.listItemSelected.length === 0 ||
      this.dataSource.items.length === 0
    ) {
      return;
    }

    const listConvertByPrimaryKey = this.listItemSelected.map(
      (itemSelected) => {
        return itemSelected[this.primaryKeySelect];
      }
    );

    this.dataSource.items = this.dataSource.items.map((itemDataSource) => {
      if (
        listConvertByPrimaryKey.indexOf(itemDataSource[this.primaryKeySelect]) >
        -1
      ) {
        itemDataSource.checked = true;
      }
      return itemDataSource;
    });
  }

  mapDataSourceWithListKeySelected() {
    if (
      this.listKeySelected.length === 0 ||
      this.dataSource.items.length === 0
    ) {
      return;
    }

    this.dataSource.items.map((itemDataSource, index) => {
      const indexOfListKey = this.listKeySelected.indexOf(
        itemDataSource[this.primaryKeySelect]
      );
      if (indexOfListKey !== -1) {
        itemDataSource.checked = true;
        this.listKeySelected.splice(indexOfListKey, 1);
        this.listItemSelected.push(this.dataSource.items[index]);
      }

      return itemDataSource;
    });
    this.listItemSelectedChange.emit(this.listItemSelected);
  }

  inputChange(item) {
    this.modelColumnChangeSub.next(item);
  }
}
