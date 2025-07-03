"use client";
import {
  PointerEvent,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./Carousel.module.css";

type ResponsiveSetting = {
  breakpoint: number;
  visibleCount: number;
  itemToScroll: number;
};

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  visibleCount?: number;
  itemToScroll?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  responsiveConfig?: ResponsiveSetting[];
};

export default function Carousel<T>({
  items,
  renderItem,
  visibleCount = 1,
  itemToScroll = 1,
  autoPlay = false,
  autoPlayInterval = 3000,
  responsiveConfig = [],
}: CarouselProps<T>) {
  const itemRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [itemWidth, setItemWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const [currentVisibleCount, setCurrentVisibleCount] = useState(visibleCount);
  const [currentItemToScroll, setCurrentItemToScroll] = useState(itemToScroll);

  const isDragging = useRef(false);
  const startX = useRef(0);

  const totalSlides =
    Math.ceil((items.length - currentVisibleCount) / currentItemToScroll) + 1;

  const dragThreshold = itemWidth * 0.3;

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const matched = responsiveConfig
        .sort((a, b) => b.breakpoint - a.breakpoint)
        .find((config) => width >= config.breakpoint);
      if (matched) {
        setCurrentVisibleCount(matched.visibleCount);
        setCurrentItemToScroll(matched.itemToScroll);
      } else {
        setCurrentVisibleCount(visibleCount);
        setCurrentItemToScroll(itemToScroll);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [responsiveConfig, visibleCount, itemToScroll]);

  useLayoutEffect(() => {
    if (!itemRef.current) return;

    const observer = new ResizeObserver(() => {
      setItemWidth(itemRef.current!.offsetWidth);
    });

    observer.observe(itemRef.current);

    return () => observer.disconnect();
  }, [currentVisibleCount, items]);

  // Set item width
  useLayoutEffect(() => {
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth);
    }
  }, [items, currentVisibleCount]);

  // Update translateX when currentIndex changes
  useLayoutEffect(() => {
    setTranslateX(-currentIndex * itemWidth * currentItemToScroll);
  }, [currentIndex, itemWidth, currentItemToScroll]);

  // AutoPlay
  useLayoutEffect(() => {
    if (!autoPlay || items.length <= currentVisibleCount) return;

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    autoPlay,
    autoPlayInterval,
    items.length,
    currentVisibleCount,
    totalSlides,
  ]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 < totalSlides ? prev + 1 : prev));
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const lengthX = e.clientX - startX.current;
    setDragOffset(lengthX);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const lengthX = e.clientX - startX.current;

    if (Math.abs(lengthX) > dragThreshold) {
      lengthX > 0 ? handlePrev() : handleNext();
    }

    setDragOffset(0);
    containerRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={styles.carouselWrapper}>
      <button
        className={styles.prevButton}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        &larr;
      </button>

      <div
        className={styles.itemsList}
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          transform: `translateX(${translateX + dragOffset}px)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            ref={index === 0 ? itemRef : null}
            className={styles.item}
            style={{ flex: `0 0 ${100 / currentVisibleCount}%` }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      <button
        className={styles.nextButton}
        onClick={handleNext}
        disabled={currentIndex >= totalSlides - 1}
      >
        &rarr;
      </button>
      {totalSlides > 1 && (
        <div className={styles.dotsContainer}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? styles.activeDot : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
