import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

  name:string= '';
  tag:string='';
  result$?: Observable<any>

  constructor(private api:ApiServiceService){

  }

  giveServiceData(){
    const split = this.name.split('#');
    this.api.summonerName = split[0];
    this.api.tag = split[1];
    this.result$ = this.api.getRiotId()
    this.result$?.subscribe((val: string) => {
      console.log(val)
    })
  }


}
