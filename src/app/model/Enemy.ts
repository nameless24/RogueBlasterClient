import {IdentifyInterface} from './IdentifyInterface';

export class Enemy implements IdentifyInterface{
  identifyJSON: string;

  str: number;
  agi: number;
  vit: number;
  lck: number;

  constructor(str: number = 0, agi: number = 0, vit: number = 0, lck: number = 0, identifyJSON: string = '') {
    this.str = str;
    this.agi = agi;
    this.vit = vit;
    this.lck = lck;
    this.identifyJSON = identifyJSON;
  }

  isDead(): boolean {
    return this.vit <= 0;
  }

  takeDamage(d: number) {
    this.vit = this.vit - d;
  }

  attack(): number {
    if (this.hitSuccess()) return Math.trunc((Math.random() * this.str));
    return 0;
  }

  hitSuccess(): boolean {
    return Math.trunc((Math.random() * 100) + this.lck) >= 25;
  }


}
