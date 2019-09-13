//

class Direction {
  constructor(details, order) {
    this.id = Date.now().toString();
    this.details = details;
    this.done = false;
    this.order = order || 0;
  }
}

export default Direction;
