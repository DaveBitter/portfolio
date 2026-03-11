import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/DaveBitter",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/davebitter/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://twitter.com/Dave_Bitter",
    label: "Twitter",
    icon: Twitter,
  },
  {
    href: "https://www.instagram.com/davebitter/",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "mailto:dave.bitter@iodigital.com",
    label: "Email",
    icon: Mail,
  },
];

export function Socials() {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}
