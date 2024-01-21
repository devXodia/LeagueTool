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

  async initSummonerSearch(){
    this.splitName();
    this.assignData();
    this.api.initURLS();
    await this.getPUUID();
    await this.getSummonerID();
  }

  splitName(){
    if(this.name.includes(" ")){
      this.name = this.name.replaceAll(' ','')
    }
    const split = this.name.split('#');
    this.summonerName = split[0];
    this.tag = split[1];
  }

  assignData(){
    this.api.summonerName = this.summonerName;
    this.api.tag = this.tag;
  }

  async getPUUID(){
    const puuidData = await this.api.callApi(this.api.URL_GET_PUUID) as AccountData;
    this.api.puuid = puuidData.puuid
   
  }

  async getSummonerID(){
    const summonerID = await this.api.callApi(this.api.URL_GET_SUMMONERID);
    console.log(summonerID);
  }
}
