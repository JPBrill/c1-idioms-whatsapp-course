import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPractice, getPractice } from '@/lib/lessons';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllPractice().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getPractice(slug);
  if (!p) return {};
  return { title: p.title, description: p.description };
}

export default async function PracticeItemPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const practice = getPractice(slug);
  if (!practice) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span>/</span>
        <Link href="/ielts-practice" className="hover:text-brand">Practice</Link>
        <span>/</span>
        <span className="text-gray-600">{practice.title}</span>
      </nav>
      <header className="mb-8">
        <div className="text-xs text-gray-400 mb-2">{practice.skill} · Practice {practice.lessonNumber}</div>
        <h1 className="text-3xl font-bold">{practice.title}</h1>
        {practice.description && <p className="text-gray-500 mt-2">{practice.description}</p>}
      </header>
      <article className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-brand">
        <MDXRemote source={practice.content} />
      </article>
      {practice.lessonSlug && (
        <div className="mt-10 rounded-xl bg-gray-50 border border-[var(--color-border)] p-5 flex items-center justify-between gap-4">
          <div className="text-sm text-gray-500">Back to the lesson for this practice.</div>
          <Link href={`/ielts-lessons/${practice.lessonSlug}`} className="text-sm text-brand underline underline-offset-2">
            ← Back to Lesson
          </Link>
        </div>
      )}
    </div>
  );
}
