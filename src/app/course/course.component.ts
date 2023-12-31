import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
  throttle,
  throttleTime,
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat, interval, forkJoin } from "rxjs";
import { Lesson } from "../model/lesson";
import { createHttpObservable } from "../common/util";
import { RxJsLoggingLevel, debug, setRxJsLoggingLevel } from "../common/debug";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  courseId: string;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  @ViewChild("searchInput", { static: true })
  input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params["id"];

    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`).pipe(
      debug(RxJsLoggingLevel.INFO, "course value ")
    );

    const lessons$ = this.loadLessons();
    // forkJoin waits for all of the API to finish being called, returns a tuple value of said APIs
    forkJoin(this.course$, lessons$)
      .pipe(
        tap(([course, lesson]) => {
          console.log("course ", course);
          console.log("lesson ", lesson);
        })
      )
      .subscribe();

    // setRxJsLoggingLevel(RxJsLoggingLevel.DEBUG);
  }

  ngAfterViewInit() {
    // const searchLessons$ = fromEvent<any>(this.input.nativeElement, "keyup")
    //   .pipe(
    //     map((event) => event.target.value),
    //     debounceTime(400),
    //     distinctUntilChanged(),
    //     switchMap(search => this.loadLessons(search))
    //   );

    //   const initialLessons$ = this.loadLessons();
    //   // what happens here is that first lessons$ would be populated with initialLessons, once theres a value from searchLessons, it will take the later
    //   this.lessons$ = concat(initialLessons$, searchLessons$);

    this.lessons$ = fromEvent<any>(this.input.nativeElement, "keyup").pipe(
      map((event) => event.target.value),
      // startWith basically calls the loadLesson but with an initial value of what we assigned which is ''
      startWith(""),
      debug(RxJsLoggingLevel.TRACE, "search"),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.loadLessons(search)),
      debug(RxJsLoggingLevel.DEBUG, "lessons value")
    );

    // =================== Using throttle ==================================
    // fromEvent<any>(this.input.nativeElement, "keyup")
    //   .pipe(
    //     map((event) => event.target.value),
    //     startWith(""),
    //     // Rate limits our output but does not guarantee that it's the latest value of stream, Prolly better used on buttons
    //     // throttle(() => interval(500))
    //     // throttle time is the same as the above, but it handles the interval observable
    //     throttleTime(500)
    //   )
    //   .subscribe(console.log);
  }

  loadLessons(search = ""): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res) => res["payload"]));
  }
}
