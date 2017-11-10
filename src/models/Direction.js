// @flow

class Direction {
  id: string;
  details: string;

  constructor(details: string) {
    this.id = Date.now().toString();
    this.details = details;
  }
}

export default Direction;
