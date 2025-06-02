
"use client";

import { HelloGlow } from "@/components/HelloGlow";

export default function HelloGlowPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      {/* Example: Sized by className passed from here */}
      <HelloGlow className="bg-slate-700 h-[100px] w-[400px] rounded-md p-4 border border-slate-500" />
      
      <div className="my-8" /> {/* Spacer */}
      
      {/* Example: Default size (will size based on content - 20 spans) */}
      <HelloGlow />
      
      <div className="my-8" /> {/* Spacer */}

      {/* Example: Another explicitly sized container */}
      <HelloGlow className="bg-blue-900 h-[50px] w-[600px] rounded-lg p-2 border-2 border-blue-700" />

    </main>
  );
}
