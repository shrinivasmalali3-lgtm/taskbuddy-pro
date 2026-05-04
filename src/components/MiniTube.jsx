import React, {
  useState,
  useEffect,
} from "react";
import VideoCard from "./VideoCard.jsx";
import VideoPlayer from "./VideoPlayer.jsx";

function MiniTube() {
  // VIDEOS
  const [videos, setVideos] =
    useState(() => {
      const savedVideos =
        localStorage.getItem(
          "miniTubeVideos"
        );

      return savedVideos
        ? JSON.parse(
            savedVideos
          )
        : [];
    });

  // WATCH LATER
  const [watchLater, setWatchLater] =
    useState(() => {
      const savedWatchLater =
        localStorage.getItem(
          "watchLater"
        );

      return savedWatchLater
        ? JSON.parse(
            savedWatchLater
          )
        : [];
    });

  // CURRENT VIDEO
  const [currentVideo, setCurrentVideo] =
    useState(null);

  // URL
  const [url, setUrl] =
    useState("");

  // SEARCH
  const [search, setSearch] =
    useState("");

  // FILTER
  const [videoFilter, setVideoFilter] =
    useState("all");

  // SORT
  const [videoSort, setVideoSort] =
    useState("latest");

  // STORAGE
  useEffect(() => {
    localStorage.setItem(
      "miniTubeVideos",
      JSON.stringify(videos)
    );
  }, [videos]);

  useEffect(() => {
    localStorage.setItem(
      "watchLater",
      JSON.stringify(
        watchLater
      )
    );
  }, [watchLater]);

  // YOUTUBE ID
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

  // THUMBNAIL
  const getThumbnail = (
    videoId
  ) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  // ADD VIDEO
  const addVideo = async (
    e
  ) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }

    const videoId =
      extractYouTubeId(url);

    if (!videoId) {
      alert(
        "Invalid YouTube URL"
      );
      return;
    }

    try {
      const response =
        await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );

      const data =
        await response.json();

      const newVideo = {
        id:
          Date.now() +
          Math.random(),

        title:
          data.title ||
          "YouTube Video",

        url,

        category:
          data.author_name ||
          "YouTube",

        progress: 0,

        notes: "",

        bookmarks: [],

        thumbnail:
          getThumbnail(
            videoId
          ),
      };

      setVideos([
        newVideo,
        ...videos,
      ]);

      setUrl("");
    } catch (error) {
      alert(
        "Could not fetch video details."
      );
    }
  };

  // WATCH NOW
  const watchNow = (video) => {
    setCurrentVideo(video);
  };

  // WATCH LATER
  const addToWatchLater = (
    video
  ) => {
    const exists =
      watchLater.some(
        (v) =>
          v.id === video.id
      );

    if (!exists) {
      setWatchLater([
        ...watchLater,
        video,
      ]);
    }
  };

  // REMOVE WATCH LATER
  const removeFromWatchLater = (
    id
  ) => {
    const updatedWatchLater =
      watchLater.filter(
        (video) =>
          video.id !== id
      );

    setWatchLater(
      updatedWatchLater
    );
  };

  // CLEAR WATCH LATER
  const clearWatchLater = () => {
    setWatchLater([]);
  };

  // DELETE VIDEO
  const deleteVideo = (id) => {
    const updatedVideos =
      videos.filter(
        (video) =>
          video.id !== id
      );

    setVideos(updatedVideos);

    const updatedWatchLater =
      watchLater.filter(
        (video) =>
          video.id !== id
      );

    setWatchLater(
      updatedWatchLater
    );

    if (
      currentVideo &&
      currentVideo.id === id
    ) {
      setCurrentVideo(null);
    }
  };

  // UPDATE PROGRESS
  const updateVideoProgress = (
    id,
    progress
  ) => {
    const updatedVideos =
      videos.map((video) =>
        video.id === id
          ? {
              ...video,
              progress,
            }
          : video
      );

    setVideos(updatedVideos);

    if (
      currentVideo &&
      currentVideo.id === id
    ) {
      setCurrentVideo({
        ...currentVideo,
        progress,
      });
    }

    const updatedWatchLater =
      watchLater.map(
        (video) =>
          video.id === id
            ? {
                ...video,
                progress,
              }
            : video
      );

    setWatchLater(
      updatedWatchLater
    );
  };

  // FILTER
  let filteredVideos =
    videos.filter((video) => {
      const matchesSearch =
        video.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      let matchesFilter =
        true;

      if (
        videoFilter ===
        "not-started"
      ) {
        matchesFilter =
          (video.progress ||
            0) === 0;
      }

      if (
        videoFilter ===
        "ongoing"
      ) {
        matchesFilter =
          (video.progress ||
            0) > 0 &&
          (video.progress ||
            0) < 100;
      }

      if (
        videoFilter ===
        "completed"
      ) {
        matchesFilter =
          (video.progress ||
            0) === 100;
      }

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  // SORT
  if (
    videoSort === "az"
  ) {
    filteredVideos = [
      ...filteredVideos,
    ].sort((a, b) =>
      a.title.localeCompare(
        b.title
      )
    );
  }

  if (
    videoSort ===
    "progress-high"
  ) {
    filteredVideos = [
      ...filteredVideos,
    ].sort(
      (a, b) =>
        (b.progress ||
          0) -
        (a.progress ||
          0)
    );
  }

  if (
    videoSort ===
    "progress-low"
  ) {
    filteredVideos = [
      ...filteredVideos,
    ].sort(
      (a, b) =>
        (a.progress ||
          0) -
        (b.progress ||
          0)
    );
  }

  // DASHBOARD STATS
  const totalVideos =
    videos.length;

  const notStartedVideos =
    videos.filter(
      (video) =>
        (video.progress ||
          0) === 0
    ).length;

  const ongoingVideos =
    videos.filter(
      (video) =>
        (video.progress ||
          0) > 0 &&
        (video.progress ||
          0) < 100
    ).length;

  const completedVideos =
    videos.filter(
      (video) =>
        (video.progress ||
          0) === 100
    ).length;

  return (
    <div className="mini-tube">

      <h1>MiniTube Pro</h1>

      {/* DASHBOARD */}
      <div className="video-dashboard">

        <div className="dashboard-card">
          <h3>
            Total
          </h3>
          <p>
            {
              totalVideos
            }
          </p>
        </div>

        <div className="dashboard-card">
          <h3>
            Not Started
          </h3>
          <p>
            {
              notStartedVideos
            }
          </p>
        </div>

        <div className="dashboard-card">
          <h3>
            Ongoing
          </h3>
          <p>
            {
              ongoingVideos
            }
          </p>
        </div>

        <div className="dashboard-card">
          <h3>
            Completed
          </h3>
          <p>
            {
              completedVideos
            }
          </p>
        </div>

      </div>

      {/* ADD */}
      <form
        className="video-form"
        onSubmit={addVideo}
      >

        <input
          type="text"
          placeholder="Paste YouTube URL..."
          value={url}
          onChange={(e) =>
            setUrl(
              e.target.value
            )
          }
          required
        />

        <button type="submit">
          Auto Add Video
        </button>

      </form>

      {/* SEARCH */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      {/* FILTER */}
      <div className="task-filter">

        <button
          onClick={() =>
            setVideoFilter(
              "all"
            )
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setVideoFilter(
              "not-started"
            )
          }
        >
          Not Started
        </button>

        <button
          onClick={() =>
            setVideoFilter(
              "ongoing"
            )
          }
        >
          Ongoing
        </button>

        <button
          onClick={() =>
            setVideoFilter(
              "completed"
            )
          }
        >
          Completed
        </button>

      </div>

      {/* SORT */}
      <div className="video-sort">
        <select
          value={videoSort}
          onChange={(e) =>
            setVideoSort(
              e.target.value
            )
          }
        >
          <option value="latest">
            Latest Added
          </option>

          <option value="az">
            A–Z
          </option>

          <option value="progress-high">
            Progress High →
            Low
          </option>

          <option value="progress-low">
            Progress Low →
            High
          </option>
        </select>
      </div>

      {/* LAYOUT */}
      <div className="mini-tube-layout">

        {/* LIBRARY */}
        <div className="video-library">
          <h2>
            Video Library (
            {
              filteredVideos.length
            })
          </h2>

          {filteredVideos.length ===
          0 ? (
            <p>
              No videos found.
            </p>
          ) : (
            filteredVideos.map(
              (video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  watchNow={
                    watchNow
                  }
                  addToWatchLater={
                    addToWatchLater
                  }
                  deleteVideo={
                    deleteVideo
                  }
                />
              )
            )
          )}
        </div>

        {/* PLAYER */}
        <div className="video-watch-section">
          {currentVideo ? (
            <VideoPlayer
              video={
                currentVideo
              }
              updateVideoProgress={
                updateVideoProgress
              }
            />
          ) : (
            <h2>
              Select a video
              to watch
            </h2>
          )}
        </div>

        {/* WATCH LATER */}
        <div className="watch-later">

          <div className="watch-later-header">
            <h2>
              Watch Later (
              {
                watchLater.length
              })
            </h2>

            {watchLater.length >
              0 && (
              <button
                className="clear-btn"
                onClick={
                  clearWatchLater
                }
              >
                Clear All
              </button>
            )}
          </div>

          {watchLater.length ===
          0 ? (
            <p>
              No videos saved.
            </p>
          ) : (
            watchLater.map(
              (video) => (
                <div
                  key={video.id}
                  className="watch-later-item"
                >
                  <p
                    onClick={() =>
                      watchNow(
                        video
                      )
                    }
                  >
                    ▶{" "}
                    {
                      video.title
                    }{" "}
                    (
                    {
                      video.progress
                    }
                    %)
                  </p>

                  <div className="watch-later-actions">
                    <button
                      className="delete-btn"
                      onClick={() =>
                        removeFromWatchLater(
                          video.id
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default MiniTube;