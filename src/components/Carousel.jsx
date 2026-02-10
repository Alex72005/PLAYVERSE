import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function Carousel({ games }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Carousel Auto-rotation
    useEffect(() => {
        if (!games || games.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % games.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [games]);

    if (!games || games.length === 0) return null;

    return (
        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover transition-all duration-700 ease-in-out"
                style={{
                    backgroundImage: `url(${games[currentSlide].background_image})`,
                    backgroundPosition: 'center 20%'
                }}
            >
                <div className="absolute inset-0 bg-linear-to-t from-gaming-bg via-gaming-bg/20 to-transparent"></div>
                <div className="absolute inset-0 bg-linear-to-r from-gaming-bg/80 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-[60%]">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-gaming-accent uppercase bg-black/50 backdrop-blur-md rounded-full border border-gaming-accent/20">
                    Destacado
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                    {games[currentSlide].name}
                </h1>
                <div className="flex gap-4">
                    <Link
                        to={`/game/${games[currentSlide].id}`}
                        className="px-8 py-3 bg-gaming-blue text-white rounded-xl font-bold hover:bg-gaming-blue-dim transition-all shadow-lg hover:shadow-gaming-blue/30 transform hover:-translate-y-1"
                    >
                        Ver Detalles
                    </Link>
                </div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 right-8 flex gap-2">
                {games.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-gaming-accent" : "w-2 bg-white/30 hover:bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
