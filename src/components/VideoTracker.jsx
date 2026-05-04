import React, { useState, useEffect } from "react";

function VideoTracker() {
  const [videos, setVideos] = useState(() => {
    const savedVideos =
      localStorage.getItem("videos");
    return savedVideos
      ? JSON.parse(savedVideos)
      : [];
  });

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "videos",
      JSON.stringify(videos)
    );
  }, [videos]);

  // Convert YouTube URL
  const getEmbedUrl = (videoUrl) => {
    if (
      videoUrl.includes("youtube.com/watch?v=")
    ) {
      const videoId =
        videoUrl.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (videoUrl.includes("youtu.be/")) {
      const videoId =
        videoUrl.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return videoUrl;
  };

  // Add Video
  const addVideo = () => {
    if (
      !title.trim() ||
      !url.trim() ||
      !duration
    ) {
      alert(
        "Enter title, URL, and duration!"
      );
      return;
    }

    const duplicate = videos.some(
      (video) =>
        video.url.toLowerCase() ===
        url.toLowerCase()
    );

    if (duplicate) {
      alert("Video already exists!");
      return;
    }

    const newVideo = {
      title: title.trim(),
      url: url.trim(),
      duration: Number(duration),
      watched: 0,
    };

    setVideos([...videos, newVideo]);

    setTitle("");
    setUrl("");
    setDuration("");
  };

  // Auto update for direct videos
  const updateWatchedFromVideo = (
    index,
    currentTime
  ) => {
    const updatedVideos = [...videos];

    updatedVideos[index].watched =
      currentTime / 60;

    setVideos(updatedVideos);
  };

  // Manual fallback for YouTube
  const updateWatchedManual = (
    index,
    value
  ) => {
    const updatedVideos = [...videos];

    updatedVideos[index].watched =
      Number(value);

    setVideos(updatedVideos);
  };

  // Delete
  const deleteVideo = (index) => {
    setVideos(
      videos.filter((_, i) => i !== index)
    );
  };

  // Totals
  const totalDuration = videos.reduce(
    (sum, video) => sum + video.duration,
    0
  );

  const totalWatched = videos.reduce(
    (sum, video) => sum + video.watched,
    0
  );

  const completedVideos = videos.filter(
    (video) =>
      video.watched >= video.duration
  ).length;

  const progress =
    totalDuration === 0
      ? 0
      : (totalWatched / totalDuration) * 100;

  return (
    <div className="video-tracker">
      <h2>
        Auto Track Video Learning
        Tracker
      </h2>

      {/* FORM */}
      <div className="video-form">
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Paste YouTube or Video URL"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Total Minutes"
          value={duration}
          onChange={(e) =>
            setDuration(e.target.value)
          }
        />

        <button onClick={addVideo}>
          Add Video
        </button>
      </div>

      {/* Stats */}
      <div className="video-stats">
        <p>Total Videos: {videos.length}</p>
        <p>
          Completed Videos:{" "}
          {completedVideos}
        </p>
        <p>
          Remaining Videos:{" "}
          {videos.length -
            completedVideos}
        </p>
      </div>

      {/* Video List */}
      {videos.map((video, index) => {
        const videoProgress =
          (video.watched /
            video.duration) *
          100;

        const isYouTube =
          video.url.includes("youtube") ||
          video.url.includes("youtu.be");

        return (
          <div
            key={index}
            className="video-item"
          >
            <h3>{video.title}</h3>

            {isYouTube ? (
              <>
                <iframe
                  width="100%"
                  height="315"
                  src={getEmbedUrl(
                    video.url
                  )}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>

                {/* Manual fallback */}
                <input
                  type="range"
                  min="0"
                  max={video.duration}
                  value={video.watched}
                  onChange={(e) =>
                    updateWatchedManual(
                      index,
                      e.target.value
                    )
                  }
                />
              </>
            ) : (
              <video
                width="100%"
                controls
                onTimeUpdate={(e) =>
                  updateWatchedFromVideo(
                    index,
                    e.target.currentTime
                  )
                }
              >
                <source
                  src={video.url}
                />
              </video>
            )}

            <p>
              {video.watched.toFixed(1)}/
              {video.duration} min
            </p>

            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${videoProgress}%`,
                }}
              ></div>
            </div>

            <button
              className="delete-btn"
              onClick={() =>
                deleteVideo(index)
              }
            >
              Delete
            </button>
          </div>
        );
      })}

      {/* Overall */}
      <h3>
        Overall Learning Progress:{" "}
        {progress.toFixed(1)}%
      </h3>

      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default VideoTracker;