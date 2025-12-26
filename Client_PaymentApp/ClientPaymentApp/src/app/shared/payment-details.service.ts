import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PaymentDetailsModel } from "./payment-details.model";
import { Observable } from "rxjs";
import { PaymentDetailsViewModel } from "./payment-details.viewmodel";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class PaymentDetailsService {

  paymentDetailsViewModel: PaymentDetailsViewModel = null;
  url: string = environment.apiBaseUrl;
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
