
"use client";

import { motion } from "framer-motion";

interface HelloGlowProps {
  glowThickness?: number;
  glowLength?: number;
}

export function HelloGlow({ glowThickness = 25, glowLength = 15 }: HelloGlowProps) {
  const spanHeight = 25; // Fixed height of the span element
  const spanWidth = 5;   // Fixed width of the span element

  const topOffset = (spanHeight - glowThickness) / 2;
  const bottomOffset = (spanHeight - glowThickness) / 2;
  const leftOffset = (spanWidth - glowLength) / 2;
  const rightOffset = (spanWidth - glowLength) / 2;

  return (
    <>
      <motion.div
        className="hello flex flex-wrap justify-center mt-64 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          '--glow-top-offset': `${topOffset}px`,
          '--glow-bottom-offset': `${bottomOffset}px`,
          '--glow-left-offset': `${leftOffset}px`,
          '--glow-right-offset': `${rightOffset}px`,
        } as React.CSSProperties}
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

                .hello span::after,
                .hello span::before {
                  content: "";
                  position: absolute;
                  animation: hello-glow 13s linear infinite;
                  animation-delay: calc(var(--i)*0.1s);
                  transition: all 0.5s ease-in-out;
                  transform: rotate(90deg);
                    
                  top: var(--glow-top-offset);
                  bottom: var(--glow-bottom-offset);
                  left: var(--glow-left-offset);
                  right: var(--glow-right-offset);
                }

                .hello span.start::after,
                .hello span.end::after,
                .hello span.start::before,
                .hello span.end::before {
                  border-radius: var(--radius);
                }

                @keyframes hello-glow {
                  0% {
                    background: #48ff00;
                    box-shadow: 0 0 5px #48ff00, 0 0 15px #48ff00, 0 0 30px #48ff00;
                    filter: hue-rotate(0deg);
                  }

                  100% {
                    background: #48ff00;
                    box-shadow: 0 0 5px #48ff00, 0 0 15px #48ff00, 0 0 30px #48ff00, 0 0 50px #48ff00;
                    filter: hue-rotate(360deg);
                  }
                }
            `}</style>
    </>
  );
}
