import { Component, OnInit, ViewChild } from '@angular/core';
import { KyselyApuService } from '../kysely-apu.service';
import { KyselyApu } from '../kyselyApu.model';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pelaajat',
  templateUrl: './pelaajat.component.html',
  styleUrls: ['./pelaajat.component.css']
})
export class PelaajatComponent implements OnInit {

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