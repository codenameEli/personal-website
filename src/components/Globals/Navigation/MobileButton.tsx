'use client';

import { useState } from "react";

export default function MobileButton() {
	const [isOpen, setIsOpen] = useState(false);

  function toggleMobileMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <button 
      className={`site-header__mobile-button ${isOpen ? 'hello' : ''}`}
      onClick={toggleMobileMenu}
    >
      -
    </button>
  )
}