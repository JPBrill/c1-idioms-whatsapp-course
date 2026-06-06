import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export type LessonMeta = {
  slug: string;
  title: string;
  skill: string;
  lessonNumber: number;
  description: string;
  tags: string[];
  practiceSlug?: string;
};

export type Lesson = LessonMeta & { content: string };

export function getAllLessons(): LessonMeta[] {
  const dir = path.join(CONTENT_ROOT, 'ielts-lessons');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title ?? '',
        skill: data.skill ?? '',
        lessonNumber: data.lessonNumber ?? 0,
        description: data.description ?? '',
        tags: data.tags ?? [],
        practiceSlug: data.practiceSlug,
      };
    })
    .sort((a, b) => a.lessonNumber - b.lessonNumber);
}

export function getLesson(slug: string): Lesson | null {
  const filePath = path.join(CONTENT_ROOT, 'ielts-lessons', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? '',
    skill: data.skill ?? '',
    lessonNumber: data.lessonNumber ?? 0,
    description: data.description ?? '',
    tags: data.tags ?? [],
    practiceSlug: data.practiceSlug,
    content,
  };
}

export function getAllPractice() {
  const dir = path.join(CONTENT_ROOT, 'ielts-practice');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title ?? '',
        skill: data.skill ?? '',
        lessonNumber: data.lessonNumber ?? 0,
        description: data.description ?? '',
        lessonSlug: data.lessonSlug ?? '',
      };
    })
    .sort((a, b) => a.lessonNumber - b.lessonNumber);
}

export function getPractice(slug: string) {
  const filePath = path.join(CONTENT_ROOT, 'ielts-practice', `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? '',
    skill: data.skill ?? '',
    lessonNumber: data.lessonNumber ?? 0,
    description: data.description ?? '',
    lessonSlug: data.lessonSlug ?? '',
    content,
  };
}
