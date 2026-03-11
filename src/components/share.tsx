"use client";

import { useState } from "react";
import { Button } from "@radix-ui/themes";
import { Share2, Check } from "lucide-react";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

export function Share() {
  const [copied, setCopied] = useState(false);
  const direction = useScrollDirection();

  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 transition-all duration-300 md:static md:z-auto ${
        direction === "up"
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0"
      } md:translate-y-0 md:opacity-100`}
    >
      <Button
        variant="soft"
        color="gray"
        size="2"
        onClick={handleShare}
        className="cursor-pointer"
      >
        {copied ? <Check size={16} /> : <Share2 size={16} />}
        {copied ? "Copied to clipboard!" : "Share"}
      </Button>
    </div>
  );
}
