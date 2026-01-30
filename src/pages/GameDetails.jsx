import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGameDetails, getGameSuggested, getGames } from '../services/gameService';
import GameCard from '../components/GameCard';

export default function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [suggestedGames, setSuggestedGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                // Fetch details first
                const details = await getGameDetails(id);
                setGame(details);

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

            } catch (err) {
                console.error("Error loading game details:", err);
                setError('Error al cargar los detalles del juego.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-gaming-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

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
                    <h1 className="text-5xl font-bold text-white mb-4">{game.name}</h1>
                    <div className="flex gap-4">
                        <span className="bg-gaming-blue text-white px-3 py-1 rounded-full text-sm">Rating: {game.rating}</span>
                        <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">{game.released}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-2 text-foreground-muted leading-relaxed">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: (game.description.includes('Español')
                                ? game.description.split('Español').shift()
                                : game.description)
                                .replace(/^(<br\s*\/?>|\s)+/i, '')
                        }}
                        className="prose prose-invert max-w-none text-justify [&>*:first-child]:mt-0"
                    />
                </div>
                <div className="bg-gaming-card p-6 rounded-xl border border-white/5 h-fit">
                    <div className="space-y-4">
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
                        <div>
                            <span className="block text-sm text-foreground-muted">Géneros</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {game.genres?.map(g => (
                                    <span key={g.id} className="text-xs bg-white/5 px-2 py-1 rounded border border-white/10">
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {game.website && (
                            <a href={game.website} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-gaming-hover text-white py-2 rounded-lg hover:bg-gaming-blue transition-colors mt-4">
                                Sitio Web Oficial
                            </a>
                        )}
                    </div>
                </div>
            </div>

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
