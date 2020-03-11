import { Component, OnInit } from '@angular/core';
import { KyselyApuService } from '../../services/kysely-apu.service';
import { KyselyApu } from '../../models/kyselyApu.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/dataservice.service';
import { DotnetRESTservice } from 'src/app/services/dotnetAPI.service';

@Component({
  selector: 'app-mvpelaajat',
  templateUrl: './mvpelaajat.component.html',
  styleUrls: ['./mvpelaajat.component.css']
})
export class MVPelaajatComponent implements OnInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = true;
  suodinTeksti = 'Vähemmän';
  apu: KyselyApu;
  submitted = false;

  constructor(
    private kyselyService: KyselyApuService,
    private dotnetApi: DotnetRESTservice,
    private dataService: DataService
    ) {}

  ngOnInit() {
    const minKausi = this.kyselyService.kyselyData.kaudet[0];
    const maxKausi = this.kyselyService.kyselyData.kaudet[this.kyselyService.kyselyData.kaudet.length - 1];
    this.apu = this.kyselyService.kyselyData;
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
    });
    this.onSubmit();
  }

  onLisaaSuodattimia() {
    if (this.lisaaSuodattimia) {
      this.reactiveKyselyForm.addControl('operator', new FormControl('equals'));
    }
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? 'Vähemmän' : 'Enemmän';
  }


  onSubmit() {
    this.dataService.startLoading();
    this.submitted = true;
    this.dotnetApi.onHaePelaajat(this.reactiveKyselyForm.value)
    .subscribe( (responseData => {
        const data = [];
        for (const elem in responseData) {
          if (elem) {
            data.push(responseData[elem]);
          }
        }
        this.dataService.setData(data);
    }));

  }

}
