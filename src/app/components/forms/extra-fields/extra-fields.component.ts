import { Component, OnInit, Input } from '@angular/core';
import { KyselyApu } from 'src/app/models/kyselyApu.model';
import { KyselyApuService } from 'src/app/services/kysely-apu.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-extra-fields',
  templateUrl: './extra-fields.component.html',
  styleUrls: ['./extra-fields.component.css']
})
export class ExtraFieldsComponent implements OnInit {

  @Input() parentForm: FormGroup;

  apu: KyselyApu;

  constructor(private kas: KyselyApuService) { }

  ngOnInit(): void {
    this.apu = this.kas.kyselyData;
  }

}
