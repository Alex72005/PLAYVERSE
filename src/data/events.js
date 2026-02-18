export const events = [
    {
        id: 1,
        title: "Torneo de League of Legends",
        location: "Madrid Arena",
        date: "2024-11-15",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
        description: "Únete al mayor torneo de LoL del año en Madrid."
    },
    {
        id: 2,
        title: "Presentación Indie Games",
        location: "Barcelona Tech City",
        date: "2024-12-05",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
        description: "Descubre las últimas novedades del desarrollo independiente."
    },
    {
        id: 3,
        title: "Retro Gaming Night",
        location: "Sala Pixel, Valencia",
        date: "2024-10-31",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        description: "Una noche dedicada a los clásicos de arcade y consolas antiguas."
    },
    {
        id: 4,
        title: "Taller de Desarrollo de Videojuegos",
        location: "Online",
        date: "2024-11-20",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
        description: "Aprende los fundamentos de Unity y Unreal Engine."
    },
    {
        id: 5,
        title: "Presentación Oficial EA Sports FC 27",
        location: "Estadio Santiago Bernabéu, Madrid",
        date: "2025-08-15",
        image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1931&auto=format&fit=crop",
        description: "Descubre en exclusiva las novedades del nuevo simulador de fútbol de EA Sports. Gameplay, nuevos modos y más."
    }
];

export const getEventsMock = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(events);
        }, 500); // Simulate API latency
    });
};
