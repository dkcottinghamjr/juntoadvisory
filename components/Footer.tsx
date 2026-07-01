import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border/60 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-display text-xl font-semibold text-ink mb-1">
              Junto <span className="text-primary">Advisory</span>
            </p>
            <p className="text-sm text-ink/50">
              Curiosity. Character. Ambition.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-ink/60">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-ink transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-ink transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40">
          <p className="text-xs text-ink/30">
            &copy; {new Date().getFullYear()} Junto Advisory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
