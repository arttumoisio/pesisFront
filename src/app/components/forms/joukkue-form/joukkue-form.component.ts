import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IKyselyApu } from '../../../models/kyselyApu.model';
import { KyselyApuService } from '../../../services/kysely-apu.service';
import { DataService } from '../../../services/dataservice.service';
import { DotnetRESTservice } from '../../../services/dotnetAPI.service';
import { SortService } from '../../../services/sort.service';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-joukkue-form',
  templateUrl: './joukkue-form.component.html',
  styleUrls: ['./joukkue-form.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class JoukkueFormComponent implements OnInit, OnDestroy, AfterViewInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = false; // in production this is: false;
  suodinTeksti = 'Enemmän'; // in production this is: 'Enemmän'

  get apu(): IKyselyApu {return this.kyselyService.kyselyData; }

  constructor(private kyselyService: KyselyApuService,
              private ss: SortService,
              private dotnetApi: DotnetRESTservice,
              private ds: DataService,
              private fs: FilterService) { }

  ngOnInit() {
    this.reactiveKyselyForm = new FormGroup({});
  }

  ngAfterViewInit() {
    this.onSubmit();
  }

  ngOnDestroy() {
    this.ss.resetSortParams();
    this.fs.resetFilters();
    this.ds.resetData();
  }

  onLisaaSuodattimia() {
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? 'Vähemmän' : 'Enemmän';
  }

  onSubmit() {
    // console.log(this.reactiveKyselyForm.value);
    this.dotnetApi.onHaeJoukkueet(this.reactiveKyselyForm.value);
  }
}
