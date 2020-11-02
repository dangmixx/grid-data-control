import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SuggestionItemsModel } from 'src/app/core/models/suggestion-items.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  suggestionItems: SuggestionItemsModel[] = [
    {
      text: 'Item 1',
      value: 'item1',
    },
    {
      text: 'Item 2',
      value: 'item2',
    },
    {
      text: 'Item 3',
      value: 'item3',
    },
  ];

  control = new FormControl(
    {
      text: 'Item 1',
      value: 'item1',
    },
    [Validators.required]
  );

  filterSuggestion: SuggestionItemsModel[] = [];
  constructor() {}

  ngOnInit(): void {
    this.filterSuggestion = [...this.suggestionItems];
  }

  onTextChange(textChange: string): void {
    console.log(textChange);
    this.filterSuggestion = this.suggestionItems.filter(
      (option) =>
        option.text.toLowerCase().indexOf(textChange.toLowerCase()) !== -1
    );
  }
}
