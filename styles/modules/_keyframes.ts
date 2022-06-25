import { keyframes } from '@emotion/react';

export const smoothAppearDownUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(5%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const smoothAppearUpDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const smoothAppearDownUpLarge = keyframes`
from {
   opacity: 0;
   transform: translateY(25%);
 }
 to {
   opacity: 1;
   transform: translateY(0);
 }
`;

export const errorAppear = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-5%);
  }
  25% {
    opacity: 0.35;
    transform: translateX(5%);
  }
  50% {
  opacity:1;
  transform: translateX(-1.5%);
  }
  75% {
    transform: translateX(1.5%);
  }
  100%{
    transform: translateX(0);
  }
`;
