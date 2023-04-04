import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(
      `Incoming request url: ${context.switchToHttp().getRequest().url}`,
    );
    return next.handle().pipe(
      //   tap({
      //     next: () =>
      //       console.log(
      //         `Outginig response status: ${
      //           context.switchToHttp().getResponse().statusCode
      //         }`,
      //       ),
      //     error: (error) => console.log(`Error status : ${error.status}`),
      //   }),
      tap(() =>
        console.log(
          `Outgoing response status: ${
            context.switchToHttp().getResponse().statusCode
          }`,
        ),
      ),
      catchError((error) => {
        console.error(`Error status : ${error.status}`);
        return throwError(() => error);
      }),
    );
  }
}
