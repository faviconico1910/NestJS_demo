import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    console.log('Request URL:', req.originalUrl);
    console.log('Request Method:', req.method);
    next();
  }
}

// functional middleware
export function logger(req: any, res: any, next: () => void) {
  console.log('Request URL:', req.originalUrl);
  console.log('Request Method:', req.method);
  next();
}
