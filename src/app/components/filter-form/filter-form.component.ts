import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {
  otsikot: string[];
  voiPoistaa: boolean = false;
  operaattorit: string[] = [
    ">=",
    "<=",
    "=",
    "!=",
  ];

  filterForm: FormGroup;

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private fs: FilterService) { }

  ngOnInit(): void {
    this.otsikot = this.dataService.getOtsikot();

    this.filterForm = this.formBuilder.group({
      strings: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      operators: this.formBuilder.array([
      ]),
      columns: this.formBuilder.array([
        this.formBuilder.control('')
      ])

    });
  }

  onSuodata () {
    console.log('Sent', this.filterForm.value);
    this.fs.setFilters(this.filterForm.value);
    this.dataService.dataChangedEmitter.emit();
  }

  get strings() {
    return this.filterForm.get('strings') as FormArray;
  }
  get columns() {
    return this.filterForm.get('columns') as FormArray;
  }
  get operators() {
    return this.filterForm.get('operators') as FormArray;
  }

  onLisaaSuodatin() {
    this.strings.push(this.formBuilder.control(''));
    this.operators.push(this.formBuilder.control(''));
    this.columns.push(this.formBuilder.control('>='));
    this.voiPoistaa = true;
  }
  onPoistaSuodatin() {
    this.strings.removeAt(this.strings.length-1);
    this.operators.removeAt(this.operators.length-1);
    this.columns.removeAt(this.columns.length-1);
    this.voiPoistaa = this.strings.length <= 1 ? false : true;
  }

}
