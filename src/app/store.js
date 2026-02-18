import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../features/games/gamesSlice';
import eventsReducer from '../features/events/eventsSlice';

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        events: eventsReducer,
    },
});
