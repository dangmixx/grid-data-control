import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[onEnterGridTable]',
})
export class OnEnterNextDirective {
  private el: ElementRef;
  @Input() onEnterGridTable: string;
  @Output() endList = new EventEmitter<boolean>();
  constructor(private elR: ElementRef) {
    this.el = this.elR;
  }
  @HostListener('keydown', ['$event']) onKeyDown(e) {
    const idTarget: string = this.el.nativeElement.id;
    let idTargetNumber = parseInt(idTarget.split('-')[2], 10);

    // avoid control is mat-option

    if (e.which === 13 || e.keyCode === 13) {
      e.preventDefault();
      if (document.querySelector('.mat-autocomplete-panel')) {
        return;
      }

      let nextInput = this.getElementToFocus(idTargetNumber);

      // avoid control is disabled

      while (nextInput && nextInput.hasAttribute('disabled')) {
        idTargetNumber = idTargetNumber + 1;
        nextInput = document.getElementById('mat-input-' + idTargetNumber);
      }

      if (nextInput) {
        nextInput.focus();
        this.endList.emit(false);
      } else {
        console.log('end-table');
      }
    }
  }

  getElementToFocus(idTargetNumber) {
    let nextElement;
    if (this.onEnterGridTable) {
      nextElement = document.getElementsByClassName(this.onEnterGridTable)[0];
    } else {
      nextElement = document.getElementById(
        'mat-input-' + (idTargetNumber + 1)
      );
    }
    return nextElement;
  }

}
