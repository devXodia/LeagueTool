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
  summonerID: string = ''
  accountJSON: any;
  DEV_API_KEY: string = '';
  URL_GET_PUUID: string = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${this.summonerName}/${this.tag}?api_key=${this.DEV_API_KEY}`
  URL_GET_SUMMONERID: string = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${this.puuid}?api_key=${this.DEV_API_KEY} `
  URL_GET_RANKED_DATA: string = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.summonerID}?api_key=${this.DEV_API_KEY}`
  URL_GET_MATCHES_DATA: string = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${this.puuid}/ids?api_key=${this.DEV_API_KEY}`
  /* URL_GET_SINGLE_MATCH: string = `https://europe.api.riotgames.com/lol/match/v5/matches/${this.match}?api_key=${this.DEV_API_KEY}` */


  async callApi(url:string, summonerName?:string){
    const destination = url;
    const data = await lastValueFrom(this.http.get(destination));
    return data
  }

  /* THE URL BELOW IS FOR GETTING LIVE GAME DATA. CURRENTLY TESTING API CALLS */
  /* const url = `https://127.0.0.1:2999/liveclientdata/allgamedata` */


}
