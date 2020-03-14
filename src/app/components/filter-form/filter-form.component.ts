import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit, OnDestroy {
  otsikot: string[];
  voiPoistaa: boolean = false;
  operaattorit: string[] = [
    ">=",
    "<=",
    "=",
    "!=",
  ];

  filterForm: FormGroup;
  intFilters: {
    string: string;
    operator: string;
    column: string;
  }[];

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private fs: FilterService) { }

  ngOnInit(): void {
    this.otsikot = this.dataService.getOtsikot();

    this.filterForm = this.formBuilder.group({
      column: this.formBuilder.control('Ottelut',[Validators.required]),
      operator: this.formBuilder.control('>=',[Validators.required]),
      string: this.formBuilder.control('',[Validators.required,Validators.minLength(1)],),

    });
    this.fs.filterEmitter.subscribe(()=>{
      console.log('filterform sai');
      this.otsikot = this.dataService.getOtsikot();
      this.intFilters = this.fs.getIntFilters();
    });
  }
  ngOnDestroy(){
    this.fs.setIntFilters([]);
    this.fs.filterEmitter.unsubscribe();
  }

  onSuodata () {
    console.log('Sent', this.filterForm.value);
    this.fs.addIntFilter(this.filterForm.value);
  }

  onLisaaSuodatin() {
    this.voiPoistaa = true;
    this.onSuodata();
  }
  
  removeFilter(filter: {string:string;operator:string;column:string;}){
    console.log('remove filter');
    
    this.fs.removeIntFilter(filter);
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
