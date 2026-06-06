import Link from 'next/link';
import { getAllLessons } from '@/lib/lessons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IELTS Lessons',
  description: 'Structured IELTS lessons covering Listening, Reading, Writing, and Speaking.',
};

const SKILL_EMOJI: Record<string, string> = {
  Listening: '🎧',
  Reading: '📖',
  Writing: '✍️',
  Speaking: '🎤',
};

const SKILL_COLOR: Record<string, string> = {
  Listening: 'bg-teal-50 border-teal-200 text-teal-700',
  Reading: 'bg-blue-50 border-blue-200 text-blue-700',
  Writing: 'bg-violet-50 border-violet-200 text-violet-700',
  Speaking: 'bg-amber-50 border-amber-200 text-amber-700',
};

export default function IeltsLessonsPage() {
  const lessons = getAllLessons();
  const skills = ['Listening', 'Reading', 'Writing', 'Speaking'];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">IELTS Lessons</h1>
        <p className="text-gray-500 max-w-2xl">
          Structured lessons covering all four IELTS skills. Each lesson breaks down exactly
          what to expect, strategies that work, and links to practice tests.
        </p>
      </div>

      {skills.map((skill) => {
        const group = lessons.filter((l) => l.skill === skill);
        if (group.length === 0) return null;
        return (
          <section key={skill}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{SKILL_EMOJI[skill]}</span>
              <h2 className="text-xl font-semibold">{skill}</h2>
              <span className="text-xs text-gray-400 ml-1">{group.length} lesson{group.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={`/ielts-lessons/${lesson.slug}`}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-brand hover:shadow-sm transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${SKILL_COLOR[skill]}`}>
                      Lesson {lesson.lessonNumber}
                    </span>
                    {lesson.practiceSlug && (
                      <span className="text-xs text-gray-400">+ Practice</span>
                    )}
                  </div>
                  <div className="font-medium mt-2 group-hover:text-brand transition-colors leading-snug">
                    {lesson.title}
                  </div>
                  {lesson.description && (
                    <div className="text-sm text-gray-400 mt-1 line-clamp-2">{lesson.description}</div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {lessons.length === 0 && (
        <p className="text-gray-400 text-sm">Lessons are being added. Check back soon.</p>
      )}
    </div>
  );
}
