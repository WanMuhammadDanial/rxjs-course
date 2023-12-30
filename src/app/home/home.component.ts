import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");

    const courses$: Observable<Course[]> = http$.pipe(
      // catch error handle
      // catchError((error) => {
      //   console.log("Error occured ", error);
      //   return throwError(error)
      // }),
      // finalize(()=>{
      //   console.log('finalize')
      // }),
      tap(() => console.log("http request executed")),
      map((res) => Object.values(res["payload"])),
      shareReplay(),
      // retryWhen creates a new stream an sub to it
      // delayWhen is called after every error objservable is emitted
      retryWhen((errors) => errors.pipe(delayWhen(() => timer(2000))))
    );

    this.beginnersCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course) => course.category == "BEGINNER")
      )
    );
    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course) => course.category == "ADVANCED")
      )
    );
  }
}
