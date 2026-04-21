import { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'
import AboutSections from '@/components/AboutSections'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the founder of Junto Advisory.',
}

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-terracotta font-semibold mb-10">
          About
        </p>
      </FadeIn>
      <AboutSections />
    </section>
  )
}
