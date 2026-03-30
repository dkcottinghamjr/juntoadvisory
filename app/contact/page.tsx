import { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Junto Advisory.',
}

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-terracotta font-semibold mb-4">
          Contact
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-charcoal mb-4 leading-tight">
          Let&apos;s talk
        </h1>
        <p className="text-charcoal/50 text-lg max-w-lg mb-12 leading-relaxed">
          Whether you&apos;re navigating a critical decision, exploring a
          partnership, or simply want to exchange ideas &mdash; we&apos;re interested.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="bg-white/60 rounded-xl p-8 md:p-10 shadow-card mb-10">
          <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">
            Send us a message
          </h2>
          <ContactForm />
        </div>
      </FadeIn>

      <FadeIn delay={0.25}>
        <div className="bg-white/60 rounded-xl p-8 md:p-10 shadow-card">
          <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">
            Find us elsewhere
          </h2>
          <div className="flex gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-charcoal/50 hover:text-terracotta transition-colors"
                aria-label={social.name}
              >
                {social.icon}
                <span className="text-sm font-medium">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
