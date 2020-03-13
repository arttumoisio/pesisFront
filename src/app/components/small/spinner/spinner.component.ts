import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  loading = true;

  // imageUrl = 'https://karhupesis.fi/wp-content/uploads/2018/05/511_harrastuspallo-2.png';
  // imageUrl = 'https://upload.wikimedia.org/wikipedia/fi/thumb/0/07/Superpesis_vanha_logo.svg/320px-Superpesis_vanha_logo.svg.png';
  imageUrl = 'https://freesvg.org/img/Vintage-Baseball-Player-Illustration.png';

  constructor(private dataService: DataService) {
    dataService.dataLoadingEmitter.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {
  }

}
