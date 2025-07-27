import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import upvachiLogo from "../../assets/images/upvachi.png";
import MobileMenu, { type NavLink } from "./MobileMenu";

const navLinks: NavLink[] = [
  { name: "Overview", href: "#overview" },
  { name: "Platforms", href: "#platforms" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Use Cases", href: "#use-cases" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setShow(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShow(false);
      } else {
        setShow(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`w-full fixed top-0 z-30 transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav
          className="mx-auto px-4 flex justify-between items-center h-16 bg-zinc-950/90 border-b border-[#232347]
          backdrop-blur-md
          transition-colors duration-300"
        >
          <div className="flex gap-2">
            <button
              className="lg:hidden flex items-center justify-center p-2 rounded-xl transition hover:bg-[#232347]/40"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {!isMobileMenuOpen && <Menu className="w-7 h-7 text-white" />}
            </button>
            <a href="/" className="flex items-center gap-2">
              <img
                src={upvachiLogo}
                alt="UpVachi Logo"
                className="w-10 h-10 rounded-xl border border-zinc-800 shadow"
              />
              <span className="text-xl font-extrabold text-white bg-clip-text drop-shadow-lg">
                UpVachi
              </span>
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium transition text-zinc-200 hover:text-[#35A7FF]"
              >
                {link.name}
              </a>
            ))}
          </div>
          {/* CTA */}
          <div className="flex gap-4">
            <a
              href="/auth/login"
              className="p-2 rounded-xl font-bold hover:bg-zinc-800 transition-all text-white"
            >
              Sign In
            </a>
            <a
              href="/auth/signup"
              className="hidden md:block px-5 py-2 rounded-xl font-bold shadow-md transition-all bg-gradient-to-r from-blue-600 to-rose-600 hover:from-blue-500 hover:to-rose-500 text-white"
            >
              Get Started
            </a>
          </div>
        </nav>
        {/* Mobile Nav */}
      </header>
      <MobileMenu
        navLinks={navLinks}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        onClose={() => {
          setIsMobileMenuOpen(false);
        }}
      />
    </>
  );
};

export default Header;
