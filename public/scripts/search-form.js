import {
  renderBlock,
  getISODate,
  getLastDayOfMonth,
  dateToUnixStamp,
  responseToJson,
  calculateDifferenceInDays,
} from "./lib.js";
import { renderSearchResultsBlock } from "./search-results.js";
import { FlatRentSdk } from "./sdk/flat-rent-sdk.js";
export const flatSDK = new FlatRentSdk();
export function getFormData() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("city"),
      checkin = document.getElementById("check-in-date"),
      checkout = document.getElementById("check-out-date"),
      maxprice = document.getElementById("max-price"),
      coordinates = document.getElementById("coordinates");
    const data = {
      city: city.value,
      checkin: new Date(checkin.value),
      checkout: new Date(checkout.value),
      maxprice: maxprice.value ? +maxprice.value : null,
      coordinates: coordinates.value,
    };
    const sdkData = {
      city: city.value,
      checkInDate: new Date(checkin.value),
      checkOutDate: new Date(checkout.value),
      priceLimit: maxprice.value ? +maxprice.value : null,
    };
    search(data).then((places) => {
      places = places.map((place) => {
        place.price =
          place.price * calculateDifferenceInDays(data.checkin, data.checkout);
        return place;
      });
      flatSDK.search(sdkData).then((sdkpl) => {
        const sdkPlaces = sdkpl.map((flat) => {
          return {
            id: flat.id,
            name: flat.title,
            image: flat.photos[0],
            description: flat.details,
            price: flat.totalPrice,
          };
        });
        places.push(...sdkPlaces);
        renderSearchResultsBlock(places);
      });
    });
  });
}
function search(data) {
  let url =
    "http://localhost:3030/places?" +
    `checkInDate=${dateToUnixStamp(data.checkin)}&` +
    `checkOutDate=${dateToUnixStamp(data.checkout)}&` +
    `coordinates=${data.coordinates}`;
  if (data.maxprice != null) {
    url += `&maxPrice=${data.maxprice}`;
  }
  return responseToJson(fetch(url));
}
export function renderSearchFormBlock(checkin = "", checkout = "") {
  const minDate = new Date(),
    maxDate = new Date(),
    checkinDefaultDate = new Date(),
    checkoutDefaultDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  maxDate.setDate(getLastDayOfMonth(maxDate.getFullYear(), maxDate.getMonth()));
  checkinDefaultDate.setDate(checkinDefaultDate.getDate() + 1);
  checkoutDefaultDate.setDate(checkoutDefaultDate.getDate() + 3);
  renderBlock(
    "search-form-block",
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
