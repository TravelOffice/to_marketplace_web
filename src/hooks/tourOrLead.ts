import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { TourTemplate } from '@/models/Tour/TourTemplate';
import { PaginationPayload } from '@/services/BaseApi';
import marketplaceApi from '@/services/marketplaceApi';
import { NUMBER_ITEM_PER_TOUR_PAGE } from '@/utils/constants';
import { Lead } from '@/models/Tour/Lead';

const LEADS_API_PATH = '/available-leads';
const TOURS_API_PATH = '/available-tour-templates';

export type LeadOrTourApiPath = '/available-leads' | '/available-tour-templates';

// T can be TourTemplate or Lead
export interface AvailableToursOrLeadsState<T extends Object> {
  // Pages data of leads
  pages: PaginationPayload<T>[],
  // Number of pages
  // Page count can be changed dynamically
  pageCount: number,
  // From 1 to [pageCount]
  currentPage: number,
  // API path to fetch data
  apiPath: string,
  // Current page can be changed dynamically
  onFirstPageLoaded: (pageData: PaginationPayload<T>) => void,
  // Set new current page
  setCurrentPage: (newCurrentPage: number) => void,
}

export function createToursOrLeadsStore<
    T extends Object,
>(defaultApiPath: LeadOrTourApiPath) {
  const definition = (
    set: (
      partial:
      | AvailableToursOrLeadsState<T>
      | Partial<AvailableToursOrLeadsState<T>>
      | (
        (state: AvailableToursOrLeadsState<T>)
        => AvailableToursOrLeadsState<T> | Partial<AvailableToursOrLeadsState<T>>
      ),
      replace?: boolean | undefined
    ) => void,
    get: () => AvailableToursOrLeadsState<T>,
  ) => ({
    pages: [],
    pageCount: 0,
    currentPage: 0,
    apiPath: defaultApiPath,
    onFirstPageLoaded: (pageData: PaginationPayload<T>) => {
      const { cursors } = pageData.paging;
      const { pages } = get();
      const isExisted = pages.some((page) => {
        const pageCursors = page.paging.cursors;
        return pageCursors.after === cursors.after && pageCursors.before === cursors.before;
      });

      if (!isExisted) {
        set((state) => ({
          pages: [...state.pages, pageData],
          pageCount: state.pageCount + 1,
          currentPage: state.currentPage + 1,
        }));
      }
    },
    setCurrentPage: async (newCurrentPage: number) => {
      const { pageCount, pages, apiPath } = get();
      if (newCurrentPage > pageCount) {
        // Next page data is not stored at the client
        // Need to load more data from server
        let nextToken = '';
        if (pageCount > 0) {
          const { paging } = pages[pages.length - 1];
          nextToken = paging.cursors.before;
        }

        // Data fetched from server via API call
        const pageData = await marketplaceApi.get<PaginationPayload<T>>(
          apiPath,
          {
            queryParams: {
              nextToken,
              limit: NUMBER_ITEM_PER_TOUR_PAGE,
            },
          },
        );
        if (pageData) {
          // After fetched data from server successfully
          // Update pages data state
          set(
            (state) => (
              {
                pages: [...state.pages, pageData],
                currentPage: newCurrentPage,
                pageCount: newCurrentPage,
              }
            ),
          );
        }
      } else {
        set({ currentPage: newCurrentPage });
      }
    },
  });
  return create<AvailableToursOrLeadsState<T>>(definition);
}

export const useAvailableToursStore = createToursOrLeadsStore<TourTemplate>(TOURS_API_PATH);
export const useAvailableLeadsStore = createToursOrLeadsStore<Lead>(LEADS_API_PATH);

export function useFirstLoadAvailableTours() {
  return useQuery({
    queryKey: ['firstLoadAvailableTours'],
    queryFn: async ({ signal }) => marketplaceApi.get<PaginationPayload<TourTemplate>>(
      TOURS_API_PATH,
      {
        queryParams: {
          limit: NUMBER_ITEM_PER_TOUR_PAGE,
        },
        signal,
      },
    ),
  });
}

export function useFirstLoadAvailableLeads() {
  return useQuery({
    queryKey: ['firstLoadAvailableLeads'],
    queryFn: async ({ signal }) => marketplaceApi.get<PaginationPayload<Lead>>(
      LEADS_API_PATH,
      {
        queryParams: {
          limit: NUMBER_ITEM_PER_TOUR_PAGE,
        },
        signal,
      },
    ),
  });
}
