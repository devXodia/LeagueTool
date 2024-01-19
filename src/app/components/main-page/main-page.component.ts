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
    const puuid = await this.api.callApi(this.api.URL_GET_PUUID);
    console.log(puuid)
    const id = await this.api.callApi(this.api.URL_GET_SUMMONERID);
    console.log(id)
    const rankedData = await this.api.callApi(this.api.URL_GET_RANKED_DATA)
    console.log(rankedData)
    this.accountJSON = this.api.accountJSON;
  }

  splitName(){
    const split = this.name.split('#');
    this.summonerName = split[0];
    this.tag = split[1];
  }

}
