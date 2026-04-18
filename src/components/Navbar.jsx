import { useEffect, useRef, useState } from "react";
import { UserButton, useUser } from "@clerk/react";
import { Menu, Search, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/Logo.png";

const navItems = [
  { label: "HOME", to: "/" },
  { label: "RECIPES", to: "/recipes" },
  { label: "COOKING TIPS", to: "/cooking-tips" },
  { label: "ABOUT US", to: "/about-us" },
];

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition ${
      isActive
        ? "text-[#2d231b] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#ef7c4b]"
        : "hover:text-[#2d231b]"
    }`;

  const openSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="px-4 pt-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[999px] border border-[#e8ddd1] bg-white px-4 py-3 shadow-[0_12px_30px_rgba(91,62,44,0.08)] sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              onClick={() => {
                setIsMenuOpen(false);
                closeSearch();
              }}
              className="flex items-center gap-3"
            >
              <img src={logo} alt="Cooks Delight logo" className="h-10 w-auto" />
              <span className="text-sm font-semibold leading-tight text-[#3f2f24]">
                Cooks
                <br />
                Delight
              </span>
            </Link>

            <nav className="hidden flex-1 items-center justify-center gap-4 text-[11px] font-semibold tracking-[0.18em] text-[#9f8f81] lg:flex lg:flex-wrap sm:gap-7">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={navLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden items-center justify-end gap-2 lg:flex">
              {isSearchOpen ? (
                <label className="flex h-11 w-[220px] items-center gap-3 rounded-full bg-[#f4eee8] px-4 text-[#6f5d50] xl:w-[260px]">
                  <Search size={17} strokeWidth={2.25} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search items..."
                    className="w-full border-none bg-transparent text-sm font-medium tracking-[0.08em] text-[#2d231b] outline-none placeholder:text-[#9d8f81]"
                  />
                </label>
              ) : (
                <>
                  <button
                    type="button"
                    aria-label="Open search"
                    onClick={openSearch}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4eee8] text-[#6f5d50] transition hover:bg-[#ede4da] hover:text-[#3f2f24]"
                  >
                    <Search size={16} strokeWidth={2.25} />
                  </button>

                  {isSignedIn ? (
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#decebd] bg-white shadow-sm">
                      <UserButton
                        appearance={{
                          elements: {
                            userButtonAvatarBox: "h-10 w-10",
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="inline-flex h-10 items-center rounded-full bg-[#ef7c4b] px-5 text-[11px] font-semibold tracking-[0.18em] text-white transition hover:bg-[#de6f42]"
                    >
                      LOG IN
                    </Link>
                  )}
                </>
              )}

              {isSearchOpen ? (
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeSearch}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4eee8] text-[#6f5d50] transition hover:bg-[#ede4da] hover:text-[#3f2f24]"
                >
                  <X size={18} strokeWidth={2.25} />
                </button>
              ) : null}
            </div>

            {isSearchOpen ? (
              <div className="ml-auto flex flex-1 items-center gap-3 lg:hidden">
                <label className="flex h-11 flex-1 items-center gap-3 rounded-full bg-[#f4eee8] px-4 text-[#6f5d50]">
                  <Search size={17} strokeWidth={2.25} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search items..."
                    className="w-full border-none bg-transparent text-sm font-medium tracking-[0.08em] text-[#2d231b] outline-none placeholder:text-[#9d8f81]"
                  />
                </label>

                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeSearch}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4eee8] text-[#6f5d50] transition hover:bg-[#ede4da] hover:text-[#3f2f24]"
                >
                  <X size={18} strokeWidth={2.25} />
                </button>
              </div>
            ) : null}

            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMenuOpen((open) => !open)}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#f4eee8] text-[#6f5d50] transition hover:bg-[#ede4da] hover:text-[#3f2f24] lg:hidden ${
                isSearchOpen ? "hidden" : "ml-auto"
              }`}
            >
              {isMenuOpen ? (
                <X size={18} strokeWidth={2.25} />
              ) : (
                <Menu size={18} strokeWidth={2.25} />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && !isSearchOpen ? (
          <div className="mt-3 rounded-[2rem] border border-[#e8ddd1] bg-white p-5 shadow-[0_18px_40px_rgba(91,62,44,0.12)] lg:hidden">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={() => {
                    setIsMenuOpen(false);
                    closeSearch();
                  }}
                  className={({ isActive }) =>
                    `border-b border-[#eee5dc] py-4 text-sm font-semibold tracking-[0.16em] transition ${
                      isActive ? "text-[#ef7c4b]" : "text-[#3f2f24] hover:text-[#ef7c4b]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                aria-label="Open search"
                onClick={openSearch}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f4eee8] text-[#6f5d50] transition hover:bg-[#ede4da] hover:text-[#3f2f24]"
              >
                <Search size={17} strokeWidth={2.25} />
              </button>

              {isSignedIn ? (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#decebd] bg-white shadow-sm">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-11 w-11",
                      },
                    }}
                  />
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex h-11 flex-1 items-center justify-center rounded-full bg-[#ef7c4b] px-5 text-[11px] font-semibold tracking-[0.18em] text-white transition hover:bg-[#de6f42]"
                >
                  LOG IN NOW!
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
