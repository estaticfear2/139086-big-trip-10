import Trip from '../components/trip.js';
import TripEdit from '../components/trip-edit.js';
import TripEventsList from '../components/trip-events-list.js';
import NoEvents from '../components/no-events.js';
import EventsFilter from '../components/events-filter.js';
import {render, RenderPosition, replace} from '../utils/render.js';
import {getSetFromArray} from '../utils/common.js';

const renderEvent = (event, tripEventsDayElement) => {
  const onEscKeyDown = (evt) => {
    const isEscape = (evt.key === `Escape` || evt.key === `Esc`);

    if (isEscape) {
      replaceEventEditComponent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEventEditComponent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const replaceEventComponent = () => {
    replace(eventEditComponent, eventComponent);
  };

  const eventComponent = new Trip(event);
  const eventEditComponent = new TripEdit(event);

  eventComponent.setEditButtonClickHandler(() => {
    replaceEventComponent();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setEditFormSubmitHandler(replaceEventEditComponent);

  render(tripEventsDayElement, eventComponent, RenderPosition.BEFOREEND);
};

export default class TripController {
  constructor(container, filters) {
    this._container = container;
    this._noEvents = new NoEvents();
    this._eventsFilter = new EventsFilter(filters);
    this._eventsList = new TripEventsList();
  }

  render(events) {
    const container = this._container;

    if (!events.length) {
      render(container, this._noEvents, RenderPosition.BEFOREEND);
      return;
    }

    render(container.firstElementChild, this._eventsFilter, RenderPosition.AFTEREND);

    const dayList = getSetFromArray(events.map((it) => new Date(it.startDate).toDateString()));

    render(container, new TripEventsList(dayList), RenderPosition.BEFOREEND);

    Array.from(dayList).forEach((date, i) => {
      const tripEventsDayElement = container.querySelectorAll(`.trip-days__item`)[i].querySelector(`.trip-events__list`);

      events
        .filter((it) => new Date(it.startDate).toDateString() === date)
        .forEach((event) => renderEvent(event, tripEventsDayElement));
    });
  }
}
