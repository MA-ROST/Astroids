class Rect {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  addXW() {
    return this.x + this.w;
  }

  addYH() {
    return this.y + this.h;
  }

  drawRect() {
    rect(this.x, this.y, this.w, this.h);
  }

  checkBounds(point) {
    if (this.x >= point.x && this.addXW() < point.addXW()) {
      if (this.addYH() >= point.y && this.y <= point.y) return true;
    }
    return false;
  }
}
