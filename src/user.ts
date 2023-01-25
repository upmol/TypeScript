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
  const userData = JSON.parse(localStorage.getItem('user'));
  if (
    typeof userData === 'object' &&
    'username' in userData &&
    'avatarUrl' in userData
  ) {
    return new User(userData.username, userData.avatarUrl);
  }

  return 'Возможно вы не залогинены!'.toString();
}

export function getFavoritesAmount(): unknown {
  const amount = JSON.parse(localStorage.getItem('favoritesAmount'));
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
  const favoritesCaption =
    favoriteItemsAmount > 0 ? favoriteItemsAmount : 'ничего нет';
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
