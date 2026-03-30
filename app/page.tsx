import FadeIn from '@/components/FadeIn'
import ContactForm from '@/components/ContactForm'

const tenets = [
  {
    title: 'Curiosity',
    quote: '\u201CLearning never exhausts the mind.\u201D',
    attribution: 'Leonardo da Vinci',
  },
  {
    title: 'Character',
    quote: '\u201CThe best work happens when you are not trying to make something good, just something true.\u201D',
    attribution: 'Rick Rubin',
  },
  {
    title: 'Ambition',
    quote: '\u201CEnergy and persistence conquer all things.\u201D',
    attribution: 'Benjamin Franklin',
  },
]

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'A deep dive converation where we ask questions, listen, and learn about your business.',
  },
  {
    number: '02',
    title: 'Evaluation',
    description: 'We assess the landscape, uncover opportunities, and match solutions.',
  },
  {
    number: '03',
    title: 'Recommendation',
    description: 'A clear, actionable path forward tailored to your goals and resources.',
  },
  {
    number: '04',
    title: 'Results',
    description: 'We stay engaged to help you execute, measure, and refine as you implement and grow.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="texture-overlay min-h-[85vh] flex flex-col items-center justify-center px-6 text-center">
        <FadeIn>
          <p className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-charcoal leading-tight mb-6">
            Junto Advisory
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-lg md:text-xl text-charcoal/50 max-w-xl mb-4 leading-relaxed font-light">
            The application of curiosity, character, and ambition.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <a
            href="#contact"
            className="mt-4 inline-block border border-charcoal/20 text-charcoal/60 hover:text-charcoal hover:border-charcoal/40 text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
          >
            Inquire
          </a>
        </FadeIn>
      </section>

      {/* Value proposition */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <FadeIn>
          <hr className="w-16 mx-auto border-t border-charcoal/20 mb-10" />
        </FadeIn>
        <FadeIn>
          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
            Every small business owner knows the feeling. You can see exactly what your business
            needs — but the solution is expensive or comes in a box that was built for someone else.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-charcoal font-display text-2xl font-semibold mb-6">
            We built Junto Advisory to solve this problem.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
            Leveraging decades of operational experience with AI expertise, we make bespoke strategy
            attainable for small businesses. We learn how your business operates, uncover
            opportunities, and deliver a roadmap with measurable outcomes.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="text-charcoal/70 leading-relaxed text-lg">
            Junto Advisory is a partner who has lived your challenge and finally has the tools to do
            something about it.
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <hr className="w-16 mx-auto border-t border-charcoal/20 mt-10" />
        </FadeIn>
      </section>

      {/* Tenets */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {tenets.map((tenet, i) => (
            <FadeIn key={tenet.title} delay={i * 0.1}>
              <div className="bg-white/60 rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow">
                <h3 className="font-display text-2xl font-semibold text-charcoal mb-3">
                  {tenet.title}
                </h3>
                <p className="text-charcoal/60 leading-relaxed text-sm italic">
                  {tenet.quote}
                </p>
                <p className="text-charcoal/40 text-xs mt-3">
                  {tenet.attribution}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <FadeIn>
          <hr className="w-16 mx-auto border-t border-charcoal/20 mb-16" />
        </FadeIn>
        <FadeIn>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal text-center mb-16">
            Our process
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-terracotta font-semibold mb-3">
                  {step.number}
                </p>
                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                  {step.title}
                </h3>
                <p className="text-charcoal/60 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <hr className="w-16 mx-auto border-t border-charcoal/20 mt-16" />
        </FadeIn>
      </section>

      {/* CTA — Let's talk */}
      <section id="contact" className="max-w-2xl mx-auto px-6 py-20 scroll-mt-20">
        <FadeIn>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal text-center mb-4">
            Inquire
          </h2>
          <p className="text-charcoal/50 text-center mb-10 text-sm">
            Interested in learning more? Reach out, and we&apos;ll be in touch.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ContactForm />
        </FadeIn>
      </section>
    </>
  )
}
