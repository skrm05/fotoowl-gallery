import React from "react";
import { ThumbsUp } from "lucide-react";
import { db } from "../../lib/instantdb";
import { tx, id } from "@instantdb/react";
import useAppStore from "../../store/useAppStore";
const EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "😡"];

const LikeButton = ({ image }) => {
  const { currentUser } = useAppStore();
  const { data } = db.useQuery({
    reactions: {
      $: { where: { imageId: image.id } },
    },
  });

  const allReactions = data?.reactions || [];
  const myReaction = allReactions.find((r) => r.userId === currentUser?.id);
  const reactionCount = allReactions.length;

  const onEmojiClick = (emoji) => {
    if (myReaction && myReaction.emoji === emoji) {
      db.transact(tx.reactions[myReaction.id].delete());
      return;
    }
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
  };

  return (
    <div className="relative group z-10">
      <div className="absolute top-full right-0 pt-2 hidden group-hover:flex flex-col items-end animate-in slide-in-from-top-1">
        <div className="bg-white p-2 rounded-full shadow-lg border flex gap-1">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onEmojiClick(emoji)}
              className="hover:scale-125 transition-transform text-xl p-1"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
        {myReaction ? (
          <span className="text-xl">{myReaction.emoji}</span>
        ) : (
          <ThumbsUp className="w-5 h-5 text-gray-500" />
        )}

        <span
          className={`font-semibold ${
            myReaction ? "text-black" : "text-gray-500"
          }`}
        >
          {reactionCount > 0 ? reactionCount : "Like"}
        </span>
      </button>
    </div>
  );
};

export default LikeButton;
