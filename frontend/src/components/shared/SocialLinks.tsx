import { SocialIcon, type SocialPlatform } from "./SocialIcon";
import { SOCIAL_LINKS, whatsappChatUrl } from "@/constants/socials";
import { cn } from "@/utils/cn";

interface SocialLinksProps {
  /** Which platforms to show. Defaults to all four. */
  platforms?: SocialPlatform[];
  size?:      "xs" | "sm" | "md" | "lg" | "xl";
  bare?:      boolean;
  className?: string;
  gap?:       string;
}

const PLATFORM_HREFS: Record<SocialPlatform, string> = {
  youtube:   SOCIAL_LINKS.youtube,
  instagram: SOCIAL_LINKS.instagram,
  facebook:  SOCIAL_LINKS.facebook,
  whatsapp:  whatsappChatUrl(),
  phone:     SOCIAL_LINKS.phoneHref,
};

const DEFAULT_PLATFORMS: SocialPlatform[] = ["youtube", "instagram", "facebook", "whatsapp"];

export function SocialLinks({
  platforms = DEFAULT_PLATFORMS,
  size      = "md",
  bare      = false,
  className,
  gap       = "gap-2",
}: SocialLinksProps) {
  return (
    <div className={cn("flex items-center flex-wrap", gap, className)}>
      {platforms.map((p) => (
        <SocialIcon
          key={p}
          platform={p}
          href={PLATFORM_HREFS[p]}
          size={size}
          bare={bare}
        />
      ))}
    </div>
  );
}
