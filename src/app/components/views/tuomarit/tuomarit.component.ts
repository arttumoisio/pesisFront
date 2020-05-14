import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IKyselyApuState } from '../../../store/state/kyselyApu.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tuomarit',
  templateUrl: './tuomarit.component.html',
  styleUrls: ['./tuomarit.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class TuomaritComponent implements OnInit {

  kyselyApu: Observable<IKyselyApuState> ;
  constructor(private store: Store<{kyselyApu: IKyselyApuState}>) {}
  ngOnInit(): void {
    this.kyselyApu = this.store.select('kyselyApu');
  }

}
