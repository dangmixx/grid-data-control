export interface ConfigurationGridTableModel {
  columnGrid: ColumnGridModel[];
}

export interface ColumnGridModel {
  columnDefine: string;
  columnName: string;
  columnType?: ColumnGridTypeEnum;
  format?: string;
  maxWidth?: number;
  textAlign?: string;
  columnTypeFormat?: string;
  inputFormat?: string;
  callback?: (row?: any) => void;
  options?: (list?: any) => any;
}

export enum ColumnGridTypeEnum {
  DEFAULT = 0,
  SUGGESTION = 1,
  INPUT = 2,
  LINK = 3,
}
