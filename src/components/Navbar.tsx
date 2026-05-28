"use client";

import Link from "next/link";
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  toggleMobileMenu,
  toggleSearch,
  toggleCartDrawer,
} from "@/lib/store/slices/uiSlice";

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
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" />
            </svg>
          </div>
          <div className="flex items-center gap-3 font-medium">
            <Link href="/" className="border-r border-nike-grey-300 pr-3 hover:text-nike-grey-500 transition-colors">
              Find a Store
            </Link>
            <Link href="/" className="border-r border-nike-grey-300 pr-3 hover:text-nike-grey-500 transition-colors">
              Help
            </Link>
            <Link href="/" className="hover:text-nike-grey-500 transition-colors">
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
            <svg className="h-5 w-16" viewBox="0 0 69 32" fill="currentColor">
              <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.56-3.36-1.36-2.64.56-7.04 1.76-4 5.28-7.96L10.08 14Q7.6 17.84 6.96 20.24q-.8 2.96.96 2.96 1.6 0 5.28-1.56L68.56 4z" />
            </svg>
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
