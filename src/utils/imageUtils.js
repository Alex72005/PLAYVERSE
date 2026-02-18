export const getOptimizedImage = (imageUrl, width = 600) => {
    if (!imageUrl) return '';
    if (imageUrl.includes('/media/screenshots/')) {
        return imageUrl.replace('/media/screenshots/', `/media/resize/${width}/-/screenshots/`);
    }
    return imageUrl.replace('/media/games/', `/media/resize/${width}/-/games/`);
};
