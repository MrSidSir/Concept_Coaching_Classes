"use client";

import { type AnchorHTMLAttributes } from "react";
import {
  FaYoutube, FaInstagram, FaFacebookF, FaWhatsapp, FaPhone,
} from "react-icons/fa";
import { cn } from "@/utils/cn";

export type SocialPlatform = "youtube" | "instagram" | "facebook" | "whatsapp" | "phone";

const ICON_MAP = {
  youtube:   { Icon: FaYoutube,   label: "YouTube Channel",        base: "text-[#FF0000]", bg: "hover:bg-[#FF0000]/10 dark:hover:bg-[#FF0000]/20" },
  instagram: { Icon: FaInstagram, label: "Instagram Profile",      base: "text-[#E1306C]", bg: "hover:bg-[#E1306C]/10 dark:hover:bg-[#E1306C]/20" },
  facebook:  { Icon: FaFacebookF, label: "Facebook Page",          base: "text-[#1877F2]", bg: "hover:bg-[#1877F2]/10 dark:hover:bg-[#1877F2]/20" },
  whatsapp:  { Icon: FaWhatsapp,  label: "Chat on WhatsApp",       base: "text-[#25D366]", bg: "hover:bg-[#25D366]/10 dark:hover:bg-[#25D366]/20" },
  phone:     { Icon: FaPhone,     label: "Call Us",                base: "text-blue-600 dark:text-blue-400", bg: "hover:bg-blue-100 dark:hover:bg-blue-500/10" },
} as const;

const SIZE_MAP = {
  xs: { wrapper: "w-7 h-7",   icon: "text-sm"  },
  sm: { wrapper: "w-8 h-8",   icon: "text-base"},
  md: { wrapper: "w-10 h-10", icon: "text-lg"  },
  lg: { wrapper: "w-12 h-12", icon: "text-xl"  },
  xl: { wrapper: "w-14 h-14", icon: "text-2xl" },
} as const;

interface SocialIconProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  platform:   SocialPlatform;
  href:        string;
  size?:       keyof typeof SIZE_MAP;
  /** Show just the raw icon without the rounded-button wrapper */
  bare?:       boolean;
  className?:  string;
}

export function SocialIcon({
  platform, href, size = "md", bare = false, className, ...rest
}: SocialIconProps) {
  const { Icon, label, base, bg } = ICON_MAP[platform];
  const { wrapper, icon }          = SIZE_MAP[size];

  if (bare) {
    return (
      <a
        href={href}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "transition-transform duration-200 hover:scale-110 focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-current focus-visible:rounded",
          base, icon, className
        )}
        {...rest}
      >
        <Icon aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-xl",
        "border border-gray-200 dark:border-[#33334b]",
        "bg-white dark:bg-[#1a1a28]",
        "transition-all duration-200",
        "hover:scale-110 hover:shadow-md active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-current dark:focus-visible:ring-offset-[#0a0a0f]",
        wrapper, base, bg, className
      )}
      {...rest}
    >
      <Icon aria-hidden="true" className={icon} />
    </a>
  );
}
