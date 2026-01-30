const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const getGames = async (page = 1, search = '', genres = '') => {
    try {
        let url = `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=40&ordering=-added`;
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }
        if (genres) {
            url += `&genres=${genres}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching games');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getGames:', error);
        throw error;
    }
};

export const getGameDetails = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Error fetching game details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in getGameDetails:', error);
        throw error;
    }
};
export const getPopularGames = async () => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=5&ordering=-metacritic&dates=2023-01-01,2024-12-31`);
        if (!response.ok) {
            throw new Error('Error fetching popular games');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error in getPopularGames:', error);
        throw error;
    }
};

export const getGameSuggested = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${id}/suggested?key=${API_KEY}&page_size=4`);
        if (!response.ok) {
            throw new Error('Error fetching suggested games');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error in getGameSuggested:', error);
        throw error;
    }
};
