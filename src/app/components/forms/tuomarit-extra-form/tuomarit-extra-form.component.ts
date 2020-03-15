import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KyselyApu } from 'src/app/models/kyselyApu.model';
import { KyselyApuService } from 'src/app/services/kysely-apu.service';

@Component({
  selector: 'app-tuomarit-extra-form',
  templateUrl: './tuomarit-extra-form.component.html',
  styleUrls: ['./tuomarit-extra-form.component.css']
})
export class TuomaritExtraFormComponent implements OnInit {
  
  @Input() parentForm: FormGroup;

  get apu(): KyselyApu { return this.kas.kyselyData;}

  constructor(private kas: KyselyApuService) {
   }

  ngOnInit(): void {
  }

}
