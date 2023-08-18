import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';

export interface Carousel2Props extends React.HTMLAttributes<HTMLDivElement> {
  wrapperClassName?: string,
  itemClassName?: string,
  children: React.ReactElement[],
  autoplay?: boolean,
  interval?: number,
  indicator?: boolean,
  activeIndicatorColor?: string,
  inactiveIndicatorColor?: string,
  indicatorClassName?: string,
}

export default function Carousel2(props: Carousel2Props) {
  const {
    className,
    wrapperClassName,
    children,
    autoplay = true,
    interval = 5000,
    indicator = true,
    indicatorClassName = 'absolute -translate-x-1/2 bottom-5 left-1/2',
    inactiveIndicatorColor = 'bg-white/50',
    activeIndicatorColor = 'bg-white',
    ...rest
  } = props;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const activePage = useMemo(() => {
    if (currentIndex === 0) {
      return { active: currentIndex, next: currentIndex + 1, prev: children.length - 1 };
    }
    if (currentIndex === children.length - 1) {
      return { active: currentIndex, next: 0, prev: currentIndex - 1 };
    }
    return { active: currentIndex, next: currentIndex + 1, prev: currentIndex - 1 };
  }, [currentIndex, children.length]);

  useEffect(() => {
    if (!autoplay) {
      // Skip autoplay
      return () => {};
    }
    const iv = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % children.length);
    }, interval);
    return () => clearInterval(iv);
  }, [currentIndex, children.length]);

  return (
    <div {...rest} className={classNames(className, 'relative')}>
      <div className={classNames(wrapperClassName, 'relative', 'overflow-hidden')}>
        {
          children.map((item, i) => (
            React.createElement(item.type, {
              ...item.props,
              key: item.key || i,
              className: classNames(
                item.props.className,
                'absolute',
                'top-0',
                'left-0',
                'bottom-3',
                'transition-transform',
                'transform',
                'duration-700',
                'ease-in-out',
                'z-10',
                { 'translate-x-full': i === activePage.next },
                { 'translate-x-0': i === activePage.active },
                { '-translate-x-full': i === activePage.prev },
                {
                  hidden: i !== activePage.active
                    && i !== activePage.next
                    && i !== activePage.prev,
                },
              ),
            })))
        }
      </div>
      {
        indicator && (
          <div className={classNames(indicatorClassName, 'z-30 flex space-x-3 justify-center mt-2')}>
            {
              children.map((item, i) => (
                <button
                  key={item.key || i}
                  type="button"
                  className={classNames(
                    'w-3 h-3 rounded-full',
                    i === currentIndex ? activeIndicatorColor : inactiveIndicatorColor,
                  )}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))
            }
          </div>
        )
      }
    </div>
  );
}
