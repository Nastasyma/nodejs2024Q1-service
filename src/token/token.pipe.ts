import {
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ValidationTokenPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      throw new UnauthorizedException();
    }
    return value;
  }
}
