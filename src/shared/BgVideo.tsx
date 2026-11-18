// Full-bleed background video, same pattern as the SinergIA site:
// poster paints instantly, the <video> mounts only when near the viewport,
// fades in once it can play, pauses off-screen, and falls back to the poster on error.
// With loop={false} the clip plays once when it is mostly on screen, holds its last frame,
// and rewinds after leaving the screen so it plays from the start the next time it is seen.
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import './bgvideo.css';

export function BgVideo({
  src,
  poster,
  className = '',
  eager = false,
  playing = true,
  loop = true,
}: {
  src: string;
  poster: string;
  className?: string;
  eager?: boolean;
  playing?: boolean;
  loop?: boolean;
}) {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [near, setNear] = useState(eager);
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(true);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const mount = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '800px 0px' });
    // A one-shot clip waits until most of it is on screen so the viewer sees it from the start.
    const vis = new IntersectionObserver(([e]) => setVisible(e.intersectionRatio >= (loop ? 0.05 : 0.6)), {
      threshold: loop ? [0, 0.05] : [0, 0.6],
    });
    mount.observe(el);
    vis.observe(el);
    return () => {
      mount.disconnect();
      vis.disconnect();
    };
  }, [loop]);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (visible && playing && !reduce) {
      if (!v.ended) v.play().catch(() => {});
    } else {
      v.pause();
      if (!loop && !visible) v.currentTime = 0;
    }
  }, [visible, playing, reduce, near, ready, loop]);

  return (
    <div ref={box} className={`bgv ${className}`} aria-hidden="true">
      <div className="bgv-poster" style={{ backgroundImage: `url(${poster})` }} />
      {near && ok && (
        <video
          ref={vid}
          className={`bgv-video${ready ? ' on' : ''}`}
          muted
          loop={loop}
          playsInline
          preload="auto"
          poster={poster}
          onCanPlay={() => setReady(true)}
          onError={() => setOk(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
