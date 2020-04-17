import { Component, OnInit, Input } from '@angular/core';
import { IKyselyApu } from 'src/app/models/kyselyApu.model';
import { KyselyApuService } from 'src/app/services/kysely-apu.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-extra-fields',
  templateUrl: './extra-fields.component.html',
  styleUrls: ['./extra-fields.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class ExtraFieldsComponent implements OnInit {

  @Input() parentForm: FormGroup;

  get apu(): IKyselyApu { return this.kas.kyselyData;}

  constructor(private kas: KyselyApuService) { }

  ngOnInit(): void {
  }

}
