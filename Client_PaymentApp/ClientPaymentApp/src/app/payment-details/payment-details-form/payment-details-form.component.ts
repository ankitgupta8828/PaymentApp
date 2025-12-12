import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PaymentDetailsModel } from '../../shared/payment-details.model';
import { PaymentDetailsService } from '../../shared/payment-details.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentDetailsFormComponent implements OnInit, OnDestroy, OnChanges {

  public pdFormGroup: FormGroup;
  public formSubscription: Subscription;
  @Input() selectRecorddata: PaymentDetailsModel; //to Copy an object with out its refrence - Object.assign({},selectedRecordData)
  @Output() updateCollection = new EventEmitter<PaymentDetailsModel[]>();
  constructor(public paymentDetailsService: PaymentDetailsService, public formBuilder: FormBuilder, public toastrService: ToastrService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.pdFormGroup = this.formBuilder.group({
      cardOwnerName: [this.paymentDetailsService.paymentDetailsViewModel.paymentFormModel.cardOwnerName, Validators.required],
      cardNumber: [this.paymentDetailsService.paymentDetailsViewModel.paymentFormModel.cardNumber],
      expirationDate: [this.paymentDetailsService.paymentDetailsViewModel.paymentFormModel.expirationDate],
      securityCode: [this.paymentDetailsService.paymentDetailsViewModel.paymentFormModel.securityCode]
    });
    this.pdFormSubscription();
  }

  pdFormSubscription() {
    this.formSubscription = this.pdFormGroup.valueChanges.subscribe(val => {
      this.paymentDetailsService.paymentDetailsViewModel.paymentFormModel = this.pdFormGroup.getRawValue();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectRecorddata'] && this.selectRecorddata) {
      this.pdFormGroup.patchValue(this.selectRecorddata);
    }
  }

  OnClickSubmit(): void {
    let viewModel = this.paymentDetailsService.paymentDetailsViewModel;
    viewModel.isSubmitted = true;
    if (viewModel.paymentFormModel != null) {
      let param = new PaymentDetailsModel();
      param.cardOwnerName = viewModel.paymentFormModel.cardOwnerName;
      param.cardNumber = viewModel.paymentFormModel.cardNumber;
      param.expirationDate = viewModel.paymentFormModel.expirationDate;
      param.securityCode = viewModel.paymentFormModel.securityCode;

      let createPDSubscription: Subscription = this.paymentDetailsService.createPaymentDetail(param).subscribe(res => {
        if (res) {
          this.paymentDetailsService.paymentDetailsViewModel.paymentDetails = [...res];
          this.toastrService.success('Inserted Successfully.', 'Payment Detail Register');
          this.updateCollection.emit(this.paymentDetailsService.paymentDetailsViewModel.paymentDetails);
          this.changeDetection.detectChanges();
          this.pdFormGroup.reset();
        }
        createPDSubscription.unsubscribe();
      });
    }
  }

  ngOnDestroy() {
    if (this.formSubscription != null) {
      this.formSubscription.unsubscribe();
    }
  }

}
