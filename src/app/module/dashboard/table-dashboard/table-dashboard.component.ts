import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SuggestionItemsModel } from 'src/app/core/models/suggestion-items.model';

export interface DashboardModel {
  id: string;
  name: string;
  address: string;
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
  displayedColumns = ['id', 'name', 'address'];

  rows: FormArray = this.fb.array([]);
  formGroup: FormGroup = this.fb.group({ formArrayName: this.rows });
  constructor(private fb: FormBuilder) {
    this.addRow(null, true);
  }

  filterSuggestion = [];

  suggestionItems = [
    {
      text: 'So 1',
      value: '1',
    },
    {
      text: 'So 2',
      value: '2',
    },
    {
      text: 'So 3',
      value: '3',
    },
  ];

  ngOnInit() {
    this.filterSuggestion = this.suggestionItems;
  }

  displayFn(item: SuggestionItemsModel): string {
    return item && item.text ? item.text : '';
  }

  addRow(d?: DashboardModel, updateView?: boolean) {
    const row = this.fb.group({
      id: new FormControl({ value: d && d.id ? d.id : null, disabled: false }, [
        Validators.required,
      ]),
      name: new FormControl(
        {
          value: d && d.name ? d.name : null,
          disabled: false,
        },
        [Validators.required]
      ),
      address: new FormControl(
        { value: d && d.address ? d.address : null, disabled: false },
        []
      ),
    });

    // listen form control name change data to getlist
    row.controls.name.valueChanges.pipe(debounceTime(300)).subscribe((data) => {
      this.filterListData(data);
    });
    this.rows.push(row);

    if (updateView) {
      this.updateView();
    }
  }

  filterListData(data) {
    if (typeof data === 'string') {
      this.filterSuggestion = this.suggestionItems.filter(
        (option) => option.text.toLowerCase().indexOf(data.toLowerCase()) !== -1
      );
    } else {
      this.filterSuggestion = [...this.suggestionItems];
    }
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
    console.log(this.formGroup);
    console.log(this.rows);
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

  onTextChange(textChange: string): void {
    console.log(textChange);
    this.filterSuggestion = this.suggestionItems.filter(
      (option) =>
        option.text.toLowerCase().indexOf(textChange.toLowerCase()) !== -1
    );
  }

  getFormControl(index, nameControl) {
    return this.rows.controls[index].get(nameControl);
  }
}
