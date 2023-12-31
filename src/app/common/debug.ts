import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum RxJsLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR,
}

let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
  rxjsLoggingLevel = level;
}

//debug is a higher order function, which is a function that returns a function
export const debug =
  (level: number, message: string) => (source: Observable<any>) =>
    source.pipe(
      tap((val) => {
        if (level >= rxjsLoggingLevel) {
          console.log(message + ": ", val);
        }
      })
    );
