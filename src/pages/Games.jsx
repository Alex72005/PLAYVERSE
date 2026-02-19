import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { getGames, getGenres, getTags } from '../services/gameService';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Games() {
    // Local state for data
    const [games, setGames] = useState([]);
    const [totalGames, setTotalGames] = useState(0);
    const [genresList, setGenresList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // URL Params
    const genreSlug = searchParams.get('genre') || '';
    const tagSlug = searchParams.get('tag') || '';
    const pageParam = parseInt(searchParams.get('page')) || 1;
    const page = Math.max(1, pageParam);
    const searchParam = searchParams.get('search') || '';

    // Local state for search input (debouncing)
    const [searchInput, setSearchInput] = useState(searchParam);

    const loading = status === 'loading';



    // Derived state for pagination
    const [totalPages, setTotalPages] = useState(0);

    // Initial Fetch of Filters
    useEffect(() => {
        const loadFilters = async () => {
            try {
                const [g, t] = await Promise.all([getGenres(), getTags()]);
                setGenresList(g);
                setTagsList(t);
            } catch (err) {
                console.error("Failed to load filters", err);
            }
        };
        loadFilters();
    }, []);

    // Update local search input if URL changes
    useEffect(() => {
        setSearchInput(searchParam);
    }, [searchParam]);

    // Debounce Search Input -> Update URL
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchInput !== searchParam) {
                setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    if (searchInput) {
                        next.set('search', searchInput);
                    } else {
                        next.delete('search');
                    }
                    next.delete('page'); // Reset to page 1
                    return next;
                });
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchInput, searchParam, setSearchParams]);

    // Fetch Games when URL params change
    useEffect(() => {
        const loadGames = async () => {
            setStatus('loading');
            setError(null);
            try {
                const data = await getGames(page, searchParam, genreSlug, tagSlug);
                setGames(data.results);
                setTotalGames(data.count);
                setStatus('succeeded');
            } catch (err) {
                setError('Error al cargar juegos');
                setStatus('failed');
            }
        };
        loadGames();
    }, [page, searchParam, genreSlug, tagSlug]);

    // Calculate Total Pages
    useEffect(() => {
        if (totalGames > 0) {
            let calculatedPages = Math.ceil(totalGames / 40);
            if (genreSlug || tagSlug) {
                calculatedPages = Math.min(calculatedPages, 250);
            }
            setTotalPages(calculatedPages);
            // Auto-correction logic if page > calculatedPages would go here, 
            // but Redux fetch might happen before we know totalPages. 
            // Better to just let the user see empty page or handle it quietly.
        } else {
            setTotalPages(0);
        }
    }, [totalGames, genreSlug, tagSlug]);

    const setPage = (newPage) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (newPage > 1) {
                next.set('page', newPage);
            } else {
                next.delete('page');
            }
            return next;
        });
    };

    const handleFilterChange = (key, value) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (value) {
                next.set(key, value);
            } else {
                next.delete(key);
            }
            next.delete('page');
            return next;
        });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Triggered by existing effect on searchInput change, mostly for UX
    };

    // Format helper
    const formatSlug = (slug) => {
        if (!slug) return '';
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div>
            {/* Título y Filtros */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        {(!genreSlug && !tagSlug)
                            ? 'Explorar Juegos'
                            : `${genreSlug ? formatSlug(genreSlug) : ''}${genreSlug && tagSlug ? ' + ' : ''}${tagSlug ? formatSlug(tagSlug) : ''}`}
                    </h1>
                </div>

                <div className="flex flex-wrap gap-3">
                    {/* Filtro por Género */}
                    <div className="flex flex-col gap-1">
                        <select
                            value={genreSlug}
                            onChange={(e) => handleFilterChange('genre', e.target.value)}
                            className="bg-gaming-card border border-white/10 text-white rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gaming-blue transition-all cursor-pointer min-w-[140px]"
                        >
                            <option value="">Todos los géneros</option>
                            {genresList.map(g => (
                                <option key={g.id} value={g.slug}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro por Tag */}
                    <div className="flex flex-col gap-1">
                        <select
                            value={tagSlug}
                            onChange={(e) => handleFilterChange('tag', e.target.value)}
                            className="bg-gaming-card border border-white/10 text-white rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-gaming-blue transition-all cursor-pointer min-w-[140px]"
                        >
                            <option value="">Todas las tags</option>
                            {tagsList.map(t => (
                                <option key={t.id} value={t.slug}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Buscador */}
            <div className="mb-8">
                <form onSubmit={handleSearchSubmit} className="flex gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Buscar juegos..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
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
                <LoadingSpinner />
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

                    {/* Paginación */}
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </>
            )}
        </div>
    );
}
