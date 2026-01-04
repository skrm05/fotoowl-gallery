import React, { useEffect, useState } from "react";
import { unsplashApi } from "../../api/unsplash";
import ImageModal from "./ImageModal";
import { Loader2 } from "lucide-react";

const SingleImageViewer = ({ imageId, onClose }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      try {
        setLoading(true);
        const { data } = await unsplashApi.get(`/photos/${imageId}`);
        if (isMounted) {
          setImage(data);
        }
      } catch (error) {
        console.error("Failed to load image details");
        if (isMounted) onClose();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (imageId) {
      fetchImage();
    }
    return () => {
      isMounted = false;
    };
  }, [imageId]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-white p-4 rounded-full">
          <Loader2 className="animate-spin w-8 h-8 text-black" />
        </div>
      </div>
    );
  }

  if (!image) return null;

  return <ImageModal image={image} onClose={onClose} />;
};

export default SingleImageViewer;
