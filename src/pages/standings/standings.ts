import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FootyApi} from '../../app/shared/shared';
import * as _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  team:any;
  allStandings:any[];
  standings:any[];
  constructor(private navCtrl: NavController, private navParams: NavParams, private footyApi:FootyApi) {
  }
  ionViewDidLoad(){
    this.team = this.navParams.data;
    let tourneyData = this.footyApi.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.allStandings = 
        _.chain(this.standings)
        .groupBy('division')
        .toPairs()
        .map(item=> _.zipObject(['divisionName','divisionStandings'],item))
        .value();
    console.log("##all"+this.standings)
    console.log("##divis"+this.allStandings);

  }

}
