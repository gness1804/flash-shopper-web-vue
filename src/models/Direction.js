// @flow

class Direction {
  id: string;
  details: string;
  done: boolean;

  constructor(details: string) {
    this.id = Date.now().toString();
    this.details = details;
    this.done = false;
  }
}

export default Direction;
