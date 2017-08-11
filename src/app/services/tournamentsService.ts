import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class tournamentsService {
  apiUrl = 'http://api.football-data.org/v1/competitions/';
  tourdata:any;
  teamdata:any;
  constructor(public http: Http) {
    console.log('Hello Restapi Provider');
  }
  
  getTounaments() {
      if (this.tourdata) {
        return Promise.resolve(this.tourdata);
      }
    
      return new Promise(resolve => {
        this.http.get(this.apiUrl+'?season=2017')
          .map(res => res.json())
          .subscribe(data => {
            this.tourdata = data;
            resolve(this.tourdata);
          });
      });
    }
    
  getTeams(id:any){
    return new Promise(resolve=>{
      this.http.get(this.apiUrl+id+'/teams')
      .map(res=>res.json())
      .subscribe(data=>{
        this.teamdata = data;
        resolve(this.teamdata);
      });
    });
  }

 

}