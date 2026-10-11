import SectionHeader from "./SectionHeader.jsx";

// Видео бэлэн болмогц: videoSrc-д YouTube embed URL (жиш: "https://www.youtube.com/embed/XXXX") өгнө.
export default function VideoSection({ videoSrc = null }) {
  return (
    <section className="section" id="video">
      <SectionHeader title="Видео" />
      {videoSrc ? (
        <div className="video-frame">
          <iframe
            src={videoSrc}
            title="Blue Rigel видео"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="video-placeholder">
          <div className="play-circle">▶</div>
          <strong>Видео тун удахгүй</strong>
          <span>Энэ хэсэгт үйлдвэрлэлийн болон бүтээгдэхүүний видео байршина</span>
        </div>
      )}
    </section>
  );
}
