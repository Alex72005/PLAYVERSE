import { useEffect } from 'react';
import { useEvents } from '../context/EventsContext';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';

export default function Events() {
    const { events, status, error, fetchEvents } = useEvents();
    const loading = status === 'loading';

    useEffect(() => {
        if (status === 'idle') {
            fetchEvents();
        }
    }, [status, fetchEvents]);

    if (loading) return <LoadingSpinner fullScreen />;
    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-8 text-white">
            <h1 className="text-3xl font-bold mb-8">Eventos Próximos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
}
