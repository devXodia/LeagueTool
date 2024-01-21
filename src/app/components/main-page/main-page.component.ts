import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Observable } from 'rxjs';
import { PuuidData } from '../../Interfaces/puuid.interface';
import { SummonerID } from '../../Interfaces/summonerID.interface';
import { RankedData } from '../../Interfaces/rankedStats.interface';
import { RankedJson } from '../../Interfaces/rankedJson.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  name: string = '';
  summonerName = '';
  tag: string = '';
  accountJSON: PuuidData | undefined;
  loadingDone: boolean = false;
  rank: string = '';
  divison: string = '';
  lp: number = 0;
  wins: number = 0;
  losses: number = 0;
  profileIconId: string = '';
  summonerLevel: number = 0;

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
    const puuidData = (await this.api.callApi(
      this.api.URL_GET_PUUID
    )) as PuuidData;
    this.api.puuid = puuidData.puuid;
    this.api.initURLS();
  }

  async getSummonerID() {
    const summonerID = (await this.api.callApi(
      this.api.URL_GET_SUMMONERID
    )) as SummonerID;
    this.api.summonerID = summonerID.id;
    this.summonerLevel = summonerID.summonerLevel;
    this.profileIconId = summonerID.profileIconId;
    this.api.initURLS();
  }

  async getRankedStats() {
    const rankedData = (await this.api.callApi(
      this.api.URL_GET_RANKED_DATA
    )) as RankedData;
    
    this.rank = rankedData[0].tier;
    this.divison = rankedData[0].rank;
    this.lp = rankedData[0].leaguePoints;
    this.wins = rankedData[0].wins;
    this.losses = rankedData[0].losses;
    this.loadingDone = true;
  }
}
