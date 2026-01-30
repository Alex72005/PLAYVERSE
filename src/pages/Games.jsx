import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../services/gameService';

import GameCard from '../components/GameCard';

export default function Games() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Efecto debounce para input de búsqueda
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset page on new search term
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [search]);

    // Efecto para buscar/cargar juegos (depende de debouncedSearch y page)
    useEffect(() => {
        const loadGames = async () => {
            setLoading(true);
            try {
                // Usamos debouncedSearch en lugar de search directo
                const data = await getGames(page, debouncedSearch);
                setGames(data.results);
                // RAWG devuelve 'count', calculamos total de páginas (40 por página)
                setTotalPages(Math.ceil(data.count / 40));
                setError(null);
            } catch (err) {
                setError('Error al cargar juegos.');
            } finally {
                setLoading(false);
            }
        };

        loadGames();
    }, [page, debouncedSearch]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Force immediate search if user hits Enter
        setDebouncedSearch(search);
        setPage(1);
    };

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
        // No need to setPage(1) here, the debounce effect handles it
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div>
            {/* Buscador */}
            <div className="mb-8">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Buscar juegos..."
                            value={search}
                            onChange={handleSearchInput}
                            className="w-full bg-gaming-card border border-white/10 text-white rounded-xl py-3 px-12 focus:outline-none focus:border-gaming-blue focus:ring-1 focus:ring-gaming-blue transition-all"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </form>
            </div>

            {/* Grid de Juegos */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-gaming-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="text-center text-red-500 mt-10"><p>{error}</p></div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {games.length > 0 ? games.map((game) => (
                            <GameCard key={game.id} game={game} />
                        )) : (
                            <div className="col-span-full text-center py-20 text-foreground-muted">No se encontraron juegos.</div>
                        )}
                    </div>

                    {/* Paginación Avanzada */}
                    {games.length > 0 && (
                        <div className="flex flex-col items-center gap-4 py-8 border-t border-white/5 mt-8">
                            <div className="flex flex-wrap justify-center items-center gap-2">
                                {/* Botón Primera Página */}
                                <button
                                    onClick={() => { setPage(1); window.scrollTo(0, 0); }}
                                    disabled={page === 1}
                                    className="px-3 py-2 rounded-lg bg-gaming-card border border-white/10 hover:bg-gaming-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
                                    title="Primera Página"
                                >
                                    « 1
                                </button>

                                {/* Botón Anterior */}
                                <button
                                    onClick={handlePrevious}
                                    disabled={page === 1}
                                    className="p-2 rounded-lg bg-gaming-blue text-white hover:bg-gaming-blue-dim disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-gaming-blue/20 cursor-pointer"
                                    title="Anterior"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {/* Números de Página (Ventana alrededor de la actual) */}
                                {Array.from({ length: 5 }, (_, i) => page - 2 + i).map(pageNum => {
                                    if (pageNum < 1 || pageNum > totalPages) return null;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => { setPage(pageNum); window.scrollTo(0, 0); }}
                                            className={`min-w-10 h-10 px-2 rounded-lg font-bold transition-all cursor-pointer ${page === pageNum
                                                ? 'bg-gaming-blue text-white shadow-lg shadow-gaming-blue/20 scale-110'
                                                : 'bg-gaming-card border border-white/10 hover:bg-gaming-hover hover:text-gaming-accent'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                {/* Botón Siguiente */}
                                <button
                                    onClick={handleNext}
                                    disabled={page === totalPages}
                                    className="p-2 rounded-lg bg-gaming-blue text-white hover:bg-gaming-blue-dim disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-gaming-blue/20 cursor-pointer"
                                    title="Siguiente"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {/* Botón +2 (Saltar 2 páginas) - Solicitud específica */}
                                <button
                                    onClick={() => {
                                        const newPage = Math.min(page + 2, totalPages);
                                        setPage(newPage);
                                        window.scrollTo(0, 0);
                                    }}
                                    disabled={page >= totalPages - 1}
                                    className="px-3 py-2 rounded-lg bg-gaming-card border border-white/10 hover:bg-gaming-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium cursor-pointer"
                                    title="Avanzar 2 páginas"
                                >
                                    +2
                                </button>

                                {/* Botón Última Página */}
                                <button
                                    onClick={() => { setPage(totalPages); window.scrollTo(0, 0); }}
                                    disabled={page === totalPages}
                                    className="px-3 py-2 rounded-lg bg-gaming-card border border-white/10 hover:bg-gaming-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
                                    title="Última Página"
                                >
                                    {totalPages} »
                                </button>
                            </div>

                            <div className="text-xs text-foreground-muted">
                                Página {page} de {totalPages}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
