# Site — IELTS Prep + C1 Idioms

This is the Next.js App Router site that renders all IELTS lesson and practice content from Markdown files.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Shared header, footer, globals
│   │   ├── page.tsx                # Homepage with all sections
│   │   ├── ielts-lessons/
│   │   │   ├── page.tsx            # Lessons index (all skills)
│   │   │   └── [slug]/page.tsx     # Dynamic lesson renderer
│   │   ├── ielts-practice/
│   │   │   ├── page.tsx            # Practice index
│   │   │   └── [slug]/page.tsx     # Dynamic practice renderer
│   │   └── idioms/
│   │       └── page.tsx            # C1 idioms course page
│   └── lib/
│       └── lessons.ts              # Markdown file readers + types
├── content/
│   ├── ielts-lessons/              # .md files — 1 per lesson (70 total)
│   └── ielts-practice/             # .md files — 2 per lesson (140 total)
└── lessons/                        # Original WhatsApp .md lesson files
```

## Adding a new lesson

1. Create `content/ielts-lessons/XX-lesson-slug.md`
2. Add frontmatter:

```md
---
title: "Your Lesson Title"
lessonNumber: 2
skill: Listening
description: "Short description for SEO and cards."
tags: ["tag1", "tag2"]
practiceSlug: "02-lesson-slug-practice"
---

Lesson content in Markdown here.
```

3. Create `content/ielts-practice/02-lesson-slug-practice.md` with matching frontmatter.
4. The site picks up the new files automatically — no code changes needed.

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo to Vercel and it will deploy on every push to `main`.

## Skills + lesson count plan

| Skill | Lessons | Practice pages |
|-------|---------|----------------|
| Listening | 10 | 20 |
| Reading | 20 | 40 |
| Writing | 20 | 40 |
| Speaking | 20 | 40 |
| **Total** | **70** | **140** |
