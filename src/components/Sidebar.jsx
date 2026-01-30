import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen }) {
    return (
        <aside
            className={`
                fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gaming-card border-r border-white/5 
                transition-all duration-300 overflow-hidden z-20
                ${isOpen ? "w-64" : "w-0 opacity-0 md:w-0 md:opacity-0"} 
            `}
        >
            <nav className="flex flex-col gap-2 p-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-medium whitespace-nowrap ${isActive
                            ? "bg-gaming-blue text-white shadow-lg shadow-gaming-blue/20"
                            : "text-foreground-muted hover:bg-gaming-hover hover:text-white"
                        }`
                    }
                >
                    Inicio
                </NavLink>

                <NavLink
                    to="/games"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-medium whitespace-nowrap ${isActive
                            ? "bg-gaming-blue text-white shadow-lg shadow-gaming-blue/20"
                            : "text-foreground-muted hover:bg-gaming-hover hover:text-white"
                        }`
                    }
                >
                    Juegos
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        `px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 font-medium whitespace-nowrap ${isActive
                            ? "bg-gaming-blue text-white shadow-lg shadow-gaming-blue/20"
                            : "text-foreground-muted hover:bg-gaming-hover hover:text-white"
                        }`
                    }
                >
                    Favoritos
                </NavLink>
            </nav>
        </aside>
    );
}
