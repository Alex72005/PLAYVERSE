import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { getFavorites } from '../services/favoritesService';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Initial load
        setFavorites(getFavorites());

        // Listen for updates
        const handleStorageChange = () => {
            setFavorites(getFavorites());
        };

        window.addEventListener('favorites-updated', handleStorageChange);
        return () => window.removeEventListener('favorites-updated', handleStorageChange);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
            <h1 className="text-3xl font-bold text-white mb-8">Mis Favoritos</h1>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="bg-gaming-card inline-block p-6 rounded-full mb-4 border border-white/5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-foreground-muted">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl text-white font-medium mb-2">No tienes favoritos aún</h2>
                    <p className="text-foreground-muted">Marca tus juegos favoritos para verlos aquí.</p>
                </div>
            )}
        </div>
    );
}
