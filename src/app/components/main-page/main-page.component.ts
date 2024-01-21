import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Observable } from 'rxjs';
import { AccountData } from '../../Interfaces/puuid.interface';
import { SummonerID } from '../../Interfaces/summonerID.interface';
import { RankedData } from '../../Interfaces/rankedStats.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  name: string = '';
  summonerName = '';
  tag: string = '';
  accountJSON: AccountData | undefined;

  constructor(private api: ApiServiceService) {}

  async initSummonerSearch() {
    this.splitName();
    this.assignData();
    this.api.initURLS();
    await this.getPUUID();
    await this.getSummonerID();
    await this.getRankedStats();
  }

  splitName() {
    if (this.name.includes(' ')) {
      this.name = this.name.replaceAll(' ', '');
    }
    const split = this.name.split('#');
    this.summonerName = split[0];
    this.tag = split[1];
  }

  assignData() {
    this.api.summonerName = this.summonerName;
    this.api.tag = this.tag;
  }

  async getPUUID() {
    
    console.log(this.api.summonerName);
    const puuidData = (await this.api.callApi(this.api.URL_GET_PUUID)) as AccountData;
    this.api.puuid = puuidData.puuid;
    this.api.initURLS();
  }

  async getSummonerID() {
    const summonerID = await this.api.callApi(this.api.URL_GET_SUMMONERID) as SummonerID;
    this.api.summonerID = summonerID.id;
    this.api.initURLS();
  }

  async getRankedStats(){
    const rankedData = await this.api.callApi(this.api.URL_GET_RANKED_DATA) as RankedData;
    console.log(rankedData[0].leaguePoints)
}
}
