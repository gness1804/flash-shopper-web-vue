// @flow

class Direction {
  id: string;
  details: string;
  done: boolean;
  order: number;

  constructor(details: string, order: number) {
    this.id = Date.now().toString();
    this.details = details;
    this.done = false;
    this.order = order || 0;
  }
}

export default Direction;
