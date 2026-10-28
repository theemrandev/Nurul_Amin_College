'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper core and module styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface SlideItem {
  id: string;
  image: string;
  altBn: string;
  altEn: string;
  priority?: boolean;
}

const SLIDES: SlideItem[] = [
  {
    id: 'slide-1',
    image: '/images/clg1.jpeg',
    altBn: 'নুরুল আমিন ডিগ্রি কলেজ প্রধান একাডেমিক ভবন',
    altEn: 'Nurul Amin Degree College Main Academic Building',
    priority: true,
  },
  {
    id: 'slide-2',
    image: '/images/slider/slide-2-library.jpg',
    altBn: 'ডিগ্রি সমাবর্তন ও শিক্ষার্থীদের আনন্দঘন মুহূর্ত',
    altEn: 'Degree Graduation & Academic Celebration',
  },
  {
    id: 'slide-3',
    image: '/images/slider/slide-3-classroom.jpg',
    altBn: 'উচ্চশিক্ষা পাঠদান ও শ্রেণিকক্ষে শিক্ষা কার্যক্রম',
    altEn: 'Higher Education Instruction & Classroom Study',
  },
];

export function HeroSlider() {
  const { lang } = useLanguage();
  const isBn = lang === 'bn';

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950 border-b border-[var(--border-subtle)]"
      aria-label={isBn ? 'কলেজ হিরো ব্যানার' : 'College Hero Banner'}
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: '.hero-nav-btn-prev',
          nextEl: '.hero-nav-btn-next',
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        grabCursor={true}
        className="w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[540px] xl:h-[600px] relative group"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            <div className="relative w-full h-full bg-slate-950">
              <Image
                src={slide.image}
                alt={isBn ? slide.altBn : slide.altEn}
                fill
                priority={slide.priority}
                sizes="100vw"
                className="object-cover object-center"
              />
              {/* Subtle elegant gradient overlay for text readability without obscuring subjects */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/15"
                aria-hidden="true"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* College Name Overlay — Exactly ONE name based on active language */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center px-4 sm:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight">
              {isBn ? 'নুরুল আমিন ডিগ্রি কলেজ' : 'Nurul Amin Degree College'}
            </h1>
          </div>
        </div>

        {/* Custom Academic Left Navigation Arrow Button */}
        <button
          type="button"
          className="hero-nav-btn-prev absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full bg-[#0a2240]/80 hover:bg-[#051529] text-white hover:text-amber-400 border border-white/20 hover:border-amber-400/50 backdrop-blur-md shadow-md transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          aria-label={isBn ? 'পূর্ববর্তী স্লাইড' : 'Previous slide'}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
        </button>

        {/* Custom Academic Right Navigation Arrow Button */}
        <button
          type="button"
          className="hero-nav-btn-next absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 min-w-[44px] min-h-[44px] rounded-full bg-[#0a2240]/80 hover:bg-[#051529] text-white hover:text-amber-400 border border-white/20 hover:border-amber-400/50 backdrop-blur-md shadow-md transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
          aria-label={isBn ? 'পরবর্তী স্লাইড' : 'Next slide'}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </Swiper>
    </section>
  );
}
