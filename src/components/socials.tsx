import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  InstagramLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

function XLogoIcon({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="currentColor"
    >
      <path d="M18.244 2H21.5l-7.112 8.128L22.75 22h-6.548l-5.127-6.712L5.2 22H1.94l7.606-8.693L1.5 2h6.714l4.634 6.116L18.244 2Zm-1.142 18h1.804L7.23 3.895H5.294L17.102 20Z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://github.com/DaveBitter",
    label: "GitHub",
    icon: GitHubLogoIcon,
  },
  {
    href: "https://www.linkedin.com/in/davebitter/",
    label: "LinkedIn",
    icon: LinkedInLogoIcon,
  },
  {
    href: "https://x.com/Dave_Bitter",
    label: "X",
    icon: XLogoIcon,
  },
  {
    href: "https://www.instagram.com/davebitter/",
    label: "Instagram",
    icon: InstagramLogoIcon,
  },
  {
    href: "mailto:dave.bitter@iodigital.com",
    label: "Email",
    icon: EnvelopeClosedIcon,
  },
];

export function Socials() {
  return (
    <div className="flex items-center justify-center gap-4">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
        >
          <Icon width={20} height={20} />
        </a>
      ))}
    </div>
  );
}
