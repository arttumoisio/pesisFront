import { Component, OnInit } from '@angular/core';
import { KyselyApuService } from '../kysely-apu.service';
import { KyselyApu } from '../kyselyApu.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from '../services/firebase-service.service';

@Component({
  selector: 'app-pelaajat',
  templateUrl: './pelaajat.component.html',
  styleUrls: ['./pelaajat.component.css']
})
export class PelaajatComponent implements OnInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia: boolean = true;
  naytaData: boolean = false;
  suodinTeksti: string = "Vähemmän";
  //@ViewChild("kyselyForm", {static: false}) kyselyForm: NgForm;

  apu: KyselyApu;

  //myForm = new FormControl('');

  constructor(
    private kyselyService: KyselyApuService,
    private firebase: FirebaseServiceService) { 

    }

  ngOnInit() {
    this.apu = this.kyselyService.kyselyData;
    this.reactiveKyselyForm = new FormGroup({
      'kaudetAlku':   new FormControl(2020, [Validators.min(2003),Validators.max(2020)]),
      'kaudetLoppu':  new FormControl(2020, [Validators.min(2003),Validators.max(2020)]),
      'summaa':       new FormControl(false),
      'joukkue':      new FormControl("Mikä tahansa"),
      'pelinTyyppi':  new FormControl("Mikä tahansa"),
      'nimi':         new FormControl(null),
      'upPaikka':     new FormControl("Mikä tahansa"),
      'spNumero':     new FormControl("Mikä tahansa"),
      'handness':     new FormControl("Mikä tahansa"),
      'paikka':       new FormControl("Koti/Vieras"),
      'tulos':        new FormControl("Voitto/Tappio"),
      'vastustaja':   new FormControl("Vastustaja"),
      'suodin':       new FormControl("Valitse Filtteri"),
      'operator':     new FormControl("gte"),
      'luku':         new FormControl(null, Validators.min(1)),
    });
  }

  onLisaaSuodattimia(){
    if (this.lisaaSuodattimia){
      this.reactiveKyselyForm.addControl('operator', new FormControl('equals'));
    }
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? "Vähemmän" : "Enemmän"
  }

  onSubmit(){
    console.log(this.reactiveKyselyForm.value);
    this.firebase.onCreatePelaajaPost(this.reactiveKyselyForm.value);

  }

  onNaytaData(){
    this.naytaData = !this.naytaData;
    console.log(this.naytaData);
  }

}
