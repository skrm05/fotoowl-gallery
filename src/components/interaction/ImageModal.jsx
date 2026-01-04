import React from "react";
import { X } from "lucide-react";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 md:block hidden"
        >
          <X className="w-5 h-5" />
        </button>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 md:hidden"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-full md:w-[60%] h-[40%] md:h-full bg-black flex items-center justify-center">
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="w-full md:w-[40%] h-[60%] md:h-full flex flex-col border-l border-gray-200 bg-white">
          <div className="p-4 border-b flex items-center justify-between bg-white z-20">
            <div className="flex items-center gap-3">
              <img
                src={image.user.profile_image.medium}
                alt={image.user.name}
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <h3 className="font-bold text-gray-900 leading-tight">
                  {image.user.name}
                </h3>
                <p className="text-xs text-gray-500">@{image.user.username}</p>
              </div>
            </div>
            <LikeButton image={image} />
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-hidden">
            <CommentSection
              imageId={image.id}
              imageThumbnail={image.urls.thumb}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
