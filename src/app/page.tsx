import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'SkillPreneurZ | Next Gen Skill Builders for Young Minds',
  description: 'Empowering young minds globally with entrepreneurship, design thinking, and financial literacy education. Build future-ready skills through innovative startup education and skill building programs.',
  keywords: 'entrepreneurship, skill building, startup education, entrepreneurship for kids, design thinking, financial literacy, young entrepreneurs, business skills for children, innovation education, future skills',
  alternates: {
    canonical: 'https://www.skillpreneurz.com/'
  },
};
// Layout provides default metadata, so we don't strictly need to export it here unless we want to override.
// Keeping it simple relative to layout.

export default function Home() {
  return <HomeClient />;
}
