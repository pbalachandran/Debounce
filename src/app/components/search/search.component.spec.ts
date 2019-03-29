import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {SearchModule} from "./search.module";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SearchModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('wait', fakeAsync(() => {
    component.wait('DEBOUNCE');

    tick();
    fixture.detectChanges();
    expect(component.results).toEqual('');

    tick(401);
    fixture.detectChanges();
    expect(component.results).toEqual('DEBOUNCE');
  }));

  it('debounce1', (done) => {
    component.searchString = 'abcdef';

    component.doSearch();

    setTimeout(() => {
      expect(component.results).toEqual('abcdef')
      done();
    }, 401);
  });


  it('debounce2', fakeAsync(() => {
    component.searchString = 'DEBOUNCE';
    component.doSearch();

    tick();
    fixture.detectChanges();
    expect(component.results).toEqual('');

    tick(20);
    fixture.detectChanges();
    expect(component.results).toEqual('');

    tick(401);
    fixture.detectChanges();
    expect(component.results).toEqual('DEBOUNCE');
  }));
});
