import { ConsoleLogger, Injectable, Logger, Scope } from '@nestjs/common';
import { Request, Response } from 'express';
import { appendFile } from 'fs/promises';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private readonly logger = new Logger('CUSTOM_LOGGER');

  //   log(level: 'log' | 'info' | 'warn', message: string) {
  //     if (level === 'log') {
  //       return this.logger.log(message);
  //     }
  //     if (level === 'info') {
  //       return this.logger.debug(message);
  //     }
  //     if (level === 'warn') {
  //       return this.logger.warn(message);
  //     }
  //   }

  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }

  log(message: any, stack?: string, context?: string) {
    const file = 'logs/logs.log';
    const date = new Date().toISOString();
    appendFile(file, `${date} --- ${stack} --- ${message}\n`, 'utf8').catch(
      console.error,
    );
    super.log(stack, message);
  }

  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(
    message: unknown,
    stack?: unknown,
    context?: unknown,
    ...rest: unknown[]
  ): void {
    const file = 'logs/errors.log';
    const date = new Date().toISOString();
    appendFile(file, `${date} --- ${stack} --- ${message}\n`, 'utf8').catch(
      console.error,
    );
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
}
