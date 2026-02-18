import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 20;

export default function Favorites() {
    const favorites = useSelector(state => state.games.favorites);
    const [page, setPage] = useState(1);

    // Si la página actual supera el total de páginas (ej. al borrar favoritos), volver a la última
    useEffect(() => {
        const maxPage = Math.ceil(favorites.length / ITEMS_PER_PAGE) || 1;
        if (page > maxPage) setPage(maxPage);
    }, [favorites.length, page]);

    const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);

    // Calcular qué juegos mostrar en esta página
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const currentFavorites = favorites.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
            <h1 className="text-3xl font-bold text-white mb-8">Mis Favoritos</h1>

            {favorites.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {currentFavorites.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>

                    {/* Solo mostrar paginación si hay más de 20 juegos */}
                    {totalPages > 1 && (
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
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
