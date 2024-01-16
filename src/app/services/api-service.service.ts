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
  DEV_API_KEY: string = 'RGAPI-19f2f46a-b8cb-4b82-b302-47589b9440e2';

  async getRiotId(summonerName: string, tag: string) {
    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}?api_key=${this.DEV_API_KEY}`;
    /* THE URL BELOW IS FOR GETTING GAME DATA. CURRENTLY TESTING API CALLS */
    /* const url = `https://127.0.0.1:2999/liveclientdata/allgamedata` */
    const data = await lastValueFrom(this.http.get<AccountData>(url));
    console.log('TEST', data)
    this.assignData(data, summonerName, tag);
  }

  assignData(data: AccountData, summonerName: string, tag: string) {
    this.accountJSON = data;
    this.puuid = data.puuid;
    this.summonerName = summonerName;
    this.tag = tag;
  }
}
