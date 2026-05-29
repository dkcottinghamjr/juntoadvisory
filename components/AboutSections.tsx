'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FadeIn from '@/components/FadeIn'
import influencesData from '@/data/influences.json'

type SectionId = 'founder' | 'essay' | 'influences'

type InfluenceItem = {
  name: string
  description: string
  link: string
}

function InfluenceGrid({ items }: { items: InfluenceItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-charcoal/30 italic">Coming soon.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => (
        <a
          key={item.name}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 rounded-lg border border-sand bg-white/60 px-4 py-3 hover:border-terracotta/30 hover:shadow-card transition-all group"
        >
          <svg
            className="w-5 h-5 flex-shrink-0 mt-0.5 text-terracotta/60 group-hover:text-terracotta transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
          <div className="min-w-0">
            <span className="text-sm font-medium text-charcoal/70 group-hover:text-charcoal transition-colors block truncate">
              {item.name}
            </span>
            {item.description && (
              <span className="text-xs text-charcoal/40 block line-clamp-2 leading-snug mt-0.5">
                {item.description}
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  )
}

const sections: { id: SectionId; label: string }[] = [
  { id: 'founder', label: 'Meet our founder' },
  { id: 'essay', label: 'Read our story' },
  { id: 'influences', label: 'Rub elbows with our inspiration' },
]

export default function AboutSections() {
  const [openSections, setOpenSections] = useState<Set<SectionId>>(
    () => new Set<SectionId>(['founder'])
  )

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (sections.some((s) => s.id === hash)) {
      setOpenSections(new Set<SectionId>([hash as SectionId]))
      window.scrollTo(0, 0)
    }
  }, [])

  const toggle = (id: SectionId) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="border-t border-charcoal/15">
      {sections.map((section, i) => {
        const isOpen = openSections.has(section.id)
        const panelId = `about-panel-${section.id}`
        return (
          <FadeIn key={section.id} delay={i * 0.1}>
            <div id={section.id} className="border-b border-charcoal/15 scroll-mt-24">
              <button
                type="button"
                onClick={() => toggle(section.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between gap-4 py-6 text-left group"
              >
                <span className="font-display text-2xl md:text-3xl font-semibold text-charcoal group-hover:text-terracotta transition-colors">
                  {section.label}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-charcoal/50 group-hover:text-terracotta transition-colors"
                  aria-hidden="true"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="pb-8 pr-8">
                      {section.id === 'founder' && (
                        <>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            Daniel has spent his career in and around business ownership and leadership — as a real estate broker, a CEO, and now as the founder of Junto Advisory, helping businesses put AI to work.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            After graduating from the University of North Carolina, where he studied business as a Morehead-Cain Scholar, Daniel joined the family business, Cottingham-Chalk. He spent 11 years serving buyers and sellers before transitioning into leadership, where he led the business and its 100+ agent sales team for the next decade.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            When the family business sold, Daniel had a rare gift &mdash; a clean slate. He took his time exploring opportunities and considering the best way to create value with his energy, interest, and talent. Junto Advisory is the answer. It draws on two decades of operating experience and a lifelong curiosity around technology, design, and what could be.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg">
                            Daniel lives in Charlotte with his wife, Christina, and their two children, Nora Jane and Joseph. When he&apos;s not in the office, you can find him outside &mdash; running or biking local trails, watching his kids&apos; games, or sneaking in a twilight nine. If you want to hear him talk, ask him about his favorite podcast, the Tar Heels, or his most recent ultra marathon.
                          </p>
                        </>
                      )}
                      {section.id === 'essay' && (
                        <>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
                            What do Thomas Edison, pickup basketball, and a Dairy Queen Dilly Bar have in common? More than you might think. Here&rsquo;s the story of how Junto Advisory came to be, straight from our founder&hellip;
                          </p>

                          <h3 className="font-display text-xl font-semibold text-terracotta mb-3">
                            1989
                          </h3>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
                            The first biography I ever read was one on Thomas Edison. I found it in my elementary school library after my third grade teacher assigned a biography book report. I expect I made my choice based on word size and page count, but Edison&rsquo;s story grabbed my attention. His relentless curiosity and drive to make something new during the rise of electrification was inspiring &mdash; enough so that I can still see the faded cover of that book sitting on the built-in desk in my childhood bedroom.
                          </p>

                          <h3 className="font-display text-xl font-semibold text-terracotta mb-3">
                            2009
                          </h3>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            I remember sitting down at my desk that day with a new energy, like I was getting into the cockpit of a race car. The feeling was foreign. It had been several months since the financial crisis had taken hold and years since the housing market peaked, and it was very clear that the road to recovery was going to be long and slow for those of us in the residential real estate business.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            As a newlywed relying solely on commission income, it was a scary time. The fact that the entire world was pointing at our industry as the catalyst for the crisis didn&rsquo;t make it easier. How had we missed this?
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            I opened my computer and reflected on the sleepless night that had birthed this renewed focus. I didn&rsquo;t want to be this wrong again &mdash; to miss something this important. So I resolved to build my own understanding of the real estate market, and of the world for that matter, from the ground up. I stripped everything down as far as I could &mdash; to the basic building blocks, the behaviors and conditions that made up the market. The exercise was invigorating, and the work proved invaluable, for me and for our company.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
                            I didn&rsquo;t realize it at the time, but this was my first encounter with first-principles thinking. Over the years, the process became second nature. Patterns started to emerge. And what had begun as a simple, almost defensive exercise started to feel like something closer to a superpower.
                          </p>

                          <h3 className="font-display text-xl font-semibold text-terracotta mb-3">
                            2029
                          </h3>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            I had planned to use the trip to think about where I wanted to be in five years, 2029, when my oldest would graduate high school. It was my first Berkshire Hathaway annual meeting, and I was excited to be inspired by Warren Buffett&rsquo;s legendary wisdom as I considered my future. The star of the show, though, turned out to be Buffett&rsquo;s late partner, Charlie Munger, who had passed away months earlier at 99. The whole meeting was a celebration of Charlie&rsquo;s life. The expo book store, typically stocked with as many as two-dozen recommended titles, was limited to one &mdash; Poor Charlie&rsquo;s Almanack.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            I picked up the book and thumbed through it while I enjoyed my third Dilly Bar of the afternoon. Certain ideas jumped off the page. Munger&rsquo;s voice read like my grandfather&rsquo;s, and his words were equally as wise. His anecdotes felt like shared experiences and his lessons like confirmation of my own ideas.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-8">
                            I came home without much more clarity on the next five years, but with certainty about what I was going to do next. I traded sports radio for historical podcasts and Netflix for Walter Isaacson. Right away, dots started to connect.
                          </p>

                          <h3 className="font-display text-xl font-semibold text-terracotta mb-3">
                            The Convergence
                          </h3>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            Around this time, we began the process to sell the family business that I had been operating for two decades. It was the right decision, and as I considered my next chapter, the timing could not have been better. The AI revolution was reaching fever pitch, and for the first time in my adult life, I had the freedom to follow my curiosity wherever it led.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            So I did. I spent my time brainstorming, building, and researching, all with the latest AI tools by my side. What surprised me was how intuitive it felt. The fundamentals were familiar, I&rsquo;d used these building blocks before. The more I built, the more I saw. Patterns began to emerge, and I started to talk about it.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            Before long, friends and colleagues were asking for help with AI in their lives and businesses. I started saying yes.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg mb-6">
                            That&rsquo;s when it clicked. Junto Advisory was born, not from a business plan, but from real business experience and a longtime habit of first-principles thinking.
                          </p>
                          <p className="text-charcoal/70 leading-relaxed text-lg">
                            Three moments across forty years help tell the story of Junto Advisory. My childhood inspiration from a curious inventor. The coming of age realization that the experts are human too. Then clarity, sitting in Omaha with an ice cream bar and the dawning sense that everything I had been collecting was about to be useful.
                          </p>
                        </>
                      )}
                      {section.id === 'influences' && (
                        <div className="space-y-10">
                          <div>
                            <h3 className="font-display text-xl font-semibold text-charcoal mb-4">
                              Individuals
                            </h3>
                            <InfluenceGrid items={influencesData.individuals} />
                          </div>
                          <div>
                            <h3 className="font-display text-xl font-semibold text-charcoal mb-4">
                              Content
                            </h3>
                            <InfluenceGrid items={influencesData.content} />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        )
      })}
    </div>
  )
}
