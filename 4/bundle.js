/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/amount.js":
/*!**********************************!*\
  !*** ./src/components/amount.js ***!
  \**********************************/
/*! exports provided: calculateAmount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateAmount", function() { return calculateAmount; });
const calculateAmount = (eventsList) => {
  return eventsList.reduce((amount, item) => amount + item.price, 0);
};


/***/ }),

/***/ "./src/components/events-filter.js":
/*!*****************************************!*\
  !*** ./src/components/events-filter.js ***!
  \*****************************************/
/*! exports provided: createEventsFilterTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventsFilterTemplate", function() { return createEventsFilterTemplate; });
const createEventsFilterMarkup = (filter, isChecked) => {
  const filterName = filter.toLowerCase();
  return (
    `<div class="trip-sort__item  trip-sort__item--${filterName}">
        <input id="sort-${filterName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${filterName}" ${isChecked ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-event">${filter}</label>
      </div>`
  );
};

const createEventsFilterTemplate = (filterItems) => {
  const eventsFilterMarkup = filterItems.map((it) => createEventsFilterMarkup(it.name, it.ischecked)).join(`\n`);

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${eventsFilterMarkup}
        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
  );
};


/***/ }),

/***/ "./src/components/main-filter.js":
/*!***************************************!*\
  !*** ./src/components/main-filter.js ***!
  \***************************************/
/*! exports provided: createMainFilterTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMainFilterTemplate", function() { return createMainFilterTemplate; });
const createMainFilterMarkup = (name, isChecked) => {
  const filterName = name.toLowerCase();

  return (
    `<div class="trip-filters__filter">
        <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${filterName}">${name}</label>
      </div>`
  );
};

const createMainFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createMainFilterMarkup(it.name, it.ischecked)).join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};


/***/ }),

/***/ "./src/components/site-menu.js":
/*!*************************************!*\
  !*** ./src/components/site-menu.js ***!
  \*************************************/
/*! exports provided: createSiteMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSiteMenuTemplate", function() { return createSiteMenuTemplate; });
const createSiteMenuMarkup = (item, isActive) => {
  return (
    `<a class="trip-tabs__btn  ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${item}</a>`
  );
};

const createSiteMenuTemplate = (menuItems) => {
  const siteMenuMarkup = menuItems.map((it) => createSiteMenuMarkup(it.name, it.isactive)).join(`\n`);

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${siteMenuMarkup}
      </nav>`
  );
};


/***/ }),

/***/ "./src/components/trip-edit.js":
/*!*************************************!*\
  !*** ./src/components/trip-edit.js ***!
  \*************************************/
/*! exports provided: createTripEditTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripEditTemplate", function() { return createTripEditTemplate; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const createEventPhotoMarkup = (list) => {
  return list.map((it) => `<img class="event__photo" src="${it}" alt="Event photo">`).join(`\n`);
};

const createTripEditMarkup = (event) => {
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="${event.type} icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${_const_js__WEBPACK_IMPORTED_MODULE_1__["eventTypeMap"][event.type]}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.city}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(event.startDate)} ${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(event.startDate)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(event.endDate)} ${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(event.endDate)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${event.offers[0].checked ? `checked` : ``}>
                <label class="event__offer-label" for="event-offer-luggage-1">
                  <span class="event__offer-title">Add luggage</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">30</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" ${event.offers[1].checked ? `checked` : ``}>
                <label class="event__offer-label" for="event-offer-comfort-1">
                  <span class="event__offer-title">Switch to comfort class</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">100</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal" ${event.offers[2].checked ? `checked` : ``}>
                <label class="event__offer-label" for="event-offer-meal-1">
                  <span class="event__offer-title">Add meal</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">15</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats" ${event.offers[3].checked ? `checked` : ``}>
                <label class="event__offer-label" for="event-offer-seats-1">
                  <span class="event__offer-title">Choose seats</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">5</span>
                </label>
              </div>

              <div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train" ${event.offers[4].checked ? `checked` : ``}>
                <label class="event__offer-label" for="event-offer-train-1">
                  <span class="event__offer-title">Travel by train</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">40</span>
                </label>
              </div>
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${event.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createEventPhotoMarkup(event.photo)}
              </div>
            </div>
          </section>
        </section>
      </form>`
  );
};

const createTripEditTemplate = (eventsList) => {
  return createTripEditMarkup(eventsList[0]);
};


/***/ }),

/***/ "./src/components/trip-events-list.js":
/*!********************************************!*\
  !*** ./src/components/trip-events-list.js ***!
  \********************************************/
/*! exports provided: createTripEventsListTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripEventsListTemplate", function() { return createTripEventsListTemplate; });
const createTripDaysMarkup = (dayList) => {
  return dayList.map((it, i) => {
    return (
      `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${++i}</span>
            <time class="day__date" datetime="2019-03-18">
              ${new Date(it).toLocaleString(`en-US`, {month: `short`})}
              ${new Date(it).getDate()}</time>
          </div>

          <ul class="trip-events__list">
          </ul>
        </li>`
    );
  }).join(`\n`);
};

const createTripEventsListTemplate = (dayList) => {
  return (
    `<ul class="trip-days">
        ${createTripDaysMarkup(dayList)}
      </ul>`
  );
};


/***/ }),

/***/ "./src/components/trip-info-main.js":
/*!******************************************!*\
  !*** ./src/components/trip-info-main.js ***!
  \******************************************/
/*! exports provided: createTripInfoMainTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripInfoMainTemplate", function() { return createTripInfoMainTemplate; });
const createTripInfoMainMarkup = (list) => {
  const firstPlace = list[0].city;
  const lastPlace = list[list.length - 1].city;

  return (
    `<h1 class="trip-info__title">${firstPlace} &mdash; ... &mdash; ${lastPlace}</h1>

      <p class="trip-info__dates">${list[0].startDate.toLocaleString(`en-US`, {month: `short`})} ${list[0].startDate.getDate()}&nbsp;&mdash;&nbsp;${list[list.length - 1].endDate.getDate()}</p>`
  );
};

const createTripInfoMainTemplate = (eventsList) => {
  const tripInfoMarkup = createTripInfoMainMarkup(eventsList);

  return (
    `<div class="trip-info__main">
        ${tripInfoMarkup}
      </div>`
  );
};


/***/ }),

/***/ "./src/components/trip.js":
/*!********************************!*\
  !*** ./src/components/trip.js ***!
  \********************************/
/*! exports provided: createTripTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripTemplate", function() { return createTripTemplate; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const createOffersMarkup = (offers) => {
  const offersMarkup = offers
    .filter((it) => it.checked)
    .map((it) => {
      return `<li class="event__offer">
                <span class="event__offer-title">${it.name}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${it.price}</span>
              </li>`;
    })
    .join(`\n`);

  return offersMarkup;
};

const createTripMarkup = (event) => {
  const duration = event.endDate - event.startDate;
  const durationHours = Math.floor(duration / (1000 * 60 * 60));
  const durationMinutes = Math.round(duration % (1000 * 60 * 60) / 1000 / 60);

  return (
    `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="${event.type} icon">
        </div>
        <h3 class="event__title">${_const_js__WEBPACK_IMPORTED_MODULE_1__["eventTypeMap"][event.type]} ${event.city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(event.startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["formatTime"])(event.endDate)}</time>
          </p>
          <p class="event__duration">${durationHours}H ${durationMinutes}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${event.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOffersMarkup(event.offers)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>`
  );
};

const createTripTemplate = (event) => {
  return (
    `<li class="trip-events__item">
        ${createTripMarkup(event)}
      </li>`
  );
};


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: eventTypeMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventTypeMap", function() { return eventTypeMap; });
const eventTypeMap = {
  'bus': `Bus to`,
  'check-in': `Check into hotel`,
  'drive': `Drive to`,
  'flight': `Flight to`,
  'restaurant': `Restaurant`,
  'ship': `Ship to`,
  'sightseeing': `Natural History Museum`,
  'taxi': `Taxi to`,
  'train': `Train to`,
  'transport': `Transport`,
  'trip': `Trip to`
};




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_site_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/site-menu.js */ "./src/components/site-menu.js");
/* harmony import */ var _components_main_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main-filter.js */ "./src/components/main-filter.js");
/* harmony import */ var _components_events_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/events-filter.js */ "./src/components/events-filter.js");
/* harmony import */ var _components_trip_events_list_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/trip-events-list.js */ "./src/components/trip-events-list.js");
/* harmony import */ var _components_trip_edit_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/trip-edit.js */ "./src/components/trip-edit.js");
/* harmony import */ var _components_trip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/trip.js */ "./src/components/trip.js");
/* harmony import */ var _components_trip_info_main_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/trip-info-main.js */ "./src/components/trip-info-main.js");
/* harmony import */ var _mock_main_filter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mock/main-filter.js */ "./src/mock/main-filter.js");
/* harmony import */ var _mock_site_menu_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mock/site-menu.js */ "./src/mock/site-menu.js");
/* harmony import */ var _mock_events_filter_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mock/events-filter.js */ "./src/mock/events-filter.js");
/* harmony import */ var _mock_trip_event_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mock/trip-event.js */ "./src/mock/trip-event.js");
/* harmony import */ var _components_amount_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/amount.js */ "./src/components/amount.js");













const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);

const menuItems = Object(_mock_site_menu_js__WEBPACK_IMPORTED_MODULE_8__["generateSiteMenu"])();
render(siteControlsElement.firstElementChild, Object(_components_site_menu_js__WEBPACK_IMPORTED_MODULE_0__["createSiteMenuTemplate"])(menuItems), `afterend`);

const filters = Object(_mock_main_filter_js__WEBPACK_IMPORTED_MODULE_7__["generateMainFilters"])();
render(siteControlsElement, Object(_components_main_filter_js__WEBPACK_IMPORTED_MODULE_1__["createMainFilterTemplate"])(filters), `beforeend`);

const tripEventsElement = document.querySelector(`.trip-events`);
const eventsList = Object(_mock_trip_event_js__WEBPACK_IMPORTED_MODULE_10__["generateEventsList"])();
render(tripEventsElement, Object(_components_trip_edit_js__WEBPACK_IMPORTED_MODULE_4__["createTripEditTemplate"])(eventsList), `beforeend`);

const tripEventsFilter = Object(_mock_events_filter_js__WEBPACK_IMPORTED_MODULE_9__["generateEventsFilter"])();
render(tripEventsElement.firstElementChild, Object(_components_events_filter_js__WEBPACK_IMPORTED_MODULE_2__["createEventsFilterTemplate"])(tripEventsFilter), `afterend`);

const unique = (arr) => {
  return Array.from(new Set(arr));
};

const dayList = unique(eventsList.slice(1).map((it) => new Date(it.startDate).toDateString()));
render(tripEventsElement, Object(_components_trip_events_list_js__WEBPACK_IMPORTED_MODULE_3__["createTripEventsListTemplate"])(dayList), `beforeend`);

const eventsListByDate = [];
dayList.forEach((dayListItem) => {
  eventsListByDate.push(eventsList.slice(1).filter((it) => {
    return new Date(it.startDate).toDateString() === dayListItem;
  }));
});

eventsListByDate.forEach((it, i) => {
  const tripEventsDayElement = tripEventsElement.querySelectorAll(`.trip-days__item`)[i].querySelector(`.trip-events__list`);
  it.forEach((item) => {
    render(tripEventsDayElement, Object(_components_trip_js__WEBPACK_IMPORTED_MODULE_5__["createTripTemplate"])(item), `beforeend`);
  });
});

const tripInfoElement = siteMainElement.querySelector(`.trip-info`);
render(tripInfoElement, Object(_components_trip_info_main_js__WEBPACK_IMPORTED_MODULE_6__["createTripInfoMainTemplate"])(eventsList), `afterbegin`);

const amountElement = tripInfoElement.querySelector(`.trip-info__cost-value`);
amountElement.textContent = Object(_components_amount_js__WEBPACK_IMPORTED_MODULE_11__["calculateAmount"])(eventsList);


/***/ }),

/***/ "./src/mock/events-filter.js":
/*!***********************************!*\
  !*** ./src/mock/events-filter.js ***!
  \***********************************/
/*! exports provided: generateEventsFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateEventsFilter", function() { return generateEventsFilter; });
const eventsFilterNames = [
  {
    name: `Event`,
    ischecked: true
  },
  {
    name: `Time`,
    ischecked: false
  },
  {
    name: `Price`,
    ischecked: false
  }
];

const generateEventsFilter = () => {
  return eventsFilterNames;
};


/***/ }),

/***/ "./src/mock/main-filter.js":
/*!*********************************!*\
  !*** ./src/mock/main-filter.js ***!
  \*********************************/
/*! exports provided: generateMainFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateMainFilters", function() { return generateMainFilters; });
const mainFilterNames = [
  {
    name: `Everything`,
    ischecked: true
  },
  {
    name: `Future`,
    ischecked: false
  },
  {
    name: `Past`,
    ischecked: false
  }
];

const generateMainFilters = () => {
  return mainFilterNames;
};


/***/ }),

/***/ "./src/mock/site-menu.js":
/*!*******************************!*\
  !*** ./src/mock/site-menu.js ***!
  \*******************************/
/*! exports provided: generateSiteMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSiteMenu", function() { return generateSiteMenu; });
const menuItems = [
  {
    name: `Table`,
    isactive: true
  },
  {
    name: `Stats`,
    isactive: false
  }
];

const generateSiteMenu = () => {
  return menuItems;
};


/***/ }),

/***/ "./src/mock/trip-event.js":
/*!********************************!*\
  !*** ./src/mock/trip-event.js ***!
  \********************************/
/*! exports provided: generateEventsList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateEventsList", function() { return generateEventsList; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


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
  return new Array(Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(0, 8)).
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
  const commentsCount = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(a, Math.min(b, subArray.length));

  for (let j = 0; j < commentsCount; j++) {
    let indexComment = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(0, copySubArray.length - 1);
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
  const startDate = new Date(Date.now() + Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(0, rangeEventDate));
  let endDate;

  const dur = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(1000 * 60 * 20, rangeEventDuration);

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
  return Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomIntegerNumber"])(PRICE_MIN, PRICE_MAX);
};

const generateEvent = () => {
  const [startDate, endDate] = getEventDate();
  return {
    type: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(EVENT_TYPE),
    city: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(CITIES),
    photo: getSightPhoto(),
    description: getEventDescription(),
    startDate,
    endDate,
    price: generateEventPrice(),
    offers: getEventOffers()
  };
};

const EVENT_COUNT = 10;

const generateEventsList = (count = EVENT_COUNT) => {
  const list = [];

  for (let i = 0; i < count; i++) {
    list.push(generateEvent());
  }

  return list.sort((a, b) => a.startDate - b.startDate);
};


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getRandomArrayItem, getRandomNumber, getRandomIntegerNumber, formatDate, formatTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomArrayItem", function() { return getRandomArrayItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomNumber", function() { return getRandomNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomIntegerNumber", function() { return getRandomIntegerNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTime", function() { return formatTime; });
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




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map