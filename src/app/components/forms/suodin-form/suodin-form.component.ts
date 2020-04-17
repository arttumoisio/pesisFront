import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-suodin-form',
  templateUrl: './suodin-form.component.html',
  styleUrls: ['./suodin-form.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class SuodinFormComponent implements OnInit {
  
  filterForm: FormGroup;
  get otsikot(): string[]{return this.ds.getOtsikot();}

  constructor(private ds: DataService,
              private formBuilder: FormBuilder,
              private fs: FilterService) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      string: this.formBuilder.control(''),
      column: this.formBuilder.control('')
    });
  }

  onSuodata () {
    this.fs.setStrFilter({
      string:this.filterForm.value.string,
      operator:'',
      column:this.filterForm.value.column
    });
  }

}
