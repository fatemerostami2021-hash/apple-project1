// src/components/article/VideoEmbed.jsx
import { useState } from "react";
import { HiPlay } from "react-icons/hi";

/**
 * VideoEmbed — lazy YouTube / direct video embed
 *
 * Usage in articlesData content:
 *   ::youtube::dQw4w9WgXcQ
 *   ::youtube::dQw4w9WgXcQ::عنوان ویدیو
 *   ::video::https://www.apple.com/105/media/us/iphone-15-pro/2023/...mp4
 */
export default function VideoEmbed({ type, src, title }) {
  const [active, setActive] = useState(false);

  if (type === "youtube") {
    const thumbUrl = `https://img.youtube.com/vi/${src}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube.com/embed/${src}?autoplay=1&rel=0&modestbranding=1`;

    return (
      <figure className="my-10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/60 shadow-lg shadow-black/10 dark:shadow-black/40">
        {!active ? (
          <button
            onClick={() => setActive(true)}
            className="relative w-full aspect-video group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={title || "Play video"}
          >
            {/* Thumbnail */}
            <img
              src={thumbUrl}
              alt={title || "Video thumbnail"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 dark:bg-zinc-900/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <HiPlay
                  size={28}
                  className="text-zinc-900 dark:text-white ms-1"
                />
              </div>
            </div>
            {/* YouTube badge */}
            <div className="absolute bottom-3 end-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wide">
              YouTube
            </div>
          </button>
        ) : (
          <div className="aspect-video">
            <iframe
              src={embedUrl}
              title={title || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        )}
        {title && (
          <figcaption className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 text-center">
            {title}
          </figcaption>
        )}
      </figure>
    );
  }

  // Direct video (mp4 / apple.com / etc.)
  if (type === "video") {
    return (
      <figure className="my-10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700/60 shadow-lg shadow-black/10 dark:shadow-black/40">
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
          className="w-full aspect-video bg-black"
          title={title}
        />
        {title && (
          <figcaption className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/60 text-center">
            {title}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
}
