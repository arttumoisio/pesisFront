import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IKyselyApuState } from '../../../store/state/kyselyapu.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mvpelaajat',
  templateUrl: './mvpelaajat.component.html',
  styleUrls: ['./mvpelaajat.component.css'],
  host: {
    class: 'customComponent',
  },
})
export class MVPelaajatComponent implements OnInit {

  kyselyApu: Observable<IKyselyApuState> ;
  constructor(private store: Store<{kyselyApu: IKyselyApuState}>) {}
  ngOnInit(): void {
    this.kyselyApu = this.store.select('kyselyApu');
  }
}
