import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SuggestionItemsModel } from 'src/app/core/models/suggestion-items.model';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-input-suggestion',
  templateUrl: './input-suggestion.component.html',
  styleUrls: ['./input-suggestion.component.scss'],
})
export class InputSuggestionComponent implements OnInit {
  @Input() placeholder = '';
  @Input() label = '';
  @Input() listItem: SuggestionItemsModel[] = [];
  @Input() myControl = new FormControl();
  @Output()
  textInputChange = new EventEmitter<string>();

  @Input() optionSelected: SuggestionItemsModel;
  @Output() optionSelectedChange = new EventEmitter<SuggestionItemsModel>();

  constructor() {}

  ngOnInit(): void {
    this.myControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((textChange: any) => {
        if (typeof textChange === 'string') {
          this.textInputChange.emit(textChange);
        }
      });
  }

  displayFn(item: SuggestionItemsModel): string {
    return item && item.text ? item.text : '';
  }
}
