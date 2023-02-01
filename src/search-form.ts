import {
  renderBlock,
  getISODate,
  getLastDayOfMonth
} from './lib.js';

import {
  SearchFormData,
  Place
} from './app-types';

import { HomyProvider, FlatRentProvider, SortingMap } from './search.js';
import { renderSearchResultsBlock } from './search-results.js';

export function getFormData(): HTMLFormElement {
  const form = <HTMLFormElement>document.getElementById('form');
  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    const city = <HTMLInputElement>document.getElementById('city'),
      checkin = <HTMLInputElement>document.getElementById('check-in-date'),
      checkout = <HTMLInputElement>document.getElementById('check-out-date'),
      maxprice = <HTMLInputElement>document.getElementById('max-price'),
      coordinates = <HTMLInputElement>document.getElementById('coordinates');


    const data: SearchFormData = {
      city: city.value,
      checkin: new Date(checkin.value),
      checkout: new Date(checkout.value),
      maxprice: maxprice.value ? +maxprice.value : null,
      coordinates: coordinates.value,
    };

    const homySearch = new HomyProvider();
    const flatSearch = new FlatRentProvider();

    Promise.all([
      homySearch.find(data),
      flatSearch.find(data)
    ]).then((results) => {
      const sorting = localStorage.getItem('sorting');
      const allResults: Place[] = [...results[0], ...results[1]];
      allResults.sort(SortingMap[sorting ? sorting : 'asc'].fnc);
      renderSearchResultsBlock(allResults);
    });
  });
  return form;
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
            <label><input type="checkbox" name="provider[]" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider[]" value="flat-rent" checked /> FlatRent</label>
          </div>-->
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkin ? checkin : getISODate(checkinDefaultDate)}" min="${getISODate(minDate)}" max="${getISODate(maxDate)}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${checkout ? checkout : getISODate(checkoutDefaultDate)}" min="${getISODate(minDate)}" max="${getISODate(maxDate)}" name="checkout" />
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
