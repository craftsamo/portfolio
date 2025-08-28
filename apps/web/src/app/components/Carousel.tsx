'use client';

import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState, useCallback, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { LiquidGlassButton } from '@/components/Button';

interface CarouselItem {
  title: string;
  description: string;
  src: StaticImageData | string;
  href?: string;
}

interface CarouselProps {
  carouselItems: CarouselItem[];
  autoplay?: boolean;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const Carousel = ({ carouselItems, autoplay = true }: CarouselProps) => {
  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isMd, setIsMd] = useState(false); // >= 640px or not (sm)

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Always reference carouselItems.length directly. activeCarouselItem is convenient for current display.
  const carouselItemsLength = carouselItems.length;
  const activeCarouselItem = carouselItems[activeIndex];

  // Responsive gap calculation & isMd management
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
      setIsMd(window.innerWidth >= 640);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay logic with proper interval cleanup
  useEffect(() => {
    if (autoplay) {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % carouselItems.length);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, carouselItems.length]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // Dependencies intentionally omitted; handlers are stable
  }, []);

  // Navigation handlers for next/prev
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % carouselItems.length);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [carouselItems.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [carouselItems.length]);

  // Compute transform styles for each image (always show 3: left, center, right)
  function getImageStyle(index: number): CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + carouselItemsLength) % carouselItemsLength === index;
    const isRight = (activeIndex + 1) % carouselItemsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: 'auto',
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
      };
    }

    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none',
      transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className={cn('flex flex-col box-border w-[100%] max-w-[56rem] p-[1rem]', 'md:p-[2rem]')}>
      <div
        className={cn('flex flex-col gap-[0.7rem]', 'md:grid md:gap-[5rem]')}
        style={{
          ...(isMd ? { gridTemplateColumns: '1fr 1fr' } : {}),
        }}
      >
        {/* Images */}
        <div
          className={cn('relative min-w-[64px] w-[100%] min-h-[18vh] h-[25vh] perspective-[1000px]', 'md:h-[24rem]')}
          ref={imageContainerRef}
        >
          {carouselItems.map((carouselItem, index) => (
            <Image
              className={cn(
                'absolute w-[100%] h-[100%] object-cover rounded-[0.5rem] shadow[0 2px 6px rgba(0,0,0,0.11)]',
                'md:rounded-[1.5rem] md:shadow[0 10px 30px rgba(0, 0, 0, 0.2)]',
              )}
              key={index}
              width={600}
              height={600}
              src={carouselItem.src}
              alt={carouselItem.title}
              data-index={index}
              style={{
                ...getImageStyle(index),
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className={cn('flex flex-col justify-between h-[calc(62vh - 1.25rem)] p-[0.5rem 0]', 'md:p-0')}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className={cn('mb-[0.15rem] text-[1.1rem] font-bold', 'md:mb-[0.25rem] md:text-[1.5rem]')}>
                {activeCarouselItem.title}
              </h3>
              <motion.p
                className={cn(
                  'mb-[1.25rem] text-[0.98rem] leading-[1.5] text-gray-600',
                  'md:mb-0 md:text-[1.125rem] md:leading-[1.75]',
                )}
              >
                {activeCarouselItem.description.split(' ').map((word, i) => (
                  <motion.span
                    className='inline-block'
                    key={i}
                    initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
                    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut', delay: 0.025 * i }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>
          <div className={cn('flex justify-center gap-[0.5rem]', 'md:justify-start md:gap-[1.5rem]')}>
            <LiquidGlassButton className='w-10 h-10' size='lg' onClick={handlePrev}>
              <ArrowLeft />
            </LiquidGlassButton>
            <LiquidGlassButton className='w-10 h-10' size='lg' onClick={handleNext}>
              <ArrowRight />
            </LiquidGlassButton>
            {activeCarouselItem.href && (
              <Link href={activeCarouselItem.href} target='_blank' rel='noopener noreferrer'>
                <LiquidGlassButton size='lg'>Go to page</LiquidGlassButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
