import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PaymentDetailsModel } from '../shared/payment-details.model';
import { PaymentDetailsService } from '../shared/payment-details.service';
import { PaymentDetailsViewModel } from '../shared/payment-details.viewmodel';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentDetailsComponent implements OnInit {

  public paymentDetails: PaymentDetailsModel[];
  constructor(public paymentDetailService: PaymentDetailsService, private toastr: ToastrService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.initializeViewModel();
    this.getPaymentDetails();
  }

  initializeViewModel() {
    if (this.paymentDetailService.paymentDetailsViewModel === null) {
      this.paymentDetailService.paymentDetailsViewModel = new PaymentDetailsViewModel();
    }
  }

  getPaymentDetails() {
    let pdSubscription: Subscription = this.paymentDetailService.refreshList().subscribe(res => {
      if (res) {
        this.paymentDetailService.paymentDetailsViewModel.paymentDetails = res;
      } else {
        alert("No Record Found.");
      }
      this.changeDetection.detectChanges();
      pdSubscription.unsubscribe();
    });
  }

  onClickIcon(selectedRecord: PaymentDetailsModel) {
    let deletePaymentDetail: Subscription = this.paymentDetailService.deletePaymentDetail(selectedRecord.paymentDetailId).subscribe(res => {
      if (res) {
        this.paymentDetailService.paymentDetailsViewModel.paymentDetails = res;
        this.toastr.success('Deleted Successfully.', 'Payment Record');
      }
      this.changeDetection.detectChanges();
      deletePaymentDetail.unsubscribe();
    });
  }

  onChangeInPD(updatedList: PaymentDetailsModel[]) {
    this.paymentDetailService.paymentDetailsViewModel.paymentDetails = updatedList;
    this.changeDetection.detectChanges();
  }

  populateControl(selectedPayDetails: PaymentDetailsModel) {
    this.paymentDetailService.paymentDetailsViewModel.paymentFormModel = selectedPayDetails;
    this.changeDetection.detectChanges();
  }
}
