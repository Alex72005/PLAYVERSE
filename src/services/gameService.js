const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

const CACHE = new Map();

export const getGames = async (page = 1, search = '', genres = '', tags = '', publishers = '') => {
    const cacheKey = `games_${page}_${search}_${genres}_${tags}_${publishers}`;
    if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

    try {
        let url = `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=40&ordering=-added`;
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }
        if (genres) {
            url += `&genres=${genres}`;
        }
        if (tags) {
            url += `&tags=${tags}`;
        }
        if (publishers) {
            url += `&publishers=${publishers}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching games');
        }
        const data = await response.json();
        CACHE.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Error in getGames:', error);
        throw error;
    }
};

export const getGameDetails = async (id) => {
    const cacheKey = `game_details_${id}`;
    if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

    try {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Error fetching game details');
        }
        const data = await response.json();
        CACHE.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Error in getGameDetails:', error);
        throw error;
    }
};

export const getPopularGames = async () => {
    const cacheKey = 'popular_games';
    if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=5&ordering=-metacritic&dates=2023-01-01,2024-12-31`);
        if (!response.ok) {
            throw new Error('Error fetching popular games');
        }
        const data = await response.json();
        CACHE.set(cacheKey, data.results);
        return data.results;
    } catch (error) {
        console.error('Error in getPopularGames:', error);
        throw error;
    }
};

export const getGameSuggested = async (id) => {
    const cacheKey = `suggested_${id}`;
    if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

    try {
        const response = await fetch(`${BASE_URL}/games/${id}/suggested?key=${API_KEY}&page_size=4`);
        if (!response.ok) {
            throw new Error('Error fetching suggested games');
        }
        const data = await response.json();
        CACHE.set(cacheKey, data.results);
        return data.results;
    } catch (error) {
        console.error('Error in getGameSuggested:', error);
        throw error;
    }
};
export const getGameScreenshots = async (id) => {
    const cacheKey = `screenshots_${id}`;
    if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

    try {
        const response = await fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Error fetching game screenshots');
        }
        const data = await response.json();
        CACHE.set(cacheKey, data.results);
        return data.results;
    } catch (error) {
        console.error('Error in getGameScreenshots:', error);
        throw error;
    }
};
export const getGenres = async () => {
    const cacheKey = 'genres_list';
    if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

    try {
        const response = await fetch(`${BASE_URL}/genres?key=${API_KEY}`);
        if (!response.ok) throw new Error('Error fetching genres');
        const data = await response.json();
        CACHE.set(cacheKey, data.results);
        return data.results;
    } catch (error) {
        console.error('Error in getGenres:', error);
        throw error;
    }
};

export const getTags = async () => {
    const cacheKey = 'tags_list';
    if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

    try {
        const response = await fetch(`${BASE_URL}/tags?key=${API_KEY}&page_size=20`);
        if (!response.ok) throw new Error('Error fetching tags');
        const data = await response.json();
        CACHE.set(cacheKey, data.results);
        return data.results;
    } catch (error) {
        console.error('Error in getTags:', error);
        throw error;
    }
};
export const getPublishers = async (page = 1, search = '') => {
    const cacheKey = `publishers_${page}_${search}`;
    if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

    try {
        let url = `${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=20`;
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error fetching publishers');
        const data = await response.json();
        CACHE.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Error in getPublishers:', error);
        throw error;
    }
};

export const getPublisherDetails = async (slug) => {
    const cacheKey = `publisher_details_${slug}`;
    if (CACHE.has(cacheKey)) return CACHE.get(cacheKey);

    try {
        const response = await fetch(`${BASE_URL}/publishers/${slug}?key=${API_KEY}`);
        if (!response.ok) throw new Error('Error fetching publisher details');
        const data = await response.json();
        CACHE.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Error in getPublisherDetails:', error);
        throw error;
    }
};
