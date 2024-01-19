import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Observable } from 'rxjs';
import { AccountData } from '../../Interfaces/accountData.interface';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})



export class MainPageComponent {

  name:string= '';
  summonerName = '';
  tag:string='';
  accountJSON: AccountData | undefined;

  constructor(private api:ApiServiceService){

  }

  async giveServiceData(){
    this.splitName();
    this.api.summonerName = this.summonerName;
    this.api.tag = this.tag
    this.api.initURLS();
    const puuidData = await this.api.callApi(this.api.URL_GET_PUUID) as AccountData;
    console.log(puuidData.puuid)
    this.api.puuid = puuidData.puuid
    const summoner_ID = 
    this.accountJSON = this.api.accountJSON;
  }

  splitName(){
    const split = this.name.split('#');
    this.summonerName = split[0];
    this.tag = split[1];
  }

}
