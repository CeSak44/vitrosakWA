import React, { useState } from "react";

export default function ProgressiveImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  overlayClassName = "",
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 scale-110 bg-gradient-to-br from-sky-200/30 via-blue-400/20 to-slate-950/70 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        } ${overlayClassName}`}
      />

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-1000 ${
          loaded ? "scale-100 blur-0" : "scale-105 blur-2xl"
        } ${imgClassName}`}
      />
    </div>
  );
}
