import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KyselyApu } from 'src/app/models/kyselyApu.model';
import { KyselyApuService } from 'src/app/services/kysely-apu.service';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {
  
  @Input() parentForm: FormGroup;
  @Input() lisaaSuodattimia: boolean;

  get apu(): KyselyApu { return this.kas.kyselyData;}

  constructor(private kas: KyselyApuService) { }

  ngOnInit(): void {
  }
}
