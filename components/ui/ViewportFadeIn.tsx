'use client';

import { useEffect, useRef, useState } from 'react';

interface ViewportFadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Optional delay in ms for staggered animations */
  delayMs?: number;
  /** If true, stops observing after first reveal */
  once?: boolean;
}

export function ViewportFadeIn({
  children,
  className = '',
  delayMs = 0,
  once = true,
}: ViewportFadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: show immediately
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={[
        'will-change-transform transition duration-500 ease-out',
        'opacity-0 translate-y-2',
        'motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100',
        visible ? 'opacity-100 translate-y-0' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export default ViewportFadeIn;
