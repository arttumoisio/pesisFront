import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IKyselyApu } from '../../../models/kyselyApu.model';
import { KyselyApuService } from '../../../services/kysely-apu.service';
import { DotnetRESTservice } from '../../../services/dotnetAPI.service';
import { SortService } from '../../../services/sort.service';

@Component({
  selector: 'app-pelaaja-form',
  templateUrl: './pelaaja-form.component.html',
  styleUrls: ['./pelaaja-form.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class PelaajaFormComponent implements OnInit, OnDestroy, AfterViewInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = false;
  suodinTeksti = 'Enemmän';

  get apu(): IKyselyApu {return this.kyselyService.kyselyData; }

  constructor(
    private kyselyService: KyselyApuService,
    private ss: SortService,
    private dotnetApi: DotnetRESTservice,
    ) {}

  ngOnInit() {
    this.reactiveKyselyForm = new FormGroup({});
  }

  ngAfterViewInit() {
    this.onSubmit();
  }

  ngOnDestroy() {
    this.ss.resetSortParams();
  }

  onLisaaSuodattimia() {
    if (this.lisaaSuodattimia) {
      this.reactiveKyselyForm.addControl('operator', new FormControl('equals'));
    }
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? 'Vähemmän' : 'Enemmän';
  }

  onSubmit() {
    // console.log(this.reactiveKyselyForm.value);

    this.dotnetApi.onHaePelaajat(this.reactiveKyselyForm.value);

  }

}
