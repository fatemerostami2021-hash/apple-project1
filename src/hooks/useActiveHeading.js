import { useState, useEffect } from 'react';

export function useActiveHeading(article) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!article?.content) return;

    const headings = document.querySelectorAll('h1, h2, h3');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [article]);

  return activeId;
}
