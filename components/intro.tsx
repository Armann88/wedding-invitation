
"use client";

import { useEffect, useState } from "react";

export default function Intro() {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`
        fixed
        inset-0
        z-50
        overflow-hidden
        bg-black
        transition-opacity
        duration-1000
        ease-in-out
        ${isFading ? "opacity-0" : "opacity-100"}
      `}
    >
      <img
        src="/images/intro.jpg"
        alt="Wedding"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />
    </div>
  );
}