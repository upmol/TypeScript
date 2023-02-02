import {
  Provider,
  SearchFormData,
  Place,
  SM
} from './app-types';

import {
  dateToUnixStamp,
  fetchAsJson,
  calculateDifferenceInDays,
  getRemotenessByCoords
} from './lib.js';

import { FlatRentSdk, iFlat, iParams } from './sdk/flat-rent-sdk.js';

export class HomyProvider implements Provider {

  public static provider = 'homy';
  private static apiUrl = 'http://localhost:3030';

  find(data: SearchFormData): Promise<Place[]> {
    return fetchAsJson<Place[]>(this.convertDataToQueryString(data))
      .then((response) => {

        return this.getFullPrice(response, data);
      });
  }

  private convertDataToQueryString(data: SearchFormData): string {
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

  private getFullPrice(places: Place[], data: SearchFormData): Place[] {
    return places.map((place: Place) => {
      place.price = place.price * calculateDifferenceInDays(data.checkin, data.checkout);
      return place;
    });
  }

}

export class FlatRentProvider implements Provider {
  public static provider = 'FlatRent';
  private static connection = new FlatRentSdk();

  find(data: SearchFormData): Promise<Place[]> {
    return FlatRentProvider.connection.search(this.convertDataToSdkData(data)).then((response: iFlat[]) => {

      return this.convertFlatToPlace(response, data);
    });
  }

  private convertFlatToPlace(response: iFlat[], data: SearchFormData): Place[] {
    const splitDataCoords: string[] = (data.coordinates).split(',');
    const cords = [Number(splitDataCoords[0]), Number(splitDataCoords[1])];
    return response.map((item: iFlat) => {
      return <Place>{
        id: item.id,
        name: item.title,
        image: item.photos[0],
        description: item.details,
        price: item.totalPrice,
        remoteness: getRemotenessByCoords(cords, item.coordinates),
      };
    })
  }

  private convertDataToSdkData(data: SearchFormData): iParams {
    const sdkData: iParams = {
      city: data.city,
      checkInDate: new Date(data.checkin),
      checkOutDate: new Date(data.checkout),
      priceLimit: data.maxprice ? +data.maxprice : null
    }
    return sdkData;
  }
}

export const SortingMap: SM = {
  asc: {
    name: 'Сначала дешевые',
    fnc: (one: Place, two: Place) => {
      if (one.price > two.price) {
        return 1
      } else if (one.price < two.price) {
        return -1
      } else {
        return 0
      }
    }
  },
  desc: {
    name: 'Сначала дорогие',
    fnc: (one: Place, two: Place) => {
      if (one.price < two.price) {
        return 1
      } else if (one.price > two.price) {
        return -1
      } else {
        return 0
      }
    },
  },
  near: {
    name: 'Сначала ближе',
    fnc: (one: Place, two: Place) => {
      if (one.remoteness > two.remoteness) {
        return 1
      } else if (one.remoteness < two.remoteness) {
        return -1
      } else {
        return 0
      }
    }
  }
}
