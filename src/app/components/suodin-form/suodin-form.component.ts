import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-suodin-form',
  templateUrl: './suodin-form.component.html',
  styleUrls: ['./suodin-form.component.css']
})
export class SuodinFormComponent implements OnInit {
  otsikot: string[];
  voiPoistaa: boolean = false;

  filterForm: FormGroup;

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private fs: FilterService) { }

  ngOnInit(): void {
    this.otsikot = this.dataService.getOtsikot();

    this.filterForm = this.formBuilder.group({
      string: this.formBuilder.control(''),
      column: this.formBuilder.control('')
    });
    this.dataService.dataChangedEmitter.subscribe(()=>{
      console.log('suodin-form sai');
      this.otsikot = this.dataService.getOtsikot();
    });
  }

  onSuodata () {
    console.log('Sent', this.filterForm.value);
    let string = this.filterForm.value.string;
    let column = this.filterForm.value.column;
    this.fs.setStrFilter(
      {string:string,
        operator:'',
        column:column}
    );
  }

  get strings() {
    return this.filterForm.get('strings') as FormArray;
  }
  get columns() {
    return this.filterForm.get('columns') as FormArray;
  }

}
