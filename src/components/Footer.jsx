import {
  FaFacebookSquare,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logofooter from "../assets/images/LogoFooter.png";

const footerLinks = [
  { label: "HOME", to: "/" },
  { label: "RECIPES", to: "/recipes" },
  { label: "COOKING TIPS", to: "/cooking-tips" },
  { label: "ABOUT US", to: "/about-us" },
];

const socialLinks = [
  { label: "TikTok", icon: FaTiktok, href: "#" },
  { label: "Facebook", icon: FaFacebookSquare, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  { label: "YouTube", icon: FaYoutube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="px-4 pb-6 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-4xl bg-[#26231f] px-4 py-5 text-[#f7f1ea] sm:px-7 sm:py-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="mx-auto flex items-center gap-3 lg:mx-0">
            <div className="flex h-9 w-9 items-center justify-center">
              <img
                src={logofooter}
                alt="Cooks Delight logo"
                className="h-10 w-10 object-contain"
              />
            </div>

            <span className="text-[11px] leading-tight text-[#f4ede6]">
              Cooks
              <br />
              Delight
            </span>
          </Link>

          <nav className="w-full lg:flex-1">
            <div className="flex flex-col text-[14px] font-semibold text-[#f2ebe3] lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-x-5 lg:gap-y-3 lg:text-[10px] lg:tracking-[0.14em]">
              {footerLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="border-b border-[#4a433d] py-3 transition hover:text-white last:border-b-0 lg:border-b-0 lg:py-0"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center justify-center gap-5 pt-1 lg:gap-3 lg:pt-0">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="text-[#f7f1ea] transition hover:text-white"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-5 border-t border-[#4a433d] pt-4 text-center text-[10px] tracking-[0.08em] text-[#b9aea2]">
          COPYRIGHT: &copy; 2024 COOKS DELIGHT.
        </div>
      </div>
    </footer>
  );
}
