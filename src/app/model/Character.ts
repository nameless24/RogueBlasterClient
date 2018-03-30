import {Chest} from './Chest';
import {IdentifyInterface} from './IdentifyInterface';

export class Character implements IdentifyInterface{
  identifyJSON: string;

  str: number;
  agi: number;
  vit: number;
  lck: number;
  identifyCharJSON: string;
  name: string;
  charClass: string;

  constructor(charClass: string = '', identifyCharJSON: string = '', str: number = 0, agi: number = 0, vit: number = 0, lck: number = 0, identifyJSON: string = '', name: string = '') {
    this.str = str;
    this.agi = agi;
    this.vit = vit;
    this.lck = lck;
    this.identifyJSON = identifyJSON;
    this.identifyCharJSON = identifyCharJSON;
    this.name = name;
    this.charClass = charClass;
  }

  isDead(): boolean {
    return this.vit <= 0;
  }

  takeDamage(d: number) {
    this.vit = this.vit - d;
  }

  attack(): number {
    if (this.hitSuccess()) {
      if (Math.trunc(Math.random() * 100) + this.agi >= 50)
        return Math.trunc(Math.random() * this.str) + Math.trunc(this.str / 2);
      else
        return Math.trunc(Math.random() * this.str);
    }
    return 0;
  }

  hitSuccess(): boolean {
    return (Math.trunc(Math.random() * 100) + this.lck) >= 20;
  }

  getPower(chest: Chest) {
    console.log('La cassa conteneva: ' + JSON.stringify(chest));
    switch (chest.attr) {
      case 'STR': {
        this.str += chest.mod;
        if (this.str <= 0) this.str = 1;
        return;
      }
      case 'AGI': {
        this.agi += chest.mod;
        if (this.agi <= 0) this.agi = 1;
        return;
      }
      case 'VIT': {
        this.vit += chest.mod;
        if (this.vit <= 0) this.vit = 1;
        return;
      }
      case 'LCK': {
        this.lck += chest.mod;
        if (this.lck <= 0) this.lck = 1;
        return;
      }
    }

  }


}
