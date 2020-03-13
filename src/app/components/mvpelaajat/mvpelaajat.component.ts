import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';
@Component({
  selector: 'app-mvpelaajat',
  templateUrl: './mvpelaajat.component.html',
  styleUrls: ['./mvpelaajat.component.css']
})
export class MVPelaajatComponent implements OnInit {

  piilotaValikko = false;

  constructor (private ds: DataService) {
  }
  
  ngOnInit(){
    this.ds.piilotusEmitter.subscribe(()=>{
      this.piilotaValikko = !this.piilotaValikko
    });
  }
}
