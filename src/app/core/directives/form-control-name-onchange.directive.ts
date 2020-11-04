import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[onChangeFormControl]',
})
export class FormControlNameOnchangeDirective
  extends FormControlName
  implements OnChanges {
  viewModel: any;
  // tslint:disable-next-line:no-input-rename
  @Input('formControl') form: FormControl;
  private _isControlChanged(changes: { [key: string]: any }): boolean {
    console.log('change');

    return changes.hasOwnProperty('form');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('dataChange');
    console.log(changes);
    if (this._isControlChanged(changes)) {
    }
  }
}
