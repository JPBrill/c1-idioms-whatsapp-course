import Link from 'next/link';
import { getAllPractice } from '@/lib/lessons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IELTS Practice Tests',
  description: '140 IELTS practice pages — 2 per lesson — with exercises, answer keys, and examiner tips.',
};

export default function PracticePage() {
  const tests = getAllPractice();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">IELTS Practice Tests</h1>
        <p className="text-gray-500 max-w-2xl">140 practice pages — 2 per lesson. Each page includes exercises, answer keys, and examiner tips.</p>
      </div>
      {tests.length === 0 && (
        <p className="text-gray-400 text-sm">Practice pages are added alongside each lesson. Start with <Link href="/ielts-lessons" className="text-brand underline">the lessons</Link>.</p>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tests.map((t) => (
          <Link key={t.slug} href={`/ielts-practice/${t.slug}`} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-brand hover:shadow-sm transition-all group">
            <div className="text-xs text-gray-400 mb-1">{t.skill} · Practice {t.lessonNumber}</div>
            <div className="font-medium group-hover:text-brand transition-colors">{t.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
