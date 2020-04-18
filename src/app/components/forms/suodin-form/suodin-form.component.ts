import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/dataservice.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IFilterState } from '../../../store/state/filters.state';
import * as FilterActions from '../../../store/actions/filters.actions';
import { ISuodin } from '../../../models/filters.interface';

@Component({
  selector: 'app-suodin-form',
  templateUrl: './suodin-form.component.html',
  styleUrls: ['./suodin-form.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class SuodinFormComponent implements OnInit, OnDestroy {

  filterForm: FormGroup;
  get otsikot(): string[] {return this.ds.getOtsikot(); }

  constructor(private ds: DataService,
              private formBuilder: FormBuilder,
              private store: Store<{ filters: IFilterState }>,
              ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      string: this.formBuilder.control(''),
      column: this.formBuilder.control(''),
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new FilterActions.ResetFilters());
    this.ds.resetData();
  }

  onSuodata() {
    const newSuodin: ISuodin = this.filterForm.value as ISuodin;

    this.store.dispatch(new FilterActions.GetSuodinSuccess(newSuodin));
  }

}
