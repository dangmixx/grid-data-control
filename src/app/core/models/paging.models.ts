export class PagingModel {
  search: string;
  pageIndex: number;
  pageSize: number;
  sortBy: string;
  sortType: string;
  fromDate: string;
  toDate: string;
  state: string;
  color: string;
  weight: string;
  frequency: string;

  constructor(params?: PagingModel | any) {
    this.search = params?.search ? params.search : '';
    this.pageIndex = params?.pageIndex ? params.pageIndex : 1;
    this.pageSize = params?.pageSize ? params.pageSize : 10;
    this.sortBy = params?.sortBy ? params.sortBy : '';
    this.sortType = params?.sortType ? params.sortType : SortTypeEnum.ASC;
    this.fromDate = params?.formDate ? params.formDate : '';
    this.toDate = params?.toDate ? params.toDate : '';
    this.state = params?.state ? params.state : '';
    this.color = params?.color ? params.color : '';
    this.weight = params?.weight ? params.weight : '';
    this.frequency = params?.frequency ? params.frequency : '';
  }

  queryPaging(): string {
    const query =
      '?page=' +
      this.pageIndex +
      '&pageSize=' +
      this.pageSize +
      '&orderDirection=' +
      this.sortType +
      '&orderBy=' +
      this.sortBy +
      '&state=' +
      this.state +
      '&fromDate=' +
      this.fromDate +
      '&toDate=' +
      this.toDate +
      '&search=' +
      encodeURIComponent(this.search) +
      '&color=' +
      this.color +
      '&weight=' +
      this.weight +
      '&frequency=' +
      this.frequency;
    return query;
  }
}

export enum SortTypeEnum {
  ASC = 'asc',
  DESC = 'desc',
}
