import Trip from '../components/trip.js';
import TripEdit from '../components/trip-edit.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {OFFERS, EVENT_TYPE} from '../mock/trip-event.js';

export const EventMode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`
};

export const getEmptyEvent = (id) => {
  return ({
    id,
    type: EVENT_TYPE[0],
    city: ``,
    photo: [],
    description: ``,
    startDate: Date.now(),
    endDate: Date.now(),
    price: 0,
    offers: OFFERS,
    isFavorite: false
  });
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._eventMode = EventMode.DEFAULT;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(event, mode) {
    const oldEvent = this._eventComponent;
    const oldEventEdit = this._eventEditComponent;
    this._eventMode = mode;

    this._eventComponent = new Trip(event);
    this._eventEditComponent = new TripEdit(event, mode);

    this._eventComponent.setEditButtonClickHandler(() => {
      this._replaceEventComponent();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite
      }));
    });

    this._eventEditComponent.setEditFormSubmitHandler((evt) => {
      evt.preventDefault();

      const data = this._eventEditComponent.getData();
      this._onDataChange(this, event, data);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    switch (mode) {
      case EventMode.DEFAULT:
        if (oldEvent && oldEventEdit) {
          replace(this._eventComponent, oldEvent);
          replace(this._eventEditComponent, oldEventEdit);
          this._replaceEventEditComponent();
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case EventMode.ADDING:
        if (oldEvent && oldEventEdit) {
          remove(oldEvent);
          remove(oldEventEdit);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._eventMode !== EventMode.DEFAULT) {
      this._replaceEventEditComponent();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscape = (evt.key === `Escape` || evt.key === `Esc`);

    if (isEscape) {
      if (this._eventMode === EventMode.ADDING) {
        this._onDataChange(this, getEmptyEvent(this._eventComponent.id), null);
      }
      this._replaceEventEditComponent();
    }
  }

  _replaceEventComponent() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._eventMode = EventMode.EDIT;
  }

  _replaceEventEditComponent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();
    replace(this._eventComponent, this._eventEditComponent);
    this._eventMode = EventMode.DEFAULT;
  }
}
