import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2024-04-10',
      },
    );
  }

  async createCustomer(email: string): Promise<Stripe.Customer> {
    return this.stripe.customers.create({ email });
  }

  async createPaymentMethod(data: {
    type: 'card';
    card: {
      token: string;
    };
  }): Promise<Stripe.PaymentMethod> {
    return this.stripe.paymentMethods.create(data);
  }

  async attachPaymentMethodToCustomer(
    customerId: string,
    paymentMethodId: string,
  ): Promise<Stripe.PaymentMethod> {
    return this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
  }

  async createPaymentIntent(data: {
    amount: number;
    currency: string;
    customer: string;
    payment_method: string;
    off_session: boolean;
    confirm: boolean;
  }): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create(data);
  }
}
