import React from 'react';
import Dropdown, { DropdownMenu, DropdownToggle, DropdownMenuItem } from '@/components/base/Dropdown';

export default function SearchForm() {
  const [category, setCategory] = React.useState<'tour' | 'lead'>('tour');
  return (
    <form className="container mx-auto mt-24">
      <div className="flex px-32">
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <Dropdown>
          <DropdownToggle className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
            {category === 'tour' ? 'Find tours' : 'Find leads'}
            {' '}
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownMenuItem onClick={() => setCategory('tour')}>
              Find tours
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCategory('lead')}>
              Find leads
            </DropdownMenuItem>
          </DropdownMenu>
        </Dropdown>
        <div className="relative w-full flex">
          <input
            type="search"
            id="search-dropdown"
            className="flex-1 block p-2.5 w-full z-10 text-sm text-gray-900 bg-gray-50 border-l-gray-50 border-l-2 border border-gray-300 focus:border-primary focus:outline-none"
            placeholder="Search Mockups, Logos, Design Templates..."
            required
          />
          <button
            type="submit"
            className="p-2.5 px-5 text-sm font-medium h-full text-white bg-primary rounded-r-lg border border-primary focus:outline-none flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}
