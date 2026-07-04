import type { Metadata } from 'next';
import CoursePage from '@/components/CoursePage';
import { maquinasPesadas } from '@/lib/courses';

export const metadata: Metadata = {
  title: maquinasPesadas.meta.title,
  description: maquinasPesadas.meta.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: maquinasPesadas.meta.title,
    description: maquinasPesadas.meta.description,
    url: '/',
    siteName: 'Instituto Top',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function Page() {
  return <CoursePage course={maquinasPesadas} />;
}
