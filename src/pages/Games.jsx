import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { getGames, getGenres, getTags } from '../services/gameService';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Games() {
    const [searchParams, setSearchParams] = useSearchParams();
    const genreSlug = searchParams.get('genre');
    const tagSlug = searchParams.get('tag');

    const [games, setGames] = useState([]);
    const [genresList, setGenresList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(searchParams.get('search') || '');

    // Derived state from URL
    const pageParam = parseInt(searchParams.get('page')) || 1;
    const page = Math.max(1, pageParam);
    const debouncedSearch = searchParams.get('search') || '';
    const [totalPages, setTotalPages] = useState(0);

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

    // Fetch filters list on mount
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [genres, tags] = await Promise.all([getGenres(), getTags()]);
                setGenresList(genres);
                setTagsList(tags);
            } catch (err) {
                console.error('Error fetching filter lists:', err);
            }
        };
        fetchFilters();
    }, []);

    // Helper to format slug for the title
    const formatSlug = (slug) => {
        if (!slug) return '';
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Sync local search input with URL if URL changes (e.g. via back button)
    const urlSearchParam = searchParams.get('search') || '';
    useEffect(() => {
        if (urlSearchParam !== search) {
            setSearch(urlSearchParam);
        }
    }, [urlSearchParam]);

    // Update URL when search term changes (debounced)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== (searchParams.get('search') || '')) {
                setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    if (search) {
                        next.set('search', search);
                    } else {
                        next.delete('search');
                    }
                    next.delete('page'); // Reset to page 1 on search change
                    return next;
                });
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [search]);

    // Efecto para buscar/cargar juegos (depende de debouncedSearch, page, genreSlug y tagSlug)
    useEffect(() => {
        const loadGames = async () => {
            setLoading(true);
            try {
                // Usamos debouncedSearch en lugar de search directo, y añadimos genreSlug y tagSlug
                const data = await getGames(page, debouncedSearch, genreSlug, tagSlug);
                setGames(data.results);

                // Calculamos total de páginas
                let calculatedPages = Math.ceil(data.count / 40);

                // SOLO si hay filtros de género o tag activos, aplicamos el límite de 250 páginas de RAWG
                // Esto es lo que pidió el usuario: corregir cuando se "mezcla" con filtros
                if (genreSlug || tagSlug) {
                    calculatedPages = Math.min(calculatedPages, 250);
                }

                setTotalPages(calculatedPages);

                // Auto-corrección: si la página actual excede el total filtrado, volvemos a la 1
                if (page > calculatedPages && calculatedPages > 0) {
                    setPage(1);
                }

                setError(null);
            } catch (err) {
                setError('Error al cargar juegos.');
            } finally {
                setLoading(false);
            }
        };

        loadGames();
    }, [page, debouncedSearch, genreSlug, tagSlug]);

    const handleFilterChange = (key, value) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (value) {
                next.set(key, value);
            } else {
                next.delete(key);
            }
            next.delete('page'); // Reset to page 1 on filter change
            return next;
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (search) {
                next.set('search', search);
            } else {
                next.delete('search');
            }
            next.delete('page');
            return next;
        });
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
                            value={genreSlug || ''}
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
                            value={tagSlug || ''}
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

                    {/* Paginación Avanzada */}
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
