import { renderBlock, getISODate, getLastDayOfMonth } from './lib.js';

interface SearchFormData {
  city: string;
  checkin: Date;
  checkout: Date;
  maxprice: number;
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
      ) as HTMLInputElement;
    const data: SearchFormData = {
      city: city.value,
      checkin: new Date(checkin.value),
      checkout: new Date(checkout.value),
      maxprice: +maxprice.value,
    };
    search(data);
  });
}

function search(data: SearchFormData) {
  console.log(data);
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
            <input id="city" name="city" type="text" disabled value="Севастополь" />
            <input type="hidden" disabled value="44.616499, 33.525125" />
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
