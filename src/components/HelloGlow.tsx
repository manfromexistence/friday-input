
"use client";

import { motion } from "framer-motion";

export function HelloGlow() {
  return (
    <>
      <motion.div
        className="hello flex flex-wrap justify-center mt-64"
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
                  height: 20px;
                  width: 5px;
                }

                .hello span::after,
                .hello span::before {
                  content: "";
                  position: absolute;
                  animation: hello-glow 13s linear infinite;
                  animation-delay: calc(var(--i)*0.1s);
                  transition: all 0.5s ease-in-out; /* Corrected from 'transform' to 'transition' */
                  transform: rotate(90deg); /* Changed 'rotate' to 'transform: rotate()' */
                  top: 0px; /* Corrected from -0px to 0px */
                  bottom: 0px; /* Corrected from -0px to 0px */
                  left: -105px;
                  right: -105px;
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
                    box-shadow: 0 0 5px #48ff00, 0 0 15px #48ff00, 0 0 30px #48ff00, 0 0 50px #48ff00;
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
