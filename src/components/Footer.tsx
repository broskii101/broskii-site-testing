import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close on outside click (mobile only)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setNavOpen(false);
      }
    };

    if (navOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navOpen]);

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
    { name: 'Instagram', url: 'https://www.instagram.com/broskiiuk?igsh=YXpqM3J4NjhsMTVz', icon: Instagram, hover: 'hover:text-[#E1306C]' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@broskiiuk?_t=ZN-8xhU3rECMsA&_r=1', icon: TikTokIcon, hover: 'hover:text-black' },
    { name: 'YouTube', url: 'https://youtube.com/@broskiiuk?si=qe8BXRsGEnkuar2W', icon: Youtube, hover: 'hover:text-[#FF0000]' },
  ];

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Trips', href: '/upcoming-trip' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', href: '/termsofservice' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Cookies Policy', href: '/cookiespolicy' },
  ];

  return (
    <footer className="relative bg-[#e3ebf3]">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/70 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 pt-16 pb-12">

        {/* Social */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-12 text-gray-600">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`transition-colors duration-300 ${social.hover}`}
              >
                <social.icon className="h-8 w-8" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation — desktop (UNCHANGED) */}
        <nav className="hidden md:block mb-10">
          <ul className="flex justify-center gap-12">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="text-[17px] text-gray-700 hover:text-[#1f7fbf] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation — mobile reveal */}
        <div ref={navRef} className="md:hidden mb-10 text-center">
          <button
            type="button"
            onClick={() => setNavOpen(v => !v)}
            className="font-serif text-[20px] text-gray-700 hover:text-[#1f7fbf] transition-colors"
          >
            Explore
            <span
              className={`inline-block ml-1 transition-opacity duration-300 ${
                navOpen ? 'opacity-0' : 'opacity-60'
              }`}
            >
              ↓
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              navOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="flex flex-col items-center gap-4 text-[20px] text-gray-700">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => setNavOpen(false)}
                    className="hover:text-[#1f7fbf] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="text-center text-[14px] text-gray-500">
          <div className="md:hidden flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
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

          <div className="hidden md:flex justify-center gap-x-8 gap-y-3 mb-6">
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







