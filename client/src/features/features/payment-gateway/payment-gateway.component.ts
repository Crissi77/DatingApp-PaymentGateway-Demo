import { Component } from '@angular/core';
import { AccountService } from '../../../core/account.service';
import { order } from '../../../../types/user';

@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css'
})
export class PaymentGatewayComponent {

 constructor(private accountService:AccountService){}

  // createOrder() {
  //   this.accountService.createPaymentOrder().subscribe({
  //     next: (response: order) => {
  //       console.log('Order ID:', response.id);
  //       console.log('Total Price:', response.amount);
  //       console.log('Total Price:', response.currency);
  //     },
  //     error: (err) => {
  //     console.error('Order creation failed', err);
  //     }
  //   });

  // }


  createOrder() {
  this.accountService.createPaymentOrder().subscribe({
    next: (response: order) => {

      const options = {
        key: 'rzp_test_SxIe7nVj91qaNn',
        amount: response.amount,
        currency: response.currency,
        name: 'RightNow Dating App',
        description: 'Premium Subscription',
        order_id: response.id,

        handler: function (paymentResponse: any) {
          console.log("HANDLER FIRED");
          console.log(paymentResponse);
          alert("Payment Success");
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    },
    error: (err) => {
      console.error('Order creation failed', err);
    }
  });
}





}
