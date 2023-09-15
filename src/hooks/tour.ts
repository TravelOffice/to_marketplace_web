import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { TourTemplate } from '@/models/Tour/TourTemplate';
import { PaginationPayload } from '@/services/BaseApi';
import marketplaceApi from '@/services/marketplaceApi';
import { NUMBER_ITEM_PER_TOUR_PAGE } from '@/utils/constants';

export interface AvailableToursState {
  // Pages data of leads
  tourPages: PaginationPayload<TourTemplate>[],
  // Number of pages
  // Page count can be changed dynamically
  pageCount: number,
  // From 1 to [pageCount]
  currentPage: number,
  // Current page can be changed dynamically
  onFirstPageLoaded: (pageData: PaginationPayload<TourTemplate>) => void,
  // Set new current page
  setCurrentPage: (newCurrentPage: number) => void,
}

export const useAvailableToursStore = create<AvailableToursState>((set, get) => ({
  tourPages: [],
  pageCount: 0,
  currentPage: 0,
  onFirstPageLoaded: (pageData: PaginationPayload<TourTemplate>) => {
    set((state) => ({
      tourPages: [...state.tourPages, pageData],
      currentPage: 1,
      pageCount: 1,
    }));
  },
  setCurrentPage: async (newCurrentPage: number) => {
    const { pageCount, tourPages } = get();
    if (newCurrentPage > pageCount) {
      // Next page data is not stored at the client
      // Need to load more data from server
      let nextToken = '';
      if (pageCount > 0) {
        const { paging } = tourPages[tourPages.length - 1];
        nextToken = paging.cursors.before;
      }

      // Data fetched from server via API call
      const pageData = await marketplaceApi.get<PaginationPayload<TourTemplate>>(
        '/available-tour-templates',
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
              tourPages: [...state.tourPages, pageData],
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
}));

export function useFirstLoadAvailableTours() {
  return useQuery({
    queryKey: ['firstLoadAvailableTours'],
    queryFn: async ({ signal }) => marketplaceApi.get<PaginationPayload<TourTemplate>>(
      '/available-tour-templates',
      {
        queryParams: {
          limit: NUMBER_ITEM_PER_TOUR_PAGE,
        },
        signal,
      },
    ),
  });
}
