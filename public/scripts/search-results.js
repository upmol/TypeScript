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
