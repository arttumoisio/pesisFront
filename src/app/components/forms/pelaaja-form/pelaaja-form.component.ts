import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KyselyApu } from 'src/app/models/kyselyApu.model';
import { KyselyApuService } from 'src/app/services/kysely-apu.service';
import { DotnetRESTservice } from 'src/app/services/dotnetAPI.service';
import { DataService } from 'src/app/services/dataservice.service';
import { SortService } from 'src/app/services/sort.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-pelaaja-form',
  templateUrl: './pelaaja-form.component.html',
  styleUrls: ['./pelaaja-form.component.css']
})
export class PelaajaFormComponent implements OnInit, OnDestroy {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = false;
  suodinTeksti = 'Enemmän';

  get apu():KyselyApu {return this.kyselyService.kyselyData;}

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
    this.reactiveKyselyForm = new FormGroup({
      kaudetAlku:   new FormControl(
        minKausi, 
        [Validators.min(minKausi), Validators.max(maxKausi)]
      ),
      kaudetLoppu:  new FormControl(
        maxKausi, 
        [Validators.min(minKausi), Validators.max(maxKausi)]
      ),
      vuosittain:   new FormControl(true),
      paikka:   new FormControl(''),
      joukkue:   new FormControl(''),
      vastustaja:   new FormControl(''),
      tulos:   new FormControl(''),
    });
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
