import React from "react";
import ImageGrid from "../components/gallery/ImageGrid";
import ActivityFeed from "../components/feed/ActivityFeed";

const Home = ({ isGallery, isFeed }) => {
  return (
    <>
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
    </>
  );
};

export default Home;
