import { renderBlock, getISODate, getLastDayOfMonth } from "./lib.js";
import { HomyProvider, FlatRentProvider, SortingMap } from "./search.js";
import { renderSearchResultsBlock } from "./search-results.js";
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
    const homySearch = new HomyProvider();
    const flatSearch = new FlatRentProvider();
    Promise.all([homySearch.find(data), flatSearch.find(data)]).then(
      (results) => {
        const sorting = localStorage.getItem("sorting");
        const allResults = [...results[0], ...results[1]];
        allResults.sort(SortingMap[sorting ? sorting : "asc"].fnc);
        renderSearchResultsBlock(allResults);
      }
    );
  });
  return form;
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
            <label><input type="checkbox" name="provider[]" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider[]" value="flat-rent" checked /> FlatRent</label>
          </div>-->
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFdBQVcsRUFDWCxVQUFVLEVBQ1YsaUJBQWlCLEVBQ2xCLE1BQU0sVUFBVSxDQUFDO0FBT2xCLE9BQU8sRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRS9ELE1BQU0sVUFBVSxXQUFXO0lBQ3pCLE1BQU0sSUFBSSxHQUFvQixRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFjLEVBQUUsRUFBRTtRQUNqRCxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFbkIsTUFBTSxJQUFJLEdBQXFCLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQzVELE9BQU8sR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsRUFDcEUsUUFBUSxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEVBQ3RFLFFBQVEsR0FBcUIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFDakUsV0FBVyxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBR3pFLE1BQU0sSUFBSSxHQUFtQjtZQUMzQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDaEIsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDaEMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDbEMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNqRCxXQUFXLEVBQUUsV0FBVyxDQUFDLEtBQUs7U0FDL0IsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDVixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbEIsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoRCxNQUFNLFVBQVUsR0FBWSxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNELHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFDRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUMvRCxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxFQUN4QixPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFDcEIsa0JBQWtCLEdBQUcsSUFBSSxJQUFJLEVBQUUsRUFDL0IsbUJBQW1CLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNuQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6QyxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM3RCxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFL0QsV0FBVyxDQUNULG1CQUFtQixFQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7MkRBaUJ1RCxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLFVBQVUsQ0FBQyxPQUFPLENBQUM7Ozs7NERBSTNHLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsVUFBVSxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsVUFBVSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7O0tBWXRLLENBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICByZW5kZXJCbG9jayxcbiAgZ2V0SVNPRGF0ZSxcbiAgZ2V0TGFzdERheU9mTW9udGhcbn0gZnJvbSAnLi9saWIuanMnO1xuXG5pbXBvcnQge1xuICBTZWFyY2hGb3JtRGF0YSxcbiAgUGxhY2Vcbn0gZnJvbSAnLi9hcHAtdHlwZXMnO1xuXG5pbXBvcnQgeyBIb215UHJvdmlkZXIsIEZsYXRSZW50UHJvdmlkZXIsIFNvcnRpbmdNYXAgfSBmcm9tICcuL3NlYXJjaC5qcyc7XG5pbXBvcnQgeyByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2sgfSBmcm9tICcuL3NlYXJjaC1yZXN1bHRzLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm1EYXRhKCk6IEhUTUxGb3JtRWxlbWVudCB7XG4gIGNvbnN0IGZvcm0gPSA8SFRNTEZvcm1FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtJyk7XG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGU6IFN1Ym1pdEV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgY2l0eSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5JyksXG4gICAgICBjaGVja2luID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrLWluLWRhdGUnKSxcbiAgICAgIGNoZWNrb3V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrLW91dC1kYXRlJyksXG4gICAgICBtYXhwcmljZSA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXgtcHJpY2UnKSxcbiAgICAgIGNvb3JkaW5hdGVzID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nvb3JkaW5hdGVzJyk7XG5cblxuICAgIGNvbnN0IGRhdGE6IFNlYXJjaEZvcm1EYXRhID0ge1xuICAgICAgY2l0eTogY2l0eS52YWx1ZSxcbiAgICAgIGNoZWNraW46IG5ldyBEYXRlKGNoZWNraW4udmFsdWUpLFxuICAgICAgY2hlY2tvdXQ6IG5ldyBEYXRlKGNoZWNrb3V0LnZhbHVlKSxcbiAgICAgIG1heHByaWNlOiBtYXhwcmljZS52YWx1ZSA/ICttYXhwcmljZS52YWx1ZSA6IG51bGwsXG4gICAgICBjb29yZGluYXRlczogY29vcmRpbmF0ZXMudmFsdWUsXG4gICAgfTtcblxuICAgIGNvbnN0IGhvbXlTZWFyY2ggPSBuZXcgSG9teVByb3ZpZGVyKCk7XG4gICAgY29uc3QgZmxhdFNlYXJjaCA9IG5ldyBGbGF0UmVudFByb3ZpZGVyKCk7XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICBob215U2VhcmNoLmZpbmQoZGF0YSksXG4gICAgICBmbGF0U2VhcmNoLmZpbmQoZGF0YSlcbiAgICBdKS50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICBjb25zdCBzb3J0aW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvcnRpbmcnKTtcbiAgICAgIGNvbnN0IGFsbFJlc3VsdHM6IFBsYWNlW10gPSBbLi4ucmVzdWx0c1swXSwgLi4ucmVzdWx0c1sxXV07XG4gICAgICBhbGxSZXN1bHRzLnNvcnQoU29ydGluZ01hcFtzb3J0aW5nID8gc29ydGluZyA6ICdhc2MnXS5mbmMpO1xuICAgICAgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKGFsbFJlc3VsdHMpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGZvcm07XG59XG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoRm9ybUJsb2NrKGNoZWNraW4gPSAnJywgY2hlY2tvdXQgPSAnJyk6IHZvaWQge1xuICBjb25zdCBtaW5EYXRlID0gbmV3IERhdGUoKSxcbiAgICBtYXhEYXRlID0gbmV3IERhdGUoKSxcbiAgICBjaGVja2luRGVmYXVsdERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgIGNoZWNrb3V0RGVmYXVsdERhdGUgPSBuZXcgRGF0ZSgpO1xuICBtYXhEYXRlLnNldE1vbnRoKG1heERhdGUuZ2V0TW9udGgoKSArIDEpO1xuICBtYXhEYXRlLnNldERhdGUoZ2V0TGFzdERheU9mTW9udGgobWF4RGF0ZS5nZXRGdWxsWWVhcigpLCBtYXhEYXRlLmdldE1vbnRoKCkpKTtcbiAgY2hlY2tpbkRlZmF1bHREYXRlLnNldERhdGUoY2hlY2tpbkRlZmF1bHREYXRlLmdldERhdGUoKSArIDEpO1xuICBjaGVja291dERlZmF1bHREYXRlLnNldERhdGUoY2hlY2tvdXREZWZhdWx0RGF0ZS5nZXREYXRlKCkgKyAzKTtcblxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxuICAgIGBcbiAgICA8Zm9ybSBpZD1cImZvcm1cIj5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cInNlYXJjaC1maWxlZHNldFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+0JPQvtGA0L7QtDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaXR5XCIgbmFtZT1cImNpdHlcIiB0eXBlPVwidGV4dFwiIGRpc2FibGVkIHZhbHVlPVwi0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LNcIiAvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImNvb3JkaW5hdGVzXCIgbmFtZT1cImNvb3JkaW5hdGVzXCIgZGlzYWJsZWQgdmFsdWU9XCI1OS45Mzg2LDMwLjMxNDFcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwicHJvdmlkZXJzXCI+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlcltdXCIgdmFsdWU9XCJob215XCIgY2hlY2tlZCAvPiBIb215PC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb3ZpZGVyW11cIiB2YWx1ZT1cImZsYXQtcmVudFwiIGNoZWNrZWQgLz4gRmxhdFJlbnQ8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2staW4tZGF0ZVwiPtCU0LDRgtCwINC30LDQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1pbi1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7Y2hlY2tpbiA/IGNoZWNraW4gOiBnZXRJU09EYXRlKGNoZWNraW5EZWZhdWx0RGF0ZSl9XCIgbWluPVwiJHtnZXRJU09EYXRlKG1pbkRhdGUpfVwiIG1heD1cIiR7Z2V0SVNPRGF0ZShtYXhEYXRlKX1cIiBuYW1lPVwiY2hlY2tpblwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGVjay1vdXQtZGF0ZVwiPtCU0LDRgtCwINCy0YvQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1vdXQtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgdmFsdWU9XCIke2NoZWNrb3V0ID8gY2hlY2tvdXQgOiBnZXRJU09EYXRlKGNoZWNrb3V0RGVmYXVsdERhdGUpfVwiIG1pbj1cIiR7Z2V0SVNPRGF0ZShtaW5EYXRlKX1cIiBtYXg9XCIke2dldElTT0RhdGUobWF4RGF0ZSl9XCIgbmFtZT1cImNoZWNrb3V0XCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm1heC1wcmljZVwiPtCc0LDQutGBLiDRhtC10L3QsCDRgdGD0YLQvtC6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cIm1heC1wcmljZVwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCJcIiBuYW1lPVwicHJpY2VcIiBjbGFzcz1cIm1heC1wcmljZVwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+PGJ1dHRvbj7QndCw0LnRgtC4PC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9maWVsZHNldD5cbiAgICA8L2Zvcm0+XG4gICAgYFxuICApO1xufVxuIl19
