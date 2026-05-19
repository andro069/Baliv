'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

const slides = [
  { src: '/stari-bar-altstadt.webp', alt: 'Stari Bar — die historische Festungsstadt' },
  { src: '/view-hafen.webp', alt: 'Blick auf Hafen und Adria' },
  { src: '/view-olivenhain.webp', alt: 'Olivenhaine von Polje' },
  { src: '/rumija-panorama.webp', alt: 'Rumija-Massiv und Bergblick' },
  { src: '/terrasse-meer.webp', alt: 'Terrasse mit Meerblick' },
]

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])
  const [current, setCurrent] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrent(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, i) => (
          <div key={i} className="relative flex-[0_0_100%] h-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#151E39]/80 via-[#151E39]/40 to-transparent" />
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 right-8 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-8 h-[2px] transition-all duration-300 ${i === current ? 'bg-[#B69252]' : 'bg-white/40'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
