class Destinations {
  constructor() {
    this._destinations = [];
  }

  getDestinations() {
    return this._destinations;
  }

  setDestinations(destinations) {
    this._destinations = destinations.map((destination) => {
      return {
        description: destination.description,
        name: destination.name,
        pictures: destination.pictures
      };
    });
  }
}

export default Destinations;
