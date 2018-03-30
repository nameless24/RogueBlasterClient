export class Tile {
  x: number;
  y: number;
  content: Object;

  constructor(x: number = -1, y: number = -1, c: Object = null) {
    this.x = x;
    this.y = y;
    this.content = c;
  }

}
