import { Component } from '@angular/core';
import {NavController,NavParams,LoadingController } from 'ionic-angular';
import {TeamHomePage} from '../pages';
import {FootyApi} from '../../app/shared/footyapi.service'
import * as _ from 'lodash';
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  private allTeams:any = [];
  private allTeamsDivision:any = [];
  private teams=[];
  private shownGroup = null;

  constructor(private navCtrl: NavController,
              private navParams:NavParams,
              private footyapi:FootyApi,
              private loadCtrl:LoadingController) {}
            
  ionViewDidLoad(){
    let selectedTourney = this.navParams.data;
    let loader = this.loadCtrl.create({
      content:"Loading teams"
    });
    loader.present().then(()=>{
      this.footyapi.getTournamentData(selectedTourney.id).subscribe(data => {
      this.allTeams = data.teams;
      this.allTeamsDivision = _.chain(data.teams)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisionName','divisionTeams'],item))
      .value();
      this.teams = this.allTeamsDivision;
      console.log(this.allTeamsDivision);   
      loader.dismiss();
      });
    });
  }

  itemTapped($event,name){
    this.navCtrl.push(TeamHomePage,name);
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

}
