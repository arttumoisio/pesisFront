import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent implements OnInit, OnDestroy {

  operaattorit: string[] = [
    '>=',
    '<=',
    '=',
    '!=',
  ];

  filterForm: FormGroup;
  get intFilters(): Array<{string: string; operator: string; column: string; }> {
    return this.fs.getIntFilters();
  }
  get otsikot(): string[] {
    const otsikot: string[] = this.dataService.getOtsikot().slice();
    this.intFilters.map((used) => {
      const i = otsikot.findIndex((otsikko) => otsikko === used.column);
      if (i !== -1) { otsikot.splice(i, 1); }
    });
    return otsikot;
  }

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private fs: FilterService) { }

  ngOnInit(): void {

    this.filterForm = this.formBuilder.group({
      column: this.formBuilder.control('Ottelut', [Validators.required]),
      operator: this.formBuilder.control('>=', [Validators.required]),
      string: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
    });
  }
  ngOnDestroy() {
    this.fs.setIntFilters([]);
  }

  onLisaaSuodatin() {
    if (String(this.filterForm.value.column) === '' ||
        String(this.filterForm.value.operator) === '' ||
        String(this.filterForm.value.string) === ''
    ) {
      // console.log('Form invalid!');
      return;
    }
    this.fs.addIntFilter(this.filterForm.value);
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

  removeFilter(filter: {string: string; operator: string; column: string; }) {
    // console.log('remove filter');
    this.fs.removeIntFilter(filter);
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
