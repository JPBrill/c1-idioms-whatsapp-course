import Link from 'next/link';

interface FeaturedLessonProps {
  week: number;
  theme: string;
  slug: string;
  firstIdiom: string;
  totalIdioms: number;
  description: string;
}

export default function FeaturedLesson({
  week,
  theme,
  slug,
  firstIdiom,
  totalIdioms,
  description,
}: FeaturedLessonProps) {
  return (
    <Link
      href={`/idioms/${slug}`}
      className="featured-lesson-hero group block"
      aria-label={`Start here: Week ${week} — ${theme}`}
    >
      {/* Top meta row */}
      <div className="featured-lesson-meta">
        <span className="featured-lesson-badge">Start here</span>
        <span className="featured-lesson-week">Week {week} · {totalIdioms} idioms</span>
      </div>

      {/* Main content */}
      <div className="featured-lesson-body">
        <p className="featured-lesson-eyebrow">Module {week}</p>
        <h2 className="featured-lesson-title">{theme}</h2>
        <p className="featured-lesson-desc">{description}</p>

        {/* Idiom preview pill */}
        <div className="featured-lesson-preview">
          <span className="featured-lesson-preview-label">First idiom</span>
          <span className="featured-lesson-preview-idiom">&ldquo;{firstIdiom}&rdquo;</span>
        </div>
      </div>

      {/* CTA */}
      <div className="featured-lesson-cta">
        <span className="featured-lesson-cta-text group-hover:gap-3">Begin lesson</span>
        <span className="featured-lesson-arrow" aria-hidden="true">&rarr;</span>
      </div>
    </Link>
  );
}
