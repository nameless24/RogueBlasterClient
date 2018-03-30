import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gameover', templateUrl: './gameover.component.html', styleUrls: ['./gameover.component.css']
})
export class GameoverComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    return caches.delete(Cache.name);
  }

  reload(){
    window.location.reload();
  }

}
