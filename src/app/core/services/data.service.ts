import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SuggestionItemsModel } from '../models/suggestion-items.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  listCH = [
    {
      text: 'Cửa hàng 1',
      value: 'STORE11',
    },
    {
      text: 'Cửa hàng 2',
      value: 'STORE12',
    },
    {
      text: 'Cửa hàng 3',
      value: 'STORE13',
    },
    {
      text: 'Cửa hàng 4',
      value: 'STORE14',
    },
    {
      text: 'Cửa hàng 5',
      value: 'STORE15',
    },
  ];

  constructor() {}

  getListDropDownId(textSearch: string): Observable<SuggestionItemsModel[]> {
    const filterSuggestion = this.listCH.filter(
      (option) =>
        option.text.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
        option.value.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1
    );
    return of(filterSuggestion);
  }
}
