interface HamburgerMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HamburgerMenu({ isOpen, setIsOpen }: HamburgerMenuProps) {
  return (
    <button onClick={() => setIsOpen(!isOpen)} aria-label="toggle-menu" className="relative w-10 h-10 flex justify-center items-center">
      <span
        className={`absolute w-5 h-0.5 bg-[#242424] rounded transition-transform duration-300 ease-in-out 
          ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"}
        `}
      />

      <span
        className={`absolute w-5 h-0.5 bg-[#242424] rounded transition-opacity duration-300 ease-in-out
          ${isOpen ? "opacity-0" : "opacity-100"}
        `}
      />

      <span
        className={`absolute w-5 h-0.5 bg-[#242424] rounded transition-transform duration-300 ease-in-out 
          ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"}
        `}
      />
    </button>
  );
}
