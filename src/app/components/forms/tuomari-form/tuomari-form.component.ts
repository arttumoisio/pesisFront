import { Component, OnInit } from '@angular/core';
import { KyselyApuService } from 'src/app/services/kysely-apu.service';
import { SortService } from 'src/app/services/sort.service';
import { DotnetRESTservice } from 'src/app/services/dotnetAPI.service';
import { DataService } from 'src/app/services/dataservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KyselyApu } from 'src/app/models/kyselyApu.model';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-tuomari-form',
  templateUrl: './tuomari-form.component.html',
  styleUrls: ['./tuomari-form.component.css']
})
export class TuomariFormComponent implements OnInit {
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
      vuosittain: new FormControl(false),
      kotijoukkue: new FormControl(''),
      vierasjoukkue: new FormControl(''),
      lukkari: new FormControl(''),
      STPT: new FormControl(''),
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
    // console.log(this.reactiveKyselyForm.value);
    this.ds.startLoading();
    this.dotnetApi.onHaeTuomarit(this.reactiveKyselyForm.value)
    .subscribe((responseData: object[]) => {
        const data = [];
        responseData.map((elem)=>{data.push(elem)});
        this.ds.setRawData(data);
    });
  }
}
