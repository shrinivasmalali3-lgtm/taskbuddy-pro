import React from "react";

function VideoCard({
  video,
  watchNow,
  addToWatchLater,
  deleteVideo,
}) {
  return (
    <div className="video-card">

      {/* THUMBNAIL */}
      <img
        src={
          video.thumbnail
        }
        alt={video.title}
        className="video-thumbnail"
      />

      {/* INFO */}
      <div className="video-card-info">

        <h3>{video.title}</h3>

        <p>
          Channel:{" "}
          {video.category}
        </p>

        <p>
           Progress: {video.progress || 0}%
        </p>

        <p
          className={`video-status ${
          video.progress === 100
          ? "completed-status"
          : video.progress > 0
          ? "ongoing-status"
          : "not-started-status"
          }`}
        >
         {video.progress === 100
           ? "Completed"
           : video.progress > 0
           ? "Ongoing"
           : "Not Started"}
        </p>

        {/* ACTIONS */}
        <div className="video-card-actions">

          {/* WATCH */}
          <button
            onClick={() =>
              watchNow(video)
            }
          >
            Watch Now
          </button>

          {/* WATCH LATER */}
          <button
            onClick={() =>
              addToWatchLater(
                video
              )
            }
          >
            Watch Later
          </button>

          {/* DELETE */}
          <button
            className="delete-btn"
            onClick={() =>
              deleteVideo(
                video.id
              )
            }
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default VideoCard;