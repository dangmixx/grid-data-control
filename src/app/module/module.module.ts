import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModuleRouting } from './module-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { TableDashboardComponent } from './dashboard/table-dashboard/table-dashboard.component';

@NgModule({
  declarations: [DashboardComponent, TableDashboardComponent],
  imports: [
    CommonModule,
    ModuleRouting,
    SharedModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ],
})
export class ModuleModule {}
