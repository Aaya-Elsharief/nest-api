import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, Observable } from 'rxjs';
import { simplifiCodes } from 'src/constants/simplifi-error-codes';

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

@Injectable()
export class SimplifiService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async login(): Promise<Observable<any>> {
    const url = 'https://uat-lb.simplifipay.com/v1/auth/login/Lamha';
    const data = {
      client_id: this.configService.get('simplifi.client_id'),
      client_secret: this.configService.get('simplifi.client_secret'),
      grant_type: this.configService.get('simplifi.grant_type'),
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  async cardDetails(token: string, id: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getFromSimplifi(url, config);
  }

  async cardBalance(
    token: string,
    id: string,
    query?: CardQuerydto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}/balance-inquiry?userUuid=${query?.userUuid}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getFromSimplifi(url, config);
  }

  async cardTransactions(
    token: string,
    id: string,
    _query?: CardQuerydto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}/transactions`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: _query,
    };

    return this.getFromSimplifi(url, config);
  }

  async cardSettlement(
    token: string,
    id: string,
    _query?: CardQuerydto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}/settlement`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: _query,
    };

    return this.getFromSimplifi(url, config);
  }

  async cardAuthorization(
    token: string,
    id: string,
    _query?: CardQuerydto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}/authorization`;
    const config = {
      headers: {
        Authorization: token,
      },
      params: _query,
    };

    return this.getFromSimplifi(url, config);
  }

  async cardActivation(
    token: string,
    id: string,
    userUuid: string,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}/activate`;
    const data = {
      userUuid,
    };

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  async createCard(
    token: string,
    createCardDto: CreateCardDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card`;
    const data = {
      userUuid: createCardDto.userUuid,
      cardProgramUuid: createCardDto.cardProgramUuid,
      customerTitle: createCardDto.customerTitle,
      instrument: createCardDto.instrument,
    };

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  async manageCardStatus(
    token: string,
    id: string,
    cardStatusDto: ManageCardStatusDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}/status`;
    const data = {
      status: cardStatusDto.status,
      reason: cardStatusDto.reason,
      details: cardStatusDto.details,
    };

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  async renewCard(token: string, id: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}/renew`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.postToSimplifi(url, null, config);
  }

  async loadCard(
    token: string,
    id: string,
    cardLoadDto: CardLoadDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}/load`;
    const data = {
      uuid: cardLoadDto.uuid,
      cardUuid: cardLoadDto.cardUuid,
      userUuid: cardLoadDto.userUuid,
      requestedAmount: cardLoadDto.requestedAmount,
      loadAmount: cardLoadDto.loadAmount,
      status: cardLoadDto.status,
    };

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  async unLoadCard(
    token: string,
    id: string,
    cardLoadDto: CardLoadDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card/${id}/unload`;
    const data = {
      uuid: cardLoadDto.uuid,
      cardUuid: cardLoadDto.cardUuid,
      userUuid: cardLoadDto.userUuid,
      requestedAmount: cardLoadDto.requestedAmount,
      loadAmount: cardLoadDto.loadAmount,
      status: cardLoadDto.status,
    };

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  /**
   * Card Control
   */
  async getCardControl(token: string, id: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/card-control/${id}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getFromSimplifi(url, config);
  }

  async updateCardControl(
    token: string,
    id: string,
    cardControlDto: CardControlDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/card-control/${id}`;
    const data = {
      cardUuid: cardControlDto.cardUuid,
      cardProgramUuid: cardControlDto.cardProgramUuid,
      cardControl: {
        poi: { ...cardControlDto.cardControl.poi },
        velocityControls: { ...cardControlDto.cardControl.velocityControls },
        merchantControls: { ...cardControlDto.cardControl.merchantControls },
      },
    };
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.putToSimplifi(url, data, config);
  }

  async createCardControl(
    token: string,
    cardControlDto: CardControlDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/card-control`;
    const data = {
      cardUuid: cardControlDto.cardUuid,
      cardProgramUuid: cardControlDto.cardProgramUuid,
      cardControl: {
        poi: { ...cardControlDto.cardControl.poi },
        velocityControls: { ...cardControlDto.cardControl.velocityControls },
        merchantControls: { ...cardControlDto.cardControl.merchantControls },
      },
    };

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.postToSimplifi(url, data, config);
  }
  /***
   * Card Program
   */
  async getCardProgram(token: string, id: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/${id}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getFromSimplifi(url, config);
  }

  async createCardProgram(
    token: string,
    cardProgramDto: CardProgramDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/`;

    const data = {
      config: {
        poi: { ...cardProgramDto.config.poi },
        loadMerchantsFromExternalSource:
          cardProgramDto.config.loadMerchantsFromExternalSource,
        extenalMerchantSource: {
          ...cardProgramDto.config.extenalMerchantSource,
        },
        merchantControls: { ...cardProgramDto.config.merchantControls },
        velocityControls: { ...cardProgramDto.config.velocityControls },
      },
      cardProgramTemplateUuid: cardProgramDto.cardProgramTemplateUuid,
      cardProgramStatus: cardProgramDto.cardProgramStatus,
      kycRequired: cardProgramDto.kycRequired,
      name: cardProgramDto.name,
    };
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  async upateCardProgram(
    token: string,
    id: string,
    cardProgramDto: CardProgramDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/${id}`;

    const data = {
      config: {
        poi: { ...cardProgramDto.config.poi },
        loadMerchantsFromExternalSource:
          cardProgramDto.config.loadMerchantsFromExternalSource,
        extenalMerchantSource: {
          ...cardProgramDto.config.extenalMerchantSource,
        },
        merchantControls: { ...cardProgramDto.config.merchantControls },
        velocityControls: { ...cardProgramDto.config.velocityControls },
      },
      cardProgramTemplateUuid: cardProgramDto.cardProgramTemplateUuid,
      cardProgramStatus: cardProgramDto.cardProgramStatus,
      kycRequired: cardProgramDto.kycRequired,
      name: cardProgramDto.name,
    };
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.putToSimplifi(url, data, config);
  }

  async upateCardProgramStatus(
    token: string,
    id: string,
    cardProgramStatus: CardProgramStatuse,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/${id}/status`;

    const data = {
      cardProgramStatus: cardProgramStatus.cardProgramStatus,
    };
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.patchToSimplifi(url, data, config);
  }
  /**
   * User
   */
  async listUsers(token: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/user`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getFromSimplifi(url, config);
  }

  async getUser(token: string, id: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/user/${id}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getFromSimplifi(url, config);
  }

  async createUser(token: string, userDto: UserDto): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/user`;

    const data = {
      username: userDto.username,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      middleName: userDto.middleName,
      contact: userDto.contact,
      userDetail: { ...userDto.userDetail },
      address: { ...userDto.address },
      email: userDto.email,
      gender: userDto.gender,
    };

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  async addAddress(
    token: string,
    params: AddressParamsDto,
    addressDto: AddressDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/user/${params.id}/address/${params.type}`;

    const data = {
      ...addressDto,
    };
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  async updateUser(
    token: string,
    id: string,
    userDto: UserDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/user/${id}`;

    const data = {
      username: userDto.username,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      middleName: userDto.middleName,
      contact: userDto.contact,
      userDetail: { ...userDto.userDetail },
      address: { ...userDto.address },
      email: userDto.email,
      gender: userDto.gender,
    };

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.putToSimplifi(url, data, config);
  }

  async deleteUser(token: string, id: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/user/${id}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.deleteFromSimplifi(url, config);
  }

  /**
   *
   * Transactions
   */

  getTransactionByUuid(token: string, id: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/transaction/${id}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getFromSimplifi(url, config);
  }

  listTransactionsByPost(
    token: string,
    transactionParams: TransactionBodyDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/transaction`;

    const data = {
      ...transactionParams,
    };
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  listTransactions(
    token: string,
    _query: TransactionParamsDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/transaction`;

    const config = {
      headers: {
        Authorization: token,
      },
      params: _query,
    };

    return this.getFromSimplifi(url, config);
  }

  /**
   *Company
   */
  getCardDesignImage(token: string, id: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/company/${id}/image`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getFromSimplifi(url, config);
  }

  /***
   * card merchants
   */

  async updateCardProgramMerchant(
    token: string,
    id: string,
    cardProgramMerchant: MerchantControlsDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/${id}/merchant/`;

    const data = {
      blackList: cardProgramMerchant.blackList,
      whiteList: cardProgramMerchant.whiteList,
    };

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return this.putToSimplifi(url, data, config);
  }

  /***
   * Funding Source
   */

  getBalanceFundingSource(token: string, id: string): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/${id}/funding-source-balance`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.getFromSimplifi(url, config);
  }

  updateFundingSource(
    token: string,
    id: string,
    fundingSourceUuid: string,
    fundingSourceDto: FundingSourceDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/${id}/funding-source/${fundingSourceUuid}`;

    const data = {
      ...fundingSourceDto,
    };
    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.putToSimplifi(url, data, config);
  }

  linkFundingSourceToCardProgram(
    token: string,
    id: string,
    fundingSourceDto: FundingSourceDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/${id}/funding-source`;

    const data = {
      ...fundingSourceDto,
    };
    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  transferFundsBetweenCardProgram(
    token: string,
    transfareFundDto: TransfareFundDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/transfer-fund`;

    const data = {
      ...transfareFundDto,
    };
    console.log(data);

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  raiseFunding(
    token: string,
    raiseFundingDto: RaiseFundingDto,
  ): Promise<Observable<any>> {
    const url = `https://uat-lb.simplifipay.com/v1/card-program/raise-funding`;

    const data = {
      ...raiseFundingDto,
    };

    const config = {
      headers: {
        Authorization: token,
      },
    };

    return this.postToSimplifi(url, data, config);
  }

  /**
   *
   */
  async getFromSimplifi(url: string, config: any): Promise<Observable<any>> {
    return this.httpService.get(url, config).pipe(
      map((response) => {
        return response.data;
      }),
      catchError(async (error) => {
        throw new HttpException(
          simplifiCodes[`SIMPLIFI_ERROR_${error.response.data.errorCode}`] ||
            null,
          error.response.status,
        );
      }),
    );
  }

  async postToSimplifi(
    url: string,
    data: any,
    config: any,
  ): Promise<Observable<any>> {
    return this.httpService.post(url, data, config).pipe(
      map((response) => {
        return response.data;
      }),
      catchError(async (error) => {
        throw new HttpException(
          simplifiCodes[`SIMPLIFI_ERROR_${error.response.data.errorCode}`] ||
            null,
          error.response.status,
        );
      }),
    );
  }

  async putToSimplifi(
    url: string,
    data: any,
    config: any,
  ): Promise<Observable<any>> {
    return this.httpService.put(url, data, config).pipe(
      map((response) => {
        return response.data;
      }),
      catchError(async (error) => {
        throw new HttpException(
          simplifiCodes[`SIMPLIFI_ERROR_${error.response.data.errorCode}`] ||
            null,
          error.response.status,
        );
      }),
    );
  }

  async patchToSimplifi(
    url: string,
    data: any,
    config: any,
  ): Promise<Observable<any>> {
    return this.httpService.patch(url, data, config).pipe(
      map((response) => {
        return response.data;
      }),
      catchError(async (error) => {
        throw new HttpException(
          simplifiCodes[`SIMPLIFI_ERROR_${error.response.data.errorCode}`] ||
            null,
          error.response.status,
        );
      }),
    );
  }

  async deleteFromSimplifi(url: string, config: any): Promise<Observable<any>> {
    return this.httpService.delete(url, config).pipe(
      map((response) => {
        return response.data;
      }),
      catchError(async (error) => {
        throw new HttpException(
          simplifiCodes[`SIMPLIFI_ERROR_${error.response.data.errorCode}`] ||
            null,
          error.response.status,
        );
      }),
    );
  }
}
