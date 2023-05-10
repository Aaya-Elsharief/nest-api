import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as xlsx from 'xlsx';

@Injectable()
export class Events {
  @OnEvent('data.find')
  logMsg(worksheet: xlsx.WorkSheet, doc, firstCursor: boolean) {
    xlsx.utils.sheet_add_json(worksheet, [doc], {
      skipHeader: firstCursor,
      origin: -1,
    });
  }
}
