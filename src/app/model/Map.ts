import {Tile} from './Tile';
import {Enemy} from './Enemy';
import {Chest} from './Chest';
import {Character} from './Character';
import {IdentifyInterface} from './IdentifyInterface';

export class Map {

  matrix: Tile[][];

  width: number;
  height: number;
  maxEnemy: number;
  maxChest: number;

  mainAlive: boolean = true;
  enemyAttacked: boolean = false;

  constructor(_matrix: Tile[][] = null, _width: number = 0, _height: number = 0, _maxEnemy: number = 0, _maxChest: number = 0) {
    this.matrix = [];
    let tileContent = null;
    let tmp = null;
    for (let y = 0; y < _height; y++) {
      let tcm: Tile[] = [];
      for (let x = 0; x < _width; x++) {
        if (_matrix[y][x].hasOwnProperty('content')) {
          let a = (_matrix[y][x].content as IdentifyInterface);
          switch (a.identifyJSON) {
            case 'M' : {
              tmp = _matrix[y][x].content as Character;
              tileContent = new Character(tmp.charClass, tmp.identifyCharJSON, tmp.str, tmp.agi, tmp.vit, tmp.lck, tmp.identifyJSON, tmp.name);
              console.log('Il character : ' + JSON.stringify(tileContent));
              break;
            }
            case 'E' : {
              tmp = _matrix[y][x].content as Enemy;
              tileContent = new Enemy(tmp.str, tmp.agi, tmp.vit, tmp.lck, tmp.identifyJSON);
              console.log('enemy : ' + JSON.stringify(tileContent));
              break;
            }
            case 'C' : {
              tmp = _matrix[y][x].content as Chest;
              tileContent = new Chest(tmp.mod, tmp.attr, tmp.identifyJSON);
              console.log('La chest : ' + JSON.stringify(tileContent));
              break;
            }
          }
          console.log('Sto aggiungendo ' + tileContent + ' ' + x + ' ' + y);
          tcm.push(new Tile(_matrix[y][x].x, _matrix[y][x].y, tileContent));
        } else tcm.push(new Tile(_matrix[y][x].x, _matrix[y][x].y, null));
      }
      this.matrix.push(tcm);
    }
    this.width = _width;
    this.height = _height;
    this.maxEnemy = _maxEnemy;
    this.maxChest = _maxChest;
  }

  isValidPosition(x: number, y: number): boolean {
    return !(x < 0 || x > this.width - 1 || y < 0 || y > this.height - 1);
  }

  private isTileEmpty(x: number, y: number): boolean {
    console.log('Controllo casella vuota');
    return this.matrix[y][x].content == null;
  }

  private isEnemy(x: number, y: number): boolean {
    console.log('Controllo nemico...');
    return this.matrix[y][x].content instanceof Enemy;
  }

  private isChest(x: number, y: number): boolean {
    console.log('Ho trovato una cassa???');
    return this.matrix[y][x].content instanceof Chest;
  }

  attackEnemy(dx: number, dy: number, sx: number, sy: number): boolean {
    console.log('Il nemico attacca!');
    let a = this.matrix[sy][sx].content as Enemy;
    let d = this.matrix[dy][dx].content as Character;
    let dmg = a.attack();
    console.log('Il nemico attacca per: ' + dmg + ' danni!');
    console.log(d.vit);
    d.takeDamage(dmg);
    console.log('Rimango a: ' + d.vit + 'HP!');
    return d.isDead();
  }


  attackChar(dx: number, dy: number, sx: number, sy: number): boolean {
    console.log('Attacco il nemico!');
    let a = this.matrix[sy][sx].content as Character;
    let d = this.matrix[dy][dx].content as Enemy;
    let dmg = a.attack();
    console.log('Gli faccio: ' + dmg + ' danni!');
    d.takeDamage(dmg);
    console.log('Il nemico rimane a: ' + d.vit + 'HP!');
    return d.isDead();
  }

  private openChest(dx: number, dy: number, sx: number, sy: number) {
    console.log('Apro la cassa');
    let chest = this.matrix[dy][dx].content as Chest;
    let character = this.matrix[sy][sx].content as Character;
    character.getPower(chest);
  }

  private checkAround(x: number, y: number): number[] {
    let result = [-1, -1];
    console.log(x);
    console.log('sto cercando');
    for (let j = y - 1; j <= y + 1; j++) {
      if (j < 0 || j > this.height - 1) continue;
      for (let k = x - 1; k <= x + 1; k++) {
        if (k < 0 || k > this.width - 1) continue;
        console.log('Guardo la posizione: ' + k + ' ' + j);
        let t: Tile = this.matrix[j][k] as Tile;
        console.log(t);
        if (t.hasOwnProperty('content') && t.content != null) {
          if (t.content instanceof Character) {
            console.log(this.matrix[j][k].content);
            result[0] = k;
            result[1] = j;
            return result;
          }
        }
      }
    }
    return result;
  }

  public moveCharacter(dx: number, dy: number, sx: number, sy: number): number {
    if (!this.isValidPosition(sx, sy) || !this.isValidPosition(dx, dy)) {
      console.log('Non può uscire dalla mappa');
      return -1;
    }
    console.log('Coordinate interne alla mappa!');
    if (this.isTileEmpty(dx, dy)) {
      console.log('Casella vuota - moveCharacter');
      this.matrix[dy][dx].content = this.matrix[sy][sx].content;
      this.matrix[sy][sx].content = null;
      return 0;
    } else if (this.isEnemy(dx, dy)) {
      console.log('Nemico!');
      if (this.attackChar(dx, dy, sx, sy)) {
        this.matrix[dy][dx].content = this.matrix[sy][sx].content;
        this.matrix[sy][sx].content = null;
        return 1;
      }
      this.enemyAttacked = !this.enemyAttacked;
      return 2;
    } else if (this.isChest(dx, dy)) {
      console.log('CASSA TROVATA');
      this.openChest(dx, dy, sx, sy);
      this.matrix[dy][dx].content = this.matrix[sy][sx].content;
      this.matrix[sy][sx].content = null;
      return 3;
    }
    return -1;
  }

  public moveEnemy(dx: number, dy: number, sx: number, sy: number): number {
    if (!this.isValidPosition(dx, dy)) {
      console.log('Non può uscire dalla mappa');
      return -1;
    }
    let r = this.checkAround(sx, sy);
    //console.log(r[0]);
    if (r[0] != -1) {
      console.log('il nemico ti ha visto e attaccato: ' + r[0] + ' ' + r[1]);
      if (this.attackEnemy(r[0], r[1], sx, sy)) {
        console.log('il nemico ti ha ucciso');
        this.mainAlive = false;
        return 1;
      }
      return 2;
    } else if (this.isTileEmpty(dx, dy)) {
      console.log('il nemico si muove');
      this.matrix[dy][dx].content = this.matrix[sy][sx].content;
      this.matrix[sy][sx].content = null;
      return 0;
    }
    return -1;
  }
}
