import { renderBlock, getISODate, getLastDayOfMonth } from "./lib.js";
export function renderSearchFormBlock(checkin = "", checkout = "") {
    let minDate = new Date(), maxDate = new Date(), checkinDefaultDate = new Date(), checkoutDefaultDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    maxDate.setDate(getLastDayOfMonth(maxDate.getFullYear(), maxDate.getMonth()));
    checkinDefaultDate.setDate(checkinDefaultDate.getDate() + 1);
    checkoutDefaultDate.setDate(checkoutDefaultDate.getDate() + 3);
    renderBlock("search-form-block", `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Севастополь" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
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
    `);
}
