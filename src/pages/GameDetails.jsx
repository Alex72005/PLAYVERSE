import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router';
import { getGameDetails, getGameSuggested, getGames, getGameScreenshots } from '../services/gameService';
import GameCard from '../components/GameCard';
import { isFavorite, toggleFavorite } from '../services/favoritesService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [suggestedGames, setSuggestedGames] = useState([]);
    const [screenshots, setScreenshots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                // Fetch details first
                const details = await getGameDetails(id);
                setGame(details);
                setIsFav(isFavorite(details.id));

                // Try to fetch suggested games
                let related = [];
                try {
                    related = await getGameSuggested(id);
                } catch (e) {
                    console.warn("Suggested failed, trying fallback");
                }

                // Fallback: If no suggested games, search by same genre
                if ((!related || related.length === 0) && details.genres && details.genres.length > 0) {
                    try {
                        // Use the first genre's slug to find related games
                        const mainGenre = details.genres[0].slug;
                        const genreGames = await getGames(1, '', mainGenre);
                        // Filter out the current game from results and take top 4
                        related = genreGames.results
                            .filter(g => g.id !== details.id)
                            .slice(0, 4);
                    } catch (genreError) {
                        console.error("Fallback genre search failed", genreError);
                    }
                }

                setSuggestedGames(related || []);

                // Fetch screenshots
                try {
                    const ss = await getGameScreenshots(id);
                    setScreenshots(ss || []);
                } catch (ssError) {
                    console.warn("Screenshots fetch failed", ssError);
                }

            } catch (err) {
                console.error("Error loading game details:", err);
                setError('Error al cargar los detalles del juego.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    useEffect(() => {
        if (!game) return;

        const handleStorageChange = () => {
            setIsFav(isFavorite(game.id));
        };

        window.addEventListener('favorites-updated', handleStorageChange);
        return () => window.removeEventListener('favorites-updated', handleStorageChange);
    }, [game]);

    const handleToggleFavorite = () => {
        if (game) {
            toggleFavorite(game);
            setIsFav(!isFav);
        }
    };

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    if (loading) return <LoadingSpinner fullScreen />;

    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
    if (!game) return <div className="text-center text-white mt-10">Juego no encontrado</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 pt-2 pb-8 text-white">
            <Link to="/games" className="md:hidden inline-flex items-center justify-center p-2 mb-4 bg-gaming-card rounded-full border border-white/10 text-gaming-accent hover:bg-gaming-hover transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </Link>

            <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
                <img src={game.background_image} alt={game.name} className="w-full h-full object-cover object-top" />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-gaming-bg to-transparent p-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-5xl font-bold text-white mb-4">{game.name}</h1>
                            <div className="flex gap-4">
                                <span className="bg-gaming-blue text-white px-3 py-1 rounded-full text-sm">Rating: {game.rating}</span>
                                <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">{game.released}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleToggleFavorite}
                            className={`p-3 rounded-full border border-white/10 transition-colors cursor-pointer ${isFav ? 'bg-white text-gaming-accent' : 'bg-black/40 text-white hover:bg-white/20'}`}
                            title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke={isFav ? "none" : "currentColor"} className="w-6 h-6 transition-transform duration-300 hover:scale-110" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 flex">
                    {/* Description Card */}
                    <div className="bg-gaming-card p-8 rounded-xl border border-white/5 text-foreground-muted leading-relaxed w-full h-[440px] flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-4 shrink-0">Sobre este juego</h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: (game.description.includes('Español')
                                    ? game.description.split('Español').shift()
                                    : game.description)
                                    .replace(/^(<br\s*\/?>|\s)+/i, '')
                            }}
                            className="prose prose-invert max-w-none text-justify [&>*:first-child]:mt-0 overflow-y-auto grow pr-4 custom-scrollbar"
                        />
                    </div>
                </div>

                {/* Sidebar Card */}
                <div className="bg-gaming-card p-6 rounded-xl border border-white/5 h-[440px] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4 mt-3">
                        <div>
                            <span className="block text-sm text-foreground-muted">Plataformas</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {game.platforms?.map(p => (
                                    <span key={p.platform.id} className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10">
                                        {p.platform.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="block text-sm text-foreground-muted">Géneros</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {game.genres?.map(g => (
                                        <Link
                                            key={g.id}
                                            to={`/games?genre=${g.slug}`}
                                            className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10 hover:bg-gaming-blue hover:border-gaming-blue transition-colors cursor-pointer"
                                        >
                                            {g.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="block text-sm text-foreground-muted">Publisher</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {game.publishers?.map(p => (
                                        <Link
                                            key={p.id}
                                            to={`/publisher/${p.slug || p.id}`}
                                            className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10 hover:bg-gaming-blue hover:border-gaming-blue transition-colors cursor-pointer"
                                        >
                                            {p.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="block text-sm text-foreground-muted">Tags</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {game.tags?.slice(0, 12).map(t => (
                                    <Link
                                        key={t.id}
                                        to={`/games?tag=${t.slug}`}
                                        className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10 hover:bg-gaming-blue hover:border-gaming-blue transition-colors cursor-pointer"
                                    >
                                        {t.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        {game.website && (
                            <a href={game.website} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-gaming-hover text-white py-2 rounded-lg hover:bg-gaming-blue transition-colors mt-4 cursor-pointer">
                                Sitio Web Oficial
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Screenshots Gallery Section (Full Width Carousel) */}
            {screenshots.length > 0 && (
                <div className="mb-12 relative group">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Imágenes</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="p-2 rounded-full bg-gaming-card border border-white/10 hover:border-gaming-blue transition-colors text-white/70 hover:text-white cursor-pointer"
                                aria-label="Previous screenshot"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="p-2 rounded-full bg-gaming-card border border-white/10 hover:border-gaming-blue transition-colors text-white/70 hover:text-white cursor-pointer"
                                aria-label="Next screenshot"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x"
                    >
                        {screenshots.map(s => (
                            <div
                                key={s.id}
                                className="min-w-[280px] md:min-w-[350px] lg:min-w-[calc(33.333%-11px)] aspect-video rounded-lg overflow-hidden border border-white/10 hover:border-gaming-blue transition-colors group/img cursor-zoom-in snap-start"
                            >
                                <img
                                    src={s.image}
                                    alt="Game screenshot"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Suggested Games Section */}
            {suggestedGames.length > 0 && (
                <div className="border-t border-white/10 pt-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Quizás también te guste</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {suggestedGames.map(suggested => (
                            <GameCard key={suggested.id} game={suggested} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
