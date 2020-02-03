const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`
};

const HIDDEN_CLASS = `visually-hidden`;

const EVENT_TYPE = [
  {name: `taxi`, group: `Transfer`, description: `Taxi to`},
  {name: `bus`, group: `Transfer`, description: `Bus to`},
  {name: `train`, group: `Transfer`, description: `Train to`},
  {name: `ship`, group: `Transfer`, description: `Ship to`},
  {name: `transport`, group: `Transfer`, description: `Transport to`},
  {name: `drive`, group: `Transfer`, description: `Drive to`},
  {name: `flight`, group: `Transfer`, description: `Flight to`},
  {name: `check-in`, group: `Activity`, description: `Check into hotel in`},
  {name: `sightseeing`, group: `Activity`, description: `Natural History Museum in`},
  {name: `restaurant`, group: `Activity`, description: `Restaurant in`}
];

const EventMode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};

const VISIBLE_OFFERS_COUNT = 3;

export {FilterType, SortType, EventMode, MenuItem, HIDDEN_CLASS, EVENT_TYPE, VISIBLE_OFFERS_COUNT};
