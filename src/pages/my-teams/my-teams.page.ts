import {Component} from '@angular/core';
import {NavController,LoadingController} from 'ionic-angular';
import {TournamentsPage,TeamHomePage} from '../pages'
import {FootyApi} from '../../app/shared/footyapi.service'
@Component({
    templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage{
    favorites=[
        {
            team: {id:6182,name:'HC Elite 7th',coach:'Michelotti'},
            tournamentId:'89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
            tournamentName:"March Madness Tournament"
        },
        {
            team: {id:805,name:'HC Elite',coach:'Michelotti'},
            tournamentId:'98c6857e-b0d1-4295-b89e-2d95a45437f2',
            tournamentName:"Holiday Hoops Challenge"
        }
    ]
    constructor(private nav:NavController,
                private loadCtrl:LoadingController,
                private footyapi:FootyApi){

    }
    goToTournaments(){
        this.nav.push(TournamentsPage);
    }
    favoritesTapped($event,item){
        let loader = this.loadCtrl.create({
            content:"Loading Team",
            dismissOnPageChange:true
        })
        loader.present();
        this.footyapi.getTournamentData(item.tournamentId)
            .subscribe(t => this.nav.push(TeamHomePage,item.team));

    }
}