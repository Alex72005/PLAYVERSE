const FAVORITES_KEY = 'playverse_favorites';

export const getFavorites = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};

export const isFavorite = (gameId) => {
    const favorites = getFavorites();
    return favorites.some(game => game.id === gameId);
};

export const addFavorite = (game) => {
    const favorites = getFavorites();
    if (!favorites.some(g => g.id === game.id)) {
        favorites.push(game);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        // Dispatch custom event for real-time updates across components
        window.dispatchEvent(new CustomEvent('favorites-updated'));
    }
};

export const removeFavorite = (gameId) => {
    let favorites = getFavorites();
    favorites = favorites.filter(game => game.id !== gameId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new CustomEvent('favorites-updated'));
};

export const toggleFavorite = (game) => {
    if (isFavorite(game.id)) {
        removeFavorite(game.id);
        return false;
    } else {
        addFavorite(game);
        return true;
    }
};
