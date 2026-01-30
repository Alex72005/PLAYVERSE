export default function Header({ toggleSidebar }) {
    return (
        <header className="h-16 bg-gaming-card border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-10">
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
                <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-tr from-gaming-blue to-gaming-accent shadow-lg shadow-gaming-blue/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold bg-linear-to-r from-gaming-blue to-gaming-accent bg-clip-text text-transparent select-none tracking-tight">
                        PLAYVERSE
                    </h1>
                </div>
            </div>

            {/* Acciones del Header (Usuario, Notificaciones, etc - placeholders) */}
            {/* <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gaming-hover border border-white/10"></div>
            </div> */}
        </header>
    );
}
