'use client';

import { useEffect, useRef, useCallback, type ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { nextSection, prevSection, setMaxIndex } from '@/store/slices/sectionInView';

export const SectionScrollHandler = ({ sectionCount, children }: { sectionCount: number; children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const index = useAppSelector((state) => state.sectionInView.current);
  const maxIndex = useAppSelector((state) => state.sectionInView.maxIndex);
  const lockRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const unlock = useCallback(() => {
    lockRef.current = false;
  }, []);

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (lockRef.current) return;
      lockRef.current = true;
      if (e.deltaY > 0 && index < maxIndex) {
        dispatch(nextSection());
      } else if (e.deltaY < 0 && index > 0) {
        dispatch(prevSection());
      }
      setTimeout(unlock, 900);
    },
    [index, maxIndex, dispatch, unlock],
  );

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (lockRef.current || touchStartY.current === null) return;
      const delta = e.changedTouches[0].clientY - touchStartY.current;
      lockRef.current = true;
      if (delta < -40 && index < maxIndex) {
        dispatch(nextSection());
      } else if (delta > 40 && index > 0) {
        dispatch(prevSection());
      }
      setTimeout(unlock, 900);
      touchStartY.current = null;
    },
    [index, maxIndex, dispatch, unlock],
  );

  useEffect(() => {
    dispatch(setMaxIndex(sectionCount));

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onWheel, onTouchStart, onTouchEnd, sectionCount]);

  return children;
};
