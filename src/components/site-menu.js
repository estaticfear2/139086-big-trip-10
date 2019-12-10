import {createElement} from '../utils.js';

const createSiteMenuMarkup = (item, isActive) => {
  return (
    `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${item}</a>`
  );
};

export const createSiteMenuTemplate = (menuItems) => {
  const siteMenuMarkup = menuItems.map((it) => createSiteMenuMarkup(it.name, it.isactive)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${siteMenuMarkup}
      </nav>`
  );
};

export default class SiteMenu {
  constructor(menuItems) {
    this._menuItems = menuItems;
    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menuItems);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
