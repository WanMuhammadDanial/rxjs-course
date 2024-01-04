import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  concat,
  fromEvent,
  interval,
  noop,
  observable,
  Observable,
  of,
  timer,
  merge,
  Subject,
  BehaviorSubject,
  AsyncSubject,
  ReplaySubject,
} from "rxjs";
import { delayWhen, filter, map, take, timeout } from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    // Behavior subject will emit latest value to new subscribers
    // const subject = new BehaviorSubject(0);

    // AsyncSubject waits for the subject to complete before emitting the last value to subscribers
    // Even subbing to AsyncSubject after it completes, it will emit the last value
    // const subject = new AsyncSubject();

    //Replay Subject returns every value form start to finish
    const subject = new ReplaySubject();

    const series$ = subject.asObservable();

    series$.subscribe(console.log);

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();
    series$.subscribe((val) => console.log("second sub:", val));

    setTimeout(() => {
      //   series$.subscribe((val) => console.log("second sub:", val));
    }, 3000);
  }
}
