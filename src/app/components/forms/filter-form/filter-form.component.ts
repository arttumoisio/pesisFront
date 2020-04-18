import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/dataservice.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IFilterState } from '../../../store/state/filters.state';
import * as FilterActions from '../../../store/actions/filters.actions';
import { Observable } from 'rxjs';
import { IFilter } from '../../../models/filters.interface';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class FilterFormComponent implements OnInit, OnDestroy {

  operaattorit: string[] = [
    '>=',
    '<=',
    '=',
    '!=',
  ];

  filterForm: FormGroup;

  used: string[] = ['LV', 'KL'];
  get otsikot(): string[] {
    return this.dataService.getOtsikot();
    // return this.dataService.getOtsikot().filter((otsikko) => this.used.indexOf(otsikko) === -1);
  }

  filters: Observable< IFilterState >;

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private store: Store<{ filters: IFilterState }>,
              ) { }

  ngOnInit(): void {
    this.filters = this.store.select('filters');
    this.filterForm = this.formBuilder.group({
      column: this.formBuilder.control('Ottelut', [Validators.required]),
      operator: this.formBuilder.control('>=', [Validators.required]),
      string: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
    });
  }
  ngOnDestroy() {
    return;
  }

  onLisaaSuodatin() {
    if (String(this.filterForm.value.column) === '' ||
        String(this.filterForm.value.operator) === '' ||
        String(this.filterForm.value.string) === ''
    ) {
      // console.log('Form invalid!');
      return;
    }
    const newFilter: IFilter = {
      ...this.filterForm.value as IFilter,
    };

    this.store.dispatch(new FilterActions.AddFilter(newFilter));
    this.setSarake();
  }

  setSarake() {

    if (this.filterForm) {
      this.filterForm.reset();
      this.filterForm.setValue({
        column: this.otsikot[0],
        operator: '>=',
        string: '',
      });
    }
  }

  removeFilter(filter: {string: string; operator: string; column: string; }, index: number) {
    // console.log('remove filter');
    // this.fs.removeIntFilter(filter);
    this.store.dispatch(new FilterActions.DeleteFilter(index));
    this.setSarake();
  }

  get column() {
    return this.filterForm.get('column') as FormControl;
  }
  get operator() {
    return this.filterForm.get('operator') as FormControl;
  }
  get string() {
    return this.filterForm.get('string') as FormControl;
  }

}
