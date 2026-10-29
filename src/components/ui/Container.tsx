import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface ContainerProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Container({ as: Tag = 'div', children, className, id }: ContainerProps) {
  return (
    <Tag id={id} className={cn('mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-12', className)}>
      {children}
    </Tag>
  );
}
