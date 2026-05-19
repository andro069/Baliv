'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

const defaultSlides = [
  { src: '/terrasse-meer.webp', alt: 'Terrasse mit Meerblick' },
  { src: '/interieur-wohnen-01.webp', alt: 'Wohnbereich mit Meerblick' },
  { src: '/interieur-wohnen-02.webp', alt: 'Modernes Wohninterieur' },
]

type Slide = { src: string; alt: string }

export function HeroSlider({ slides }: { slides?: Slide[] }) {
  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 60 }, [
    Autoplay({ delay: 7000, stopOnInteraction: false }),
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
        {activeSlides.map((slide, i) => (
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
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2.5 items-center">
        {activeSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`rounded-full transition-all duration-400 ${
              i === current
                ? 'w-2.5 h-2.5 bg-[#B69252]'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
