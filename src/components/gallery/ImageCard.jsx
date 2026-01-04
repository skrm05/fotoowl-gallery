import React from "react";
import { Heart } from "lucide-react";
import { db } from "../../lib/instantdb";
import { tx, id } from "@instantdb/react";
import useAppStore from "../../store/useAppStore";

const REACTION_OPTIONS = ["👍", "❤️", "😂", "😮", "😢", "😡"];

const ImageCard = ({ image, onClick }) => {
  const { currentUser } = useAppStore();

  const { isLoading, data } = db.useQuery({
    reactions: {
      $: {
        where: { imageId: image.id },
      },
    },
  });

  const reactions = data?.reactions || [];
  const myReaction = reactions.find((r) => r.userId === currentUser?.id);

  const handleReaction = (emoji, e) => {
    e.stopPropagation();

    if (myReaction && myReaction.emoji === emoji) {
      db.transact(tx.reactions[myReaction.id].delete());
    } else {
      const reactionId = myReaction ? myReaction.id : id();
      db.transact(
        tx.reactions[reactionId].update({
          imageId: image.id,
          userId: currentUser.id,
          userName: currentUser.name,
          type: "reaction",
          emoji: emoji,
          imageThumbnail: image.urls.thumb,
          createdAt: Date.now(),
        })
      );
    }
  };

  return (
    <div
      onClick={() => onClick(image)}
      className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all bg-gray-100"
    >
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex justify-between items-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-white text-xs truncate max-w-[60%]">
          By {image.user.name}
        </div>
        <div className="relative group/reaction">
          <div className="absolute bottom-full right-0 pb-2 hidden group-hover/reaction:flex flex-col items-end z-20 animate-in slide-in-from-bottom-1 duration-200">
            <div className="bg-white rounded-full shadow-lg border border-gray-100 p-1 flex gap-1">
              {REACTION_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={(e) => handleReaction(emoji, e)}
                  className="w-8 h-8 flex items-center justify-center text-lg hover:scale-125 transition-transform hover:bg-gray-100 rounded-full"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Trigger Button */}
          <button className="flex items-center gap-1.5 text-white bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors">
            {myReaction ? (
              <span className="text-lg leading-none">{myReaction.emoji}</span>
            ) : (
              <Heart className="w-5 h-5" />
            )}
            <span className="font-semibold text-sm">
              {isLoading ? "..." : reactions.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
