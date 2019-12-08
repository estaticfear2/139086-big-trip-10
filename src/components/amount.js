export const calculateAmount = (eventsList) => {
  return eventsList.reduce((amount, item) => amount + item.price, 0);
};
