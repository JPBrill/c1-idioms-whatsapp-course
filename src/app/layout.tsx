import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'IELTS Prep · C1 Idioms', template: '%s | IELTS Prep' },
  description: 'Free IELTS lessons and C1 idiom mini-lessons for advanced English learners.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <SiteHeader />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 pb-24">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: 'rgba(245,244,239,0.88)',
        borderColor: 'var(--color-border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'var(--color-primary)' }}
          >
            IE
          </span>
          <span className="hidden sm:block" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            IELTS Prep
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 text-sm">
          {[
            { href: '/ielts-lessons', label: '📖 Lessons' },
            { href: '/ielts-practice', label: '✏️ Practice' },
            { href: '/idioms', label: '💬 C1 Idioms' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-1.5 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)] transition-all font-medium"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer
      className="border-t mt-24 py-10"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-faint)]">
        <div className="flex items-center gap-2">
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'var(--color-primary)' }}
          >
            IE
          </span>
          <span>Free IELTS Prep · No sign-up needed</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/JPBrill"
            className="hover:text-[var(--color-primary)] transition-colors"
            target="_blank" rel="noopener noreferrer"
          >
            Built by JPBrill
          </a>
          <span>·</span>
          <a
            href="https://github.com/JPBrill/c1-idioms-whatsapp-course"
            className="hover:text-[var(--color-primary)] transition-colors"
            target="_blank" rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
