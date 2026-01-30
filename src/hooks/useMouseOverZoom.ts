import type React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";


export function useMouseOverZoom(
  source: React.RefObject<HTMLImageElement | null>,
  target: React.RefObject<HTMLCanvasElement | null>,
  cursor: React.RefObject<HTMLElement | null>,
  radius = 25
) {

  const { x, y, isActive: isOverContainer } = useMouse(source);

  // Calculate actual rendered image bounds (for object-contain)
  const imageBounds = useMemo(() => {
    if (!source.current) return null;

    const img = source.current;
    const containerWidth = img.width;
    const containerHeight = img.height;
    const imageAspect = img.naturalWidth / img.naturalHeight;
    const containerAspect = containerWidth / containerHeight;

    let renderedWidth, renderedHeight, offsetX, offsetY;

    if (imageAspect > containerAspect) {
      // Image is wider - will have top/bottom padding
      renderedWidth = containerWidth;
      renderedHeight = containerWidth / imageAspect;
      offsetX = 0;
      offsetY = (containerHeight - renderedHeight) / 2;
    } else {
      // Image is taller - will have left/right padding
      renderedHeight = containerHeight;
      renderedWidth = containerHeight * imageAspect;
      offsetX = (containerWidth - renderedWidth) / 2 ;
      offsetY = 0;
    }

    return {
      offsetX,
      offsetY,
      renderedWidth,
      renderedHeight,
    };
  }, [source]);

  // Restrict zoom to only when mouse is over the actual rendered image
  const isActive = useMemo(() => {
    if (!isOverContainer || !imageBounds) return false;

    const isWithinX = x >= imageBounds.offsetX && x <= imageBounds.offsetX + imageBounds.renderedWidth;
    const isWithinY = y >= imageBounds.offsetY && y <= imageBounds.offsetY + imageBounds.renderedHeight;

    return isWithinX && isWithinY;
  }, [isOverContainer, x, y, imageBounds]);

  // Compute the part of the image to zoom based on mouse position
  const zoomBounds = useMemo(() => {
    if (!imageBounds) {
      return {
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        imageX: x - radius,
        imageY: y - radius,
      };
    }

    // Adjust mouse coordinates to be relative to the actual rendered image
    const imageX = x - imageBounds.offsetX;
    const imageY = y - imageBounds.offsetY;

    return {
      left: x - radius,
      top: y - radius,
      width: radius * 2,
      height: radius * 2,
      imageX: imageX - radius,
      imageY: imageY - radius,
    };
  }, [x, y, imageBounds, radius]);
 
  // move the cursor to the mouse position
  const cursorStyle = useMemo(() => {
    const { left, top, width, height } = zoomBounds;
    return {
      left: `${String(left)}px`,
      top: `${String(top)}px`,
      width: `${String(width)}px`,
      height: `${String(height)}px`,
    };
  }, [zoomBounds]);

  const assignCursorStyle = useCallback(() => {
    if (cursor.current) {
      Object.assign(cursor.current.style, cursorStyle);
    }
  }, [cursor,cursor.current, cursorStyle]);

  useEffect(() => {
     assignCursorStyle()
  }, [assignCursorStyle]);

  // draw the zoomed image on the canvas
  useEffect(() => {
    if (source.current && target.current && imageBounds) {
      const ctx = target.current.getContext("2d");
      if (ctx) {
        if (isActive) {
          const { imageX, imageY, width, height } = zoomBounds;
          const { renderedWidth } = imageBounds;

          // Calculate the ratio between natural image size and rendered size
          const imageRatio = source.current.naturalWidth / renderedWidth;

          ctx.drawImage(
            source.current,
            imageX * imageRatio,
            imageY * imageRatio,
            width * imageRatio,
            height * imageRatio,
            0,
            0,
            target.current.width,
            target.current.height
          );
        }
        else {
          // clear canvas
          ctx.clearRect(0, 0, target.current.width, target.current.height);
        }
      }
    }
  }, [zoomBounds, isActive, imageBounds, source, target])

  return isActive;
}
function useMouse(ref: React.RefObject<HTMLElement | null>) {
  const [mouse, setMouse] = useState<{ x: number; y: number, isActive: boolean }>({ x: 0, y: 0, isActive: false });
  useEffect(() => {
    if (ref.current) {
      const handleMouseMove = (e: MouseEvent) => {
        // get mouse position relative to ref
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          setMouse({
            x: (e.clientX - rect.left),
            y: (e.clientY - rect.top),
            isActive: true,
          });
        }
      };
      const handleMouseOut = () => {
        setMouse({
          x: 0,
          y: 0,
          isActive: false,
        });
      }
      ref.current.addEventListener("mousemove", handleMouseMove);
      ref.current.addEventListener("mouseout", handleMouseOut);
      const element = ref.current;
      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseout", handleMouseOut);
      };
    }
  });
  return mouse;
} 