import React, { useState } from "react";
import { useUnsplashImages } from "../../hooks/useUnsplash";
import ImageCard from "./ImageCard";
import ImageModal from "../interaction/ImageModal";
import { Loader2 } from "lucide-react";

const ImageGrid = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUnsplashImages();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <div className="p-10 text-center text-xl text-gray-500">
        Loading images...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        Something went wrong while loading images.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>Loading...</span>
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      </div>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default ImageGrid;
