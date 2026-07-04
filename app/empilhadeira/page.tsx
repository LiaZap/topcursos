import type { Metadata } from 'next';
import CoursePage from '@/components/CoursePage';
import { empilhadeira } from '@/lib/courses';

export const metadata: Metadata = {
  title: empilhadeira.meta.title,
  description: empilhadeira.meta.description,
  alternates: { canonical: '/empilhadeira' },
  openGraph: {
    title: empilhadeira.meta.title,
    description: empilhadeira.meta.description,
    url: '/empilhadeira',
    siteName: 'Instituto Top',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function Page() {
  return <CoursePage course={empilhadeira} />;
}
