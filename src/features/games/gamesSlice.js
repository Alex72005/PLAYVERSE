import { createSlice } from '@reduxjs/toolkit';
import {
    fetchGames,
    fetchGameDetails,
    fetchGenres,
    fetchTags,
    fetchPublishers,
    fetchPublisherDetails,
    fetchGameScreenshots,
    fetchGameSuggested
} from './gamesThunks';

const FAVORITES_KEY = 'playverse_favorites';

const getInitialFavorites = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};

const initialState = {
    games: [],
    totalGames: 0,
    gameDetails: null,
    screenshots: [],
    suggestedGames: [],
    genres: [],
    tags: [],
    publishers: [],
    totalPublishers: 0,
    publisherDetails: null,
    favorites: getInitialFavorites(),
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
};

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const game = action.payload;
            const existingIndex = state.favorites.findIndex(g => g.id === game.id);

            if (existingIndex >= 0) {
                state.favorites.splice(existingIndex, 1);
            } else {
                state.favorites.push(game);
            }

            localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
        },
        clearGameDetails: (state) => {
            state.gameDetails = null;
            state.screenshots = [];
            state.suggestedGames = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Games
            .addCase(fetchGames.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.games = action.payload.results;
                state.totalGames = action.payload.count;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Fetch Game Details
            .addCase(fetchGameDetails.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchGameDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.gameDetails = action.payload;
            })
            .addCase(fetchGameDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Fetch Screenshots
            .addCase(fetchGameScreenshots.fulfilled, (state, action) => {
                state.screenshots = action.payload;
            })
            // Fetch Suggested
            .addCase(fetchGameSuggested.fulfilled, (state, action) => {
                state.suggestedGames = action.payload;
            })
            // Fetch Genres
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            // Fetch Tags
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags = action.payload;
            })
            // Fetch Publishers
            .addCase(fetchPublishers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPublishers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.publishers = action.payload.results;
                state.totalPublishers = action.payload.count;
            })
            // Fetch Publisher Details
            .addCase(fetchPublisherDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPublisherDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.publisherDetails = action.payload;
            });
    },
});

export const { toggleFavorite, clearGameDetails } = gamesSlice.actions;
export default gamesSlice.reducer;
