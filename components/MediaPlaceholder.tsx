"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
};

export function MediaPlaceholder({ src, alt, label = "Add product image", className = "", priority = false }: Props) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`media-frame ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="media-placeholder" role="img" aria-label={`${alt}. Image placeholder.`}>
          <span className="placeholder-knot" aria-hidden="true" />
          <small>{label}</small>
          <strong>{alt}</strong>
          <em>4:5 portrait · WebP</em>
        </div>
      )}
    </div>
  );
}
