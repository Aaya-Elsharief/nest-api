import { Injectable, StreamableFile } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as xlsx from 'xlsx';

import { UserLogs } from './userLogs.schema';
@Injectable()
export class UserLogsRepository {
  constructor(
    @InjectModel(UserLogs.name)
    private readonly userLogsModel: Model<any>,
    private eventEmitter: EventEmitter2,
  ) {}

  async logsReport() {
    const worksheet = xlsx.utils.json_to_sheet([]);
    let firstCursor = false;

    await new Promise((resolve, reject) => {
      this.userLogsModel
        .find()
        .limit(5000)
        .batchSize(1000)
        .lean()
        .cursor()
        .on('data', (doc) => {
          this.eventEmitter.emit('data.find', worksheet, doc, firstCursor);
          firstCursor = true;
        })
        .on('error', reject)
        .on('end', resolve);
    });

    const csvStream = await xlsx.stream.to_csv(worksheet);

    return new StreamableFile(await csvStream, 'report.csv');
  }
}
