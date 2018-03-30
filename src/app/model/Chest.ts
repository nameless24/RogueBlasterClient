import {IdentifyInterface} from './IdentifyInterface';


export class Chest implements IdentifyInterface {
  identifyJSON: string;

  mod: number;
  attr: string;

  constructor(mod: number = 0, attr: string = '', identifyJSON: string = '') {
    this.mod = mod;
    this.attr = attr;
    this.identifyJSON = identifyJSON;
  }
}
