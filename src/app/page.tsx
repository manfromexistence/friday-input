
"use client";

import { Friday } from "@/components/Friday"; // Import Friday component

export default function HomePage() {
  return (
    <>
      <Friday />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Main Page Content</h1>
        <p>This is some content on the page to test the Friday effect overlay.</p>
      </main>
    </>
  );
}
