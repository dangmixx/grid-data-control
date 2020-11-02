import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { BaseTableComponent } from './components/data-table/base-table.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { InputSuggestionComponent } from './components/input-suggestion/input-suggestion.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DataTableComponent,
    BaseTableComponent,
    InputSuggestionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ],
  exports: [DataTableComponent, BaseTableComponent, InputSuggestionComponent],
})
export class SharedModule {}
