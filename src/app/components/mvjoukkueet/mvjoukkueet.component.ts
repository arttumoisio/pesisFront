import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KyselyApu } from '../../models/kyselyApu.model';
import { KyselyApuService } from '../../services/kysely-apu.service';
import { DataService } from '../../services/dataservice.service';
import { DotnetRESTservice } from 'src/app/services/dotnetAPI.service';

@Component({
  selector: 'app-mvjoukkueet',
  templateUrl: './mvjoukkueet.component.html',
  styleUrls: ['./mvjoukkueet.component.css']
})
export class MVJoukkueetComponent implements OnInit, AfterViewInit {

  reactiveKyselyForm: FormGroup;

  lisaaSuodattimia = false; // in production this is: false;
  piilotaValikko = false; // in production this is: false;
  suodinTeksti = 'Enemmän'; // in production this is: 'Enemmän'
  piilotusTeksti = 'Piilota Valikko'; // in production this is: 'Enemmän'
  submitted = false;

  apu: KyselyApu;
  naytaData: boolean;

  constructor(private kyselyService: KyselyApuService,
              private dotnetApi: DotnetRESTservice,
              private dataService: DataService) { }

  ngOnInit() {
    this.apu = this.kyselyService.kyselyData;
    this.reactiveKyselyForm = new FormGroup({
      kaudetAlku: new FormControl(2010),
      kaudetLoppu: new FormControl(2020),
      vuosittain: new FormControl(true),
      joukkue: new FormControl('Mikä tahansa')
    });
    this.onSubmit();
  }

  ngAfterViewInit(){
  }

  onLisaaSuodattimia() {
    this.lisaaSuodattimia = !this.lisaaSuodattimia;
    this.suodinTeksti = this.lisaaSuodattimia ? 'Vähemmän' : 'Enemmän';
  }
  onPiilotaValikko() {
    this.piilotaValikko = !this.piilotaValikko;
    this.piilotusTeksti = this.piilotaValikko ? 'Näytä Valikko' : 'Piilota Valikko';
  }

  onSubmit() {
    //console.log(this.reactiveKyselyForm.value);
    this.dataService.startLoading();
    this.submitted = true;
    this.dotnetApi.onHaeJoukkueet(this.reactiveKyselyForm.value)
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

  onNaytaData() {
    this.naytaData = !this.naytaData;
    console.log(this.naytaData);
  }
}
