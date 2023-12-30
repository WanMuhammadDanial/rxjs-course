import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  Observable,
  concat,
  fromEvent,
  interval,
  merge,
  noop,
  of,
  timer,
} from "rxjs";
import { createHttpObservable } from "../common/util";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    //Concat example
    // const source1$ = of(1, 2, 3);
    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7, 8, 9);
    // const result$ = concat(source1$, source2$, source3$);
    // result$.subscribe(console.log);
    //merge example - synchronous and/or parallel
    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map((val) => 10 * val));
    // const result$ = merge(interval1$, interval2$);
    // result$.subscribe(console.log);
    //using abortController in util to cancel when calling unsub
    // const http$ = createHttpObservable('/api/courses');
    // const sub = http$.subscribe(console.log);
    // setTimeout(()=> sub.unsubscribe(), 0)
  }
}
