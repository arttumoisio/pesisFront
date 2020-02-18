import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KyselyApu } from '../../models/kyselyApu.model';
import { KyselyApuService } from 'src/app/services/kysely-apu.service';
import { FirebaseServiceService } from 'src/app/services/firebase-service.service';

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
              private firebase: FirebaseServiceService) { }

  ngOnInit() {
    this.apu = this.kyselyService.kyselyData;
    this.reactiveKyselyForm = new FormGroup({
      kaudetAlku: new FormControl(2020),
      kaudetLoppu: new FormControl(2020),
      summaa: new FormControl(false),
      joukkue: new FormControl('Mikä tahansa'),
      pelinTyyppi: new FormControl('Mikä tahansa'),
      paikka: new FormControl('Koti/Vieras'),
      tulos: new FormControl('Voitto/Tappio'),
      vastustaja: new FormControl('Vastustaja'),
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
    this.firebase.onCreateJoukkuePost(this.reactiveKyselyForm.value);

  }

  onNaytaData() {
    this.naytaData = !this.naytaData;
    console.log(this.naytaData);
  }
}
