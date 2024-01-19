import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom } from 'rxjs';
import { AccountData } from '../Interfaces/accountData.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  summonerName: string = '';
  tag: string = '';
  puuid: string = '';
  accountJSON: any;
  DEV_API_KEY: string = 'RGAPI-902f2ed0-566c-43ed-b2e4-80caa402d0cf';
 



   /* THE URL BELOW IS FOR GETTING LIVE GAME DATA. CURRENTLY TESTING API CALLS */
    /* const url = `https://127.0.0.1:2999/liveclientdata/allgamedata` */

  async getPUUID(summonerName: string, tag: string) {
    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}?api_key=${this.DEV_API_KEY}`;
   
    const data = await lastValueFrom(this.http.get<AccountData>(url));
    console.log('TEST', data)
    this.assignData(data, summonerName, tag);
    
    
    
  }










/*   async getRankedData(){
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${this.puuid}?api_key=${this.DEV_API_KEY}`;
    const rankedData = await lastValueFrom(this.http.get<any>(url));
    console.log('RANKED DATA', rankedData)
    this.getMatchesData();
  }

  async getMatchesData(){
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${this.puuid}/ids?api_key=${this.DEV_API_KEY}`;
    const matchData = await lastValueFrom(this.http.get<any>(url));
    this.matchArray = matchData;
    this.getSingleMatchData();
  }

  async getSingleMatchData(){
    const url = `https://europe.api.riotgames.com/lol/match/v5/matches/${this.match}?api_key=${this.DEV_API_KEY}`;
    const match = await lastValueFrom(this.http.get<any>(url));
    console.log('MATCH DATA', match)
  } */

  assignData(data: AccountData, summonerName: string, tag: string) {
    this.accountJSON = data;
    this.puuid = data.puuid;
    this.summonerName = summonerName;
    this.tag = tag;
  }
}
