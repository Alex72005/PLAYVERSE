import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    return (
        <div className="min-h-screen bg-gaming-bg text-foreground flex flex-col">
            <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

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

            <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                <Footer />
            </div>
        </div>
    );
}
