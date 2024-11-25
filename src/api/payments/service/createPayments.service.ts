import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { StripeService } from 'src/config/stripe/stripe.service';
import { CreatePaymentDto } from '../dto/createPayment.dto';
import { UserFinderService } from 'src/model/user/service/userFinder.service';
import { CartFinderService } from 'src/model/cart/service/cartFinder.service';

@Injectable()
export class CreatePaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly userFinderService: UserFinderService,
    private readonly cartFinderService: CartFinderService,
  ) {}

  async createPayment(userId: number, createPaymentDto: CreatePaymentDto) {
    const user = await this.userFinderService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const {currency } = createPaymentDto;

    const carts = await this.cartFinderService.getCartByUserId(user.id);
    if (carts.length === 0) {
      throw new BadRequestException('Cart is empty');
    }
    var amount: number = 0;
    for (const cart of carts) {
      amount += cart.product.price * cart.quantity;
    }

    let paymentMethod;
    try {
      paymentMethod = await this.stripeService.createPaymentMethod({
        type: 'card',
        card: {
          token: 'tok_visa',
        },
      });
    } catch (error) {
      console.error('Stripe createPaymentMethod error:', error);
      throw new BadRequestException('Invalid payment method details');
    }

    try {
      await this.stripeService.attachPaymentMethodToCustomer(
        user.stripeCustomerId,
        paymentMethod.id,
      );
    } catch (error) {
      console.error('Stripe attachPaymentMethodToCustomer error:', error);
      throw new BadRequestException(
        'Failed to attach payment method to customer',
      );
    }

    try {
      const paymentIntent = await this.stripeService.createPaymentIntent({
        amount: amount * 100,
        currency: currency,
        customer: user.stripeCustomerId,
        payment_method: paymentMethod.id,
        off_session: true,
        confirm: true,
      });

      return paymentIntent;
    } catch (error) {
      console.error('Stripe createPaymentIntent error:', error);
      throw new BadRequestException('Failed to create payment intent');
    }
  }
}