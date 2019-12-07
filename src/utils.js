const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getRandomNumber = (min, max) => {
  return min + Math.random() * (max - min);
};

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth()}/${String(date.getFullYear()).slice(2)}`;
};

const formatTime = (date) => {
  return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
};

export {getRandomArrayItem, getRandomNumber, getRandomIntegerNumber, formatDate, formatTime};
