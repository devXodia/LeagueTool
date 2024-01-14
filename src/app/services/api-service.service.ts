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
  DEV_API_KEY: string = '';

  async getRiotId(summonerName: string, tag: string) {
    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}?api_key=${this.DEV_API_KEY}`;
    const data = await lastValueFrom(this.http.get<AccountData>(url));
    this.assignData(data, summonerName, tag);
  }

  assignData(data: AccountData, summonerName: string, tag: string) {
    this.accountJSON = data;
    this.puuid = data.puuid;
    this.summonerName = summonerName;
    this.tag = tag;
  }
}
