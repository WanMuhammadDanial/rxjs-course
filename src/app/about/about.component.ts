import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, fromEvent, interval, noop, timer } from "rxjs";
import { createHttpObservable  } from '../common/util'
import { map, tap } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {

  }
}

