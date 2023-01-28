import { renderBlock } from './lib.js';

export class User {
  username: string;
  avatarUrl: string;
  constructor(username: string, avatarUrl: string) {
    this.username = username;
    this.avatarUrl = avatarUrl;
  }
}

export function getUserData(): unknown {
  const userData: unknown = localStorage.getItem('user');
  const data = typeof userData === 'string' ? JSON.parse(userData) : undefined;
  if (typeof data === 'object' && 'username' in data && 'avatarUrl' in data) {
    return new User(data.username, data.avatarUrl);
  }

  return 'Возможно вы не залогинены!';
}

export function getFavoritesAmount(): unknown {
  const amountData: unknown = localStorage.getItem('favoritesAmount');
  const amount =
    typeof amountData === 'string' ? JSON.parse(amountData) : undefined;
  if (!isNaN(Number(amount))) {
    return Number(amount);
  }

  return false;
}

export function renderUserBlock(
  name: string,
  avatar: string,
  favoriteItemsAmount?: number
): void {
  let favoritesCaption: string | number;
  if (favoriteItemsAmount && favoriteItemsAmount > 0) {
    favoritesCaption = favoriteItemsAmount;
  } else {
    favoritesCaption = 'ничего нет';
  }

  const hasFavoriteItems = favoriteItemsAmount ? true : false;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatar}" alt="${name}" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${
  hasFavoriteItems ? ' active' : ''
}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
