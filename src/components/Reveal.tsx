import React, { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

type RevealTag = keyof HTMLElementTagNameMap;

interface RevealProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleUp';
  delay?: number;
  duration?: number;
  className?: string;
  tag?: RevealTag;
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
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  const style = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
  };

  return React.createElement(
    tag,
    {
      ref,
      style,
      className: `${styles.revealWrapper} ${styles[animation]} ${isVisible ? styles.visible : ''} ${className}`,
    },
    children,
  );
};
