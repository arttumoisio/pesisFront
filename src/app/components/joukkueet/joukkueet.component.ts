import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KyselyApu } from '../../models/kyselyApu.model';
import { KyselyApuService } from 'src/app/services/kysely-apu.service';
import { DotnetRESTservice } from 'src/app/services/dotnetAPI.service';

@Component({
  selector: 'app-joukkueet',
  templateUrl: './joukkueet.component.html',
  styleUrls: ['./joukkueet.component.css']
})
export class JoukkueetComponent implements OnInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = true; // in production this is: false;
  suodinTeksti = 'Vähemmän'; // in production this is: 'Enemmän'

  apu: KyselyApu;
  naytaData: boolean;

  constructor(private kyselyService: KyselyApuService,
              private dotnetApi: DotnetRESTservice) { }

  ngOnInit() {
    this.apu = this.kyselyService.kyselyData;
    this.reactiveKyselyForm = new FormGroup({
      kaudetAlku: new FormControl(2020),
      kaudetLoppu: new FormControl(2020),
      summaa: new FormControl(false),
      joukkue: new FormControl(''),
      pelinTyyppi: new FormControl(''),
      paikka: new FormControl(''),
      tulos: new FormControl(''),
      vastustaja: new FormControl(''),
      suodin: new FormControl('Valitse Filtteri'),
      operator: new FormControl('gte'),
      luku: new FormControl(null),
    });
  }

  onLisaaSuodattimia() {
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? 'Vähemmän' : 'Enemmän';
  }

  onSubmit() {
    console.log(this.reactiveKyselyForm.value);
  }

  onNaytaData() {
    this.naytaData = !this.naytaData;
    console.log(this.naytaData);
  }
}
