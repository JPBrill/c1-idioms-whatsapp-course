import Link from 'next/link';

const IELTS_SECTIONS = [
  { skill: 'Listening', lessons: 10, color: 'bg-teal-50 border-teal-200 text-teal-800' },
  { skill: 'Reading', lessons: 20, color: 'bg-blue-50 border-blue-200 text-blue-800' },
  { skill: 'Writing', lessons: 20, color: 'bg-violet-50 border-violet-200 text-violet-800' },
  { skill: 'Speaking', lessons: 20, color: 'bg-amber-50 border-amber-200 text-amber-800' },
];

const IDIOM_MODULES = [
  { week: 1, theme: 'Emotions & Mood', slug: 'module-01-emotions' },
  { week: 2, theme: 'Work & Productivity', slug: 'module-02-work' },
  { week: 3, theme: 'Risk & Decision-Making', slug: 'module-03-risk' },
  { week: 4, theme: 'Relationships & Conflict', slug: 'module-04-relationships' },
  { week: 5, theme: 'Time & Planning', slug: 'module-05-time' },
  { week: 6, theme: 'Thinking & Learning', slug: 'module-06-thinking' },
  { week: 7, theme: 'Money & Value', slug: 'module-07-money' },
  { week: 8, theme: 'Communication & Honesty', slug: 'module-08-communication' },
];

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-12 shadow-sm">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-medium bg-brand-light text-brand px-3 py-1 rounded-full mb-4">Free · No sign-up</span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            IELTS Prep &amp; C1 Idioms
          </h1>
          <p className="text-gray-500 text-lg mb-6">
            Structured IELTS lessons for every skill — plus a thematic C1 idioms course delivered as daily WhatsApp mini-lessons.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/ielts-lessons" className="btn-primary">Start IELTS Lessons →</Link>
            <Link href="/idioms" className="btn-secondary">C1 Idioms Course</Link>
          </div>
        </div>
      </section>

      {/* IELTS Lessons */}
      <section id="ielts-lessons">
        <h2 className="text-2xl font-bold mb-2">IELTS Lessons</h2>
        <p className="text-gray-500 mb-6">70 structured lessons covering all four skills. Each lesson includes key facts, strategies, and a linked practice test.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {IELTS_SECTIONS.map((s) => (
            <Link
              key={s.skill}
              href={`/ielts-lessons?skill=${s.skill.toLowerCase()}`}
              className={`rounded-xl border p-5 hover:shadow-md transition-shadow ${s.color}`}
            >
              <div className="text-2xl mb-2">
                {s.skill === 'Listening' ? '🎧' : s.skill === 'Reading' ? '📖' : s.skill === 'Writing' ? '✍️' : '🎤'}
              </div>
              <div className="font-semibold">{s.skill}</div>
              <div className="text-sm opacity-70 mt-1">{s.lessons} lessons</div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/ielts-lessons" className="text-sm text-brand underline underline-offset-2">View all IELTS lessons →</Link>
        </div>
      </section>

      {/* Practice Tests */}
      <section id="practice">
        <h2 className="text-2xl font-bold mb-2">Practice Tests</h2>
        <p className="text-gray-500 mb-6">140 practice pages — 2 per lesson — with exercises, answer keys, and examiner tips.</p>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold">Ready to practise?</div>
            <div className="text-sm text-gray-500 mt-1">Each lesson links directly to its 2 practice pages.</div>
          </div>
          <Link href="/ielts-practice" className="btn-primary shrink-0">Browse Practice Tests →</Link>
        </div>
      </section>

      {/* C1 Idioms */}
      <section id="idioms">
        <h2 className="text-2xl font-bold mb-2">C1 Idioms — WhatsApp Course</h2>
        <p className="text-gray-500 mb-6">8 thematic modules · 32 idioms · 1 WhatsApp mini-lesson per day. Designed for IELTS 7+ students who know the grammar but not the native phrases.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {IDIOM_MODULES.map((m) => (
            <Link
              key={m.slug}
              href={`/idioms/${m.slug}`}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-brand hover:shadow-sm transition-all"
            >
              <div className="text-xs text-brand font-medium mb-1">Week {m.week}</div>
              <div className="font-semibold text-sm">{m.theme}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
