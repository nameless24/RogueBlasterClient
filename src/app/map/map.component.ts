import {Component, OnInit} from '@angular/core';
import {GameService} from '../services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-map', templateUrl: './map.component.html', styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) {
  }

  ngOnInit() {
  }

  getMap(n: number) {
    switch (n) {
      case 1: {
        this.gameService.getSmallMapData();
        break;
      }
      case 2: {
        this.gameService.getMediumMapData();
        break;
      }
      case 3: {
        this.gameService.getBigMapData();
        break;
      }
    }
  }


}
