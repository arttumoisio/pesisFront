import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IKyselyApu } from '../../../models/kyselyApu.model';
import { KyselyApuService } from '../../../services/kysely-apu.service';

@Component({
  selector: 'app-teams-extra-form',
  templateUrl: './teams-extra-form.component.html',
  styleUrls: ['./teams-extra-form.component.css']
})
export class TeamsExtraFormComponent implements OnInit {
  
  @Input() parentForm: FormGroup;

  get apu(): IKyselyApu { return this.kas.kyselyData;}

  constructor(private kas: KyselyApuService) { }

  ngOnInit(): void {
    this.parentForm.addControl('joukkue', new FormControl(''));
    this.parentForm.addControl('paikka', new FormControl(''));
    this.parentForm.addControl('vastustaja', new FormControl(''));
    this.parentForm.addControl('tulos', new FormControl(''));
  }

}
