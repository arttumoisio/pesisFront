import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IKyselyApu } from '../../../models/kyselyApu.model';
import { KyselyApuService } from '../../../services/kysely-apu.service';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class BasicFormComponent implements OnInit, OnDestroy {

  @Input() parentForm: FormGroup;
  @Input() lisaaSuodattimia: boolean;

  get apu(): IKyselyApu { return this.kas.kyselyData; }

  constructor(private kas: KyselyApuService) { }

  ngOnInit(): void {
    // const minKausi = this.apu.kaudet[this.kas.kyselyData.kaudet.length - 1];
    const alkuKausi = 2010;
    const maxKausi = this.apu.kaudet[0];
    this.parentForm.addControl('kaudetAlku', new FormControl(
      alkuKausi,
      [Validators.min(alkuKausi), Validators.max(maxKausi)],
    ));
    this.parentForm.addControl('kaudetLoppu', new FormControl(
      maxKausi,
      [Validators.min(alkuKausi), Validators.max(maxKausi)],
    ));
    this.parentForm.addControl('vuosittain', new FormControl(false));
    this.parentForm.addControl('sarjavaihe', new FormControl('Runkosarja'));
    this.parentForm.addControl('sarja', new FormControl('Miesten superpesis'));
  }

  ngOnDestroy() {
    this.kas.haeLukkarit();
    this.kas.haeJoukkueet();
  }

  paivita() {
    this.kas.haeLukkarit(
      this.parentForm.value.kaudetAlku,
      this.parentForm.value.kaudetLoppu,
      this.parentForm.value.sarja,
      this.parentForm.value.sarjavaihe,
      );
    this.kas.haeJoukkueet(
      this.parentForm.value.kaudetAlku,
      this.parentForm.value.kaudetLoppu,
      this.parentForm.value.sarja,
      this.parentForm.value.sarjavaihe,
      );
    }

  onAlku() {
    // console.log('alku vaihtui');
    this.paivita();
  }
  onLoppu() {
    // console.log('loppu vaihtui');
    this.paivita();
  }
  onSarja() {
    // console.log('sarja vaihtui');
    this.paivita();
  }
  onSarjavaihe() {
    // console.log('sarjavaihe vaihtui');
    this.paivita();
  }
}
