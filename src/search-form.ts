import {
  renderBlock,
  getISODate,
  getLastDayOfMonth,
  dateToUnixStamp,
  responseToJson,
  calculateDifferenceInDays
} from './lib.js';
import { renderSearchResultsBlock } from './search-results.js';
import { FlatRentSdk, iFlat, iParams } from './sdk/flat-rent-sdk.js';

export const flatSDK = new FlatRentSdk();

interface SearchFormData {
  city: string;
  checkin: Date;
  checkout: Date;
  maxprice: number | null;
  coordinates: string;
}
export interface Place {
  id: number | string;
  image: string;
  name: string;
  description: string;
  remoteness?: number;
  bookedDates: number[];
  price: number;
}

export function getFormData(): void {
  const form = document.getElementById('form') as HTMLFormElement;
  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
    const city: HTMLInputElement = document.getElementById(
      'city'
    ) as HTMLInputElement,
      checkin: HTMLInputElement = document.getElementById(
        'check-in-date'
      ) as HTMLInputElement,
      checkout: HTMLInputElement = document.getElementById(
        'check-out-date'
      ) as HTMLInputElement,
      maxprice: HTMLInputElement = document.getElementById(
        'max-price'
      ) as HTMLInputElement,
      coordinates: HTMLInputElement = document.getElementById(
        'coordinates'
      ) as HTMLInputElement;
    const data: SearchFormData = {
      city: city.value,
      checkin: new Date(checkin.value),
      checkout: new Date(checkout.value),
      maxprice: maxprice.value ? +maxprice.value : null,
      coordinates: coordinates.value,
    };
    const sdkData:iParams = {
      city: city.value,
      checkInDate: new Date(checkin.value),
      checkOutDate: new Date(checkout.value),
      priceLimit: maxprice.value ? +maxprice.value : null
    }
    
    search(data).then((places: Place[]) =>{ 
      places = places.map((place:Place)=>{
        place.price = place.price*calculateDifferenceInDays(data.checkin, data.checkout);
        return place;
      });
      flatSDK.search(sdkData).then((sdkpl:iFlat[]) => {
        const sdkPlaces:Place[] = sdkpl.map((flat:iFlat)=>{
          return {
            id: flat.id,
            name: flat.title,
            image: flat.photos[0],
            description: flat.details,
            price: flat.totalPrice,
          } as Place;
        });
        places.push(...sdkPlaces);
        renderSearchResultsBlock(places);
      });
    });
  });
}
function search(data: SearchFormData) {
  let url: string =
    'http://localhost:3030/places?' +
    `checkInDate=${dateToUnixStamp(data.checkin)}&` +
    `checkOutDate=${dateToUnixStamp(data.checkout)}&` +
    `coordinates=${data.coordinates}`;

  if (data.maxprice != null) {
    url += `&maxPrice=${data.maxprice}`;
  }

  return responseToJson(fetch(url));
}

export function renderSearchFormBlock(checkin = '', checkout = ''): void {
  const minDate = new Date(),
    maxDate = new Date(),
    checkinDefaultDate = new Date(),
    checkoutDefaultDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  maxDate.setDate(getLastDayOfMonth(maxDate.getFullYear(), maxDate.getMonth()));
  checkinDefaultDate.setDate(checkinDefaultDate.getDate() + 1);
  checkoutDefaultDate.setDate(checkoutDefaultDate.getDate() + 3);

  renderBlock(
    'search-form-block',
    `
    <form id="form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" name="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" id="coordinates" name="coordinates" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${
  checkin ? checkin : getISODate(checkinDefaultDate)
}" min="${getISODate(minDate)}" max="${getISODate(
  maxDate
)}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${
  checkout ? checkout : getISODate(checkoutDefaultDate)
}" min="${getISODate(minDate)}" max="${getISODate(
  maxDate
)}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}
