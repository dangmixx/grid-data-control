import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataTableConfigModel } from 'src/app/core/models/config-table.models';
import { GridData } from 'src/app/core/models/grid-data.models';
import { PagingModel } from 'src/app/core/models/paging.models';

@Component({
  selector: 'app-base-table',
  template: '',
})
export class BaseTableComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe: Subject<any> = new Subject();
  public isLoading: boolean;
  public dataSource: GridData<any> = { items: [], totalCount: 0 };
  public tableConfig: DataTableConfigModel;
  public paging: PagingModel = new PagingModel();
  public displayedColumns: string[] = [];
  public listItemSelected: any[] = [];
  public listKeySelected: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.refreshTable();
    this.generateDisplayColumnTable();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  handelSort() {}

  generateDisplayColumnTable() {
    this.displayedColumns = [];
    if (this.tableConfig.selectTable) {
      this.displayedColumns.push('selectTable');
    }
    this.tableConfig.columnTable.forEach((col) => {
      this.displayedColumns.push(col.columnDefine);
    });
    if (this.tableConfig.action) {
      this.displayedColumns.push('action');
    }
  }

  protected getServiceApi(): Observable<GridData<any>> {
    throw of(
      'Not implemented. Ensure getServiceApi has been implemented for fetching data from server.'
    );
  }

  protected bindData<T>(gridData: GridData<T>) {
    if (!gridData) {
      gridData = Object.assign({}, GridData.empty);
    }
    this.dataSource = { ...gridData };
  }

  protected refreshTable() {
    this.isLoading = true;
    this.getServiceApi()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.bindData(res);
        },
        (err) => {
          this.isLoading = false;
        }
      );
  }

  // Handle Output Change
  handlePaging(paging: PagingModel) {
    this.ngUnsubscribe.next();
    this.paging = paging;
    this.refreshTable();
  }

  handelAction(event: { action: string; elementId: string }) {
    switch (event.action) {
      case 'edit':
        this.handelEdit(event.elementId);
        break;
      case 'delete':
        this.handelDelete(event.elementId);
        break;
      case 'input':
        this.handelInput(event.elementId);
        break;
      default:
        throw console.error('Action is not yet implemented');
        break;
    }
  }

  handelEdit(id) {
    throw console.error('Edit Action is not yet implemented');
  }

  handelDelete(id) {
    throw console.error('Delete Action is not yet implemented');
  }

  handelInput(id) {
    throw console.error('Delete Action is not yet implemented');
  }

  public handelItemSelected(listItemSelected) {
    this.listItemSelected = [...listItemSelected];
  }

  handelInputColumnChange(item: any) {
    throw console.error('Input column change is not yet implemented');
  }
}
