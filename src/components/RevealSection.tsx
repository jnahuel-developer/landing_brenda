import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

type RevealSectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

function RevealSection({ children, className = '', ...props }: RevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -48px 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`reveal-section${isVisible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </section>
  );
}

export default RevealSection;

