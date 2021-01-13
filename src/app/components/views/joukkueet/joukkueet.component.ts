import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IKyselyApuState } from '../../../store/state/kyselyApu.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-joukkueet',
  templateUrl: './joukkueet.component.html',
  styleUrls: ['./joukkueet.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class JoukkueetComponent implements OnInit {

  kyselyApu: Observable<IKyselyApuState> ;
  constructor(private store: Store<{kyselyApu: IKyselyApuState}>) {}
  ngOnInit(): void {
    this.kyselyApu = this.store.select('kyselyApu');
  }
}
