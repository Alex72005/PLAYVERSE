import { Link } from 'react-router-dom';

export default function GameCard({ game }) {
    return (
        <Link to={`/game/${game.id}`} className="bg-gaming-card rounded-xl overflow-hidden shadow-lg border border-white/5 hover:shadow-gaming-blue/20 hover:-translate-y-1 transition-all duration-300 group block h-full">
            <div className="h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                    {game.background_image ? (
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gaming-hover flex items-center justify-center text-gaming-muted">
                            Sin imagen
                        </div>
                    )}
                    <div className="absolute top-2 right-2 bg-gaming-bg/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
                        <span className="text-gaming-accent font-bold text-sm">★ {game.rating}</span>
                    </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-white mb-1 truncate" title={game.name}>
                        {game.name}
                    </h2>
                    <div className="flex flex-wrap gap-2 text-xs text-foreground-muted mb-4">
                        <span>{game.released?.split('-')[0] || 'N/A'}</span>
                        <span>•</span>
                        <span>{game.genres?.slice(0, 2).map(g => g.name).join(', ')}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
