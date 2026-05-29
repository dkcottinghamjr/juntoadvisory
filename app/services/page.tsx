import { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Services',
  description: 'How Junto Advisory helps businesses identify and execute on AI opportunities.',
}

const phases = [
  {
    title: 'Blueprint',
    subtitle: 'A plan designed specifically for your business',
    paragraphs: [
      { lead: 'Discovery', body: 'We collect the information that makes the rest possible. Through structured conversation and data review, we capture your story: your team, your operations, your market, your goals. This phase is efficient by design, typically a matter of hours, not days. The goal is an input rooted in reality.' },
      { lead: 'Synthesis', body: 'This is where it comes together. Your information seeds a proprietary multi-stage analytical process that identifies opportunities, surfaces AI-first solutions, and pressure tests each against your business for feasibility and impact. Then we design a blueprint specifically for your business with a clear roadmap for implementation.' },
      { lead: 'Delivery', body: 'We present the blueprint to your leadership team in a working session: opportunities identified, solutions prescribed, roadmap sequenced. You leave with a plan you can act on immediately.' },
    ],
  },
  {
    title: 'Guidance',
    subtitle: 'Ongoing work to support your business',
    paragraphs: [
      { lead: null, body: 'Like any good architect, we stay engaged beyond the blueprint as you bring the plan to life.' },
      { lead: null, body: 'We meet monthly to talk through implementation progress and shifts in the landscape. We take what we learn, run it back through the same synthesis process that built your blueprint, and deliver recommendations for any updates or adjustments to the blueprint and roadmap. This is a deliberate rhythm that keeps your plan current and your implementation moving as both your business and the technology environment evolve.' },
    ],
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
              Fundamentally, we are architects. We help businesses identify their highest-leverage opportunities to put AI to work, we design a detailed blueprint focused on execution, and we help navigate implementation as both the business and the technology evolve.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border-b border-charcoal/15 py-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              Our clients
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg">
              The businesses we work with vary widely in industry and stage. What they share is a value-based culture and a growth mindset. They have a centralized knowledge base — an individual or small leadership team that can fit around a table — and they are serious about leveraging AI proactively.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="border-b border-charcoal/15 py-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              How we work
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
              Your engagement unfolds in two phases: blueprint design and ongoing advisory.
            </p>
            <div className="space-y-12">
              {phases.map((phase) => (
                <div key={phase.title}>
                  <h3 className="font-display text-xl font-semibold text-terracotta mb-4">
                    {phase.title}
                    <span className="font-normal text-charcoal/50">{` — ${phase.subtitle}`}</span>
                  </h3>
                  <div className="space-y-4">
                    {phase.paragraphs.map((para, i) => (
                      <p key={i} className="text-charcoal/70 leading-relaxed text-lg">
                        {para.lead && `${para.lead} — `}
                        {para.body}
                      </p>
                    ))}
                  </div>
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
              Once we decide to engage, blueprint development typically takes one to three weeks, depending on your organization&rsquo;s size and complexity. The blueprint is a $50,000 investment. Ongoing advisory — where we guide implementation and keep your plan current — is billed monthly at $5,000. Implementation partners are available for execution work, at an additional fee.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="border-b border-charcoal/15 py-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-6">
              What comes next
            </h2>
            <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
              Interested? Let&rsquo;s get together to explore whether your business and Junto Advisory are the right match. If it makes sense to work together, we&rsquo;ll go from there.
            </p>
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-block border border-charcoal/20 text-charcoal/60 hover:text-charcoal hover:border-charcoal/40 text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
              >
                Inquire
              </Link>
            </div>
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
