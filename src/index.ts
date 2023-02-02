import { renderSearchFormBlock, getFormData } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserInfo } from './user.js';

window.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem(
    'user',
    JSON.stringify({ username: 'Den Warren', avatarUrl: '/img/avatar.png' })
  );

  renderUserInfo();
  renderSearchFormBlock();
  renderSearchStubBlock();
  getFormData();
});
