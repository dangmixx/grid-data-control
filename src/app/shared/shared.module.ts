import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { BaseTableComponent } from './components/data-table/base-table.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { InputSuggestionComponent } from './components/input-suggestion/input-suggestion.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormatPipe } from '../core/pipe/custom-format.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import { GridDataTableComponent } from './components/grid-data-table/grid-data-table.component';
import { BaseGridDataComponent } from './components/grid-data-table/base-grid-data-table.componet';

@NgModule({
  declarations: [
    DataTableComponent,
    BaseTableComponent,
    InputSuggestionComponent,
    CustomFormatPipe,
    GridDataTableComponent,
    BaseGridDataComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ],
  exports: [
    DataTableComponent,
    BaseTableComponent,
    InputSuggestionComponent,
    CustomFormatPipe,
    GridDataTableComponent,
    BaseGridDataComponent
  ],
})
export class SharedModule {}
