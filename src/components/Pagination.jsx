export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (page > 1) {
            onPageChange(page - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleJump = (pageNum) => {
        onPageChange(pageNum);
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex flex-col items-center gap-6 mt-12 mb-8">
            <div className="flex flex-wrap justify-center items-center gap-2">
                {/* Botón Primera Página */}
                <button
                    onClick={() => handleJump(1)}
                    disabled={page === 1}
                    className="px-3 py-2 rounded-lg bg-gaming-card border border-white/10 hover:bg-gaming-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer text-white"
                    title="Primera Página"
                >
                    « 1
                </button>

                {/* Botón Anterior */}
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className="p-2 rounded-lg bg-gaming-blue text-white hover:bg-gaming-blue-dim disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-gaming-blue/20 cursor-pointer"
                    title="Anterior"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Números de Página */}
                {Array.from({ length: 5 }, (_, i) => page - 2 + i).map(pageNum => {
                    if (pageNum < 1 || pageNum > totalPages) return null;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => handleJump(pageNum)}
                            className={`min-w-10 h-10 px-2 rounded-lg font-bold transition-all cursor-pointer ${page === pageNum
                                ? 'bg-gaming-blue text-white shadow-lg shadow-gaming-blue/20 scale-110'
                                : 'bg-gaming-card border border-white/10 hover:bg-gaming-hover hover:text-gaming-accent text-white/70'
                                }`}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                {/* Botón Siguiente */}
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg bg-gaming-blue text-white hover:bg-gaming-blue-dim disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-gaming-blue/20 cursor-pointer"
                    title="Siguiente"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Botón +2 */}
                <button
                    onClick={() => handleJump(Math.min(page + 2, totalPages))}
                    disabled={page >= totalPages - 1}
                    className="px-3 py-2 rounded-lg bg-gaming-card border border-white/10 hover:bg-gaming-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium cursor-pointer text-white"
                    title="Avanzar 2 páginas"
                >
                    +2
                </button>

                {/* Botón Última Página */}
                <button
                    onClick={() => handleJump(totalPages)}
                    disabled={page === totalPages}
                    className="px-3 py-2 rounded-lg bg-gaming-card border border-white/10 hover:bg-gaming-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer text-white"
                    title="Última Página"
                >
                    {totalPages} »
                </button>
            </div>

            <div className="text-xs text-foreground-muted">
                Página {page} de {totalPages}
            </div>
        </div>
    );
}
