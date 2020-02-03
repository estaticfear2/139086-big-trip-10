import AbstractComponent from './abstract-component.js';

const FILTER_ID_PREFIX = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createMainFilterMarkup = (name, isChecked, isAvailable) => {
  const filterName = name.toLowerCase();

  return (
    `<div class="trip-filters__filter">
        <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``} ${isAvailable ? `` : `disabled`}>
        <label class="trip-filters__filter-label" for="filter-${filterName}">${name}</label>
      </div>`
  );
};

const createMainFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter) => createMainFilterMarkup(filter.name, filter.checked, filter.isAvailable)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

class MainFilter extends AbstractComponent {
  constructor(filterItems) {
    super();
    this._filterItems = filterItems;
  }

  getTemplate() {
    return createMainFilterTemplate(this._filterItems);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}

export default MainFilter;
