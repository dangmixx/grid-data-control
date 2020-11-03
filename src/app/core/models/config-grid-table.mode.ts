import { ColumnType } from './config-table.models';

export interface ConfigurationGridTableModel {
  columnGrid: ColumnGridModel[];
}

export interface ColumnGridModel {
  columnDefine: string;
  columnName: string;
  columnType?: ColumnType;
  format?: string;
  maxWidth?: number;
  textAlign?: string;
  columnTypeFormat?: string;
  inputFormat?: string;
}
