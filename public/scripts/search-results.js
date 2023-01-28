var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { renderBlock } from './lib.js';
export function renderSearchStubBlock() {
    renderBlock('search-results-block', "\n    <div class=\"before-results-block\">\n      <img src=\"img/start-search.png\" />\n      <p>\u0427\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C \u043F\u043E\u0438\u0441\u043A, \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443 \u0438&nbsp;\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \"\u041D\u0430\u0439\u0442\u0438\"</p>\n    </div>\n    ");
}
export function toggleFavoriteItem(data) {
    var _a;
    var itemsData = localStorage.getItem('favoriteItems');
    var items = typeof itemsData === 'string' ? JSON.parse(itemsData) : undefined;
    if (inFavorite(data)) {
        console.log(data);
    }
    else {
        var store = {};
        if (items && items.length > 0) {
            Object.assign(store, __assign(__assign({}, items), (_a = {}, _a[items.length] = { id: data.id, name: data.name, image: data.image }, _a)));
        }
        else {
            Object.assign(store, {
                0: { id: data.id, name: data.name, image: data.image },
            });
        }
        localStorage.setItem('favoriteItems', JSON.stringify(store));
    }
    //getFormData();
}
export function inFavorite(data) {
    var itemsData = localStorage.getItem('favoriteItems');
    var items = typeof itemsData === 'string' ? JSON.parse(itemsData) : undefined;
    if (items && items.length > 0) {
        return !!items.find(function (item) {
            return item.id == data.id;
        });
    }
    return false;
}
export function renderEmptyOrErrorSearchBlock(reasonMessage) {
    renderBlock('search-results-block', "\n    <div class=\"no-results-block\">\n      <img src=\"img/no-results.png\" />\n      <p>".concat(reasonMessage, "</p>\n    </div>\n    "));
}
export function renderSearchResultsBlock(data) {
    var result = data.map(function (item) {
        var classStr;
        inFavorite(item) ? (classStr = 'active') : (classStr = '');
        return "<li class=\"result\">\n    <div class=\"result-container\">\n      <div class=\"result-img-container\">\n        <div class=\"favorites ".concat(classStr, "\"></div>\n        <img class=\"result-img\" src=\"").concat(item.image, "\" alt=\"").concat(item.name, "\">\n      </div>\t\n      <div class=\"result-info\">\n        <div class=\"result-info--header\">\n          <p>").concat(item.name, "</p>\n          <p class=\"price\">").concat(item.price, "&#8381;</p>\n        </div>\n        <div class=\"result-info--map\"><i class=\"map-icon\"></i> ").concat(item.remoteness, "\u043A\u043C \u043E\u0442 \u0432\u0430\u0441</div>\n        <div class=\"result-info--descr\">").concat(item.description, "</div>\n        <div class=\"result-info--footer\">\n          <div>\n            <button>\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </li>");
    });
    renderBlock('search-results-block', "\n    <div class=\"search-results-header\">\n        <p>\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430</p>\n        <div class=\"search-results-filter\">\n            <span><i class=\"icon icon-filter\"></i> \u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C:</span>\n            <select>\n                <option selected=\"\">\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u0435\u0448\u0451\u0432\u044B\u0435</option>\n                <option selected=\"\">\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0440\u043E\u0433\u0438\u0435</option>\n                <option>\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0431\u043B\u0438\u0436\u0435</option>\n            </select>\n        </div>\n    </div>\n    <ul class=\"results-list\">\n      ".concat(result.reduce(function (sum, current) { return sum + current; }, ''), "\n    </ul>\n    "));
    document.querySelectorAll('.result .favorites').forEach(function (item, idx) {
        item.addEventListener('click', function () {
            toggleFavoriteItem(data[idx]);
        });
    });
}
