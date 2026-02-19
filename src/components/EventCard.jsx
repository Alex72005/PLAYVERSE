import { useEvents } from '../context/EventsContext';

const EventCard = ({ event }) => {
    const { myEvents, joinEvent, leaveEvent } = useEvents();
    const isJoined = myEvents.some(e => e.id === event.id);

    const handleJoinToggle = () => {
        if (isJoined) {
            leaveEvent(event.id);
        } else {
            joinEvent(event);
        }
    };

    return (
        <div className="bg-gaming-card rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-gaming-blue/30 transition-all duration-300 group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden shrink-0">
                <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-white">
                    {event.date}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-gaming-blue transition-colors">{event.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-foreground-muted text-sm mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{event.location}</span>
                </div>

                {event.description && (
                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">{event.description}</p>
                )}

                <button
                    onClick={handleJoinToggle}
                    className={`w-full py-2 rounded-lg font-medium transition-colors cursor-pointer mt-auto ${isJoined
                        ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20'
                        : 'bg-gaming-blue text-white hover:bg-gaming-accent cursor-pointer'
                        }`}
                >
                    {isJoined ? 'Cancelar Asistencia' : 'Apuntarse'}
                </button>
            </div>
        </div>
    );
};

export default EventCard;
