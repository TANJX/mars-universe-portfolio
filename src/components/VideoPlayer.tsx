type VideoPlayerProps = {
  src?: string;
  poster?: string;
  loop?: boolean;
  youtubeId?: string;
  title?: string;
};

export function VideoPlayer({
  src,
  poster,
  loop,
  youtubeId,
  title,
}: VideoPlayerProps) {
  if (youtubeId) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  if (!src) return null;

  if (loop) {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="w-full rounded-md bg-black"
      />
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      className="w-full rounded-md bg-black"
    />
  );
}
