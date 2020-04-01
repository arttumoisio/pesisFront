import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
export class JoukkueFormComponent implements OnInit, OnDestroy, AfterViewInit {

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
