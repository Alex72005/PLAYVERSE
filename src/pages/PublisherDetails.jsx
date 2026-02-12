import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { getPublisherDetails, getGames } from '../services/gameService';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PublisherDetails() {
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    // Derived state from URL
    const pageParam = parseInt(searchParams.get('page')) || 1;
    const page = Math.max(1, pageParam);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const loadPublisher = async () => {
            try {
                setLoading(true);
                const data = await getPublisherDetails(slug);
                if (!data || !data.id) throw new Error('Publisher no encontrado');
                setPublisher(data);
                setError(null);
            } catch (err) {
                console.error('Error loading publisher:', err);
                setError('Error al cargar detalles del publisher.');
            }
        };
        if (slug) loadPublisher();
    }, [slug]);

    useEffect(() => {
        const loadGames = async () => {
            try {
                setLoading(true);
                if (publisher) {
                    const data = await getGames(page, '', '', '', publisher.id || slug);
                    setGames(data.results || []);
                    setTotalPages(Math.ceil((data.count || 0) / 40));
                    setError(null);
                }
            } catch (err) {
                console.error('Error fetching publisher games:', err);
            } finally {
                setLoading(false);
            }
        };
        if (publisher) loadGames();
    }, [publisher, page, slug]);

    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
    if (!publisher) return <LoadingSpinner />;

    return (
        <div className="pb-10">
            {/* Header / Banner */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl border border-white/5">
                <img
                    src={publisher.image_background}
                    alt={publisher.name}
                    className="w-full h-full object-cover object-top"
                />

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-gaming-bg to-transparent p-8">
                    <h1 className="text-5xl font-bold text-white mb-4">{publisher.name}</h1>
                    <div className="flex gap-4">
                        <span className="bg-gaming-blue text-white px-3 py-1 rounded-full text-sm font-medium border border-white/10 shadow-lg">
                            {publisher.games_count} Videojuegos publicados
                        </span>
                    </div>
                </div>
            </div>

            {/* Description if available */}
            {publisher.description && (
                <div className="bg-gaming-card border border-white/5 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Sobre {publisher.name}</h2>
                    <div
                        className="text-foreground-muted leading-relaxed prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: publisher.description }}
                    />
                </div>
            )}

            {/* Games Grid */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-6">Juegos de {publisher.name}</h2>

                {loading && page === 1 ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {games.map(game => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
