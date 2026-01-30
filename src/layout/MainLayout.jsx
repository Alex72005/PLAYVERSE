import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    // Auto-close sidebar on route change (all devices)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    return (
        <div className="min-h-screen bg-gaming-bg text-foreground flex flex-col">
            {/* Header Fijo */}
            <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Contenedor Principal con Sidebar y Contenido */}
            <div className="flex flex-1 pt-0 relative">
                <Sidebar isOpen={isSidebarOpen} />

                <main
                    className={`
                        flex-1 p-8 transition-all duration-300 flex flex-col
                        ${isSidebarOpen ? "ml-64" : "ml-0"}
                    `}
                >
                    <div className="max-w-7xl mx-auto w-full flex-1">
                        {children}
                    </div>
                </main>
            </div>

            {/* Footer Global */}
            {/* El footer se ajusta igual que el main si queremos, o ocupa todo el ancho. 
                Si está fuera del <main>, debería tener margen si queremos que respete el sidebar, 
                o estar dentro del wrapper flex-1. Lo pondré dentro del wrapper principal visual.
            */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                <Footer />
            </div>
        </div>
    );
}
