import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'IELTS Prep + C1 Idioms', template: '%s | IELTS Prep' },
  description: 'Free IELTS lessons and C1 idiom mini-lessons for advanced English learners.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <SiteHeader />
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)] border-b border-[var(--color-border)] backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="/" className="font-semibold text-[var(--color-primary)] flex items-center gap-2">
          <span>📚</span> IELTS Prep
        </a>
        <nav className="flex gap-5 text-sm text-gray-500">
          <a href="/ielts-lessons" className="hover:text-[var(--color-primary)] transition-colors">IELTS Lessons</a>
          <a href="/ielts-practice" className="hover:text-[var(--color-primary)] transition-colors">Practice</a>
          <a href="/idioms" className="hover:text-[var(--color-primary)] transition-colors">C1 Idioms</a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-20 py-8 text-center text-sm text-gray-400">
      Free IELTS prep · Built by{' '}
      <a href="https://github.com/JPBrill" className="text-[var(--color-primary)] underline" target="_blank" rel="noopener noreferrer">JPBrill</a>
      {' '}·{' '}
      <a href="https://github.com/JPBrill/c1-idioms-whatsapp-course" className="text-[var(--color-primary)] underline" target="_blank" rel="noopener noreferrer">GitHub</a>
    </footer>
  );
}
