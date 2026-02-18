import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../features/events/eventsThunks';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';

export default function Events() {
    const dispatch = useDispatch();
    const { events, status, error } = useSelector(state => state.events);
    const loading = status === 'loading';

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEvents());
        }
    }, [status, dispatch]);

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
