import { useState, useEffect } from "react";

export default function useImageDimensions(images) {
  const [widths, setWidths] = useState({});
  const [heights, setHeights] = useState({});

  useEffect(() => {
    if (!images || images.length === 0) return;

    const newWidths = {};
    const newHeights = {};
    let loadedCount = 0;

    images.forEach(({ id, src }) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        newWidths[id] = img.width;
        newHeights[id] = img.height;
        loadedCount++;

        if (loadedCount === images.length) {
          setWidths(newWidths);
          setHeights(newHeights);
        }
      };
    });
  }, [images]);

  return { widths, heights };
}
