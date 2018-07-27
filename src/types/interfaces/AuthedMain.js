// @flow

export interface AuthedMainInt {
  name?: string,
  aisle?: string,
  note?: string,
  quantity?: string,
  link?: string,
  error: boolean,
  errorMssg?: string,
  thereAreItemsInCart: () => boolean,
  names: string[],
  goToPantryString: string,
  goToRecipesString: string,
  addItemString: string,
  deleteAllItemsString: string,
  completeAllInCartString: string,
  sortAlphaString: string,
  sortAisleString: string,
  isSafari: boolean,
}
