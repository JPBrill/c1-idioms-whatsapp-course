import Link from 'next/link';
import { getAllLessons } from '@/lib/lessons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IELTS Lessons',
  description: 'Structured IELTS lessons covering Listening, Reading, Writing, and Speaking.',
};

const SKILLS = [
  { key: 'Listening', emoji: '🎧', desc: 'Section strategies, question types, and common traps.' },
  { key: 'Reading',   emoji: '📖', desc: 'Academic vs General, timing tactics, and True/False/NG.' },
  { key: 'Writing',   emoji: '✍️', desc: 'Task 1 and Task 2 structures, coherence, and lexical range.' },
  { key: 'Speaking',  emoji: '🎤', desc: 'Part 1, 2, and 3 — fluency, pronunciation, and band 7+ answers.' },
];

const SKILL_STYLE: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  Listening: { bg: 'var(--skill-listening-bg)',  text: 'var(--skill-listening-text)',  border: 'var(--skill-listening-border)',  bar: '#0f6b6b' },
  Reading:   { bg: 'var(--skill-reading-bg)',    text: 'var(--skill-reading-text)',    border: 'var(--skill-reading-border)',    bar: '#1d4ed8' },
  Writing:   { bg: 'var(--skill-writing-bg)',    text: 'var(--skill-writing-text)',    border: 'var(--skill-writing-border)',    bar: '#6d28d9' },
  Speaking:  { bg: 'var(--skill-speaking-bg)',   text: 'var(--skill-speaking-text)',   border: 'var(--skill-speaking-border)',   bar: '#b45309' },
};

export default function IeltsLessonsPage() {
  const lessons = getAllLessons();
  const totalLessons = lessons.length;

  return (
    <div className="space-y-16">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative rounded-2xl overflow-hidden px-8 py-12 sm:py-16"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, #0a9ca3 100%)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full opacity-10" style={{ background: '#fff' }} />
        <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full opacity-10" style={{ background: '#fff' }} />

        <div className="relative z-10 max-w-xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-teal-200 mb-3">Your learning journey</p>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'Fraunces, Georgia, serif' }}
          >
            IELTS Lessons
          </h1>
          <p className="text-teal-100 text-base sm:text-lg max-w-md">
            Master every skill. Each lesson breaks down exactly what to expect, the strategies that work, and links to practice tests.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-teal-200">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-300 inline-block" />
              {totalLessons} lesson{totalLessons !== 1 ? 's' : ''} available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-300 inline-block" />
              4 skills covered
            </span>
          </div>
        </div>
      </section>

      {/* ── Skill sections ───────────────────────────────────── */}
      {SKILLS.map(({ key, emoji, desc }) => {
        const group = lessons.filter((l) => l.skill === key);
        const style = SKILL_STYLE[key];
        return (
          <section key={key} className="space-y-5">

            {/* Section header */}
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                style={{ background: style.bg, border: `1px solid ${style.border}` }}
              >
                {emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h2 className="text-xl font-semibold" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{key}</h2>
                  <span
                    className="badge"
                    style={{ background: style.bg, color: style.text, borderColor: style.border }}
                  >
                    {group.length > 0 ? `${group.length} lesson${group.length !== 1 ? 's' : ''}` : 'Coming soon'}
                  </span>
                </div>
                <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
                {/* Coloured rule */}
                <div className="mt-3 h-0.5 w-16 rounded-full" style={{ background: style.bar }} />
              </div>
            </div>

            {/* Cards */}
            {group.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.map((lesson) => (
                  <Link
                    key={lesson.slug}
                    href={`/ielts-lessons/${lesson.slug}`}
                    className="card p-5 flex flex-col gap-3 group no-underline"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="badge"
                        style={{ background: style.bg, color: style.text, borderColor: style.border }}
                      >
                        Lesson {lesson.lessonNumber}
                      </span>
                      {lesson.practiceSlug && (
                        <span className="text-xs font-medium" style={{ color: 'var(--color-text-faint)' }}>+ Practice ✏️</span>
                      )}
                    </div>
                    <div>
                      <p
                        className="font-semibold leading-snug group-hover:text-[var(--color-primary)] transition-colors"
                        style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1rem' }}
                      >
                        {lesson.title}
                      </p>
                      {lesson.description && (
                        <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                          {lesson.description}
                        </p>
                      )}
                    </div>
                    <div
                      className="mt-auto pt-2 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                      style={{ color: style.text }}
                    >
                      Start lesson <span>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                className="rounded-xl border-2 border-dashed p-6 text-sm text-center"
                style={{ borderColor: style.border, color: 'var(--color-text-faint)' }}
              >
                Lessons for {key} are being written — check back soon.
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
