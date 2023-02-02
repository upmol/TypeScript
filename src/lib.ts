import { IMessage, IAction } from './app-types';

export function renderBlock(elementId: string, html: string): void {
  const element = document.getElementById(elementId) as HTMLElement;
  element.innerHTML = html;
}

export function dateToUnixStamp(date: Date): number {
  return date.getTime() / 1000;
}

export function getRemotenessByCoords(start: number[], end: number[]): number {
  const EARTH_RADIUS = 6372795;
  const lat1 = start[0] * Math.PI / 180,
    lat2 = end[0] * Math.PI / 180,
    long1 = start[1] * Math.PI / 180,
    long2 = end[1] * Math.PI / 180,
    longDiff = long2 - long1;

  const a = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(longDiff));
  return roundNumber((EARTH_RADIUS * a) / 1000, 1);
}

function roundNumber(number: number, digits: number): number {
  const multiple = Math.pow(10, digits),
    rndedNum = Math.round(number * multiple) / multiple;
  return rndedNum;
}

export function calculateDifferenceInDays(startDate: Date, endDate: Date): number {
  const difference = endDate.getTime() - startDate.getTime()

  return Math.floor(difference / (1000 * 60 * 60 * 24))
}

export function fetchAsJson<Response>(input: RequestInfo, init?: RequestInit): Promise<Response> {
  return fetch(input, init).then((response) => {
    return response.text();
  }).then<Response>((responseText) => {
    return JSON.parse(responseText)
  })
}

export function getISODate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
}

export function getLastDayOfMonth(year: number, month: number): number {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
}

export function renderToast(message: IMessage | null, action: IAction | null): void {
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
