//

class Recipe {
  constructor(opts) {
    this.id = null;
    this.title = opts.title;
    this.image = opts.image;
    this.ingredients = opts.ingredients;
    this.directions = opts.directions || null;
    this.note = opts.note || '';
    this.source = opts.source || '';
    this.timesMade = opts.timesMade || 0;
    this.datesMade = opts.datesMade || [];
    this.categories = opts.categories || [];
  }
}

export default Recipe;
