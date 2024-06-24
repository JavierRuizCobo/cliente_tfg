import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InformModalComponent } from './inform-modal.component';

@Injectable({
  providedIn: 'root'
})
export class InformModalService {

  constructor(private modalService: NgbModal) {}

  inform(title: string, message: string): Promise<void> {
    const modalRef = this.modalService.open(InformModalComponent, {
      centered: true
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;

    return modalRef.result;
  }
}
