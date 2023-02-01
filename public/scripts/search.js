import {
  dateToUnixStamp,
  fetchAsJson,
  calculateDifferenceInDays,
  getRemotenessByCoords,
} from "./lib.js";
import { FlatRentSdk } from "./sdk/flat-rent-sdk.js";
export class HomyProvider {
  find(data) {
    return fetchAsJson(this.convertDataToQueryString(data)).then((response) => {
      return this.getFullPrice(response, data);
    });
  }
  convertDataToQueryString(data) {
    let url =
      `${HomyProvider.apiUrl}/places?` +
      `checkInDate=${dateToUnixStamp(data.checkin)}&` +
      `checkOutDate=${dateToUnixStamp(data.checkout)}&` +
      `coordinates=${data.coordinates}`;
    if (data.maxprice != null) {
      url += `&maxPrice=${data.maxprice}`;
    }
    return url;
  }
  getFullPrice(places, data) {
    return places.map((place) => {
      place.price =
        place.price * calculateDifferenceInDays(data.checkin, data.checkout);
      return place;
    });
  }
}
HomyProvider.provider = "homy";
HomyProvider.apiUrl = "http://localhost:3030";
export class FlatRentProvider {
  find(data) {
    return FlatRentProvider.connection
      .search(this.convertDataToSdkData(data))
      .then((response) => {
        return this.convertFlatToPlace(response, data);
      });
  }
  convertFlatToPlace(response, data) {
    const splitDataCoords = data.coordinates.split(",");
    const cords = [Number(splitDataCoords[0]), Number(splitDataCoords[1])];
    return response.map((item) => {
      return {
        id: item.id,
        name: item.title,
        image: item.photos[0],
        description: item.details,
        price: item.totalPrice,
        remoteness: getRemotenessByCoords(cords, item.coordinates),
      };
    });
  }
  convertDataToSdkData(data) {
    const sdkData = {
      city: data.city,
      checkInDate: new Date(data.checkin),
      checkOutDate: new Date(data.checkout),
      priceLimit: data.maxprice ? +data.maxprice : null,
    };
    return sdkData;
  }
}
FlatRentProvider.provider = "FlatRent";
FlatRentProvider.connection = new FlatRentSdk();
export const SortingMap = {
  asc: {
    name: "Сначала дешевые",
    fnc: (one, two) => {
      if (one.price > two.price) {
        return 1;
      } else if (one.price < two.price) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  desc: {
    name: "Сначала дорогие",
    fnc: (one, two) => {
      if (one.price < two.price) {
        return 1;
      } else if (one.price > two.price) {
        return -1;
      } else {
        return 0;
      }
    },
  },
  near: {
    name: "Сначала ближе",
    fnc: (one, two) => {
      if (one.remoteness > two.remoteness) {
        return 1;
      } else if (one.remoteness < two.remoteness) {
        return -1;
      } else {
        return 0;
      }
    },
  },
};
