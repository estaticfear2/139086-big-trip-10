import Trip from '../components/trip.js';
import TripEdit from '../components/trip-edit.js';
import {render, RenderPosition, replace} from '../utils/render.js';

const ESC_CODE = 27;

const EventMode = {
  DEFAULT: `default`,
  EDIT: `edit`
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

  render(event) {
    const oldEvent = this._eventComponent;
    const oldEventEdit = this._eventEditComponent;


    this._eventComponent = new Trip(event);
    this._eventEditComponent = new TripEdit(event);

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
      this._replaceEventEditComponent();
      this._onDataChange(this, event, this._eventEditComponent._event);
    });

    if (oldEvent && oldEventEdit) {
      replace(this._eventComponent, oldEvent);
      replace(this._eventEditComponent, oldEventEdit);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._eventMode !== EventMode.DEFAULT) {
      this._replaceEventEditComponent();
    }
  }

  _onEscKeyDown(evt) {
    const isEscape = (evt.keyCode === ESC_CODE);

    if (isEscape) {
      this._replaceEventEditComponent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
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
