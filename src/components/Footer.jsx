import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gaming-card border-t border-white/5 pt-16 pb-8 mt-auto">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
                    {/* Brand Section - Left */}
                    <div className="space-y-4 max-w-sm">
                        <div className="flex items-center gap-2">
                            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-tr from-gaming-blue to-gaming-accent shadow-lg shadow-gaming-blue/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold bg-linear-to-r from-gaming-blue to-gaming-accent bg-clip-text text-transparent select-none tracking-tight">PLAYVERSE</span>
                        </div>
                        <p className="text-foreground-muted text-sm leading-relaxed">
                            Tu destino definitivo para descubrir, explorar y trackear tus videojuegos favoritos.
                            Únete a nuestro universo.
                        </p>
                    </div>

                    {/* Links Sections - Right */}
                    <div className="flex gap-16 md:gap-24">
                        <div>
                            <h3 className="text-white font-bold mb-4">Explorar</h3>
                            <ul className="space-y-2 text-sm text-foreground-muted">
                                <li><Link to="/" className="hover:text-gaming-accent transition-colors">Inicio</Link></li>
                                <li><Link to="/games" className="hover:text-gaming-accent transition-colors">Juegos</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold mb-4">Legal</h3>
                            <ul className="space-y-2 text-sm text-foreground-muted">
                                <li><a href="#" className="hover:text-gaming-accent transition-colors">Términos</a></li>
                                <li><a href="#" className="hover:text-gaming-accent transition-colors">Privacidad</a></li>
                                <li><a href="#" className="hover:text-gaming-accent transition-colors">Cookies</a></li>
                                <li><a href="#" className="hover:text-gaming-accent transition-colors">Contacto</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground-muted">
                    <p>&copy; 2026 Playverse Inc. Todos los derechos reservados.</p>
                    <div className="flex gap-4">
                        <span>Made with ❤️ for gamers</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
