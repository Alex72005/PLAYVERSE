import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getPopularGames, getGames } from '../services/gameService';
import GameCard from '../components/GameCard';
import Carousel from '../components/Carousel';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
    const [popularGames, setPopularGames] = useState([]);
    const [recentGames, setRecentGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [popular, recent] = await Promise.all([
                    getPopularGames(),
                    getGames(1, '') // Fetch first page of games for the grid
                ]);
                setPopularGames(popular);
                setRecentGames(recent.results.slice(0, 8)); // Show top 8 in grid
            } catch (error) {
                console.error("Error loading home data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingSpinner fullScreen />;

    return (
        <div className="space-y-12 pb-8">
            {/* Hero Carousel */}
            <Carousel games={popularGames} />

            {/* Recent Games Grid */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Tendencias</h2>
                        <p className="text-foreground-muted">Los juegos que están marcando el momento.</p>
                    </div>
                    <Link to="/games" className="text-gaming-accent hover:text-white transition-colors text-sm font-medium">
                        Ver todos &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {recentGames.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </section>
        </div>
    );
}
