import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IKyselyApu } from '../../../models/kyselyApu.model';
import { KyselyApuService } from '../../../services/kysely-apu.service';
import { DotnetRESTservice } from '../../../services/dotnetAPI.service';
import { DataService } from '../../../services/dataservice.service';
import { SortService } from '../../../services/sort.service';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-pelaaja-form',
  templateUrl: './pelaaja-form.component.html',
  styleUrls: ['./pelaaja-form.component.css']
})
export class PelaajaFormComponent implements OnInit, OnDestroy, AfterViewInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = false;
  suodinTeksti = 'Enemmän';

  get apu(): IKyselyApu {return this.kyselyService.kyselyData;}

  constructor(
    private kyselyService: KyselyApuService,
    private ss: SortService,
    private dotnetApi: DotnetRESTservice,
    private ds: DataService,
    private fs: FilterService,
    ) {}

  ngOnInit() {
    const minKausi = this.apu.kaudet[0];
    const maxKausi = this.apu.kaudet[this.apu.kaudet.length - 1];
    this.reactiveKyselyForm = new FormGroup({});
  }
  
  ngAfterViewInit(){
    this.onSubmit();
  }

  ngOnDestroy(){
    this.ss.resetSortParams();
    this.fs.resetFilters();
    this.ds.resetData();
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
    this.ds.startLoading();
    this.dotnetApi.onHaePelaajat(this.reactiveKyselyForm.value)
    .subscribe( (responseData => {
        const data = [];
        for (const elem in responseData) {
          if (elem) {
            data.push(responseData[elem]);
          }
        }
        this.ds.setRawData(data);
    }));

  }

}
