export class GridData<T> {
  public items: T[];
  public totalCount: number;
  constructor() {
    this.items = [];
    this.totalCount = 0;
  }

  // tslint:disable-next-line:member-ordering
  static empty: GridData<any> = { items: [], totalCount: 0 };
}
