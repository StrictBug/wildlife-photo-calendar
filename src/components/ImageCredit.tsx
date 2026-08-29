import type { EventImage } from "@/data/eventImages";

interface ImageCreditProps {
  image: EventImage;
  className?: string;
}

export function ImageCredit({ image, className = "" }: ImageCreditProps) {
  return (
    <p className={`image-credit ${className}`.trim()}>
      Photo:{" "}
      <a
        href={image.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="image-credit-link"
      >
        {image.credit}
      </a>
      {" · "}
      {image.license}
    </p>
  );
}
