import { renderBlock, getISODate, getLastDayOfMonth, dateToUnixStamp, responseToJson, } from './lib.js';
import { renderSearchResultsBlock } from './search-results.js';
export function getFormData() {
    var form = document.getElementById('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var city = document.getElementById('city'), checkin = document.getElementById('check-in-date'), checkout = document.getElementById('check-out-date'), maxprice = document.getElementById('max-price'), coordinates = document.getElementById('coordinates');
        var data = {
            city: city.value,
            checkin: new Date(checkin.value),
            checkout: new Date(checkout.value),
            maxprice: maxprice.value ? +maxprice.value : null,
            coordinates: coordinates.value,
        };
        search(data).then(function (places) { return renderSearchResultsBlock(places); });
    });
}
function search(data) {
    var url = 'http://localhost:3030/places?' +
        "checkInDate=".concat(dateToUnixStamp(data.checkin), "&") +
        "checkOutDate=".concat(dateToUnixStamp(data.checkout), "&") +
        "coordinates=".concat(data.coordinates);
    if (data.maxprice != null) {
        url += "&maxPrice=".concat(data.maxprice);
    }
    return responseToJson(fetch(url));
}
export function renderSearchFormBlock(checkin, checkout) {
    if (checkin === void 0) { checkin = ''; }
    if (checkout === void 0) { checkout = ''; }
    var minDate = new Date(), maxDate = new Date(), checkinDefaultDate = new Date(), checkoutDefaultDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);
    maxDate.setDate(getLastDayOfMonth(maxDate.getFullYear(), maxDate.getMonth()));
    checkinDefaultDate.setDate(checkinDefaultDate.getDate() + 1);
    checkoutDefaultDate.setDate(checkoutDefaultDate.getDate() + 3);
    renderBlock('search-form-block', "\n    <form id=\"form\">\n      <fieldset class=\"search-filedset\">\n        <div class=\"row\">\n          <div>\n            <label for=\"city\">\u0413\u043E\u0440\u043E\u0434</label>\n            <input id=\"city\" name=\"city\" type=\"text\" disabled value=\"\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\" />\n            <input type=\"hidden\" id=\"coordinates\" name=\"coordinates\" disabled value=\"59.9386,30.3141\" />\n          </div>\n          <!--<div class=\"providers\">\n            <label><input type=\"checkbox\" name=\"provider\" value=\"homy\" checked /> Homy</label>\n            <label><input type=\"checkbox\" name=\"provider\" value=\"flat-rent\" checked /> FlatRent</label>\n          </div>--!>\n        </div>\n        <div class=\"row\">\n          <div>\n            <label for=\"check-in-date\">\u0414\u0430\u0442\u0430 \u0437\u0430\u0435\u0437\u0434\u0430</label>\n            <input id=\"check-in-date\" type=\"date\" value=\"".concat(checkin ? checkin : getISODate(checkinDefaultDate), "\" min=\"").concat(getISODate(minDate), "\" max=\"").concat(getISODate(maxDate), "\" name=\"checkin\" />\n          </div>\n          <div>\n            <label for=\"check-out-date\">\u0414\u0430\u0442\u0430 \u0432\u044B\u0435\u0437\u0434\u0430</label>\n            <input id=\"check-out-date\" type=\"date\" value=\"").concat(checkout ? checkout : getISODate(checkoutDefaultDate), "\" min=\"").concat(getISODate(minDate), "\" max=\"").concat(getISODate(maxDate), "\" name=\"checkout\" />\n          </div>\n          <div>\n            <label for=\"max-price\">\u041C\u0430\u043A\u0441. \u0446\u0435\u043D\u0430 \u0441\u0443\u0442\u043E\u043A</label>\n            <input id=\"max-price\" type=\"text\" value=\"\" name=\"price\" class=\"max-price\" />\n          </div>\n          <div>\n            <div><button>\u041D\u0430\u0439\u0442\u0438</button></div>\n          </div>\n        </div>\n      </fieldset>\n    </form>\n    "));
}
