import React, { useMemo } from "react";
import { db } from "../../lib/instantdb";
import { MessageSquare, Heart, Activity } from "lucide-react";
import useAppStore from "../../store/useAppStore";

const ActivityFeed = () => {
  const { setTargetImageId } = useAppStore();

  const { isLoading, data } = db.useQuery({
    interactions: {
      $: {
        limit: 20,
      },
    },
  });

  const activities = useMemo(() => {
    const rawData = data?.interactions || [];
    return rawData.sort((a, b) => b.createdAt - a.createdAt);
  }, [data]);

  if (isLoading) {
    return <div className="p-4 text-xs text-gray-500">Loading updates...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-100px)] flex flex-col sticky top-24">
      <div className="p-4 border-b flex items-center gap-2 bg-gray-50 rounded-t-xl">
        <Activity className="w-4 h-4 text-blue-600" />
        <h2 className="font-bold text-sm text-gray-700">Live Activity</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-3">
        {activities.length === 0 && (
          <p className="text-center text-xs text-gray-400 mt-10">
            No activity.
          </p>
        )}

        {activities.map((item) => (
          <div
            key={item.id}
            onClick={() => setTargetImageId(item.imageId)}
            className="flex gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div
              className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.type === "reaction"
                  ? "bg-red-100 text-red-500"
                  : "bg-blue-100 text-blue-500"
              }`}
            >
              {item.type === "reaction" ? (
                <Heart className="w-3 h-3 fill-current" />
              ) : (
                <MessageSquare className="w-3 h-3" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="font-bold text-gray-900">{item.userName}</span>
                {item.type === "reaction"
                  ? " reacted to a photo"
                  : " commented on a photo"}
              </p>

              {item.type === "comment" && (
                <p className="text-xs text-gray-500 italic mt-1 line-clamp-1">
                  "{item.text}"
                </p>
              )}

              <p className="text-[10px] text-gray-400 mt-1">
                {new Date(item.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {item.imageThumbnail && (
              <img
                src={item.imageThumbnail}
                alt="preview"
                className="w-10 h-10 rounded object-cover border border-gray-200"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
