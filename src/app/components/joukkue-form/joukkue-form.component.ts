import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KyselyApu } from '../../models/kyselyApu.model';
import { KyselyApuService } from '../../services/kysely-apu.service';
import { DataService } from '../../services/dataservice.service';
import { DotnetRESTservice } from 'src/app/services/dotnetAPI.service';

@Component({
  selector: 'app-joukkue-form',
  templateUrl: './joukkue-form.component.html',
  styleUrls: ['./joukkue-form.component.css']
})
export class JoukkueFormComponent implements OnInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = false; // in production this is: false;
  suodinTeksti = 'Enemmän'; // in production this is: 'Enemmän'
  submitted = false;

  apu: KyselyApu;
  naytaData: boolean;

  constructor(private kyselyService: KyselyApuService,
              private dotnetApi: DotnetRESTservice,
              private dataService: DataService) { }

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
      vuosittain: new FormControl(true),
      joukkue: new FormControl(''),
      paikka:   new FormControl(''),
      vastustaja:   new FormControl(''),
      tulos:   new FormControl(''),
    });
    this.onSubmit();
  }

  onLisaaSuodattimia() {
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? 'Vähemmän' : 'Enemmän';
  }

  onSubmit() {
    this.dataService.startLoading();
    this.submitted = true;
    console.log(this.reactiveKyselyForm.value);
    this.dotnetApi.onHaeJoukkueet(this.reactiveKyselyForm.value)
    .subscribe( (responseData => {
        const data = [];
        for (const elem in responseData) {
          if (elem) {
            data.push(responseData[elem]);
          }
        }
        this.dataService.setRawData(data);
    }));
  }

  onNaytaData() {
    this.naytaData = !this.naytaData;
  }
}
