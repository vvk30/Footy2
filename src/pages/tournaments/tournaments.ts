import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {TeamsPage} from '../pages';
import { tournamentsService } from '../../app/services/tournamentsService';
import {FootyApi} from '../../app/shared/footyapi.service'
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  tournaments:any
  constructor(private navCtrl: NavController,
              private footyapi:FootyApi,
              private loadCtrl:LoadingController) {
  
  }
  itemTapped($event,tourney){
    this.navCtrl.push(TeamsPage,tourney)
  }
  
  //Life cycle hooks
  ionViewDidLoad(){
    let loader = this.loadCtrl.create({
      content:"Getting Tournaments.."
    });
    loader.present().then(()=>{
      this.footyapi.getTournaments().then(data=> {
        this.tournaments = data;
        loader.dismiss();
      });
    });
    
  }
}
