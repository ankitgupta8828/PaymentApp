import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { paymentURL } from "./payment-details-url";
import { PaymentDetailsModel } from "./payment-details.model";
import { Observable } from "rxjs";
import { PaymentDetailsViewModel } from "./payment-details.viewmodel";

@Injectable({ providedIn: "root" })
export class PaymentDetailsService {

  paymentDetailsViewModel: PaymentDetailsViewModel = null;
  url: string = paymentURL.apiBaseUrl;
  constructor(private http: HttpClient) {

  }

  refreshList(): Observable<PaymentDetailsModel[]> {
    return this.http.get<PaymentDetailsModel[]>(this.url + '/paymentapp/GetPaymentDetails');
  }

  createPaymentDetail(param: PaymentDetailsModel): Observable<PaymentDetailsModel[]> {
    return this.http.post<PaymentDetailsModel[]>(this.url + '/paymentapp/CreatePaymentDetail', param);
  }

  deletePaymentDetail(id: number): Observable<PaymentDetailsModel[]> {
    return this.http.delete<PaymentDetailsModel[]>(`${this.url}/paymentapp/DeletePaymentDetail/${id}`);
  }
}
