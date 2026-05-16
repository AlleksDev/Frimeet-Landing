import React, { useEffect, useRef, useState, type JSX } from 'react';
import styles from './Reveal.module.css';

interface RevealProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleUp';
  delay?: number;
  duration?: number;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  animation = 'fadeUp', 
  delay = 0, 
  duration = 800,
  className = '',
  tag = 'div'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const style = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  const Tag = tag as any;

  return (
    <Tag 
      ref={ref} 
      style={style}
      className={`${styles.revealWrapper} ${styles[animation]} ${isVisible ? styles.visible : ''} ${className}`}
    >
      {children}
    </Tag>
  );
};
