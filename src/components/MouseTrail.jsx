import { useEffect, useRef } from "react";

const MAX_PARTICLES = 20;
const MIN_DISTANCE = 5;
const MIN_INTERVAL = 28;

function MouseTrail() {
  const trailRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reducedMotion.matches) return undefined;

    const trail = trailRef.current;
    let lastX = 0;
    let lastY = 0;
    let lastSpawnAt = 0;
    let particleIndex = 0;

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse") return;

      const now = performance.now();
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);

      if (distance < MIN_DISTANCE || now - lastSpawnAt < MIN_INTERVAL) return;

      lastX = event.clientX;
      lastY = event.clientY;
      lastSpawnAt = now;

      const particle = document.createElement("span");
      particle.className = "mouse-trail-particle";
      particle.style.left = `${event.clientX}px`;
      particle.style.top = `${event.clientY}px`;
      particle.classList.add(`mouse-trail-particle-${particleIndex % 3}`);
      particleIndex += 1;
      particle.addEventListener("animationend", () => particle.remove(), {
        once: true,
      });

      trail.appendChild(particle);

      while (trail.childElementCount > MAX_PARTICLES) {
        trail.firstElementChild.remove();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      trail.replaceChildren();
    };
  }, []);

  return <div ref={trailRef} className="mouse-trail" aria-hidden="true" />;
}

export default MouseTrail;
