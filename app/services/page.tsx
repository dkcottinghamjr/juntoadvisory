import { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Services',
  description: 'How Junto Advisory helps businesses identify and execute on AI opportunities.',
}

const phases = [
  {
    name: 'Discovery',
    description:
      'We collect the information that makes the rest possible. Through structured conversation and data review, we capture your story: your team, your operations, your market, your goals. This phase is efficient by design, typically a matter of hours, not days. The goal is an input rooted in reality.',
  },
  {
    name: 'Synthesis',
    description:
      'This is where the work happens. Your information seeds a proprietary multi-stage analytical process that identifies opportunities, surfaces AI-first solutions, and evaluates each in the context of your business for feasibility and impact. Then we design a blueprint built specifically for your business with a clear road map for implementation.',
  },
  {
    name: 'Delivery',
    description:
      'We present the blueprint to your leadership team in a working session: opportunities identified, solutions prescribed, roadmap sequenced. The engagement ends with you holding a complete strategic plan that is ready to execute.',
  },
]

export default function ServicesPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <FadeIn>
        <p className="text-xs uppercase tracking-widest text-terracotta font-semibold mb-10">
          Services
        </p>
      </FadeIn>

      <div className="border-t border-charcoal/15">
        <FadeIn>
          <div className="border-b border-charcoal/15 py-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              What we do
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg">
              Fundamentally, we are architects, designing blueprints for businesses to integrate AI solutions. We help businesses identify their highest-leverage opportunities to adopt and deploy AI, then we design a detailed blueprint to execute on those opportunities.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border-b border-charcoal/15 py-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              Our clients
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg">
              The businesses we work with vary widely in size, industry, and stage. What they share is a value-based culture and a growth mindset. They have a centralized knowledge base &mdash; an individual or small leadership team that can fit around a table &mdash; and they are serious about leveraging AI proactively.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="border-b border-charcoal/15 py-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              Our process
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
              Your engagement unfolds in three phases.
            </p>
            <div className="space-y-6">
              {phases.map((phase) => (
                <div key={phase.name}>
                  <h3 className="font-display text-xl font-semibold text-terracotta mb-3">
                    {phase.name}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed text-lg">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="border-b border-charcoal/15 py-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              Timeline and investment
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg">
              Engagements typically range from two to six weeks depending on your organization&rsquo;s size and complexity. Investment varies accordingly, and we will discuss during an initial discovery conversation.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="border-b border-charcoal/15 py-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              What comes next
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
              Ready to explore whether Junto Advisory is right for your business? Let&rsquo;s talk.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-charcoal/20 text-charcoal/60 hover:text-charcoal hover:border-charcoal/40 text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
            >
              Inquire
            </Link>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={0.5}>
        <div className="mt-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-8">
            Learn more about Junto Advisory
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about#founder"
              className="inline-block border border-charcoal/20 text-charcoal/60 hover:text-charcoal hover:border-charcoal/40 text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
            >
              Meet our founder
            </Link>
            <Link
              href="/about#essay"
              className="inline-block border border-charcoal/20 text-charcoal/60 hover:text-charcoal hover:border-charcoal/40 text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
            >
              Read our story
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
