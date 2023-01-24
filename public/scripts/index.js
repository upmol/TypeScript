import { renderSearchFormBlock, getFormData } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock, getUserData, User, getFavoritesAmount, } from './user.js';
import { renderToast, renderBlock } from './lib.js';
window.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'Den Warren', avatarUrl: '/img/avatar.png' }));
    localStorage.setItem('favoritesAmount', JSON.stringify(24));
    const user = getUserData();
    const userFavorites = getFavoritesAmount();
    if (user instanceof User && typeof userFavorites === 'number') {
        renderUserBlock(user.username, user.avatarUrl, userFavorites);
    }
    if (user instanceof User && typeof userFavorites !== 'number') {
        renderUserBlock(user.username, user.avatarUrl);
    }
    if (typeof user === 'string') {
        renderToast({
            text: `${user}`,
            type: 'success',
        }, {
            name: 'Понял',
            handler: () => {
                console.log('Уведомление закрыто');
            },
        });
        renderBlock('user-block', `<br/><p>${user}</p>`);
    }
    renderSearchFormBlock();
    renderSearchStubBlock();
    getFormData();
});
