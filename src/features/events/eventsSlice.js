import { createSlice } from '@reduxjs/toolkit';
import { fetchEvents } from './eventsThunks';

const MY_EVENTS_KEY = 'playverse_my_events';

const getInitialMyEvents = () => {
    const myEvents = localStorage.getItem(MY_EVENTS_KEY);
    return myEvents ? JSON.parse(myEvents) : [];
};

const initialState = {
    events: [],
    myEvents: getInitialMyEvents(),
    status: 'idle',
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        joinEvent: (state, action) => {
            const event = action.payload;
            if (!state.myEvents.some(e => e.id === event.id)) {
                state.myEvents.push(event);
                localStorage.setItem(MY_EVENTS_KEY, JSON.stringify(state.myEvents));
            }
        },
        leaveEvent: (state, action) => {
            const eventId = action.payload;
            state.myEvents = state.myEvents.filter(e => e.id !== eventId);
            localStorage.setItem(MY_EVENTS_KEY, JSON.stringify(state.myEvents));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { joinEvent, leaveEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
