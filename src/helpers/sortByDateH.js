//
import moment from 'moment';
import Item from '../models/Item';

const sortByDateH = items => {
  if (!items || items.length === 0) {
    return [];
  }
  return items.sort((a, b) => {
    let parsedA = moment(a.dateCompleted, 'MMM Do YY').unix();
    let parsedB = moment(b.dateCompleted, 'MMM Do YY').unix();
    if (isNaN(parsedA)) {
      parsedA = 0;
    }
    if (isNaN(parsedB)) {
      parsedB = 0;
    }
    return parsedB - parsedA;
  });
};

export default sortByDateH;
