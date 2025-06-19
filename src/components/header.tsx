import React from "react";
import { ModeToggle } from "./ui/mode-toggle";

const Header: React.FC = () => {
  return (
    <nav className="fixed top-4 z-1000 ml-8">
      <ModeToggle />
    </nav>
  );
};

export default Header;
