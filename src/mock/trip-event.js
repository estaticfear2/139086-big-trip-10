import {getRandomArrayItem, getRandomIntegerNumber} from '../utils.js';

const EVENT_TYPE = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`,
  `taxi`,
  `train`,
  `transport`,
  `trip`
];

const CITIES = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`
];

const getSightPhoto = () => {
  return new Array(getRandomIntegerNumber(0, 8)).
  fill(``).
  map(() => `http://picsum.photos/300/150?r=${Math.random()}`);
};

const SENTENCE_DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const minDescrSentence = 1;
const maxDescrSentence = 3;

const generateRandArrayFromSubArray = (subArray, a, b) => {
  const arr = [];
  const copySubArray = subArray.slice();
  const commentsCount = getRandomIntegerNumber(a, Math.min(b, subArray.length));

  for (let j = 0; j < commentsCount; j++) {
    let indexComment = getRandomIntegerNumber(0, copySubArray.length - 1);
    arr[j] = copySubArray.splice(indexComment - 1, 1)[0];
  }

  return arr;
};

const getEventDescription = () => {
  return generateRandArrayFromSubArray(SENTENCE_DESCRIPTION, minDescrSentence, maxDescrSentence).join(` `);
};

const rangeEventDate = 1000 * 60 * 60 * 72;
const rangeEventDuration = 1000 * 60 * 60 * 3;

const getEventDate = () => {
  const startDate = new Date(Date.now() + getRandomIntegerNumber(0, rangeEventDate));
  let endDate;

  const dur = getRandomIntegerNumber(1000 * 60 * 20, rangeEventDuration);

  endDate = new Date(+startDate + dur);

  return [startDate, endDate];
};

const OFFERS_MAX = 2;
const OFFERS = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: 10,
    checked: false
  },
  {
    type: `comfort`,
    name: `Switch to comfort`,
    price: 150,
    checked: false
  },
  {
    type: `meal`,
    name: `Add meal`,
    price: 2,
    checked: false
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: 9,
    checked: false
  },
  {
    type: `train`,
    name: `Travel by train`,
    price: 40,
    checked: false
  }
];

const getEventOffers = () => {
  const eventOffers = JSON.parse(JSON.stringify(OFFERS));
  let count = 0;

  eventOffers.forEach(function (it) {
    if (Math.random() < 0.5 && count <= OFFERS_MAX) {
      it.checked = true;
      count++;
    }
  });

  return eventOffers;
};

const PRICE_MIN = 20;
const PRICE_MAX = 200;
const generateEventPrice = () => {
  return getRandomIntegerNumber(PRICE_MIN, PRICE_MAX);
};

const generateEvent = () => {
  const [startDate, endDate] = getEventDate();
  return {
    type: getRandomArrayItem(EVENT_TYPE),
    city: getRandomArrayItem(CITIES),
    photo: getSightPhoto(),
    description: getEventDescription(),
    startDate,
    endDate,
    price: generateEventPrice(),
    offers: getEventOffers()
  };
};

const EVENT_COUNT = 10;

export const generateEventsList = (count = EVENT_COUNT) => {
  const list = [];

  for (let i = 0; i < count; i++) {
    list.push(generateEvent());
  }

  return list.sort((a, b) => a.startDate - b.startDate);
};
