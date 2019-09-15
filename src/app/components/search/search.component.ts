import {Component, OnInit} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  results = new String();
  searchString: string;
  searchDebouncer = new Subject<string>();

  constructor() {
  }

  ngOnInit() {
    this.searchDebouncer.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term) => {
        return this.echoSearchTerm(term);
      })).subscribe((resp) => {
            this.results = resp;
    });
  }

  echoSearchTerm(term): Observable<string> {
    return of(term);
  }

  // doSearchDirect($event) {
  //   this.searchDebouncer.next($event.target.value);
  // }

  doSearch() {
    this.searchDebouncer.next(this.searchString)
  }

  wait(term: string) {
    setTimeout(() => {
      this.results = term;
    }, 400);
  }
}
