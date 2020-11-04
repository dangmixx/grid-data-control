import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModuleRouting } from './module-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { TableDashboardComponent } from './dashboard/table-dashboard/table-dashboard.component';
import { MaterialModule } from '../material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlNameOnchangeDirective } from '../core/directives/form-control-name-onchange.directive';

@NgModule({
  declarations: [
    DashboardComponent,
    TableDashboardComponent,
    FormControlNameOnchangeDirective,
  ],
  imports: [
    CommonModule,
    ModuleRouting,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ],
})
export class ModuleModule {}
