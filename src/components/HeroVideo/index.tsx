'use client'

import React, { useEffect, useRef } from 'react'

/** Bis zu dieser Breite läuft das Handy-Video (Hochformat). */
const MOBIL_MEDIA = '(max-width: 767px)'

/**
 * Stummes Hintergrundvideo im Hero, ersetzt den Bilder-Slider. Mit `mobileSrc`
 * wählt der Browser über `<source media>` beim Laden selbst die passende Datei —
 * es wird also nur ein Video heruntergeladen. `playsInline` ist für iOS nötig,
 * sonst startet das Video nur im Vollbild. Bei „Bewegung reduzieren“ bleibt das
 * Standbild stehen.
 */
export function HeroVideo({
  src,
  mobileSrc,
  poster,
}: {
  src: string
  mobileSrc?: string
  poster?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      return
    }
    // Manche Browser ignorieren autoPlay nach dem Hydrieren — einmal explizit starten.
    video.play().catch(() => {})
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        {mobileSrc && <source src={mobileSrc} type="video/mp4" media={MOBIL_MEDIA} />}
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/80 via-[#151E39]/40 to-transparent" />
    </div>
  )
}
