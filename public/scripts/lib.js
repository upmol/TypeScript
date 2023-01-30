export function renderBlock(elementId, html) {
  const element = document.getElementById(elementId);
  element.innerHTML = html;
}
export function dateToUnixStamp(date) {
  return date.getTime() / 1000;
}
export function calculateDifferenceInDays(startDate, endDate) {
  const difference = endDate.getTime() - startDate.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24));
}
export function responseToJson(requestPromise) {
  return requestPromise
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      return JSON.parse(response);
    });
}
export function getISODate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  }`;
}
export function getLastDayOfMonth(year, month) {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}
export function renderToast(message, action) {
  let messageText = "";
  if (message != null) {
    messageText = `
    <div id="info-block" class="info-block ${message.type}">
      <p>${message.text}</p>
      <button id="toast-main-action">${
        (action === null || action === void 0 ? void 0 : action.name) ||
        "Закрыть"
      }</button>
    </div>
  `;
  }
  renderBlock("toast-block", messageText);
  const button = document.getElementById("toast-main-action");
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler();
      }
      renderToast(null, null);
    };
  }
}
