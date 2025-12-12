import { PaymentDetailsModel } from "./payment-details.model";

export class PaymentDetailsViewModel {
  paymentFormModel: PaymentDetailsModel = new PaymentDetailsModel();
  paymentDetails: PaymentDetailsModel[];
  isSubmitted: boolean = false;

}
