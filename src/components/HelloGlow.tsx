
"use client";

import { motion } from "framer-motion";

interface HelloGlowProps {
  className?: string; // Allow className to be passed for styling the container
}

export function HelloGlow({ className }: HelloGlowProps) {
  return (
    <>
      <motion.div
        className={cn(
          "hello flex flex-wrap justify-center transition-all",
          className // Apply external className here
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
                  gap: 15px;
                }

                .hello span {
                  position: relative;
                  height: 25px; /* Fixed height of the span container */
                  width: 5px;   /* Fixed width of the span container */
                }

                .hello span::after {
                  content: "";
                  position: absolute;
                  animation: hello-glow 13s linear infinite;
                  animation-delay: calc(var(--i)*0.1s);
                  transition: all 0.5s ease-in-out;
                  transform: rotate(90deg);
                  background: #48ff00; /* Moved from keyframes for initial state */
                  box-shadow: 0 0 5px #48ff00, 0 0 15px #48ff00, 0 0 30px #48ff00; /* Adjusted for consistent glow */

                  /* Make ::after exact size of parent span */
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
                }

                .hello span.start::after,
                .hello span.end::after {
                  border-radius: var(--radius);
                }

                @keyframes hello-glow {
                  0% {
                    filter: hue-rotate(0deg);
                    box-shadow: 0 0 5px #48ff00, 0 0 15px #48ff00, 0 0 30px #48ff00, 0 0 50px #48ff00;
                  }

                  100% {
                    filter: hue-rotate(360deg);
                    box-shadow: 0 0 5px #48ff00, 0 0 15px #48ff00, 0 0 30px #48ff00, 0 0 50px #48ff00;
                  }
                }
            `}</style>
    </>
  );
}

// Helper function cn for class names, if not already globally available in your project setup for this component
// If you have a global cn utility (e.g., from shadcn/ui), you can remove this local one.
// For demonstration, I'll include a basic version.
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
