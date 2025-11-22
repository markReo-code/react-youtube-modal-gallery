import { useState } from "react";
import ReactPlayer from "react-player"
import "./App.css";
import { Modal } from "./components/Modal";
import { videos } from "./data/videos";
import type { Video } from "./types/video";

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const getThumbnailUrl = (src: string) => {
    const url = new URL(src);
    const videoId = url.searchParams.get("v");

    if (!videoId) {
      return "";
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const handleOpen = (video: Video) => {
    setSelectedVideo(video)
  }

  const handleClose = () => {
    setSelectedVideo(null)
  }

  return (
    <>
      <div className="inner">
        <ul className="video__list">
          {videos.map((video) => (
            <li key={video.id} className="video__item">
              <button 
                type="button" 
                className="video__button"
                onClick={() => handleOpen(video)}
                >
                <div className="video__thumbWrapper">
                  <img
                    src={getThumbnailUrl(video.src)}
                    className="video__thumb"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <p className="video__title">{video.title}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal 
        isOpen={selectedVideo !== null}
        onClose={handleClose}
        
        >{selectedVideo && (
          <ReactPlayer 
            src={selectedVideo.src}
            width="100%"
            height="100%"
            controls
          />
        )}
      </Modal>
    </>
  );
};

export default App;
