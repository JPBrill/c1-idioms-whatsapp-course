import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllLessons, getLesson } from '@/lib/lessons';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllLessons().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { params } = props as { params: { slug: string } };
  const lesson = getLesson(params.slug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.description,
  };
}

const SKILL_COLOR: Record<string, string> = {
  Listening: 'bg-teal-50 text-teal-700 border-teal-200',
  Reading: 'bg-blue-50 text-blue-700 border-blue-200',
  Writing: 'bg-violet-50 text-violet-700 border-violet-200',
  Speaking: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function LessonPage(props: any) {
  const { params } = props as { params: { slug: string } };
  const lesson = getLesson(params.slug);
  if (!lesson) notFound();

  const allLessons = getAllLessons().filter((l) => l.skill === lesson.skill);
  const idx = allLessons.findIndex((l) => l.slug === params.slug);
  const prev = allLessons[idx - 1];
  const next = allLessons[idx + 1];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span>/</span>
        <Link href="/ielts-lessons" className="hover:text-brand">IELTS Lessons</Link>
        <span>/</span>
        <span className="text-gray-600">{lesson.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${SKILL_COLOR[lesson.skill] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            {lesson.skill} · Lesson {lesson.lessonNumber}
          </span>
          {lesson.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold leading-tight">{lesson.title}</h1>
        {lesson.description && (
          <p className="text-gray-500 mt-2">{lesson.description}</p>
        )}
      </header>

      {/* Content */}
      <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-brand prose-blockquote:not-italic">
        <MDXRemote source={lesson.content} />
      </article>

      {/* Practice CTA */}
      {lesson.practiceSlug && (
        <div className="mt-10 rounded-xl bg-teal-50 border border-teal-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-teal-800">Ready to practise?</div>
            <div className="text-sm text-teal-600 mt-0.5">Test what you learned with the practice exercises for this lesson.</div>
          </div>
          <Link href={`/ielts-practice/${lesson.practiceSlug}`} className="shrink-0 inline-flex items-center gap-1 bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-teal-800 transition-colors">
            Go to Practice →
          </Link>
        </div>
      )}

      {/* Prev / Next */}
      <nav className="mt-12 border-t border-[var(--color-border)] pt-6 flex justify-between gap-4 text-sm">
        {prev ? (
          <Link href={`/ielts-lessons/${prev.slug}`} className="flex flex-col gap-0.5 group">
            <span className="text-gray-400">← Previous</span>
            <span className="text-brand group-hover:underline">{prev.title}</span>
          </Link>
        ) : <span />}
        {next && (
          <Link href={`/ielts-lessons/${next.slug}`} className="flex flex-col gap-0.5 text-right group ml-auto">
            <span className="text-gray-400">Next →</span>
            <span className="text-brand group-hover:underline">{next.title}</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
