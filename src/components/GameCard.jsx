import { Link } from 'react-router';
import { useFavorites } from '../context/FavoritesContext';
import { getOptimizedImage } from '../utils/imageUtils';

const GameCard = ({ game }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const isFav = favorites.some(g => g.id === game.id);

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(game);
    };

    // Use optimized image for card (smaller size)
    const optimizedImage = game.background_image
        ? getOptimizedImage(game.background_image, 600)
        : null;

    return (
        <Link to={`/game/${game.id}`} className="bg-gaming-card rounded-xl overflow-hidden shadow-lg border border-white/5 hover:shadow-gaming-blue/20 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 group block h-full will-change-transform">
            <div className="h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gaming-hover">
                    {optimizedImage ? (
                        <img
                            src={optimizedImage}
                            alt={game.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gaming-muted">
                            Sin imagen
                        </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2 items-center">
                        <div className="bg-gaming-bg/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10 h-fit">
                            <span className="text-gaming-accent font-bold text-sm">★ {game.rating}</span>
                        </div>
                        <button
                            onClick={handleToggleFavorite}
                            className={`bg-gaming-bg/80 backdrop-blur-sm p-1.5 rounded-full border border-white/10 transition-colors z-10 group/btn cursor-pointer ${isFav ? 'text-gaming-accent' : 'text-white hover:bg-gaming-accent/20'}`}
                            title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke={isFav ? "none" : "currentColor"} className={`w-5 h-5 transition-transform duration-300 ${isFav ? 'scale-110' : 'group-hover/btn:scale-110'}`} strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-white mb-1 truncate" title={game.name}>
                        {game.name}
                    </h2>
                    <div className="flex gap-2 text-xs text-foreground-muted mb-4">
                        <span>{game.released?.split('-')[0] || 'N/A'}</span>
                        <span>•</span>
                        <span className="truncate max-w-[150px]">{game.genres?.slice(0, 2).map(g => g.name).join(', ')}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;
