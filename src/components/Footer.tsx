import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z" />
    </svg>
  );

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/broskiiuk?igsh=YXpqM3J4NjhsMTVz',
      icon: Instagram,
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@broskiiuk?_t=ZN-8xhU3rECMsA&_r=1',
      icon: TikTokIcon,
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@broskiiuk?si=qe8BXRsGEnkuar2W',
      icon: Youtube,
    },
  ];

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Upcoming trips', href: '/upcoming-trip' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/termsofservice' },
    { name: 'Cookies Policy', href: '/cookiespolicy' },
    { name: 'Refund Policy', href: '/refund-policy' },
  ];

  return (
    <footer className="bg-[#eef3f7]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-14 pb-10">

        {/* Row 1 — Social */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-8 text-gray-600">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="hover:text-[#1f7fbf] transition-colors duration-300"
              >
                <social.icon className="h-8 w-8" />
              </a>
            ))}
          </div>
        </div>

        {/* Row 2 — Navigation */}
        <nav className="mb-10">
          <ul className="grid grid-cols-2 gap-y-4 gap-x-6 text-center md:flex md:justify-center md:gap-10">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-gray-700 hover:text-[#1f7fbf] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footnote / Legal */}
        <div className="text-center text-sm text-gray-500">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-[#1f7fbf] transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <p>© 2025 Broskii. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

