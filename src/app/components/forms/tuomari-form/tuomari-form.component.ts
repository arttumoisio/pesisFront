import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SortService } from '../../../services/sort.service';
import { DotnetRESTservice } from '../../../services/dotnetAPI.service';
import { DataService } from '../../../services/dataservice.service';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tuomari-form',
  templateUrl: './tuomari-form.component.html',
  styleUrls: ['./tuomari-form.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class TuomariFormComponent implements OnInit, AfterViewInit {

  reactiveKyselyForm: FormGroup;
  lisaaSuodattimia = false; // in production this is: false;
  suodinTeksti = 'Enemmän'; // in production this is: 'Enemmän'

  constructor(private ss: SortService,
              private dotnetApi: DotnetRESTservice,
              private ds: DataService,
              ) { }

  ngOnInit() {
    this.reactiveKyselyForm = new FormGroup({    });
  }

  ngAfterViewInit() {
    this.onSubmit();
  }

  ngOnDestroy() {
    this.ss.resetSortParams();
    this.ds.resetData();
  }

  onLisaaSuodattimia() {
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? 'Vähemmän' : 'Enemmän';
  }

  onSubmit() {
    // console.log(this.reactiveKyselyForm.value);
    this.dotnetApi.onHaeTuomarit(this.reactiveKyselyForm.value);
  }
}
