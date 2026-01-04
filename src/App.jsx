import { useEffect, useState } from "react";
import useAppStore from "./store/useAppStore";
import ImageGrid from "./components/gallery/ImageGrid";
import ActivityFeed from "./components/feed/ActivityFeed";
import SingleImageViewer from "./components/interaction/SingleImageViewer";
import { LayoutGrid, Activity } from "lucide-react";

function App() {
  const {
    initUser: loadSession,
    currentUser: user,
    targetImageId,
    setTargetImageId,
  } = useAppStore();
  const [currentView, setCurrentView] = useState("gallery");

  useEffect(() => {
    loadSession();
  }, []);

  const isGallery = currentView === "gallery";
  const isFeed = currentView === "feed";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20 lg:pb-0 font-sans">
      <header className="bg-white border-b sticky top-0 z-40 px-4 py-3 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
              F
            </div>
            <h1 className="text-xl font-bold tracking-tight">FotoOwl</h1>
          </div>

          {user && (
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: user.color }}
              />
              <span className="text-sm font-medium hidden sm:inline">
                {user.name}
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div
            className={`lg:col-span-3 ${
              isGallery ? "block" : "hidden lg:block"
            }`}
          >
            <ImageGrid />
          </div>

          <div
            className={`lg:col-span-1 ${isFeed ? "block" : "hidden lg:block"}`}
          >
            <ActivityFeed />
          </div>
        </div>
      </main>
      {targetImageId && (
        <SingleImageViewer
          imageId={targetImageId}
          onClose={() => setTargetImageId(null)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden z-50 flex justify-around items-center pb-safe">
        <button
          onClick={() => setCurrentView("gallery")}
          className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
            isGallery ? "text-black" : "text-gray-400"
          }`}
        >
          <LayoutGrid
            className={`w-6 h-6 ${isGallery ? "fill-gray-100" : ""}`}
          />
          Gallery
        </button>

        <button
          onClick={() => setCurrentView("feed")}
          className={`relative flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
            isFeed ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <Activity className={`w-6 h-6 ${isFeed ? "fill-blue-100" : ""}`} />
          Activity Feed
          <span className="absolute top-2 right-6 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </button>
      </div>
    </div>
  );
}

export default App;
