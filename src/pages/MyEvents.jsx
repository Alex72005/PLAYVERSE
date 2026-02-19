import { useEvents } from '../context/EventsContext';
import { Link } from 'react-router';
import EventCard from '../components/EventCard';

export default function MyEvents() {
    const { myEvents } = useEvents();

    return (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-8 text-white">
            <h1 className="text-3xl font-bold mb-8">Mis Eventos</h1>

            {myEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="bg-gaming-card inline-block p-6 rounded-full mb-4 border border-white/5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-foreground-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl text-white font-medium mb-2">No tienes eventos próximos</h2>
                    <p className="text-foreground-muted mb-6">Explora los eventos disponibles y únete.</p>
                    <Link to="/events" className="inline-block px-6 py-2 bg-gaming-blue text-white rounded-lg hover:bg-gaming-accent transition-colors">
                        Ver Eventos
                    </Link>
                </div>
            )}
        </div>
    );
}
