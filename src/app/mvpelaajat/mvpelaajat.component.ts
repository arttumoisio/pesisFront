import { Component, OnInit } from '@angular/core';
import { KyselyApuService } from '../services/kysely-apu.service';
import { KyselyApu } from '../models/kyselyApu.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceService } from '../services/firebase-service.service';
import { DataService } from '../services/dataservice.service';

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
    private firebase: FirebaseServiceService,
    private dataService: DataService
    ) {}

  ngOnInit() {
    this.apu = this.kyselyService.kyselyData;
    this.reactiveKyselyForm = new FormGroup({
      kaudetAlku:   new FormControl(2010, [Validators.min(2003), Validators.max(2020)]),
      kaudetLoppu:  new FormControl(2020, [Validators.min(2003), Validators.max(2020)]),
      vuosittain:   new FormControl(false),
    });
  }

  onLisaaSuodattimia() {
    if (this.lisaaSuodattimia) {
      this.reactiveKyselyForm.addControl('operator', new FormControl('equals'));
    }
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? 'Vähemmän' : 'Enemmän';
  }


  onSubmit() {
    // console.log(this.reactiveKyselyForm.value);
    this.firebase.onHaePelaajat(this.reactiveKyselyForm.value)
    .subscribe( (responseData => {
        const data = [];
        for (const elem in responseData) {
          if (elem) {
            data.push(responseData[elem]);
          }
        }
        this.dataService.setData(data);
        this.submitted = true;
    }));

  }

}
