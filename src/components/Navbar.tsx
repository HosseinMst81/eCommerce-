"use client";

import Link from "next/link";
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import logo from "../../public/logo-dark.svg";
import {
  toggleMobileMenu,
  toggleSearch,
  toggleCartDrawer,
} from "@/lib/store/slices/uiSlice";
import Image from "next/image";

const navLinks = [
  { label: "New & Featured", href: "/" },
  { label: "Men", href: "/" },
  { label: "Women", href: "/" },
  { label: "Kids", href: "/" },
  { label: "Sale", href: "/" },
];

export function Navbar() {
  const dispatch = useAppDispatch();
  const { isMobileMenuOpen, isSearchOpen } = useAppSelector(
    (state) => state.ui
  );

  return (
    <header className="sticky top-0 z-[1030] bg-white">
      {/* Top Bar */}
      <div className="bg-nike-grey-100 px-4 py-2">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            
          </div>
          <div className="flex items-center gap-3 font-medium">
            <Link href="/" className="border-r border-nike-grey-300 pr-3 hover:text-nike-grey-500 transition-colors">
              Find a Store
            </Link>
            <Link href="/" className="border-r border-nike-grey-300 pr-3 hover:text-nike-grey-500 transition-colors">
              Help
            </Link>
            <Link href="/sign-in" className="hover:text-nike-grey-500 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="border-b border-nike-grey-200 px-4 lg:px-10">
        <div className="mx-auto flex h-16 max-w-[1920px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src={logo} alt="Nike Logo" height={20} />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative py-2 font-medium text-nike-black transition-colors hover:text-nike-grey-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-nike-black after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => dispatch(toggleSearch())}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-nike-grey-100 transition-colors hover:bg-nike-grey-200"
              aria-label="Search"
            >
              {isSearchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
            </button>

            {/* Wishlist */}
            <button
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-nike-grey-100"
              aria-label="Wishlist"
            >
              <FiHeart size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={() => dispatch(toggleCartDrawer())}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-nike-grey-100"
              aria-label="Cart"
            >
              <FiShoppingBag size={20} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-nike-grey-100"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <FiMenu size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-b border-nike-grey-200 bg-white px-4 py-4 lg:px-10">
          <div className="mx-auto max-w-xl">
            <div className="flex items-center gap-3 rounded-full bg-nike-grey-100 px-4 py-3">
              <FiSearch size={20} className="text-nike-grey-500" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent text-base outline-none placeholder:text-nike-grey-500"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-nike-grey-200 bg-white px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-2xl font-medium text-nike-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
