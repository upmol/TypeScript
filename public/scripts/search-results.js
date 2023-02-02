import { renderBlock } from "./lib.js";
import { renderUserInfo } from "./user.js";
import { SortingMap } from "./search.js";
export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}
export function toggleFavoriteItem(data) {
  const itemsData = localStorage.getItem("favoriteItems");
  const items =
    typeof itemsData === "string" ? JSON.parse(itemsData) : undefined;
  const store = {};
  if (inFavorite(data)) {
    const values = Object.values(items);
    const filtered = values.filter(function (item) {
      return item.id != data.id;
    });
    Object.assign(store, Object.assign({}, filtered));
  } else {
    Object.assign(
      store,
      Object.assign(Object.assign({}, items), {
        [Object.keys(items).length]: {
          id: data.id,
          name: data.name,
          image: data.image,
        },
      })
    );
  }
  if (typeof store === "object") {
    localStorage.setItem("favoritesAmount", String(Object.keys(store).length));
    localStorage.setItem("favoriteItems", JSON.stringify(store));
  }
}
export function inFavorite(data) {
  const itemsData = localStorage.getItem("favoriteItems");
  const items =
    typeof itemsData === "string" ? JSON.parse(itemsData) : undefined;
  if (items && Object.keys(items).length > 0) {
    const values = Object.values(items);
    return !!values.find(function (item) {
      return item.id == data.id;
    });
  }
  return false;
}
export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}
export function renderSearchResultsBlock(data) {
  var _a;
  const result = data.map((item) => {
    let classStr;
    inFavorite(item) ? (classStr = "active") : (classStr = "");
    return `<li class="result">
    <div class="result-container">
      <div class="result-img-container">
        <div class="favorites ${classStr}"></div>
        <img class="result-img" src="${item.image}" alt="${item.name}">
      </div>	
      <div class="result-info">
        <div class="result-info--header">
          <p>${item.name}</p>
          <p class="price">${item.price}&#8381;</p>
        </div>
        <div class="result-info--map"><i class="map-icon"></i> ${
          item.remoteness
            ? item.remoteness + "км от вас"
            : "расстояние не известно"
        }</div>
        <div class="result-info--descr">${item.description}</div>
        <div class="result-info--footer">
          <div>
            <button>Забронировать</button>
          </div>
        </div>
      </div>
    </div>
  </li>`;
  });
  const sorting = localStorage.getItem("sorting");
  const sortKeys = Object.keys(SortingMap);
  let sortTemplate = "<select>";
  for (const key of sortKeys) {
    console.log(SortingMap[key]);
    sortTemplate += `<option ${
      sorting === key ? "selected" : ""
    } value="${key}">${SortingMap[key].name}</option>`;
  }
  sortTemplate += "</select>";
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            
                ${sortTemplate}
            
        </div>
    </div>
    <ul class="results-list">
      ${result.reduce((sum, current) => sum + current, "")}
    </ul>
    `
  );
  document.querySelectorAll(".result .favorites").forEach((item, idx) => {
    item.addEventListener("click", function () {
      toggleFavoriteItem(data[idx]);
      renderSearchResultsBlock(data);
      renderUserInfo();
    });
  });
  (_a = document.querySelector(".search-results-filter select")) === null ||
  _a === void 0
    ? void 0
    : _a.addEventListener("change", (e) => {
        var _a;
        e.preventDefault();
        const el = e.target;
        localStorage.setItem("sorting", el.value);
        const form = document.getElementById("form");
        (_a = form.querySelector("button")) === null || _a === void 0
          ? void 0
          : _a.click();
      });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV2QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFekMsTUFBTSxVQUFVLHFCQUFxQjtJQUNuQyxXQUFXLENBQ1Qsc0JBQXNCLEVBQ3RCOzs7OztLQUtDLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsSUFBVztJQUM1QyxNQUFNLFNBQVMsR0FBWSxZQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sS0FBSyxHQUNULE9BQU8sU0FBUyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3BFLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNwQixNQUFNLE1BQU0sR0FBZSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELE1BQU0sUUFBUSxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFjO1lBQ2pFLE9BQU8sSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLG9CQUNkLFFBQVEsRUFDWCxDQUFDO0tBQ0o7U0FBTTtRQUNMLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxrQ0FDZCxLQUFLLEtBQ1IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFD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b3J0IHsgUGxhY2UsIEZhdm9yaXRlIH0gZnJvbSAnLi9hcHAtdHlwZXMnO1xuaW1wb3J0IHsgcmVuZGVyVXNlckluZm8gfSBmcm9tICcuL3VzZXIuanMnO1xuaW1wb3J0IHsgU29ydGluZ01hcCB9IGZyb20gJy4vc2VhcmNoLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaFN0dWJCbG9jaygpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cImJlZm9yZS1yZXN1bHRzLWJsb2NrXCI+XG4gICAgICA8aW1nIHNyYz1cImltZy9zdGFydC1zZWFyY2gucG5nXCIgLz5cbiAgICAgIDxwPtCn0YLQvtCx0Ysg0L3QsNGH0LDRgtGMINC/0L7QuNGB0LosINC30LDQv9C+0LvQvdC40YLQtSDRhNC+0YDQvNGDINC4Jm5ic3A70L3QsNC20LzQuNGC0LUgXCLQndCw0LnRgtC4XCI8L3A+XG4gICAgPC9kaXY+XG4gICAgYFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlRmF2b3JpdGVJdGVtKGRhdGE6IFBsYWNlKTogdm9pZCB7XG4gIGNvbnN0IGl0ZW1zRGF0YTogdW5rbm93biA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJyk7XG4gIGNvbnN0IGl0ZW1zID1cbiAgICB0eXBlb2YgaXRlbXNEYXRhID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UoaXRlbXNEYXRhKSA6IHVuZGVmaW5lZDtcbiAgY29uc3Qgc3RvcmUgPSB7fTtcbiAgaWYgKGluRmF2b3JpdGUoZGF0YSkpIHtcbiAgICBjb25zdCB2YWx1ZXM6IEZhdm9yaXRlW10gPSBPYmplY3QudmFsdWVzKGl0ZW1zKTtcbiAgICBjb25zdCBmaWx0ZXJlZDogRmF2b3JpdGVbXSA9IHZhbHVlcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW06IEZhdm9yaXRlKSB7XG4gICAgICByZXR1cm4gaXRlbS5pZCAhPSBkYXRhLmlkO1xuICAgIH0pO1xuICAgIE9iamVjdC5hc3NpZ24oc3RvcmUsIHtcbiAgICAgIC4uLmZpbHRlcmVkXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgT2JqZWN0LmFzc2lnbihzdG9yZSwge1xuICAgICAgLi4uaXRlbXMsXG4gICAgICBbT2JqZWN0LmtleXMoaXRlbXMpLmxlbmd0aF06IHsgaWQ6IGRhdGEuaWQsIG5hbWU6IGRhdGEubmFtZSwgaW1hZ2U6IGRhdGEuaW1hZ2UgfSxcbiAgICB9KTtcbiAgfVxuICBpZiAodHlwZW9mIHN0b3JlID09PSAnb2JqZWN0Jykge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZXNBbW91bnQnLCBTdHJpbmcoT2JqZWN0LmtleXMoc3RvcmUpLmxlbmd0aCkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJywgSlNPTi5zdHJpbmdpZnkoc3RvcmUpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5GYXZvcml0ZShkYXRhOiBQbGFjZSk6IGJvb2xlYW4ge1xuICBjb25zdCBpdGVtc0RhdGE6IHVua25vd24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmF2b3JpdGVJdGVtcycpO1xuICBjb25zdCBpdGVtcyA9XG4gICAgdHlwZW9mIGl0ZW1zRGF0YSA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGl0ZW1zRGF0YSkgOiB1bmRlZmluZWQ7XG4gIGlmIChpdGVtcyAmJiBPYmplY3Qua2V5cyhpdGVtcykubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IHZhbHVlczogRmF2b3JpdGVbXSA9IE9iamVjdC52YWx1ZXMoaXRlbXMpO1xuICAgIHJldHVybiAhIXZhbHVlcy5maW5kKGZ1bmN0aW9uIChpdGVtOiBGYXZvcml0ZSkge1xuICAgICAgcmV0dXJuIGl0ZW0uaWQgPT0gZGF0YS5pZDtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJFbXB0eU9yRXJyb3JTZWFyY2hCbG9jayhyZWFzb25NZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cIm5vLXJlc3VsdHMtYmxvY2tcIj5cbiAgICAgIDxpbWcgc3JjPVwiaW1nL25vLXJlc3VsdHMucG5nXCIgLz5cbiAgICAgIDxwPiR7cmVhc29uTWVzc2FnZX08L3A+XG4gICAgPC9kaXY+XG4gICAgYFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrKGRhdGE6IFBsYWNlW10pOiB2b2lkIHtcbiAgY29uc3QgcmVzdWx0ID0gZGF0YS5tYXAoKGl0ZW06IFBsYWNlKSA9PiB7XG4gICAgbGV0IGNsYXNzU3RyOiBzdHJpbmc7XG4gICAgaW5GYXZvcml0ZShpdGVtKSA/IChjbGFzc1N0ciA9ICdhY3RpdmUnKSA6IChjbGFzc1N0ciA9ICcnKTtcbiAgICByZXR1cm4gYDxsaSBjbGFzcz1cInJlc3VsdFwiPlxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWltZy1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZhdm9yaXRlcyAke2NsYXNzU3RyfVwiPjwvZGl2PlxuICAgICAgICA8aW1nIGNsYXNzPVwicmVzdWx0LWltZ1wiIHNyYz1cIiR7aXRlbS5pbWFnZX1cIiBhbHQ9XCIke2l0ZW0ubmFtZX1cIj5cbiAgICAgIDwvZGl2Plx0XG4gICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm9cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1oZWFkZXJcIj5cbiAgICAgICAgICA8cD4ke2l0ZW0ubmFtZX08L3A+XG4gICAgICAgICAgPHAgY2xhc3M9XCJwcmljZVwiPiR7aXRlbS5wcmljZX0mIzgzODE7PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1tYXBcIj48aSBjbGFzcz1cIm1hcC1pY29uXCI+PC9pPiAke2l0ZW0ucmVtb3RlbmVzcyA/IGl0ZW0ucmVtb3RlbmVzcyArICfQutC8INC+0YIg0LLQsNGBJyA6ICfRgNCw0YHRgdGC0L7Rj9C90LjQtSDQvdC1INC40LfQstC10YHRgtC90L4nfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWRlc2NyXCI+JHtpdGVtLmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWZvb3RlclwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YnV0dG9uPtCX0LDQsdGA0L7QvdC40YDQvtCy0LDRgtGMPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvbGk+YDtcbiAgfSk7XG5cbiAgY29uc3Qgc29ydGluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb3J0aW5nJyk7XG4gIGNvbnN0IHNvcnRLZXlzID0gT2JqZWN0LmtleXMoU29ydGluZ01hcCk7XG5cbiAgbGV0IHNvcnRUZW1wbGF0ZSA9ICc8c2VsZWN0Pic7XG5cbiAgZm9yIChjb25zdCBrZXkgb2Ygc29ydEtleXMpIHtcbiAgICBjb25zb2xlLmxvZyhTb3J0aW5nTWFwW2tleV0pO1xuICAgIHNvcnRUZW1wbGF0ZSArPSBgPG9wdGlvbiAke3NvcnRpbmcgPT09IGtleSA/ICdzZWxlY3RlZCcgOiAnJ30gdmFsdWU9XCIke2tleX1cIj4ke1NvcnRpbmdNYXBba2V5XS5uYW1lfTwvb3B0aW9uPmA7XG4gIH1cbiAgc29ydFRlbXBsYXRlICs9ICc8L3NlbGVjdD4nO1xuXG4gIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXG4gICAgYFxuICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0cy1oZWFkZXJcIj5cbiAgICAgICAgPHA+0KDQtdC30YPQu9GM0YLQsNGC0Ysg0L/QvtC40YHQutCwPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdHMtZmlsdGVyXCI+XG4gICAgICAgICAgICA8c3Bhbj48aSBjbGFzcz1cImljb24gaWNvbi1maWx0ZXJcIj48L2k+INCh0L7RgNGC0LjRgNC+0LLQsNGC0Yw6PC9zcGFuPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJHtzb3J0VGVtcGxhdGV9XG4gICAgICAgICAgICBcbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPHVsIGNsYXNzPVwicmVzdWx0cy1saXN0XCI+XG4gICAgICAke3Jlc3VsdC5yZWR1Y2UoKHN1bSwgY3VycmVudCkgPT4gc3VtICsgY3VycmVudCwgJycpfVxuICAgIDwvdWw+XG4gICAgYFxuICApO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVzdWx0IC5mYXZvcml0ZXMnKS5mb3JFYWNoKChpdGVtLCBpZHgpID0+IHtcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgdG9nZ2xlRmF2b3JpdGVJdGVtKGRhdGFbaWR4XSk7XG4gICAgICByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soZGF0YSk7XG4gICAgICByZW5kZXJVc2VySW5mbygpO1xuICAgIH0pO1xuICB9KTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1yZXN1bHRzLWZpbHRlciBzZWxlY3QnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgZWwgPSA8SFRNTElucHV0RWxlbWVudD5lLnRhcmdldDtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc29ydGluZycsIGVsLnZhbHVlKTtcbiAgICBjb25zdCBmb3JtID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpO1xuICAgIGZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uJyk/LmNsaWNrKCk7XG4gIH0pO1xufVxuIl19
