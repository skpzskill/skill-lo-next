import Link from "next/link";
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbSchema } from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const BASE_URL = 'https://www.skillpreneurz.com';

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const fullItems = [
    { name: 'Home', url: BASE_URL },
    ...items.map(item => ({ ...item, url: `${BASE_URL}${item.url}` }))
  ];

  return (
    <>
      <BreadcrumbSchema items={fullItems} />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          <li className="flex items-center">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              aria-label="Home"
            >
              <Home className="h-4 w-4 text-accent" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" aria-hidden="true" />
              {index === items.length - 1 ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
