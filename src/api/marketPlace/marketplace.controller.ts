import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorator';
import { CreateCartItemService } from './service/createcartitem.service';
import { CartItemDto } from './dto/cartItem.dto';
import { DeleteCartItemService } from './service/deletecartitem.service';
import { UpdateCartItemService } from './service/updatecartitem.service';
import { AddProductInWhisListService } from './service/addProductInWhisList.service';
import { DeleteProductInWhisListService } from './service/deleteProductInWhisList.service';
import { GetAllProductService } from './service/getAllProduct.service';
import { GetCartService } from './service/getCart.service';
import { GetProductService } from './service/getProduct.service';
import { GetProductInWhisListService } from './service/getProductWhisList.service';

@Controller('marketplace')
export class MarketPlaceController {
  constructor(
    private readonly createCartItemService: CreateCartItemService,
    private readonly deleteCartItemService: DeleteCartItemService,
    private readonly updateCartItemService: UpdateCartItemService,
    private readonly getCartService: GetCartService,
    private readonly getAllProductService: GetAllProductService,
    private readonly getProductService: GetProductService,
    private readonly getProductInWhisListService: GetProductInWhisListService,
    private readonly deleteProductInWhisListService: DeleteProductInWhisListService,
    private readonly addProductInWhisListService: AddProductInWhisListService,
  ) {}

  @Post('createItem')
  async createPaymentIntent(
    @Body() cartItemDto: CartItemDto,
    @GetCurrentUserId() userId: number,
  ) {
    return await this.createCartItemService.addCartItem(cartItemDto, userId);
  }

  @Delete('delete/:cartItemId')
  async deleteCartItem(
    @GetCurrentUserId() userId: number,
    @Param('cartItemId') cartItemId: number,
  ) {
    return await this.deleteCartItemService.deleteCartItem(cartItemId, userId);
  }

  @Patch('updateItem')
  async updateCartItem(
    @Body() updateCartItemDto: CartItemDto,
    @GetCurrentUserId() userId: number,
  ) {
    return await this.updateCartItemService.updateCartItem(
      updateCartItemDto,
      userId,
    );
  }

  @Get('getCart')
  async getCart(@GetCurrentUserId() userId: number) {
    return await this.getCartService.getCart(userId);
  }

  @Get('getAllProduct')
  async getAllProduct() {
    return await this.getAllProductService.getAllProduct();
  }

  @Get('getProduct/:productId')
  async getProduct(@Param('productId') productId: number) {
    return await this.getProductService.getAllProduct(productId);
  }

  @Get('getProductInWhisList')
  async getProductInWhisList(@GetCurrentUserId() userId: number) {
    return await this.getProductInWhisListService.getProductInWhisList(userId);
  }

  @Delete('deleteProductInWhisList/:productId')
  async deleteProductInWhisList(
    @GetCurrentUserId() userId: number,
    @Param('productId') productId: number,
  ) {
    return await this.deleteProductInWhisListService.deleteProductInWhisList(
      userId,
      productId,
    );
  }

  @Post('addProductInWhisList/:productId')
  async addProductInWhisList(
    @GetCurrentUserId() userId: number,
    @Param('productId') productId: number,
  ) {
    return await this.addProductInWhisListService.addProductInWhisList(
      userId,
      productId,
    );
  }
}
