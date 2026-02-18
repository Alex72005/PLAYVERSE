import { useState } from 'react';
import { Link } from 'react-router';

export default function Header({ toggleSidebar }) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <header className="h-16 bg-gaming-card border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="flex items-center gap-4">
                {/* Botón Toggle Sidebar */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-foreground-muted hover:text-white hover:bg-gaming-hover rounded-lg transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logo / Nombre de la web */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-tr from-gaming-blue to-gaming-accent shadow-lg shadow-gaming-blue/30 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold bg-linear-to-r from-gaming-blue to-gaming-accent bg-clip-text text-transparent select-none tracking-tight">
                        PLAYVERSE
                    </h1>
                </Link>
            </div>

            {/* Acciones del Header (Usuario) */}
            <div className="relative">
                <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 p-1 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
                >
                    <img
                        src="/alex.jpg"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full bg-gaming-card border border-white/10 object-cover"
                    />
                    <span className="hidden md:block text-sm font-medium text-white mr-2">Alex </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gaming-card border border-white/10 shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-white/5 mb-1">
                            <p className="text-sm font-medium text-white">Alejandro Santos</p>
                            <p className="text-xs text-gray-400">alex@playverse.com</p>
                        </div>
                        <Link
                            to="/favorites"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                        >
                            Mis Favoritos
                        </Link>
                        <Link
                            to="/my-events"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                        >
                            Mis Eventos
                        </Link>
                        {/* <div className="border-t border-white/5 mt-1 pt-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer">
                                Cerrar Sesión
                            </button>
                        </div> */}
                    </div>
                )}
            </div>
        </header>
    );
}
