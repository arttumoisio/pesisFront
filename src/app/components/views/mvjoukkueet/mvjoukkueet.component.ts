import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IKyselyApuState } from '../../../store/state/kyselyApu.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mvjoukkueet',
  templateUrl: './mvjoukkueet.component.html',
  styleUrls: ['./mvjoukkueet.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class MVJoukkueetComponent implements OnInit {

  kyselyApu: Observable<IKyselyApuState> ;
  constructor(private store: Store<{kyselyApu: IKyselyApuState}>) {}
  ngOnInit(): void {
    this.kyselyApu = this.store.select('kyselyApu');
  }
}
