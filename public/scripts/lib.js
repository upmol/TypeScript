export function renderBlock(elementId, html) {
    var element = document.getElementById(elementId);
    element.innerHTML = html;
}
export function dateToUnixStamp(date) {
    return date.getTime() / 1000;
}
export function responseToJson(requestPromise) {
    return requestPromise
        .then(function (response) {
        return response.text();
    })
        .then(function (response) {
        return JSON.parse(response);
    });
}
export function getISODate(date) {
    return "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1, "-").concat(date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
}
export function getLastDayOfMonth(year, month) {
    var date = new Date(year, month + 1, 0);
    return date.getDate();
}
export function renderToast(message, action) {
    var messageText = '';
    if (message != null) {
        messageText = "\n      <div id=\"info-block\" class=\"info-block ".concat(message.type, "\">\n        <p>").concat(message.text, "</p>\n        <button id=\"toast-main-action\">").concat((action === null || action === void 0 ? void 0 : action.name) || 'Закрыть', "</button>\n      </div>\n    ");
    }
    renderBlock('toast-block', messageText);
    var button = document.getElementById('toast-main-action');
    if (button != null) {
        button.onclick = function () {
            if (action != null && action.handler != null) {
                action.handler();
            }
            renderToast(null, null);
        };
    }
}
