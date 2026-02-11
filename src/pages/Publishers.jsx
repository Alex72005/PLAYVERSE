import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { getPublishers } from '../services/gameService';
import Pagination from '../components/Pagination';
import PublisherCard from '../components/PublisherCard';

export default function Publishers() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(searchParams.get('search') || '');

    // Derived state from URL
    const page = parseInt(searchParams.get('page')) || 1;
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

    // Sync input with URL
    const urlSearchParam = searchParams.get('search') || '';
    useEffect(() => {
        if (urlSearchParam !== search) {
            setSearch(urlSearchParam);
        }
    }, [urlSearchParam]);

    // Update URL on search change
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
                    next.delete('page'); // Reset page
                    return next;
                });
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [search]);

    useEffect(() => {
        const loadPublishers = async () => {
            setLoading(true);
            try {
                const data = await getPublishers(page, debouncedSearch);
                setPublishers(data.results);
                setTotalPages(Math.ceil(data.count / 20));
                setError(null);
            } catch (err) {
                setError('Error al cargar publishers.');
            } finally {
                setLoading(false);
            }
        };

        loadPublishers();
    }, [page, debouncedSearch]);

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

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white">Explorar Publishers</h1>
                <p className="text-foreground-muted mt-2">Descubre las empresas detrás de tus juegos favoritos</p>
            </div>

            <form onSubmit={handleSearch} className="mb-8">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Buscar publishers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gaming-card border border-white/10 rounded-2xl py-4 px-12 text-white focus:outline-none focus:border-gaming-blue focus:ring-1 focus:ring-gaming-blue transition-all"
                    />
                    <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-gaming-blue transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </form>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaming-blue"></div>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center">
                    {error}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {publishers.map(pub => (
                            <PublisherCard key={pub.id} publisher={pub} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />

                    {publishers.length === 0 && !loading && (
                        <div className="text-center py-20">
                            <p className="text-foreground-muted text-lg">No se encontraron publishers.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
