import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KyselyApu } from 'src/app/models/kyselyApu.model';
import { KyselyApuService } from 'src/app/services/kysely-apu.service';
import { DataService } from 'src/app/services/dataservice.service';
import { DotnetRESTservice } from 'src/app/services/dotnetAPI.service';
import { SortService } from 'src/app/services/sort.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-joukkue-form',
  templateUrl: './joukkue-form.component.html',
  styleUrls: ['./joukkue-form.component.css']
})
export class JoukkueFormComponent implements OnInit, OnDestroy {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = false; // in production this is: false;
  suodinTeksti = 'Enemmän'; // in production this is: 'Enemmän'

  get apu(): KyselyApu {return this.kyselyService.kyselyData;};

  constructor(private kyselyService: KyselyApuService,
              private ss: SortService,
              private dotnetApi: DotnetRESTservice,
              private ds: DataService,
              private fs: FilterService) { }

  ngOnInit() {
    const minKausi = this.apu.kaudet[0];
    const maxKausi = this.apu.kaudet[this.kyselyService.kyselyData.kaudet.length - 1];
    this.reactiveKyselyForm = new FormGroup({
      kaudetAlku:   new FormControl(
        minKausi, 
        [Validators.min(minKausi), Validators.max(maxKausi)]
      ),
      kaudetLoppu:  new FormControl(
        maxKausi, 
        [Validators.min(minKausi), Validators.max(maxKausi)]
      ),
      sarjavaihe:   new FormControl(''),
      sarja:   new FormControl('Miesten superpesis'),
      vuosittain: new FormControl(false),
      joukkue: new FormControl(''),
      paikka:   new FormControl(''),
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
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? 'Vähemmän' : 'Enemmän';
  }

  onSubmit() {
    this.ds.startLoading();
    // console.log(this.reactiveKyselyForm.value);
    this.dotnetApi.onHaeJoukkueet(this.reactiveKyselyForm.value)
    .subscribe((responseData: object[]) => {
        const data = [];
        responseData.map((elem)=>{data.push(elem)});
        this.ds.setRawData(data);
    });
  }
}
