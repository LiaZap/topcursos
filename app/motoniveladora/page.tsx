import type { Metadata } from 'next';
import CoursePage from '@/components/CoursePage';
import { motoniveladora } from '@/lib/courses';

export const metadata: Metadata = {
  title: motoniveladora.meta.title,
  description: motoniveladora.meta.description,
  alternates: { canonical: '/motoniveladora' },
  openGraph: {
    title: motoniveladora.meta.title,
    description: motoniveladora.meta.description,
    url: '/motoniveladora',
    siteName: 'Instituto Top',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: motoniveladora.hero.image!.src }],
  },
};

export default function Page() {
  return <CoursePage course={motoniveladora} />;
}
