import { createAsyncThunk } from '@reduxjs/toolkit';
import { getEventsMock } from '../../data/events';

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getEventsMock();
            return response;
        } catch (error) {
            return rejectWithValue('Error fetching events');
        }
    }
);
