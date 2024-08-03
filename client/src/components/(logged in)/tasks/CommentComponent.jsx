import React from "react";

export const CommentComponent = ({ userName, userPicture, message, timeAgo, index }) => {
    return (
      <div key={index} className="space-y-1">
        <div className="flex items-center gap-3">
          <img
            src={userPicture}
            alt=""
            className="min-h-8 min-w-8 max-h-8 max-w-8 rounded-full object-cover"
          />
          <div className="flex items-center gap-2">
            <p className="font-medium">{userName}</p>
            <div className="rounded-full bg-gray-600 w-1 h-1"></div>
            <p className="text-[.8rem] text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <p>{message}</p>
        <hr />
      </div>
    );
  };