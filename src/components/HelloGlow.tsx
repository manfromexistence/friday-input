
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming cn is available via this path

interface HelloGlowProps {
  className?: string; // Allow className to be passed for styling the container
}

export function HelloGlow({ className }: HelloGlowProps) {
  return (
    <>
      <motion.div
        className={cn(
          "hello flex flex-wrap justify-center transition-all", // Base classes
          className // External className for sizing, background, etc.
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className={i === 0 ? "start" : i === 19 ? "end" : ""}
            style={{ "--i": i + 1 } as React.CSSProperties}
          />
        ))}
      </motion.div>
      <style jsx global>{`
                .hello {
                  position: relative;
                  display: flex;
                  flex-wrap: wrap;
                  gap: 15px;
                  overflow: hidden; /* To contain glows if they slightly exceed spans due to box-shadow */
                }

                .hello span {
                  position: relative;
                  flex-grow: 1; /* Allow spans to grow */
                  flex-basis: 20px; /* Initial width basis before growing */
                  min-height: 25px; /* Minimum height for each span/glow segment */
                  display: flex; /* Helps if span content needs alignment, though not strictly needed for current ::after */
                }

                .hello span::after { /* Using only ::after */
                  content: "";
                  position: absolute;
                  top: 0; /* Match parent span's top */
                  bottom: 0; /* Match parent span's bottom */
                  left: 0; /* Match parent span's left */
                  right: 0; /* Match parent span's right */
                  animation: hello-glow 13s linear infinite;
                  animation-delay: calc(var(--i)*0.1s);
                  transition: all 0.5s ease-in-out;
                  transform: rotate(90deg);
                  /* Background and box-shadow are applied in the animation */
                }

                .hello span.start::after,
                .hello span.end::after {
                  border-radius: var(--radius); /* Relies on --radius from globals.css */
                }

                @keyframes hello-glow {
                  0% {
                    background: #48ff00;
                    box-shadow: 0 0 5px #48ff00, 0 0 15px #48ff00, 0 0 30px #48ff00;
                    filter: hue-rotate(0deg);
                  }

                  100% {
                    background: #48ff00;
                    box-shadow: 0 0 5px #48ff00, 0 0 15px #48ff00, 0 0 30px #48ff00;
                    filter: hue-rotate(360deg);
                  }
                }
            `}</style>
    </>
  );
}

// Included for completeness if not globally available via @/lib/utils for this specific component context
// If you have a global `cn` utility (e.g., from shadcn/ui via @/lib/utils), you might not need this local one.
// function cn(...classes: (string | undefined | null | false)[]) {
//   return classes.filter(Boolean).join(' ');
// }
