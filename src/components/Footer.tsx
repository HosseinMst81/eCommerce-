import Link from "next/link";
import { FiMapPin, FiMessageCircle } from "react-icons/fi";

const footerLinks = {
  "Get Help": [
    { label: "Order Status", href: "/" },
    { label: "Delivery", href: "/" },
    { label: "Returns", href: "/" },
    { label: "Payment Options", href: "/" },
    { label: "Contact Us", href: "/" },
  ],
  "About Nike": [
    { label: "News", href: "/" },
    { label: "Careers", href: "/" },
    { label: "Investors", href: "/" },
    { label: "Sustainability", href: "/" },
  ],
  "Promotions & Discounts": [
    { label: "Student", href: "/" },
    { label: "Military", href: "/" },
    { label: "Teacher", href: "/" },
    { label: "First Responders", href: "/" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-nike-black text-white">
      <div className="mx-auto max-w-[1920px] px-6 py-12 lg:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-nike-grey-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-nike-grey-400">
                <FiMapPin size={16} />
                <span>Find a Nike Store</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-nike-grey-400">
                <FiMessageCircle size={16} />
                <span>1-800-806-6453</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-nike-grey-800 pt-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-10"
              viewBox="0 0 69 32"
              fill="currentColor"
            >
              <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.56-3.36-1.36-2.64.56-7.04 1.76-4 5.28-7.96L10.08 14Q7.6 17.84 6.96 20.24q-.8 2.96.96 2.96 1.6 0 5.28-1.56L68.56 4z" />
            </svg>
            <span className="text-xs text-nike-grey-400">
              &copy; {new Date().getFullYear()} Nike, Inc. All Rights Reserved
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-nike-grey-400">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
