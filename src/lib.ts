export function renderBlock(elementId: string, html: string) {
  const element = document.getElementById(elementId);
  element.innerHTML = html;
}

export function getISODate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  }`;
}

export function getLastDayOfMonth(year: number, month: number): number {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

interface IMessage {
  type: string;
  text: string;
}

interface IAction {
  name?: string;
  handler?: () => void;
}

export function renderToast(message: IMessage, action: IAction) {
  let messageText = '';

  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `;
  }

  renderBlock('toast-block', messageText);

  const button = document.getElementById('toast-main-action');
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler();
      }
      renderToast(null, null);
    };
  }
}
