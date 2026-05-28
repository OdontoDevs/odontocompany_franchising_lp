"use client";

import { useCallback, useState } from "react";
import { videos, VideoKey } from "@/data/videos";

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoKey>("paulo");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoTab = useCallback((key: VideoKey) => {
    setActiveVideo(key);
    setIsPlaying(false);
  }, []);

  return (
    <section className="video-section" id="video">
      <div className="container">
        <div className="section-kicker section-kicker--dark video-section-kicker">
          Conheça por dentro
        </div>
        <div className="video-section-inner">
          <div className="video-text-side">
            <h2 className="video-headline">
              Veja como funciona <em>na prática</em> antes de decidir
            </h2>
            <p className="video-sub mb-8">
              Nosso time de expansão preparou um recado exclusivo para você,
              investidor. Em poucos minutos, você entende o modelo, o suporte e o
              que esperar do processo de abertura.
            </p>

            <div className="video-tabs">
              <button
                className={`video-tab${activeVideo === "paulo" ? " active" : ""}`}
                onClick={() => handleVideoTab("paulo")}
              >
                Dr. Paulo Zahr
              </button>
              <button
                className={`video-tab${activeVideo === "expansao" ? " active" : ""}`}
                onClick={() => handleVideoTab("expansao")}
              >
                Expansão e modelo
              </button>
              <button
                className={`video-tab${activeVideo === "clinica" ? " active" : ""}`}
                onClick={() => handleVideoTab("clinica")}
              >
                Tour pela clínica
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="video-player-wrap flex-1" id="videoWrap">
              {!isPlaying ? (
                <div
                  className="video-thumb"
                  id="videoThumb"
                  onClick={() => setIsPlaying(true)}
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${videos[activeVideo].split('/embed/')[1].split('?')[0]}/maxresdefault.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="video-thumb-overlay" />
                  <div className="video-play-btn">
                    <svg viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <div className="video-thumb-label">
                    <strong>Assista agora</strong>
                    Como funciona a franquia OdontoCompany
                  </div>
                  <div className="video-duration">3:42</div>
                </div>
              ) : (
                <iframe
                  id="videoIframe"
                  src={videos[activeVideo]}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    position: "absolute",
                    inset: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Vídeo OdontoCompany"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
