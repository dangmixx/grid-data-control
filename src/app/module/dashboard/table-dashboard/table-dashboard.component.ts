import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DialogConfirmComponent } from 'src/app/core/components/dialog-confirm/dialog-confirm.component';
import { OnEnterNextDirective } from 'src/app/core/directives/on-enter-next.directive';
import { SuggestionItemsModel } from 'src/app/core/models/suggestion-items.model';
import { DataService } from 'src/app/core/services/data.service';

export interface DashboardModel {
  id: string;
  name: string;
  address: string;
  active: boolean;
}
@Component({
  selector: 'app-table-dashboard',
  templateUrl: './table-dashboard.component.html',
  styleUrls: ['./table-dashboard.component.scss'],
})
export class TableDashboardComponent implements OnInit {
  dataSource: BehaviorSubject<AbstractControl[]> = new BehaviorSubject<
    AbstractControl[]
  >([]);
  displayedColumns = ['action', 'index', 'id', 'name', 'address', 'active'];

  rows: FormArray = this.fb.array([]);
  formGroup: FormGroup = this.fb.group({ formArrayName: this.rows });
  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private matDialog: MatDialog
  ) {
    this.addRow(null, true);
  }

  filterSuggestion = [];

  ngOnInit() {
    this.filterListData('');
  }

  displayFn(item: SuggestionItemsModel): string {
    return item && item.value ? item.value : '';
  }

  addRow(d?: DashboardModel, updateView?: boolean) {
    console.log('add');
    const row = this.fb.group({
      id: new FormControl({ value: d && d.id ? d.id : null, disabled: false }, [
        Validators.required,
        this.validationId,
      ]),
      name: new FormControl(
        {
          value: d && d.name ? d.name : null,
          disabled: true,
        },
        [Validators.required]
      ),
      address: new FormControl(
        { value: d && d.address ? d.address : null, disabled: false },
        []
      ),
      active: new FormControl(
        { value: d && d.active ? d.active : true, disabled: false },
        []
      ),
    });

    // listen form control change data
    row.controls.id.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      if (typeof data !== 'string') {
        row.controls.name.setValue(data.text);
        this.dataService.getListDropDownId('').subscribe((item) => {
          this.filterSuggestion = item;
        });
      } else {
        this.filterListData(data);
        row.controls.name.setValue('');
      }
    });

    this.rows.push(row);

    if (updateView) {
      this.updateView();
    }
  }

  filterListData(data) {
    this.dataService.getListDropDownId(data).subscribe((item) => {
      this.filterSuggestion = item;
    });
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  onAddNewRow() {
    this.dataSource.subscribe((list) => {
      const validList = list.every((item: FormGroup) => {
        return item.valid;
      });
      if (validList) {
        this.addRow(null, true);
      }
    });
  }

  getFormControl(index, nameControl) {
    return this.rows.controls[index].get(nameControl);
  }

  validationId(control: AbstractControl): { [key: string]: boolean | null } {
    if (control.value !== undefined && typeof control.value === 'string') {
      return { notChonse: true };
    }
    return null;
  }

  submitForm() {
    console.log(this.formGroup.getRawValue());
    console.log(this.formGroup);
    let dataTable = (this.formGroup.controls
      .formArrayName as FormArray).getRawValue();
    dataTable = this.convertDataTable(dataTable);
    console.log(dataTable);
  }

  convertDataTable(dataTable: any[]) {
    dataTable.splice(dataTable.length - 1, 1);
    return dataTable.map((item) => {
      item.id = item.id.value;
      return item;
    });
  }

  checkValueIdForm(indexRow) {
    setTimeout(() => {
      if (indexRow === 0 && this.rows.controls.length === 1) {
        return;
      }

      if (
        this.rows.controls[indexRow].invalid &&
        indexRow !== this.rows.controls.length - 1
      ) {
        this.openDialogConfirmItem(indexRow);
      }
    }, 200);
  }

  openDialogConfirmItem(indexRow) {
    const dialog = this.matDialog.open(DialogConfirmComponent);
    dialog.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.rows.removeAt(indexRow);
        this.updateView();
      } else {
        const nextInput = document.getElementsByClassName(
          'input-id-' + indexRow
        )[0] as HTMLElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    });
  }

  deleteRow(index) {
    this.rows.removeAt(index);
    this.updateView();
  }

  onRightClick() {
    console.log('right');
  }
}
