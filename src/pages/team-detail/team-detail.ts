import { Component } from '@angular/core';
import {  NavController,NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import {GamePage} from '../pages';
import {FootyApi} from '../../app/shared/footyapi.service';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  team:any={};
  games:any[];
  teamStanding:any={};
  private tourneyData:any;
  constructor(private navCtrl: NavController,private navParams:NavParams,private footyapi:FootyApi) {}

  ionViewDidLoad(){
    this.team = this.navParams.data;
    this.tourneyData = this.footyapi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentName = isTeam1?g.team2:g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1,g.team1Score,g.team2Score);
                    return{
                      gameId:g.id,
                      opponent:opponentName,
                      time:Date.parse(g.time),
                      location: g.location,
                      locationUrl:g.locationUrl,
                      scoreDisplay:scoreDisplay,
                      homeAway:(isTeam1?"vs":"at")
                    };
                  })
                  .value();
    this.teamStanding = _.find(this.tourneyData.standings,{'teamId':this.team.id });
    //console.log(this.teamStanding);
  }
  getScoreDisplay(isTeam1,team1Score,team2Score){
    if(team1Score && team2Score){
      let teamScore = (isTeam1?team1Score:team2Score);
      let opponentScore =  (isTeam1?team2Score:team1Score);
      let winIndicator = team1Score > opponentScore?"W:":"L:";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else{
      return ""
    }
  }
  gameClicked($event,game)
  {
    //console.log(game);
    let sourceGame = this.tourneyData.games.find(g=>g.id == game.gameId);
    this.navCtrl.parent.parent.push(GamePage,sourceGame);
  }
}
