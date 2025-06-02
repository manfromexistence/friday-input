
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FRIDAY_ANIMATION_Z_INDEX = 9990;

export function Friday() {
  const [isActive, setIsActive] = useState(false);
  const [animationStage, setAnimationStage] = useState(0); // 0: inactive, 1: bottom, 2: right, 3: left, 4: top, 5: all active

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isActiveRef = useRef(isActive); // Ref to track isActive for timeouts

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  useEffect(() => {
    if (isActive) {
      if (animationStage === 0) { // Start sequence only if not already started
        setAnimationStage(1); // Start bottom animation

        timeoutsRef.current.push(setTimeout(() => {
          if (!isActiveRef.current) return;
          setAnimationStage(2); // Start right animation
        }, 700)); // 0.7s delay

        timeoutsRef.current.push(setTimeout(() => {
          if (!isActiveRef.current) return;
          setAnimationStage(3); // Start left animation
        }, 1400)); // 0.7s after right

        timeoutsRef.current.push(setTimeout(() => {
          if (!isActiveRef.current) return;
          setAnimationStage(4); // Start top animation, glassmorphism fades
        }, 2100)); // 0.7s after left

        timeoutsRef.current.push(setTimeout(() => {
          if (!isActiveRef.current) return;
          setAnimationStage(5); // All active and stable
        }, 3000)); // Glassmorphism fully faded
      }
    } else {
      clearAllTimeouts();
      setAnimationStage(0);
    }

    return () => {
      clearAllTimeouts();
    };
  }, [isActive, clearAllTimeouts, animationStage]); // Rerun if isActive changes or animationStage reset to 0

  const toggleFriday = () => {
    setIsActive((prev) => !prev);
    if (isActive) { // If was active, now deactivating
      setAnimationStage(0); // Reset stage immediately
    }
  };

  const borderBaseClasses = "friday-border fixed opacity-0 transition-opacity duration-500 ease-in-out";
  const borderActiveClasses = "opacity-100";
  
  // Define common variables for CSS-in-JS
  const glowBlur = '10px';
  const borderRadius = '0.375rem'; // Corresponds to rounded-md in Tailwind

  return (
    <>
      <div className="fixed bottom-4 left-4 z-[10000]">
        <Button onClick={toggleFriday} variant="outline" className="shadow-lg">
          {isActive ? "Deactivate Friday" : "Activate Friday"}
        </Button>
      </div>

      {isActive && (
        <>
          {/* Bottom Border */}
          <div
            className={cn(
              borderBaseClasses,
              "h-1.5 bottom-0 left-0 right-0",
              animationStage >= 1 && borderActiveClasses
            )}
          ></div>
          {/* Right Border */}
          <div
            className={cn(
              borderBaseClasses,
              "w-1.5 top-0 bottom-0 right-0",
              animationStage >= 2 && borderActiveClasses
            )}
          ></div>
          {/* Left Border */}
          <div
            className={cn(
              borderBaseClasses,
              "w-1.5 top-0 bottom-0 left-0",
              animationStage >= 3 && borderActiveClasses
            )}
          ></div>
          {/* Top Border */}
          <div
            className={cn(
              borderBaseClasses,
              "h-1.5 top-0 left-0 right-0",
              animationStage >= 4 && borderActiveClasses
            )}
          ></div>

          {/* Glassmorphism Item */}
          <div
            className={cn(
              "friday-glass-item fixed left-1/2 -translate-x-1/2 w-4/5 max-w-md h-24 rounded-lg shadow-2xl",
              "opacity-0", // Initially hidden
              animationStage >= 1 && "animate-glass-move-fade"
            )}
            style={{ zIndex: FRIDAY_ANIMATION_Z_INDEX + 1 }}
          ></div>
        </>
      )}

      <style jsx global>{`
        :root {
          --friday-glow-blur: ${glowBlur};
          --friday-radius: ${borderRadius};
        }

        .friday-border {
          z-index: ${FRIDAY_ANIMATION_Z_INDEX};
          background: conic-gradient(
            from 90deg,
            hsl(0, 100%, 65%), hsl(60, 100%, 65%), hsl(120, 100%, 65%),
            hsl(180, 100%, 65%), hsl(240, 100%, 65%), hsl(300, 100%, 65%),
            hsl(0, 100%, 65%)
          );
          animation: friday-rotate-hue-border 4s linear infinite;
        }

        .friday-border::before { /* Glow */
          content: "";
          position: absolute;
          inset: -3px; 
          z-index: -1; 
          border-radius: calc(var(--friday-radius) + 3px);
          background: inherit; /* Use parent's gradient */
          filter: blur(var(--friday-glow-blur));
          animation: friday-rotate-hue-glow 4s linear infinite;
          opacity: 0.7;
        }
        
        .friday-border.opacity-100::after { /* Splash, only when border becomes visible */
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1; /* On top of the border's own gradient */
          border-radius: var(--friday-radius);
          border: 2px solid white;
          background: transparent;
          opacity: 0; /* Animation controls opacity */
          pointer-events: none;
          animation: friday-white-border-splash 0.5s ease-out forwards;
        }
        
        /* Specific border positioning is handled by inline Tailwind classes */

        .friday-glass-item {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        @keyframes friday-rotate-hue-glow {
          0% { filter: hue-rotate(0deg) blur(var(--friday-glow-blur)); }
          100% { filter: hue-rotate(360deg) blur(var(--friday-glow-blur)); }
        }

        @keyframes friday-rotate-hue-border {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        @keyframes friday-white-border-splash {
          0% {
            opacity: 1;
            clip-path: circle(0% at 50% 50%); /* Start splash from center for borders */
          }
          50% {
            opacity: 1;
            clip-path: circle(150% at 50% 50%);
          }
          100% {
            opacity: 0;
            clip-path: circle(150% at 50% 50%);
          }
        }
        
        .animate-glass-move-fade {
           animation: glass-move-and-fade 2.8s ease-out forwards;
        }

        @keyframes glass-move-and-fade {
          0% {
            transform: translate(-50%, 100vh); /* Start below viewport */
            opacity: 0;
          }
          15% {
            transform: translate(-50%, 60vh); /* Move up a bit */
            opacity: 1;
          }
          85% {
            transform: translate(-50%, -100px); /* Move to near top */
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -200px); /* Move slightly further up and fade */
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
