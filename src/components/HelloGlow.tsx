
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming cn is available via this path

interface HelloGlowProps {
  className?: string; // Allow className to be passed for styling the container
  spanCount?: number; // Allow customizing the number of spans
}

export function HelloGlow({ className, spanCount = 25 }: HelloGlowProps) {
  return (
    <>
      <motion.div
        className={cn(
          "hello transition-all", // Base classes
          className // External className for sizing, background, etc.
        )}
        style={{ '--span-count': spanCount } as React.CSSProperties}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {Array.from({ length: spanCount }).map((_, i) => (
          <span
            key={i}
            className={i === 0 ? "start" : i === (spanCount - 1) ? "end" : ""}
            style={{ "--i": i + 1 } as React.CSSProperties}
          />
        ))}
      </motion.div>
      <style jsx global>{`
                .hello {
                  position: relative;
                  display: grid; /* Use grid */
                  grid-template-columns: repeat(var(--span-count, 25), 1fr); /* Distribute spans into columns */
                  min-height: 25px; /* Default height for the glow area */
                  overflow: hidden; /* Clip glows if they exceed span bounds due to box-shadow */
                }

                .hello span {
                  position: relative;
                  /* Spans will take full height of their grid row and 1/Nth of container width */
                }

                .hello span::after { /* Using only ::after */
                  content: "";
                  position: absolute;
                  animation: hello-glow 13s linear infinite;
                  animation-delay: calc(var(--i)*0.1s);
                  transform: rotate(90deg);
                  top: 0; /* Match parent span's top */
                  bottom: 0; /* Match parent span's bottom */
                  left: -2px; /* Make slightly wider to overlap more */
                  right: -2px; /* Make slightly wider to overlap more */
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

