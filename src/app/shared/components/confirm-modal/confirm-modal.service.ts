import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {

  constructor(private modalService: NgbModal) {}

  confirm(title: string, message: string): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;

    return modalRef.result;
  }
}
