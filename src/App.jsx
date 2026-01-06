import { useEffect, useState } from "react";
import useAppStore from "./store/useAppStore";
import SingleImageViewer from "./components/interaction/SingleImageViewer";
import { LayoutGrid, Activity } from "lucide-react";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";

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
      <Navbar user={user} />
      <Home isGallery={isGallery} isFeed={isFeed} />
      {targetImageId && (
        <SingleImageViewer
          imageId={targetImageId}
          onClose={() => setTargetImageId(null)}
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 lg:hidden z-50 flex justify-around items-center pb-safe">
        <button
          onClick={() => setCurrentView("gallery")}
          className={`flex flex-col cursor-pointer items-center gap-1 text-xs font-medium transition-colors ${
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
          className={`relative flex cursor-pointer flex-col items-center gap-1 text-xs font-medium transition-colors ${
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
