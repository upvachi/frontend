import { X } from "lucide-react";
import upvachiLogo from "/apple-touch-icon.png";

export type NavLink = {
  name: string;
  href: string;
};

const MobileMenu = ({
  navLinks,
  isOpen,
  setIsOpen,
  onClose,
}: {
  navLinks: NavLink[];
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  onClose: () => void;
}) => {
  const renderNavItem = (link: NavLink, key: string) => {
    return (
      <a
        key={key}
        href={link.href}
        className="font-semibold py-3 px-5 rounded-md transition-colors duration-200 hover:text-[#35A7FF] hover:bg-zinc-100 dark:hover:bg-zinc-800"
        onClick={() => setIsOpen(false)}
      >
        {link.name}
      </a>
    );
  };

  return (
    <>
      {isOpen && (

        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-white dark:bg-zinc-950 shadow-2xl transform transition-transform duration-300 z-50 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={upvachiLogo} className="w-8 h-8" alt="UpVachi" />
              <h2 className="text-xl font-bold">UpVachi</h2>
            </div>
            <button onClick={onClose}>
              <X className="w-7 h-7" />
            </button>
          </div>
        </div>

        <div className="flex flex-col py-4 overflow-y-auto h-full">
          {navLinks.map((link, index) =>
            renderNavItem(link, `navlink-${index}`)
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
