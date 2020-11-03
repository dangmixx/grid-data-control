export interface DataTableConfigModel {
  columnTable: ColumnTableConfigModel[];
  action?: ActionTableConfigModel[];
  paging?: boolean;
  selectTable?: boolean;
  primaryColumns?: string;
}

export interface ColumnTableConfigModel {
  columnDefine: string;
  columnName: string;
  columnType?: ColumnType;
  image?: string;
  format?: string;
  matSort?: boolean;
  maxWidth?: number;
  textAlign?: string;
  columnTypeFormat?: string;
  inputFormat?: string;
}

export interface ActionTableConfigModel {
  tooltip: string;
  materialIcon: string;
  action: string;
  elementId: string;
}

export enum ColumnType {
  DEFAULT = '',
  IMAGE = 1,
  INPUT = 2,
  LINK = 3,
}
