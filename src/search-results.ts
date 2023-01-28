import { renderBlock } from './lib.js';
import { Place, getFormData } from './search-form.js';

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

interface Favorite {
  id: number;
  name: string;
  image: string;
}

export function toggleFavoriteItem(data: Place): void {
  const itemsData: unknown = localStorage.getItem('favoriteItems');
  const items =
    typeof itemsData === 'string' ? JSON.parse(itemsData) : undefined;
  if (inFavorite(data)) {
    console.log(data);
  } else {
    const store = {};
    if (items && items.length > 0) {
      Object.assign(store, {
        ...items,
        [items.length]: { id: data.id, name: data.name, image: data.image },
      });
    } else {
      Object.assign(store, {
        0: { id: data.id, name: data.name, image: data.image },
      });
    }
    localStorage.setItem('favoriteItems', JSON.stringify(store));
  }
  //getFormData();
}
export function inFavorite(data: Place): boolean {
  const itemsData: unknown = localStorage.getItem('favoriteItems');
  const items =
    typeof itemsData === 'string' ? JSON.parse(itemsData) : undefined;
  if (items && items.length > 0) {
    return !!items.find(function (item: Favorite) {
      return item.id == data.id;
    });
  }
  return false;
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function renderSearchResultsBlock(data: Place[]): void {
  const result = data.map((item: Place) => {
    let classStr: string;
    inFavorite(item) ? (classStr = 'active') : (classStr = '');
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
        <div class="result-info--map"><i class="map-icon"></i> ${item.remoteness}км от вас</div>
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

  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
      ${result.reduce((sum, current) => sum + current, '')}
    </ul>
    `
  );
  document.querySelectorAll('.result .favorites').forEach((item, idx) => {
    item.addEventListener('click', function () {
      toggleFavoriteItem(data[idx]);
    });
  });
}
