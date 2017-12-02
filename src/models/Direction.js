// @flow

class Direction {
  id: string;
  details: string;
  done: boolean;
  order: number | null;

  constructor(details: string, order: number) {
    this.id = Date.now().toString();
    this.details = details;
    this.done = false;
    this.order = order || null;
  }
}

export default Direction;
