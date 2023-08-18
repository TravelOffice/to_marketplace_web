import React from 'react';
import classNames from 'classnames';

export interface Tab {
  title: string,
  content: React.ReactNode,
}
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: Tab[],
  sticky?: boolean,
  divider?: boolean,
  itemClassName?: string,
}

export default function Tabs(props: TabsProps) {
  const {
    tabs,
    sticky = false,
    divider = true,
    itemClassName,
    ...rest
  } = props;
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <div {...rest}>
      <ul
        className={classNames(
          'border-b border-gray-200 text-sm font-medium text-center text-gray-500 sm:flex dark:text-gray-400',
          sticky ? 'sticky top-20 bg-white dark:bg-gray-800' : '',
          divider ? 'divide-x divide-gray-200 dark:divide-gray-700' : '',
        )}
      >
        {
          tabs.map((tab, index) => (
            <li className={classNames('w-full', itemClassName)} key={tab.title}>
              <button
                type="button"
                onClick={() => setActiveTab(index)}
                className={classNames(
                  'inline-block w-full p-4 border-b-2 rounded-t-lg',
                  index === activeTab ? 'text-primary border-primary' : 'border-transparent hover:text-gray-600 hover:border-gray-300',
                )}
                aria-current="page"
              >
                {tab.title}
              </button>
            </li>
          ))
        }
      </ul>
      {tabs[activeTab].content}
    </div>
  );
}
