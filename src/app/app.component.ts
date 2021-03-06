import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public readonly linkedinUrl: string = "https://www.linkedin.com/in/quark-solutions-spa-a20931179";
  public _trialEndsAt;
  public _diff: number;
  public _days: number;
  public _hours: number;
  public _minutes: number;
  public _seconds: number;
  public _subscription: Subscription;

  constructor() {

  }

  ngOnInit() {
    this._trialEndsAt = "2019-02-18";
    this._subscription = interval(1000)
      .pipe(
        map(
          (x) => {
            this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
          }
        )
      )
      .subscribe(
        (x) => {
          this._days = this.getDays(this._diff);
          this._hours = this.getHours(this._diff);
          this._minutes = this.getMinutes(this._diff);
          this._seconds = this.getSeconds(this._diff);
        }
      );
  }

  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
