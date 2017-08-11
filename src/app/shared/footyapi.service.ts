import {Injectable} from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FootyApi{
    
    currentTourney:any={}
    baseURL = "https://footy-app-d79fc.firebaseio.com/";
    constructor(private http:Http)
    {}

    getTournaments(){
        return new Promise(resolve =>
        {
            this.http.get(`${this.baseURL}/tournaments.json`)
            .subscribe(res => resolve(res.json()))
        })
    }

    getTournamentData(tourneyId):Observable<any>{
        return this.http.get(`${this.baseURL}/tournaments-data/${tourneyId}.json`)
        .map((response:Response)=>{
            this.currentTourney = response.json();
            return this.currentTourney;
        })
    }

    getCurrentTourney(){
    return this.currentTourney;
      }
}