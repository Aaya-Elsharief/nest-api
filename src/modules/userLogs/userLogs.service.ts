import { Injectable } from '@nestjs/common';

import { sendEmail } from '../../helpers/sendEmail';
import { IServiceInterface } from '../../Interfaces/IService.interface';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../users/user.service';

import { UserLogsRepository } from './userLogs.repository';

@Injectable()
export class UserLogsService {
  constructor(
    private readonly userLogsRepository: UserLogsRepository,
    private readonly firebaseService: FirebaseService,
    private readonly userServise: UserService,
  ) {}

  async getReport(_id: string): Promise<IServiceInterface> {
    this.prepareReport(_id);
    return {
      data: 'The report is being prepared, you will receive an email later',
    };
  }

  async prepareReport(_id: string) {
    const { data } = await this.userServise.findUser(
      { _id },
      { email: 1, _id: 0 },
    );
    const FileURL = await this.firebaseService.uploadStream(
      await this.userLogsRepository.logsReport(),
      'userLogs.csv',
    );
    sendEmail(data.email, FileURL, 'Logs Report');
  }
}
