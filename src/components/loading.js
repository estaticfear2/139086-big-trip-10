import AbstractComponent from './abstract-component.js';

const createLoadingMarkup = () => {
  return (
    `<p class="trip-events__msg">Loading...</p>`
  );
};

const createLoadingTemplate = () => {
  return createLoadingMarkup();
};

class NoEvents extends AbstractComponent {
  getTemplate() {
    return createLoadingTemplate();
  }
}

export default NoEvents;
