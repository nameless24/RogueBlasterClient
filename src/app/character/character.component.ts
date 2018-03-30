import {Component, OnInit} from '@angular/core';
import {Character} from '../model/Character';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-character', templateUrl: './character.component.html', styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  public character: Character;

  constructor(private app: AppComponent) {
    let tmp = JSON.parse(localStorage.getItem('game')).character;

    this.character = new Character(tmp.charClass, tmp.identifyCharJSON, tmp.str, tmp.agi, tmp.vit, tmp.lck, tmp.identifyJSON, tmp.name);
  }


  ngOnInit() {
    if(JSON.parse(localStorage.getItem('game')) == null) {
      this.app.logout();
    }
  }


}
