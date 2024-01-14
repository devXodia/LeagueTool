import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}

  summonerName: string = '';
  tag: string = '';
  puuid: string = '';
  json:any;
  DEV_API_KEY: string = 'RGAPI-a8e0008d-fae8-48ec-be6a-78c514c206cd';

  getRiotId(summonerName:string, tag:string): Observable<any> {
    
      console.log('trying..');
      console.log(summonerName, tag, 'TEST')
      const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tag}?api_key=${this.DEV_API_KEY}`;
  
      return this.http.get(url)
    
  

  }}