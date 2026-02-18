import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getGames,
    getGameDetails,
    getGenres,
    getTags,
    getPublishers,
    getPublisherDetails,
    getGameScreenshots,
    getGameSuggested
} from '../../services/service';

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async ({ page, search, genres, tags, publishers }, { rejectWithValue }) => {
        try {
            const response = await getGames(page, search, genres, tags, publishers);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGameDetails = createAsyncThunk(
    'games/fetchGameDetails',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getGameDetails(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGameScreenshots = createAsyncThunk(
    'games/fetchGameScreenshots',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getGameScreenshots(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGameSuggested = createAsyncThunk(
    'games/fetchGameSuggested',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getGameSuggested(id);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGenres = createAsyncThunk(
    'games/fetchGenres',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getGenres();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTags = createAsyncThunk(
    'games/fetchTags',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getTags();
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPublishers = createAsyncThunk(
    'games/fetchPublishers',
    async ({ page, search }, { rejectWithValue }) => {
        try {
            const response = await getPublishers(page, search);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchPublisherDetails = createAsyncThunk(
    'games/fetchPublisherDetails',
    async (slug, { rejectWithValue }) => {
        try {
            const response = await getPublisherDetails(slug);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
