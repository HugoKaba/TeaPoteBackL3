import { Module } from '@nestjs/common';
import { MarketPlaceController } from './marketplace.controller';
import { JwtModule } from '@nestjs/jwt';
import { CustomJwtModelModule } from 'src/model/jwt/jwtModel.module';
import { CreateCartItemService } from './service/createcartitem.service';
import { DeleteCartItemService } from './service/deletecartitem.service';
import { UpdateCartItemService } from './service/updatecartitem.service';
import { GetProductInWhisListService } from './service/getProductWhisList.service';
import { GetAllProductService } from './service/getAllProduct.service';
import { GetProductService } from './service/getProduct.service';
import { DeleteProductInWhisListService } from './service/deleteProductInWhisList.service';
import { AddProductInWhisListService } from './service/addProductInWhisList.service';
import { GetCartService } from './service/getCart.service';

@Module({
  imports: [JwtModule.register({}), CustomJwtModelModule],
  controllers: [MarketPlaceController],
  providers: [
    CreateCartItemService,
    DeleteCartItemService,
    UpdateCartItemService,
    GetCartService,
    GetAllProductService,
    GetProductService,
    GetProductInWhisListService,
    DeleteProductInWhisListService,
    AddProductInWhisListService,
  ],
})
export class MarketPlaceModule {}
