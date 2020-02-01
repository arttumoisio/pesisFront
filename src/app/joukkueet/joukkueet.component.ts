import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KyselyApu } from '../kyselyApu.model';
import { KyselyApuService } from '../kysely-apu.service';

@Component({
  selector: 'app-joukkueet',
  templateUrl: './joukkueet.component.html',
  styleUrls: ['./joukkueet.component.css']
})
export class JoukkueetComponent implements OnInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia: boolean = true; // in production this is: false;
  suodinTeksti: string = "Vähemmän"; // in production this is: "Enemmän"

  apu: KyselyApu;

  constructor(private kyselyService: KyselyApuService) { }

  ngOnInit() {
    this.apu = this.kyselyService.kyselyData;
    this.reactiveKyselyForm = new FormGroup({
      'kaudetAlku': new FormControl(2020),
      'kaudetLoppu': new FormControl(2020),
      'summaa': new FormControl(false),
      'joukkue': new FormControl("Mikä tahansa"),
      'pelinTyyppi': new FormControl("Mikä tahansa"),
      'paikka': new FormControl("Koti/Vieras"),
      'tulos': new FormControl("Voitto/Tappio"),
      'vastustaja': new FormControl("Vastustaja"),
      'suodin': new FormControl("Valitse Filtteri"),
      'operator': new FormControl("gte"),
      'luku': new FormControl(null),
    });
  }

  onLisaaSuodattimia(){
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? "Vähemmän" : "Enemmän"
  }

  onSubmit(){
    console.log(this.reactiveKyselyForm.value);
  }
}
