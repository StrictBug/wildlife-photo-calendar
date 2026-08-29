"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { EventImage } from "@/data/eventImages";
import { ImageCredit } from "./ImageCredit";

interface ImageLightboxProps {
  image: EventImage;
  alt: string;
  onClose: () => void;
}

export function ImageLightbox({ image, alt, onClose }: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    };
  }, [onKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="image-lightbox-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="image-lightbox-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo: ${alt}`}
      >
        <button
          type="button"
          className="image-lightbox-close"
          onClick={onClose}
          aria-label="Close photo"
        >
          ×
        </button>
        <div className="image-lightbox-image-wrap">
          <Image
            src={image.imagePath}
            alt={alt}
            fill
            sizes="90vw"
            className="image-lightbox-image"
            priority
          />
        </div>
        <ImageCredit image={image} className="image-lightbox-credit" />
      </div>
    </div>,
    document.body,
  );
}
