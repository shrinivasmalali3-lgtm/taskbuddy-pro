import React, {
  useState,
  useEffect,
} from "react";

function VideoPlayer({
  video,
  updateVideoProgress,
}) {
  // NOTES
  const [notes, setNotes] =
    useState(
      video.notes || ""
    );

  // BOOKMARKS
  const [bookmarks, setBookmarks] =
    useState(
      video.bookmarks ||
        []
    );

  // PROGRESS
  const [progress, setProgress] =
    useState(
      video.progress || 0
    );

  // EXTRACT YOUTUBE ID
  const extractYouTubeId = (
    url
  ) => {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;

    const match =
      url.match(regExp);

    return match
      ? match[1]
      : null;
  };

  const videoId =
    extractYouTubeId(
      video.url
    );

  // SAVE NOTES
  const saveNotes = () => {
    alert(
      "Notes saved locally for now."
    );
  };

  // ADD BOOKMARK
  const addBookmark = () => {
    const newBookmark = `Bookmark at ${progress}%`;

    setBookmarks([
      ...bookmarks,
      newBookmark,
    ]);
  };

  // HANDLE PROGRESS
  const handleProgressChange = (
    e
  ) => {
    const newProgress =
      Number(
        e.target.value
      );

    setProgress(
      newProgress
    );

    // SAVE TO MINITUBE
    updateVideoProgress(
      video.id,
      newProgress
    );
  };

  // RESET ON VIDEO CHANGE
  useEffect(() => {
    setNotes(
      video.notes || ""
    );

    setBookmarks(
      video.bookmarks ||
        []
    );

    setProgress(
      video.progress || 0
    );
  }, [video]);

  return (
    <div className="video-player">

      <h3>{video.title}</h3>

      {/* YOUTUBE EMBED */}
      {videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title}
          allowFullScreen
        ></iframe>
      ) : (
        <video
          controls
          src={video.url}
        ></video>
      )}

      {/* PROGRESS */}
      <div className="video-progress">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={
            handleProgressChange
          }
        />

        <p>
          Progress:{" "}
          {progress}%
        </p>
      </div>

      {/* ACTIONS */}
      <div className="video-player-actions">

        <button
          onClick={
            addBookmark
          }
        >
          Add Bookmark
        </button>

      </div>

      {/* NOTES */}
      <div className="video-notes">
        <h3>
          Study Notes
        </h3>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          placeholder="Write your notes here..."
        />

        <button
          onClick={
            saveNotes
          }
        >
          Save Notes
        </button>
      </div>

      {/* BOOKMARKS */}
      <div className="video-bookmarks">
        <h3>
          Bookmarks
        </h3>

        {bookmarks.length ===
        0 ? (
          <p>
            No bookmarks yet.
          </p>
        ) : (
          bookmarks.map(
            (
              bookmark,
              index
            ) => (
              <p
                key={index}
              >
                {bookmark}
              </p>
            )
          )
        )}

      </div>

    </div>
  );
}

export default VideoPlayer;