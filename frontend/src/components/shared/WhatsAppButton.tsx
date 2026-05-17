"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappChatUrl } from "@/constants/socials";
import { cn } from "@/utils/cn";

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  // Appear after 2 s — avoids layout shift on initial paint
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(id);
  }, []);

  return (
    <a
      href={whatsappChatUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        // Position — above mobile bottom nav (pb-16) and above desktop viewport edge
        "fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50",
        "flex items-center justify-center",
        "w-14 h-14 rounded-full shadow-xl",
        "bg-[#25D366] hover:bg-[#1ea855]",
        "text-white text-2xl",
        "transition-all duration-300 hover:scale-110 active:scale-95",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50",
        // Mount animation
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      )}
    >
      {/* Outer pulse ring */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"
      />
      <FaWhatsapp aria-hidden="true" className="relative z-10" />
    </a>
  );
}
