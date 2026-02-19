import { createContext, useState, useEffect, useContext } from 'react';
import { getEvents as fetchEventsService, getMyEvents, joinEvent as joinEventService, leaveEvent as leaveEventService } from '../services/eventsService';

const EventsContext = createContext();

export function EventsProvider({ children }) {
    const [events, setEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]);
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'succeeded' | 'failed'
    const [error, setError] = useState(null);

    useEffect(() => {
        // Initial load of my events
        setMyEvents(getMyEvents());

        // Listen for updates
        const handleEventsUpdate = () => {
            setMyEvents(getMyEvents());
        };

        window.addEventListener('events-updated', handleEventsUpdate);

        return () => {
            window.removeEventListener('events-updated', handleEventsUpdate);
        };
    }, []);

    const fetchEvents = async () => {
        setStatus('loading');
        try {
            const data = await fetchEventsService();
            setEvents(data);
            setStatus('succeeded');
        } catch (err) {
            setError(err.message);
            setStatus('failed');
        }
    };

    const joinEvent = (event) => {
        joinEventService(event);
    };

    const leaveEvent = (eventId) => {
        leaveEventService(eventId);
    };

    return (
        <EventsContext.Provider value={{
            events,
            myEvents,
            status,
            error,
            fetchEvents,
            joinEvent,
            leaveEvent
        }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error('useEvents must be used within a EventsProvider');
    }
    return context;
}
