import { Link } from 'react-router';
import { memo } from 'react';

const PublisherCard = memo(({ publisher }) => {
    return (
        <Link
            to={`/publisher/${publisher.slug}`}
            className="group bg-gaming-card border border-white/5 rounded-2xl overflow-hidden hover:border-gaming-blue transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 block h-full"
        >
            <div className="h-full flex flex-col">
                <div className="h-48 relative bg-white/5 overflow-hidden">
                    <img
                        src={publisher.image_background}
                        alt={publisher.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-[opacity,transform] duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-gaming-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-center border-t border-white/5">
                    <h3 className="text-lg font-bold text-white group-hover:text-gaming-blue transition-colors line-clamp-1 mb-1">
                        {publisher.name}
                    </h3>
                    <span className="text-sm text-white/50">{publisher.games_count} videojuegos</span>
                </div>
            </div>
        </Link>
    );
});

export default PublisherCard;
