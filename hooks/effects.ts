import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export const useParallaxEffect = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -0]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return { ref, y1, y2, y3, y4 };
};

export const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth"
    });
  };