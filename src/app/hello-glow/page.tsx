
"use client";

import { HelloGlow } from "@/components/HelloGlow";

export default function HelloGlowPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      {/* Example: Thicker and longer segments */}
      <HelloGlow glowThickness={30} glowLength={40} />
      <div className="my-8" /> {/* Spacer */}
      {/* Example: Default size */}
      <HelloGlow />
      <div className="my-8" /> {/* Spacer */}
      {/* Example: Thinner segments */}
      <HelloGlow glowThickness={10} glowLength={20} />

    </main>
  );
}
