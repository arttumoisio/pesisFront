import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IKyselyApuState } from '../../../store/state/kyselyApu.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pelaajat',
  templateUrl: './pelaajat.component.html',
  styleUrls: ['./pelaajat.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class PelaajatComponent implements OnInit {

  kyselyApu: Observable<IKyselyApuState> ;
  constructor(private store: Store<{kyselyApu: IKyselyApuState}>) {}
  ngOnInit(): void {
    this.kyselyApu = this.store.select('kyselyApu');
  }
}
