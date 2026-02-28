"use client";

import dynamic from 'next/dynamic';

const StarBackground = dynamic(
  () => import('@/components/layout/StarBackground').then((mod) => mod.StarBackground),
  { ssr: false }
);

export function DynamicStarBackground() {
  return <StarBackground />;
}
