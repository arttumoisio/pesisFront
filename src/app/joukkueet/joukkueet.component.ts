import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { KyselyApu } from '../kyselyApu.model';
import { KyselyApuService } from '../kysely-apu.service';

@Component({
  selector: 'app-joukkueet',
  templateUrl: './joukkueet.component.html',
  styleUrls: ['./joukkueet.component.css']
})
export class JoukkueetComponent implements OnInit {

  lisaaSuodattimia: boolean = false;
  suodinTeksti: string = "Enemmän";
  @ViewChild("kyselyForm", {static: false}) kyselyForm: NgForm;

  apu: KyselyApu;

  myForm = new FormControl('');

  constructor(private kyselyService: KyselyApuService) { }

  ngOnInit() {
    this.apu = this.kyselyService.kyselyData
  }

  onLisaaSuodattimia(){
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? "Vähemmän" : "Enemmän"
  }

  onSubmit(){
    console.log(this.kyselyForm.value);
  }
}
