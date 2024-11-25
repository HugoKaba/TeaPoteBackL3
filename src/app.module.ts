import { MarketPlaceModule } from './api/marketPlace/marketplace.module';
import { UserModule } from './api/user/user.module';
import { SharedCardModule } from './model/sharedCard/sharedcard.module';
import { FriendModelModule } from './model/friend/friendmodel.module';
import { FriendModule } from './api/friend/friend.module';
import { CommentsModelModule } from './model/comments/commentsModel.module';
import { TeaModelModule } from './model/tea/teaModel.module';
import { TeaTypeModelModule } from './model/teaType/teatypeModel.module';
import { MomentModelModule } from './model/moment/momentModel.module';
import { IngredientsModelModule } from './model/ingredients/ingredientsModel.module';
import { TeaModule } from './api/tea/tea.module';
import { CustomJwtModelModule } from './model/jwt/jwtModel.module';
import { TokenModule } from './api/token/token.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from './config/mail/mailer.module';
import { CountryModelModule } from './model/country/countryModel.module';
import { UserModelModule } from './model/user/userModel.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guard';
import { IngredientsModule } from './api/ingredients/ingredients.module';
import { CountryModule } from './api/country/country.module';
import { ProductModelModule } from './model/product/productModel.module';
import { PaymentsModule } from './api/payments/payments.module';
import { StripeModule } from './config/stripe/stripe.module';
import { CartModelModule } from './model/cart/cartModel.module';
import { MomentModule } from './api/moment/moment.module';
import { TeaTypeModule } from './api/teaType/teaType.module';

@Module({
  imports: [
    MarketPlaceModule,
    ProductModelModule,
    PaymentsModule,
    UserModule,
    SharedCardModule,
    FriendModelModule,
    FriendModule,
    CommentsModelModule,
    TeaModule,
    TeaModelModule,
    TeaTypeModelModule,
    MomentModelModule,
    IngredientsModelModule,
    CustomJwtModelModule,
    TokenModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    StripeModule,
    MailerModule,
    AuthModule,
    TeaModule,
    UserModelModule,
    CountryModelModule,
    IngredientsModule,
    CountryModule,
    CartModelModule,
    MomentModule,
    TeaTypeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
