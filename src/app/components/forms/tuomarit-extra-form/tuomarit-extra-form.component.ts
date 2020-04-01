import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IKyselyApu } from '../../../models/kyselyApu.model';
import { KyselyApuService } from '../../../services/kysely-apu.service';

@Component({
  selector: 'app-tuomarit-extra-form',
  templateUrl: './tuomarit-extra-form.component.html',
  styleUrls: ['./tuomarit-extra-form.component.css'],
})
export class TuomaritExtraFormComponent implements OnInit {

  @Input() parentForm: FormGroup;

  get apu(): IKyselyApu { return this.kas.kyselyData; }

  constructor(private kas: KyselyApuService) {
   }

  ngOnInit(): void {
    this.parentForm.addControl('kotijoukkue', new FormControl(''));
    this.parentForm.addControl('vierasjoukkue', new FormControl(''));
    this.parentForm.addControl('lukkari', new FormControl(''));
    this.parentForm.addControl('STPT', new FormControl(''));
  }

}
