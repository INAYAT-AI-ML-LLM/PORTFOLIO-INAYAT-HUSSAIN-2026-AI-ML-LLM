"use client";
import { useState, useEffect } from "react";

export function useFrameSequence(frameCount: number, pathPrefix: string, padLength: number = 3) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    let isCancelled = false;
    
    // We only force the user to wait for the first 15 frames for an instant 1-2 second load
    const PRELOAD_THRESHOLD = Math.min(15, frameCount);
    let initialUnblocked = false;

    const loadImages = async () => {
      // Chunk loading to avoid choking the browser queue while maintaining speed
      const chunkSize = 15; 
      for (let i = 0; i < frameCount; i += chunkSize) {
        if (isCancelled) break;
        
        const chunk = Array.from({ length: Math.min(chunkSize, frameCount - i) }, (_, j) => {
          const frameIndex = i + j + 1;
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            const frameNum = String(frameIndex).padStart(padLength, '0');
            img.src = `${pathPrefix}${frameNum}.jpg`;
            
            const handleComplete = () => {
              loadedImages[frameIndex - 1] = img;
              loadedCount++;
              
              if (!initialUnblocked) {
                const currentProgress = Math.round((loadedCount / PRELOAD_THRESHOLD) * 100);
                setProgress(Math.min(currentProgress, 100));
                
                if (loadedCount >= PRELOAD_THRESHOLD) {
                  initialUnblocked = true;
                  setImages([...loadedImages]); 
                }
              }
              resolve();
            };

            img.onload = handleComplete;
            img.onerror = () => {
              // resolve anyway to keep moving, don't crash
              handleComplete(); 
            };
          });
        });
        
        await Promise.all(chunk);
        
        // Background update of the images array as more chunks load silently
        if (initialUnblocked && !isCancelled) {
          setImages([...loadedImages]);
        }
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, [frameCount, pathPrefix, padLength]);

  return { images, progress, isLoaded: progress >= 100 };
}
