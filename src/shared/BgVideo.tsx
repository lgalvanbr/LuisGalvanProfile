// Full-bleed background video, same pattern as the SinergIA site:
// poster paints instantly, the <video> mounts only when near the viewport,
// fades in once it can play, pauses off-screen, and falls back to the poster on error.
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import './bgvideo.css';

export function BgVideo({ src, poster, className = '', eager = false, playing = true }: { src: string; poster: string; className?: string; eager?: boolean; playing?: boolean }) {
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
    const vis = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    mount.observe(el);
    vis.observe(el);
    return () => {
      mount.disconnect();
      vis.disconnect();
    };
  }, []);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (visible && playing && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [visible, playing, reduce, near, ready]);

  return (
    <div ref={box} className={`bgv ${className}`} aria-hidden="true">
      <div className="bgv-poster" style={{ backgroundImage: `url(${poster})` }} />
      {near && ok && (
        <video
          ref={vid}
          className={`bgv-video${ready ? ' on' : ''}`}
          muted
          loop
          playsInline
          preload="metadata"
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
