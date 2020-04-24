import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IKyselyApuState } from '../../store/state/kyselyapu.state';
import * as KyselyApuActions from '../../store/actions/kyselyApu.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigointi',
  templateUrl: './navigointi.component.html',
  styleUrls: ['./navigointi.component.css'],
  host: {
    class: 'customComponent',
  },
})

export class NavigointiComponent implements OnInit {

  constructor(
    private store: Store<{
      kyselyApu: IKyselyApuState,
      piilotus: boolean,
    }>,
   ) { }

  ngOnInit() {
    this.piilotaValikko = this.store.select('kyselyApu');
  }

  piilotaValikko: Observable<IKyselyApuState> ;
  onPiilotaValikko() {
    this.store.dispatch(new KyselyApuActions.TogglePiilotus());
  }

}
