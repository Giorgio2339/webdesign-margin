import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip, SplitText, CustomEase);
CustomEase.create('margin-editorial', '0.22,0.61,0.36,1');
CustomEase.create('margin-spatial', '0.76,0,0.24,1');
CustomEase.create('margin-micro', '0.2,0,0.2,1');
export const EASE = { editorial: 'margin-editorial', spatial: 'margin-spatial', micro: 'margin-micro' } as const;
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export { gsap, ScrollTrigger, Flip, SplitText, useGSAP };
