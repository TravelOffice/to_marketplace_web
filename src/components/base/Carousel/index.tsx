import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useSnapCarousel } from '@/hooks/carousel';

interface CarouselRenderItemProps<T> {
  readonly item: T,
  readonly isSnapPoint: boolean,
}

interface CarouselItemProps extends React.HTMLAttributes<HTMLLIElement> {
  readonly isSnapPoint: boolean,
  readonly children?: React.ReactNode,
}

export interface CarouselProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[],
  renderItem: (props: CarouselRenderItemProps<T>) => ReactNode,
}

export function CarouselItem(props: CarouselItemProps) {
  const {
    isSnapPoint, children, className, ...rest
  } = props;
  return (
    <li
      className={classNames(className, 'flex-shrink-0')}
      style={{
        ...(isSnapPoint ? { scrollSnapAlign: 'start' } : {}),
      }}
      {...rest}
    >
      {children}
    </li>
  );
}

export default function Carousel<T>(props: CarouselProps<T>) {
  const { items, renderItem } = props;
  const { scrollRef, snapPointIndexes } = useSnapCarousel();
  return (
    <div>
      <ul ref={scrollRef} className="relative flex overflow-auto" style={{ scrollSnapType: 'x mandatory' }}>
        {
          items.map((item, i) => renderItem({
            item,
            isSnapPoint: snapPointIndexes.has(i),
          }))
        }
      </ul>
    </div>
  );
}
