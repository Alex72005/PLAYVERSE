export default function LoadingSpinner({ fullScreen = false }) {
    const containerClasses = fullScreen
        ? "flex justify-center items-center h-screen"
        : "flex justify-center py-20";

    return (
        <div className={containerClasses}>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gaming-blue"></div>
        </div>
    );
}
