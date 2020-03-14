import { Component, OnInit } from '@angular/core';
import { KyselyApuService } from '../../services/kysely-apu.service';
import { KyselyApu } from '../../models/kyselyApu.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DotnetRESTservice } from 'src/app/services/dotnetAPI.service';

@Component({
  selector: 'app-pelaajat',
  templateUrl: './pelaajat.component.html',
  styleUrls: ['./pelaajat.component.css']
})
export class PelaajatComponent implements OnInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = true;
  naytaData = false;
  suodinTeksti = 'Vähemmän';
  // @ViewChild('kyselyForm', {static: false}) kyselyForm: NgForm;

  apu: KyselyApu;

  // myForm = new FormControl('');

  constructor(
    private kyselyService: KyselyApuService,
    private firebase: DotnetRESTservice) {
    }

  ngOnInit() {
    this.apu = this.kyselyService.kyselyData;
    this.reactiveKyselyForm = new FormGroup({
      kaudetAlku:   new FormControl(2020, [Validators.min(2003),Validators.max(2020)]),
      kaudetLoppu:  new FormControl(2020, [Validators.min(2003),Validators.max(2020)]),
      summaa:       new FormControl(false),
      joukkue:      new FormControl(''),
      pelinTyyppi:  new FormControl(''),
      nimi:         new FormControl(null),
      upPaikka:     new FormControl(''),
      spNumero:     new FormControl(''),
      handness:     new FormControl(''),
      paikka:       new FormControl(''),
      tulos:        new FormControl(''),
      vastustaja:   new FormControl(''),
      suodin:       new FormControl(''),
      operator:     new FormControl(''),
      luku:         new FormControl(null, Validators.min(1)),
    });
  }

  onLisaaSuodattimia(){
    if (this.lisaaSuodattimia) {
      this.reactiveKyselyForm.addControl('operator', new FormControl('equals'));
    }
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
