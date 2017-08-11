import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StandingsPage,TeamDetailPage} from '../pages';


@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  title:any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = navParams.data;
  }
  
  goHome(){
    this.navCtrl.popToRoot();
  }
}
