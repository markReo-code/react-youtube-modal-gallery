import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import useInert from "./_hooks/useInert";
import { Modal } from "./components/Modal";
import { videos } from "./data/videos";
import type { Video } from "./types/video";

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  useInert({ ref: mainRef, active: selectedVideo !== null });

  const getThumbnailUrl = (src: string) => {
    const url = new URL(src);
    const videoId = url.searchParams.get("v");

    if (!videoId) {
      return "";
    }
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const handleOpen = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleClose = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <main ref={mainRef}>
        <section className="page__section">
          <div className="inner">
            <h1 className="page__title">動画一覧</h1>
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
        </section>
      </main>

      <Modal isOpen={selectedVideo !== null} onClose={handleClose}>
        {selectedVideo && (
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
