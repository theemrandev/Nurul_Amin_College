'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageBanner } from '@/components/common/PageBanner';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Card } from '@/components/ui/Card';
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Bus,
  Heart,
  ZoomIn,
} from 'lucide-react';

interface GalleryPhoto {
  id: string;
  src: string;
  titleBn: string;
  titleEn: string;
  category: 'campus' | 'sports' | 'events' | 'nature';
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'clg1-jpg',
    src: '/images/clg1.jpg',
    titleBn: 'কলেজ মূল একাডেমিক ভবন',
    titleEn: 'Main Academic Building',
    category: 'campus',
  },
  {
    id: 'clg1-jpeg',
    src: '/images/clg1.jpeg',
    titleBn: 'ক্যাম্পাস ভবন ও প্রাঙ্গণ',
    titleEn: 'Campus Building & Front Courtyard',
    category: 'campus',
  },
  {
    id: 'road',
    src: '/images/road.jpg',
    titleBn: 'ক্যাম্পাস প্রবেশ সড়ক',
    titleEn: 'Campus Approach Road',
    category: 'campus',
  },
  {
    id: 'math-1',
    src: '/images/math (1).jpg',
    titleBn: 'সবুজ খেলার মাঠ',
    titleEn: 'Campus Sports Ground',
    category: 'sports',
  },
  {
    id: 'math-2',
    src: '/images/math (2).jpg',
    titleBn: 'খেলার মাঠের বিস্তৃত প্রান্তর',
    titleEn: 'Open Playfield Grounds',
    category: 'sports',
  },
  {
    id: 'math-3',
    src: '/images/math (3).jpg',
    titleBn: 'ক্যাম্পাস মাঠ ও প্রকৃতি',
    titleEn: 'Campus Field & Surrounding Nature',
    category: 'sports',
  },
  {
    id: 'math-4',
    src: '/images/math (4).jpg',
    titleBn: 'মাঠ সংলগ্ন ছায়াঘেরা পরিবেশ',
    titleEn: 'Shaded Field Environment',
    category: 'sports',
  },
  {
    id: 'football-team',
    src: '/images/1000106354.jpg',
    titleBn: 'কলেজ ফুটবল দল ও শিক্ষার্থী একতা',
    titleEn: 'College Football Squad & Students',
    category: 'sports',
  },
  {
    id: 'match-spectators',
    src: '/images/1000106346.jpg',
    titleBn: 'খেলা উপভোগের আনন্দময় মুহূর্ত',
    titleEn: 'Match Day Spectators & Joy',
    category: 'sports',
  },
  {
    id: 'faculty-sports',
    src: '/images/sirs.jpg',
    titleBn: 'শিক্ষার্থীদের খেলায় শিক্ষকদের উপস্থিতি',
    titleEn: 'Faculty Mentors at the Sports Ground',
    category: 'sports',
  },
  {
    id: 'minar',
    src: '/images/minar.jpg',
    titleBn: 'মর্যাদাপূর্ণ ক্যাম্পাস শহীদ মিনার',
    titleEn: 'Campus Shaheed Minar',
    category: 'nature',
  },
  {
    id: 'tree-1',
    src: '/images/tree.jpg',
    titleBn: 'ক্যাম্পাসের ছায়াঘেরা বৃক্ষসারী',
    titleEn: 'Campus Tree Canopy',
    category: 'nature',
  },
  {
    id: 'tree-2',
    src: '/images/tree1.jpg',
    titleBn: 'সবুজ পরিবেশ ও প্রাকৃতিক আবহ',
    titleEn: 'Lush Green Foliage & Serenity',
    category: 'nature',
  },
  {
    id: 'rain-campus',
    src: '/images/bisty.jpg',
    titleBn: 'বৃষ্টিভেজা মনোরম ক্যাম্পাস দৃশ্য',
    titleEn: 'Monsoon Rain Over the Campus',
    category: 'nature',
  },
  {
    id: 'tour',
    src: '/images/tour.jpg',
    titleBn: 'বার্ষিক শিক্ষামূলক ভ্রমণ ও সফর',
    titleEn: 'Annual Educational Study Tour',
    category: 'events',
  },
  {
    id: 'humanitarian-help',
    src: '/images/help.jpg',
    titleBn: 'শিক্ষার্থীদের সমাজসেবা ও ত্রাণ তহবিল',
    titleEn: 'Student Relief & Social Welfare Initiative',
    category: 'events',
  },
  {
    id: 'students-camaraderie',
    src: '/images/STUDENT.jpg',
    titleBn: 'শিক্ষার্থীদের ক্যাম্পাসের বন্ধুত্ব ও উচ্ছ্বাস',
    titleEn: 'Student Life, Friendship & Camaraderie',
    category: 'events',
  },
];

type CategoryFilter = 'all' | 'campus' | 'sports' | 'events' | 'nature';

export default function GalleryClient() {
  const { lang, t } = useLanguage();
  const isBn = lang === 'bn';

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  // Keyboard navigation & modal escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;

      if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhotoIndex]);

  const activePhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <PageShell>
      {/* Banner */}
      <PageBanner
        title={isBn ? 'ক্যাম্পাসের জীবন্ত স্মৃতি ও ফটোগ্যালারি' : 'Campus Photo Gallery & Memories'}
        subtitle={
          isBn
            ? 'শিক্ষার্থীদের ধারণকৃত আসল আলোকচিত্রের মাধ্যমে আমাদের প্রিয় বিদ্যাপীঠের ক্যাম্পাস পরিবেশ ও স্মৃতি।'
            : 'Authentic photographs capturing campus life, academic buildings, athletic pursuits, and memories.'
        }
        breadcrumbs={[
          {
            label: isBn ? 'ফটোগ্যালারি' : 'Photo Gallery',
          },
        ]}
      />

      {/* Filter Bar */}
      <section className="bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSelectedPhotoIndex(null);
            }}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--color-accent)]'
            }`}
          >
            {isBn ? 'সকল ছবি (All Photos)' : 'All Photos'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('campus');
              setSelectedPhotoIndex(null);
            }}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
              activeCategory === 'campus'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--color-accent)]'
            }`}
          >
            {isBn ? 'ক্যাম্পাস ও ভবন (Campus)' : 'Campus & Buildings'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('sports');
              setSelectedPhotoIndex(null);
            }}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
              activeCategory === 'sports'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--color-accent)]'
            }`}
          >
            {isBn ? 'খেলার মাঠ ও ক্রীড়া (Sports)' : 'Sports & Field'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('events');
              setSelectedPhotoIndex(null);
            }}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
              activeCategory === 'events'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--color-accent)]'
            }`}
          >
            {isBn ? 'শিক্ষা সফর ও কার্যক্রম (Events)' : 'Events & Tour'}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('nature');
              setSelectedPhotoIndex(null);
            }}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors ${
              activeCategory === 'nature'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--color-accent)]'
            }`}
          >
            {isBn ? 'প্রকৃতি ও শহীদ মিনার (Nature)' : 'Nature & Heritage'}
          </button>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-[var(--border-subtle)] shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={photo.src}
                  alt={isBn ? photo.titleBn : photo.titleEn}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Overlay with Zoom Icon and Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5">
                <span className="text-white text-xs sm:text-sm font-semibold leading-tight drop-shadow-sm">
                  {isBn ? photo.titleBn : photo.titleEn}
                </span>
                <span className="text-[10px] text-amber-300 uppercase tracking-wider font-mono mt-0.5">
                  {photo.category}
                </span>
              </div>

              <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors focus:outline-none"
              aria-label="Close photo view"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Previous Arrow */}
            <button
              type="button"
              onClick={() =>
                setSelectedPhotoIndex(
                  (prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length
                )
              }
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={() =>
                setSelectedPhotoIndex((prev) => (prev! + 1) % filteredPhotos.length)
              }
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image Container */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] rounded-lg overflow-hidden bg-black/40">
              <Image
                src={activePhoto.src}
                alt={isBn ? activePhoto.titleBn : activePhoto.titleEn}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Caption */}
            <div className="w-full text-center mt-3 text-white">
              <h3 className="text-base sm:text-lg font-bold">
                {isBn ? activePhoto.titleBn : activePhoto.titleEn}
              </h3>
              <p className="text-xs text-amber-300 font-mono mt-0.5">
                {selectedPhotoIndex! + 1} / {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Feature Story Cross-Links */}
      <section className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-1 text-center max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
              {isBn ? 'ক্যাম্পাস কার্যক্রম ও বিস্তারিত বিবরণী' : 'Campus Feature Stories'}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {isBn ? 'ফটোগ্যালারির সাথে সম্পর্কিত সহশিক্ষা ও ভ্রমণের বিস্তারিত কাহিনী পড়ুন।' : 'Explore full accounts of student tours, sports, and relief work.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'ক্রীড়া ও ফুটবল উৎসব' : 'Sports & Athletics'}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'ফুটবল নুরুল আমিন ডিগ্রি কলেজের অন্যতম প্রাণবন্ত ক্রীড়া উৎসব। খেলার মাঠে শিক্ষক-শিক্ষার্থীদের স্বতঃস্ফূর্ত অংশগ্রহণের বিবরণী।'
                  : 'Football is a cherished tradition at our college. Read about our matches and teacher-student participation.'}
              </p>
              <Link
                href="/sports"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] dark:text-amber-400 hover:underline pt-1"
              >
                <span>{isBn ? 'ক্রীড়া বিবরণী পড়ুন' : 'Read Sports Story'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <Bus className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'বার্ষিক শিক্ষা সফর' : 'Annual Study Tour'}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'শিক্ষার্থীদের বাস্তব জ্ঞান ও পারস্পরিক সৌহার্দ্য বৃদ্ধির জন্য প্রতি বছর আয়োজিত শিক্ষা সফরের বিস্তারিত স্মৃতি ও অনুভূতি।'
                  : 'Explore memories and student insights from the annual educational study excursions.'}
              </p>
              <Link
                href="/tour"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] dark:text-amber-400 hover:underline pt-1"
              >
                <span>{isBn ? 'শিক্ষা সফরের গল্প' : 'Read Tour Memories'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>

            <Card className="p-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-light)]">
                  {isBn ? 'মানবসেবা ও ত্রাণ তহবিল' : 'Humanitarian Relief'}
                </h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {isBn
                  ? 'বন্যাদুর্গত ও অসহায় মানুষের পাশে দাঁড়াতে কলেজের শিক্ষক ও শিক্ষার্থীদের যৌথ সামাজিক ও মানবিক তহবিল সংগ্রহের বিস্তারিত প্রতিবেদন।'
                  : 'Student-led welfare campaigns and community disaster relief fund collection details.'}
              </p>
              <Link
                href="/humanitarian"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] dark:text-amber-400 hover:underline pt-1"
              >
                <span>{isBn ? 'মানবসেবা কার্যক্রম' : 'Read Relief Account'}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
