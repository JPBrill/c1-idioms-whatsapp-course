import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'C1 Idioms — WhatsApp Course',
  description: 'Free 8-module C1 idioms course delivered as daily WhatsApp mini-lessons for advanced English learners.',
};

const MODULES = [
  { week: 1, theme: 'Emotions & Mood', slug: 'module-01-emotions', idioms: ['over the moon', 'down in the dumps', 'on edge', 'take something to heart'] },
  { week: 2, theme: 'Work & Productivity', slug: 'module-02-work', idioms: ['hit the ground running', 'on the back burner', 'up to your ears in work', 'pull your weight'] },
  { week: 3, theme: 'Risk & Decision-Making', slug: 'module-03-risk', idioms: ['play it by ear', 'go out on a limb', 'throw caution to the wind', 'touch-and-go'] },
  { week: 4, theme: 'Relationships & Conflict', slug: 'module-04-relationships', idioms: ['hit it off', 'on the same wavelength', 'give someone the cold shoulder', 'in hot water'] },
  { week: 5, theme: 'Time & Planning', slug: 'module-05-time', idioms: ['last-minute', 'in the long run', 'around the corner', 'call it a day'] },
  { week: 6, theme: 'Thinking & Learning', slug: 'module-06-thinking', idioms: ['food for thought', 'in two minds', 'hit the nail on the head', 'learn the ropes'] },
  { week: 7, theme: 'Money & Value', slug: 'module-07-money', idioms: ['cost an arm and a leg', 'bang for your buck', 'tighten your belt', 'in the red'] },
  { week: 8, theme: 'Communication & Honesty', slug: 'module-08-communication', idioms: ['get straight to the point', 'beat around the bush', 'keep someone in the loop', 'take something with a pinch of salt'] },
];

export default function IdiomsPage() {
  return (
    <div className="space-y-10">
      <div>
        <span className="inline-block text-xs font-medium bg-brand-light text-brand px-3 py-1 rounded-full mb-3">Level: C1 / IELTS 7+</span>
        <h1 className="text-3xl font-bold mb-2">C1 Idioms — WhatsApp Mini-Lessons</h1>
        <p className="text-gray-500 max-w-2xl">
          8 thematic modules · 32 idioms. One WhatsApp-ready mini-lesson per idiom, plus a weekly review challenge.
          Designed for learners who know the grammar but struggle to sound native.
        </p>
        <div className="flex flex-wrap gap-3 mt-5">
          <a href="YOUR_WHATSAPP_LINK" className="btn-primary" target="_blank" rel="noopener noreferrer">Join on WhatsApp</a>
          <a href="https://github.com/JPBrill/c1-idioms-whatsapp-course" className="btn-secondary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {MODULES.map((m) => (
          <div key={m.slug} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-brand">Week {m.week}</span>
              <span className="text-xs text-gray-400">4 idioms + review</span>
            </div>
            <div className="font-semibold mb-3">{m.theme}</div>
            <ul className="space-y-1">
              {m.idioms.map((idiom) => (
                <li key={idiom} className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-brand shrink-0" />
                  {idiom}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
