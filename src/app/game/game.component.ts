import {Component, OnInit} from '@angular/core';
import {User} from '../model/User';
import {Character} from '../model/Character';
import {Map} from '../model/Map';
import {Tile} from '../model/Tile';
import {AppComponent} from '../app.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game', templateUrl: './game.component.html', styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  character: Character;
  map: Map;
  characterX: number;
  characterY: number;
  enemiesCoords: number[][];
  chestsCoords: number[][];
  logAttacks: string[];

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  tileBackgroundImg: HTMLImageElement;
  spriteCharacterImg: HTMLImageElement;
  spriteEnemyImg: HTMLImageElement;
  spriteChestImg: HTMLImageElement;
  spriteAtkImg: HTMLImageElement;
  spriteTakeDmgImg: HTMLImageElement;

  strIndicator: HTMLSpanElement;
  agiIndicator: HTMLSpanElement;
  vitIndicator: HTMLSpanElement;
  lckIndicator: HTMLSpanElement;

  attackLog1: HTMLSpanElement;
  attackLog2: HTMLSpanElement;
  attackLog3: HTMLSpanElement;

  private FPS = 30;

  private c: number = 0;
  private res: number = -1;
  private turn: number;


  constructor(private app: AppComponent, private router: Router) {
    let temp = JSON.parse(localStorage.getItem('game'));
    if (temp == null) {
      app.logout();
    }
    this.character = new Character(temp.character.charClass, temp.character.identifyCharJSON, temp.character.str, temp.character.agi, temp.character.vit, temp.character.lck, temp.character.identifyJSON, temp.character.name);
    console.log(this.character);
    this.map = new Map(temp.map.matrix, temp.map.width, temp.map.height, temp.map.maxEnemy, temp.map.maxChest);
    this.characterX = temp.charCoords[0];
    this.characterY = temp.charCoords[1];
    this.enemiesCoords = temp.enemiesCoords;
    this.chestsCoords = temp.chestsCoords;
    this.turn = -1;
    this.logAttacks = ['', '', ''];
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.tileBackgroundImg = <HTMLImageElement>document.getElementById('tileBackground');
    this.spriteCharacterImg = <HTMLImageElement>document.getElementById('spriteCharacter');
    this.spriteEnemyImg = <HTMLImageElement>document.getElementById('spriteEnemy');
    this.spriteChestImg = <HTMLImageElement>document.getElementById('spriteChest');
    this.strIndicator = <HTMLSpanElement>document.getElementById('strIndicator');
    this.agiIndicator = <HTMLSpanElement>document.getElementById('agiIndicator');
    this.vitIndicator = <HTMLSpanElement>document.getElementById('vitIndicator');
    this.lckIndicator = <HTMLSpanElement>document.getElementById('lckIndicator');
    this.attackLog1 = <HTMLSpanElement>document.getElementById('attackLog1');
    this.attackLog2 = <HTMLSpanElement>document.getElementById('attackLog2');
    this.attackLog3 = <HTMLSpanElement>document.getElementById('attackLog3');
    document.addEventListener('keydown', this.keyboardInput.bind(this));
    this.ctx = this.canvas.getContext('2d');
    this.gameLoop();
  }

  gameLoop() {
    let canvasWidth = this.canvas.width;
    let canvasHeight = this.canvas.height;
    let tileWidth = Math.trunc(this.canvas.width / this.map.width);
    let tileHeight = Math.trunc(this.canvas.height / this.map.height);
    this.drawBackground(this.ctx);
    this.drawMap(this.ctx, tileWidth, tileHeight);
    this.drawCharacter(this.ctx, tileWidth, tileHeight);
    this.drawEnemies(this.ctx, tileWidth, tileHeight);
    this.drawChests(this.ctx, tileWidth, tileHeight);
    this.ctx.restore();
    this.updateCharacterStats(this.characterX, this.characterY);
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private drawBackground(_ctx: CanvasRenderingContext2D) {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawMap(_ctx: CanvasRenderingContext2D, tileW: number, tileH: number) {
    _ctx.save();
    for (let j = 0; j < this.map.height; j++) {
      for (let k = 0; k < this.map.width; k++) {
        if (k == -1 || k == this.map.width) {
          _ctx.drawImage(this.spriteChestImg, k * tileW, j * tileH, tileW, tileH);
        } else {
          _ctx.drawImage(this.tileBackgroundImg, k * tileW, j * tileH, tileW, tileH);
        }
      }
    }
  }

  private drawCharacter(_ctx: CanvasRenderingContext2D, tileW: number, tileH: number) {
    _ctx.save();
    _ctx.drawImage(this.spriteCharacterImg, this.characterX * tileW, this.characterY * tileH, tileW, tileH);
  }

  private drawEnemies(_ctx: CanvasRenderingContext2D, tileW: number, tileH: number) {
    _ctx.save();
    for (let i = 0; i < this.enemiesCoords.length; i++) {
      _ctx.drawImage(this.spriteEnemyImg, Number(this.enemiesCoords[i][0]) * tileW, Number(this.enemiesCoords[i][1]) * tileH, tileW, tileH);
    }
  }

  private drawChests(_ctx: CanvasRenderingContext2D, tileW: number, tileH: number) {
    _ctx.save();
    for (let i = 0; i < this.chestsCoords.length; i++) {
      _ctx.drawImage(this.spriteChestImg, Number(this.chestsCoords[i][0]) * tileW, Number(this.chestsCoords[i][1]) * tileH, tileW, tileH);
    }
  }

  keyboardInput(event: KeyboardEvent) {
    console.log(event);
    let newX: number = 0;
    let newY: number = 0;
    //sinistra
    if (event.keyCode == 37 || event.keyCode == 65) {
      this.move(-1, 0);
      if (this.res == 2 || this.res == 1) this.updateLogAttacks('Attacco !');
      if (this.res != -1) {
        this.afterMove(this.characterX, this.characterY);
      }
    }
    //su
    else if (event.keyCode == 38 || event.keyCode == 87) {
      this.move(0, -1);
      if (this.res == 2 || this.res == 1) this.updateLogAttacks('Attacco !');
      if (this.res != -1) {
        this.afterMove(this.characterX, this.characterY);
      }
    }
    //destra
    else if (event.keyCode == 39 || event.keyCode == 68) {
      this.move(1, 0);
      if (this.res == 2 || this.res == 1) this.updateLogAttacks('Attacco !');
      if (this.res != -1) {
        this.afterMove(this.characterX, this.characterY);
      }
    }
    //giù
    else if (event.keyCode == 40 || event.keyCode == 83) {
      this.move(0, 1);
      if (this.res == 2 || this.res == 1) this.updateLogAttacks('Attacco !');
      if (this.res != -1) {
        this.afterMove(this.characterX, this.characterY);
      }
    }
    this.c++;
    console.log('-----FINE TURNO ' + this.c + '-----');
  }


  private afterMove(newX: number, newY: number) {
    if (this.res == 1) {
      this.res = -1;
      console.log('Cancella il nemico dalla lista');
      for (let a of this.enemiesCoords) {
        console.log('Controllo: ' + a[0] + ' ' + a[1] + ' uguale ' + newX + ' ' + newY);
        if (a[0] == newX && a[1] == newY) {
          console.log('Eliminato ' + a[0] + ' ' + a[1]);
          let index: number = this.enemiesCoords.indexOf(a);
          if (index !== -1) {
            this.enemiesCoords.splice(index, 1);
          }
        } else {
          console.log('Non corrisponde ' + a[0] + ' ' + a[1]);
        }
      }
    }
    if (this.res == 3) {
      this.res = -1;
      console.log('Cancella cassa dalla lista');
      let tmp: number[][] = [];
      for (let a of this.chestsCoords) {
        console.log('Controllo: ' + a[0] + ' ' + a[1] + ' uguale ' + newX + ' ' + newY);
        if (a[0] == newX && a[1] == newY) {
          console.log('Eliminato ' + a[0] + ' ' + a[1]);
          let index: number = this.chestsCoords.indexOf(a);
          if (index !== -1) {
            this.chestsCoords.splice(index, 1);
          }
        } else {
          console.log('Non corrisponde ' + a[0] + ' ' + a[1]);
        }
      }
    }
    for (let i = 0; i < this.enemiesCoords.length; i++) {
      let x: number = Math.trunc(Math.random() * 3) - 1 + (this.enemiesCoords[i][0]);
      let y: number = Math.trunc(Math.random() * 3) - 1 + (this.enemiesCoords[i][1]);
      console.log('il nemico ' + i + ' vuole muoversi: ' + x + ' ' + y);
      this.turn = this.map.moveEnemy(x, y, this.enemiesCoords[i][0], this.enemiesCoords[i][1]);
      if (this.turn == 0) {
        this.enemiesCoords[i][0] = x;
        this.enemiesCoords[i][1] = y;
      } else if (this.turn == 2 && this.map.enemyAttacked) {
        this.map.enemyAttacked = !this.map.enemyAttacked;
      }
      if(this.turn == 2 || this.turn == 1) this.updateLogAttacks('Il nemico ha attaccato!');
      this.turn = -1;
    }
    if (!this.map.mainAlive) {
      localStorage.setItem('hideNavbar', '1');
      document.clear();
      localStorage.removeItem('game');
      localStorage.removeItem('logAttacks');
      this.ctx.restore();
      return this.router.navigate(['gameover']);
    }
    if (this.enemiesCoords.length == 0) {
      localStorage.setItem('hideNavbar', '1');
      document.clear();
      localStorage.removeItem('game');
      localStorage.removeItem('logAttacks');
      this.ctx.restore();
      return this.router.navigate(['win']);
    }
  }

  private updateCharacterStats(x: number, y: number) {
    this.strIndicator.innerText = (this.map.matrix[y][x].content as Character).str.toString();
    this.agiIndicator.innerText = (this.map.matrix[y][x].content as Character).agi.toString();
    this.vitIndicator.innerText = (this.map.matrix[y][x].content as Character).vit.toString();
    this.lckIndicator.innerText = (this.map.matrix[y][x].content as Character).lck.toString();
  }

  move(x: number, y: number) {
    let newX: number = this.characterX + x;
    let newY: number = this.characterY + y;
    console.log('Coordinate attuali: ' + this.characterX + ' ' + this.characterY);
    console.log('Nuove coordinate: ' + newX + ' ' + newY);
    this.res = this.map.moveCharacter(newX, newY, this.characterX, this.characterY,);
    if (this.res == 0 || this.res == 1 || this.res == 3) {
      this.characterX = newX;
      this.characterY = newY;
    }
  }

  updateLogAttacks(s: string) {
    this.logAttacks[0]=this.logAttacks[1];
    this.logAttacks[1]=this.logAttacks[2];
    this.logAttacks.pop();
    this.logAttacks.push(s);
      this.attackLog1.innerText = this.logAttacks[2];
      this.attackLog2.innerText = this.logAttacks[1];
      this.attackLog3.innerText = this.logAttacks[0];
  }
}
