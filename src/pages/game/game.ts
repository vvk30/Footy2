import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {FootyApi} from '../../app/shared/shared';
import {TeamHomePage} from '../pages'
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game:any={};
  constructor(private navCtrl: NavController, private navParams:NavParams,private footyApi:FootyApi) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
    console.log(this.game)
  }
  teamTapped(teamId){
    let tourneyData = this.footyApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId)
    this.navCtrl.push(TeamHomePage,team)
  }

}
