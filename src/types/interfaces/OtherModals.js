// @flow

export interface NoteModalInt {
  noteString: string;
  saveString: string;
}

export interface AddSourceInt {
  newSource: string;
  saveString: string;
  cancelString: string;
  clearString: string;
}

export interface TimerModalInt {
  numbersOne: number[];
  numbersTwo: number[];
  timeOne: string;
  unitsOne: string;
  timeTwo: string;
  unitsTwo: string;
  stopwatchLink: string;
}
