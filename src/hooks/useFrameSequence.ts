"use client";
import { useState, useEffect } from "react";

const PRELOAD_COUNT = 10; // Show UI after first 10 frames (~0.5s on good connection)

export function useFrameSequence(
  frameCount: number,
  pathPrefix: string,
  padLength: number = 3
) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadedImages: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    let cancelled = false;
    let loadedCount = 0;
    let initialUnlocked = false;

    const updateImages = () => {
      setImages(loadedImages.filter(Boolean) as HTMLImageElement[]);
    };

    const onFrameLoad = (img: HTMLImageElement, idx: number) => {
      if (cancelled) return;
      loadedImages[idx] = img;
      loadedCount++;

      if (!initialUnlocked) {
        const pct = Math.round((loadedCount / PRELOAD_COUNT) * 100);
        setProgress(Math.min(pct, 100));

        if (loadedCount >= PRELOAD_COUNT) {
          initialUnlocked = true;
          setIsLoaded(true);
          updateImages();
        }
      }
    };

    // Load all frames without blocking the main thread
    // Use a queue with max 6 concurrent requests (matches browser HTTP/2 limit)
    const MAX_CONCURRENT = 6;
    let activeCount = 0;
    let nextIndex = 0;

    const loadNext = () => {
      while (activeCount < MAX_CONCURRENT && nextIndex < frameCount) {
        const i = nextIndex++;
        activeCount++;

        const img = new window.Image();
        const frameNum = String(i + 1).padStart(padLength, "0");
        img.decoding = "async"; // Don't block main thread during decode
        img.src = `${pathPrefix}${frameNum}.jpg`;

        const done = () => {
          activeCount--;
          onFrameLoad(img, i);
          // Update image array every 15 frames after initial unlock
          if (initialUnlocked && i % 15 === 0 && !cancelled) {
            updateImages();
          }
          // Load next batch
          if (!cancelled) loadNext();
        };

        img.onload = done;
        img.onerror = done; // Skip bad frames gracefully
      }
    };

    // Start loading
    loadNext();

    return () => {
      cancelled = true;
    };
  }, [frameCount, pathPrefix, padLength]);

  return { images, progress, isLoaded };
}
