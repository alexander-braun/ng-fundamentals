import {
  AfterContentInit,
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[modal-trigger]',
})
export class ModalTriggerDirective implements AfterViewInit {
  private el: HTMLElement;
  @Input('modal-trigger') modalId: string;
  modal: HTMLElement;

  constructor(private elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }

  ngAfterViewInit() {
    const modal = document.getElementById(this.modalId) as HTMLElement;
    const modalDialog = document.getElementsByClassName(
      'modal-dialog'
    )[0] as HTMLElement;
    modal.style.position = 'fixed';

    this.el.addEventListener('click', () => {
      modal.style.display = 'block';
      modal.style['overflow-x'] = 'hidden';
      modal.style['overflow-y'] = 'auto';
      modal.style.opacity = '1';
      modal.style.zIndex = '999';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.top = '0';
      modal.style.left = '0';

      modalDialog.style.position = 'relative';

      const modalCloseButton = document.querySelectorAll(
        '[data-dismiss="modal"]'
      )[0];
      modalCloseButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    });
  }
}
