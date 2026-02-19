import { createContext, useState, useEffect, useContext } from 'react';
import { getFavorites, toggleFavorite as toggleFavoriteService } from '../services/favoritesService';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Initial load
        setFavorites(getFavorites());

        // Listen for updates from service (it dispatches 'favorites-updated')
        const handleFavoritesUpdate = () => {
            setFavorites(getFavorites());
        };

        window.addEventListener('favorites-updated', handleFavoritesUpdate);

        return () => {
            window.removeEventListener('favorites-updated', handleFavoritesUpdate);
        };
    }, []);

    const toggleFavorite = (game) => {
        toggleFavoriteService(game);
        // State update happens via event listener, but we can also update locally for immediate feedback if needed
        // The service dispatches the event, so the listener will catch it.
    };

    const isFavorite = (gameId) => {
        return favorites.some(g => g.id === gameId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
