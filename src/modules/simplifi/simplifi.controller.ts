import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { AddressParamsDto } from './dtos/address-params.dto';
import { CardControlDto } from './dtos/card-control.dto';
import { CardLoadDto } from './dtos/card-load.dto';
import { CardProgramDto, CardProgramStatuse } from './dtos/card-program.dto';
import { CardQuerydto } from './dtos/card-query.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { FundingSourceDto } from './dtos/funding-source.dto';
import {
  TransactionBodyDto,
  TransactionParamsDto,
} from './dtos/list-transaction-options.dto';
import { ManageCardStatusDto } from './dtos/manage-card-status.dto';
import { MerchantControlsDto } from './dtos/merchant-controls.dto';
import { RaiseFundingDto } from './dtos/raise-funding.dto';
import { TransfareFundDto } from './dtos/transfare-fund.dto';
import { AddressDto } from './dtos/user-address.dto';
import { UserDto } from './dtos/user.dto';
import { SimplifiService } from './simplifi.service';

@Controller('simplifi')
export class SimplifiController {
  constructor(private readonly simplifiService: SimplifiService) {}

  /*
   *auth
   *
   *
   */
  @Post('login')
  login() {
    return this.simplifiService.login();
  }

  /*
   *
   *card apis
   *
   */

  @Get('card/:id')
  cardDetails(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    return this.simplifiService.cardDetails(token, id);
  }

  @Get('card/:id/balance-inquiry')
  cardBalance(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Query() query: CardQuerydto,
  ) {
    return this.simplifiService.cardBalance(token, id, query);
  }

  @Get('card/:id/transactions')
  cardTransactions(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Query() query: CardQuerydto,
  ) {
    return this.simplifiService.cardTransactions(token, id, query);
  }

  @Get('card/:id/settlement')
  cardSettlement(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Query() query: CardQuerydto,
  ) {
    return this.simplifiService.cardSettlement(token, id, query);
  }

  @Get('card/:id/authorization')
  cardAuthorization(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Query() query: CardQuerydto,
  ) {
    return this.simplifiService.cardAuthorization(token, id, query);
  }

  @Post('card/:id/activate')
  cardActivation(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body('userUuid') userUuid: string,
  ) {
    return this.simplifiService.cardActivation(token, id, userUuid);
  }

  @Post('/card')
  createCard(
    @Headers('authorization') token: string,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.simplifiService.createCard(token, createCardDto);
  }

  @Post('/card/:id/status')
  manageCardStatus(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body() manageCardStatusDto: ManageCardStatusDto,
  ) {
    return this.simplifiService.manageCardStatus(
      token,
      id,
      manageCardStatusDto,
    );
  }

  @Post('/card/:id/renew')
  renewCard(@Param('id') id: string, @Headers('authorization') token: string) {
    return this.simplifiService.renewCard(token, id);
  }

  @Post('/card/:id/load')
  loadCard(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body() cardLoadDto: CardLoadDto,
  ) {
    return this.simplifiService.loadCard(token, id, cardLoadDto);
  }

  @Post('/card/:id/unload')
  unloadCard(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body() cardUnloadDto: CardLoadDto,
  ) {
    return this.simplifiService.unLoadCard(token, id, cardUnloadDto);
  }

  /***
   * Card Control
   *
   *
   */
  @Get('card-program/card-control/:id')
  getCardControl(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    return this.simplifiService.getCardControl(token, id);
  }

  @Put('card-program/card-control/:id')
  updateCardControl(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body() cardControlDto: CardControlDto,
  ) {
    return this.simplifiService.updateCardControl(token, id, cardControlDto);
  }

  @Post('card-program/card-control')
  createCardControl(
    @Headers('authorization') token: string,
    @Body() cardControlDto: CardControlDto,
  ) {
    return this.simplifiService.createCardControl(token, cardControlDto);
  }

  /**
   * Card Program
   */

  @Get('card-program/:id')
  getCardProgram(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    return this.simplifiService.getCardProgram(token, id);
  }

  @Post('card-program/')
  cardProgram(
    @Headers('authorization') token: string,
    @Body() cardProgramDto: CardProgramDto,
  ) {
    return this.simplifiService.createCardProgram(token, cardProgramDto);
  }

  @Put('card-program/:id')
  upateCardProgram(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body() cardProgramDto: CardProgramDto,
  ) {
    return this.simplifiService.upateCardProgram(token, id, cardProgramDto);
  }

  @Patch('card-program/:id/status')
  upateCardProgramStatus(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body() cardProgramStatus: CardProgramStatuse,
  ) {
    return this.simplifiService.upateCardProgramStatus(
      token,
      id,
      cardProgramStatus,
    );
  }

  /**
   * User
   *
   */

  @Get('user')
  listUsers(@Headers('authorization') token: string) {
    return this.simplifiService.listUsers(token);
  }

  @Get('user/:id')
  getUser(@Param('id') id: string, @Headers('authorization') token: string) {
    return this.simplifiService.getUser(token, id);
  }

  @Post('user/')
  createUser(
    @Headers('authorization') token: string,
    @Body() userDto: UserDto,
  ) {
    return this.simplifiService.createUser(token, userDto);
  }

  @Post('user/:id/address/:type')
  addAddress(
    @Param() params: AddressParamsDto,
    @Headers('authorization') token: string,
    @Body() addressDto: AddressDto,
  ) {
    return this.simplifiService.addAddress(token, params, addressDto);
  }

  @Put('user/:id')
  updateUser(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body() userDto: UserDto,
  ) {
    return this.simplifiService.updateUser(token, id, userDto);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string, @Headers('authorization') token: string) {
    return this.simplifiService.deleteUser(token, id);
  }

  /***
   * Transactions
   */
  @Get('transaction/:id')
  getTransactionByUuid(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    return this.simplifiService.getTransactionByUuid(token, id);
  }

  @Post('transaction')
  poetLisTransactions(
    @Headers('authorization') token: string,
    @Body() transactionParams: TransactionBodyDto,
  ) {
    return this.simplifiService.listTransactionsByPost(
      token,
      transactionParams,
    );
  }

  @Get('transaction')
  listTransactions(
    @Headers('authorization') token: string,
    @Query() _query: TransactionParamsDto,
  ) {
    return this.simplifiService.listTransactions(token, _query);
  }

  /**
   * Company
   */

  @Get('company/:id/image')
  CardDesignImage(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    return this.simplifiService.getCardDesignImage(token, id);
  }

  /** Card Program Merchant */
  @Put('card-program/:id/merchant/')
  updateCardProgramMerchant(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body() cardProgramMerchant: MerchantControlsDto,
  ) {
    return this.simplifiService.updateCardProgramMerchant(
      token,
      id,
      cardProgramMerchant,
    );
  }

  /**
   *  Funding Source
   */

  @Get('card-program/:id/funding-source-balance')
  getBalanceFundingSource(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    return this.simplifiService.getBalanceFundingSource(token, id);
  }

  @Put('card-program/:id/funding-source/:fundingSource_uuid')
  updateFundingSource(
    @Param('id') id: string,
    @Param('fundingSource_uuid') fundingSourceUuid: string,
    @Headers('authorization') token: string,
    @Body() fundingSourceDto: FundingSourceDto,
  ) {
    return this.simplifiService.updateFundingSource(
      token,
      id,
      fundingSourceUuid,
      fundingSourceDto,
    );
  }

  @Post('card-program/:id/funding-source')
  linkFundingSourceToCardProgram(
    @Param('id') id: string,
    @Headers('authorization') token: string,
    @Body() fundingSourceDto: FundingSourceDto,
  ) {
    return this.simplifiService.linkFundingSourceToCardProgram(
      token,
      id,
      fundingSourceDto,
    );
  }

  @Post('card-program/transfer-fund')
  transferFundsBetweenCardProgram(
    @Headers('authorization') token: string,
    @Body() transfareFundDto: TransfareFundDto,
  ) {
    return this.simplifiService.transferFundsBetweenCardProgram(
      token,
      transfareFundDto,
    );
  }

  // RaiseFundingDto
  @Post('card-program/raise-funding')
  raiseFunding(
    @Headers('authorization') token: string,
    @Body() raiseFundingDto: RaiseFundingDto,
  ) {
    return this.simplifiService.raiseFunding(token, raiseFundingDto);
  }
}
