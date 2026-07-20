import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold">
              BREAKOUT <span className="text-gold">CULTURE</span>
            </p>
            <p className="mt-3 font-body text-[13px] leading-[1.5] text-cream">
              Premium Streetwear For Entrepreneur&apos;s Who Chose Their Own Route.
            </p>
          </div>

          <div>
            <p className="mb-3 font-body text-xs tracking-[2px] uppercase text-gold">
              Shop
            </p>
            <ul className="space-y-2 font-body text-[13px] text-taupe">
              <li>
                <Link href="/shop" className="focus-gold transition-colors duration-300 hover:text-cream">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="focus-gold transition-colors duration-300 hover:text-cream">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="focus-gold transition-colors duration-300 hover:text-cream">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="focus-gold transition-colors duration-300 hover:text-cream">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 font-body text-xs tracking-[2px] uppercase text-gold">
              Follow
            </p>
            <ul className="space-y-2 font-body text-[13px] text-taupe">
              <li>
                <a href="#" className="focus-gold transition-colors duration-300 hover:text-cream">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="focus-gold transition-colors duration-300 hover:text-cream">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center font-body text-[10px] tracking-[1.5px] uppercase text-cream/50">
          &copy; {new Date().getFullYear()} Breakout Culture. Est. 2026.
        </p>
      </div>
    </footer>
  );
}
