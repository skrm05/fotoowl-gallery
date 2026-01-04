import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { db } from "../../lib/instantdb";
import { tx, id } from "@instantdb/react";
import useAppStore from "../../store/useAppStore";
import { Send, Trash2 } from "lucide-react"; // ✅ Import Trash2

const CommentSection = ({ imageId, imageThumbnail }) => {
  const { currentUser } = useAppStore();
  const [commentText, setCommentText] = useState("");
  const scrollRef = useRef(null);

  const { isLoading, data } = db.useQuery({
    interactions: {
      $: {
        where: {
          imageId: imageId,
          type: "comment",
        },
      },
    },
  });

  const comments = useMemo(() => {
    const rawComments = data?.interactions || [];
    return [...rawComments].sort((a, b) => a.createdAt - b.createdAt);
  }, [data]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [comments]);

  const handleSend = useCallback(
    (e) => {
      e.preventDefault();
      if (!commentText.trim()) return;

      db.transact(
        tx.interactions[id()].update({
          imageId: imageId,
          userId: currentUser.id,
          userName: currentUser.name,
          userColor: currentUser.color,
          type: "comment",
          text: commentText,
          createdAt: Date.now(),
          imageThumbnail: imageThumbnail,
        })
      );

      setCommentText("");
    },
    [commentText, currentUser, imageId, imageThumbnail]
  );

  // ✅ New Delete Function
  const handleDelete = (commentId) => {
    if (window.confirm("Delete this comment?")) {
      db.transact(tx.interactions[commentId].delete());
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4"
        ref={scrollRef}
      >
        {isLoading && (
          <p className="text-center text-gray-400">Loading comments...</p>
        )}

        {!isLoading && comments.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            <p>No comments yet.</p>
            <p className="text-sm">Be the first to say something!</p>
          </div>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm"
              style={{ backgroundColor: comment.userColor || "#ccc" }}
            >
              {comment.userName.charAt(0)}
            </div>

            <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none max-w-[85%] relative">
              <div className="flex items-baseline gap-2 mb-1 justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-gray-700">
                    {comment.userName}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(comment.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* ✅ Delete Button (Only visible for own comments) */}
                {currentUser?.id === comment.userId && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete comment"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-800 leading-snug break-words">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="p-3 border-t flex items-center gap-2 bg-gray-50 shrink-0"
      >
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
        <button
          type="submit"
          disabled={!commentText.trim()}
          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
