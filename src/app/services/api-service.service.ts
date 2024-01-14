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
  DEV_API_KEY: string = '';

  getRiotId(): Observable<any> {
    
      console.log('trying..');
      const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${this.summonerName}/${this.tag}?api_key=${this.DEV_API_KEY}`;
  
      return this.http.get(url)
    
  

  }}