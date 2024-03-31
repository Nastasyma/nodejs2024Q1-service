import { ConsoleLogger, Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { LOG_LEVELS } from './logger.enums';
import { existsSync } from 'fs';
import * as fsPromises from 'node:fs/promises';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private level: number;
  private maxSize: number;
  private logCount: number;
  private errorCount: number;

  constructor() {
    super();
    this.level = +process.env.LOG_LEVEL || 2;
    this.maxSize = +process.env.LOG_SIZE || 100000;
    this.logCount = 1;
    this.errorCount = 1;
  }

  error(message: string, trace: string, context?: string) {
    if (this.level >= 0)
      this.createLogging(
        LOG_LEVELS.ERROR,
        `${message}\n${trace}`,
        context || this.context,
      );
  }

  warn(message: string, context: string) {
    if (this.level >= 1)
      this.createLogging(
        LOG_LEVELS.WARN,
        `${message}`,
        context || this.context,
      );
  }

  log(message: string, context: string) {
    if (this.level >= 2)
      this.createLogging(LOG_LEVELS.LOG, `${message}`, context || this.context);
  }

  verbose(message: string, context: string) {
    if (this.level >= 3)
      this.createLogging(
        LOG_LEVELS.VERBOSE,
        `${message}`,
        context || this.context,
      );
  }

  debug(message: string, context: string) {
    if (this.level >= 4)
      this.createLogging(
        LOG_LEVELS.DEBUG,
        `${message}`,
        context || this.context,
      );
  }

  private async createLogging(level: string, message: string, context: string) {
    const timestamp = this.getTimestamp();
    const logLevel = level.toUpperCase();
    const logMessage = `[${timestamp}] [${logLevel}] [${context || ''}] - [${message}]\n`;

    super[level](logMessage);

    switch (level) {
      case LOG_LEVELS.ERROR:
        this.errorCount = await this.writeLoggingToFile(
          this.errorCount,
          logMessage,
          'errors',
        );
        break;
      default:
        this.logCount = await this.writeLoggingToFile(
          this.logCount,
          logMessage,
          'logs',
        );
        break;
    }
  }

  private async writeLoggingToFile(
    count: number,
    message: string,
    file: string,
  ) {
    const logDir = join(process.cwd(), 'logs');
    const logExtension = '.log';

    if (!existsSync(logDir)) {
      await fsPromises.mkdir(logDir, { recursive: true });
    }

    let filePath = resolve(logDir, `${file}_${count}${logExtension}`);
    if (!existsSync(filePath)) {
      await fsPromises.writeFile(filePath, '');
    }

    const stats = await fsPromises.stat(filePath);
    const size = stats.size;
    if (size >= this.maxSize) {
      count++;
    }

    filePath = resolve(logDir, `${file}_${count}${logExtension}`);
    await fsPromises.writeFile(filePath, message, { flag: 'a' });
    return count;
  }
}
