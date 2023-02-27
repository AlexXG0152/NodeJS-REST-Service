import { ConsoleLogger, Injectable, Logger, Scope } from '@nestjs/common';
import { Request, Response } from 'express';
import { PathLike } from 'fs';
import { appendFile } from 'fs/promises';
import { stat } from 'node:fs/promises';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private readonly logger = new Logger('CUSTOM_LOGGER');

  private logFileName = 'logs';
  private logChapter = 0;
  private errorFileName = 'errors';
  private errorChapter = 0;

  async log(message: any, stack?: string) {
    const date = new Date().toISOString();
    const log = `${date} --- ${stack} --- ${message}\n`;
    this.logChapter = await this.checkFileSize(
      `logs/${this.logFileName}_${this.logChapter}.log`,
      this.logChapter,
    );
    const file = `logs/${this.logFileName}_${this.logChapter}.log`;
    await appendFile(file, log, 'utf8').catch(console.error);
    super.log(stack, message);
  }

  async error(message: any, stack?: string, context?: string);
  async error(message: any, ...optionalParams: any[]);
  async error(message: unknown, stack?: unknown) {
    const date = new Date().toISOString();
    const log = `${date} --- ${stack} --- ${message}\n`;
    this.errorChapter = await this.checkFileSize(
      `logs/${this.errorFileName}_${this.errorChapter}.log`,
      this.errorChapter,
    );
    const file = `logs/${this.errorFileName}_${this.errorChapter}.log`;
    appendFile(file, log, 'utf8').catch(console.error);
    super.error(stack, message);
  }

  async loggerGetDelete(req: Request, res: Response) {
    const message = `METHOD: ${req.method}, URL: ${
      req.url
    }, QUERY: ${this.stringifyParameters(req.query as any)}, STATUS: ${
      res.statusCode
    }`;
    this.logger.log(message);
  }

  async loggerPostPut(req: Request, res: Response) {
    const message = `METHOD: ${req.method}, URL: ${
      req.url
    }, QUERY: ${this.stringifyParameters(
      req.query as any,
    )}, BODY: ${this.stringifyParameters(req.body)}, STATUS: ${res.statusCode}`;
    this.logger.log(message);
  }

  async loggerError(req: Request, res: Response, error: any) {
    const message = `METHOD: ${req.method}, URL: ${
      req.url
    }, QUERY: ${this.stringifyParameters(
      req.query as any,
    )}, BODY: ${this.stringifyParameters(req.body)}, STATUS: ${
      error.status
    }, STATUS_MESAGE: ${res.statusMessage}, ERROR: ${error}`;
    this.logger.error(message);
  }

  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }

  async getFileSize(file: PathLike) {
    return (await stat(file)).size;
  }

  async checkFileSize(file: PathLike, chapter: number) {
    const size = await this.getFileSize(file);
    return size > Number(process.env.MAX_LOG_FILE_SIZE)
      ? (chapter += 1)
      : chapter;
  }
}
