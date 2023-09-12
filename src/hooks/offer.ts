import { toast } from 'react-toastify';
import {
  useInfiniteQuery, useMutation, UseMutationOptions, useQuery,
} from '@tanstack/react-query';
import { NUMBER_ITEM_PER_PAGE, SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import {
  CreateOfferFormData,
  Offer,
  OfferStatus,
  RejectOfferFormData,
} from '@/models/TourPost/Offer';
import marketplaceApi from '@/services/marketplaceApi';
import { PaginationPayload } from '@/services/BaseApi';

export function useOffersOfPost(tourPostId: string, enabled?: boolean) {
  return useQuery(
    {
      queryKey: ['offers_of_post', tourPostId],
      queryFn: ({ signal }) => marketplaceApi.get<Offer[]>(`/posts/${tourPostId}/offers`, {
        signal,
      }),
      enabled,
    },
  );
}

export const useCreateOfferMutation = (
  options: UseMutationOptions<Offer, Error, CreateOfferFormData>,
) => useMutation(
  (offer: CreateOfferFormData) => marketplaceApi.post<Offer>(`/posts/${offer.tourPostId}/offers`, offer),
  options,
);

export function useSentOfferOfOrganization(offerStatus?: OfferStatus) {
  return useInfiniteQuery({
    queryKey: ['sent_offers_of_org', offerStatus],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<Offer>>(
      '/me/organizations/sent-offers',
      {
        queryParams: {
          offerStatus,
          nextToken: pageParam,
          limit: NUMBER_ITEM_PER_PAGE,
        },
        signal,
      },
    ),
    getNextPageParam: (lastPage) => {
      const nextToken = lastPage.paging.cursors.before;
      if (nextToken === '') return undefined;
      return nextToken;
    },
  });
}

export function useReceivedOfferOfOrganization(offerStatus?: OfferStatus) {
  return useInfiniteQuery({
    queryKey: ['received_offers_of_org', offerStatus],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<Offer>>(
      '/me/organizations/received-offers',
      {
        queryParams: {
          offerStatus,
          nextToken: pageParam,
          limit: NUMBER_ITEM_PER_PAGE,
        },
        signal,
      },
    ),
    getNextPageParam: (lastPage) => {
      const nextToken = lastPage.paging.cursors.before;
      if (nextToken === '') return undefined;
      return nextToken;
    },
  });
}

export function useOffer(offerId: string) {
  return useQuery(
    ['offer', offerId],
    ({ signal }) => marketplaceApi.get(`/offers/${offerId}`, {
      signal,
    }),
  );
}

export function useUpdateOffer(offer: Offer) {
  return useMutation(
    () => marketplaceApi.put(`/offers/${offer.code}`, offer),
    {
      onSuccess: () => {
        // Show success toast
        toast.success(UPDATE_SUCCESS);
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
}

export function useCancelOffer(offerId: string, cancelReason: string) {
  return useMutation(
    () => marketplaceApi.put(`/offers/${offerId}/cancel`, { cancelReason }),
    {
      onSuccess: () => {
        // Show success toast
        toast.success(UPDATE_SUCCESS);
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
}

export const useAcceptOfferMutation = (
  options: UseMutationOptions<Offer, Error, string>,
) => useMutation(
  (offerId: string) => marketplaceApi.put<Offer>(`/offers/${offerId}/accept`),
  options,
);

export const useRejectOfferMutation = (
  offerId: string,
  options: UseMutationOptions<Offer, Error, RejectOfferFormData>,
) => useMutation(
  (data: RejectOfferFormData) => marketplaceApi.put<Offer>(`/offers/${offerId}/reject`, data),
  options,
);

export function useMySentOffers(offerStatus?: OfferStatus) {
  return useInfiniteQuery({
    queryKey: ['my_sent_offers', offerStatus],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<Offer>>(
      '/me/sent-offers',
      {
        queryParams: {
          offerStatus,
          nextToken: pageParam,
          limit: NUMBER_ITEM_PER_PAGE,
        },
        signal,
      },
    ),
    getNextPageParam: (lastPage) => {
      const nextToken = lastPage.paging.cursors.before;
      if (nextToken === '') return undefined;
      return nextToken;
    },
  });
}

export function useMyReceivedOffers(offerStatus?: OfferStatus) {
  return useInfiniteQuery({
    queryKey: ['my_received_offers', offerStatus],
    queryFn: async ({
      signal,
      pageParam,
    }) => marketplaceApi.get<PaginationPayload<Offer>>(
      '/me/received-offers',
      {
        queryParams: {
          offerStatus,
          nextToken: pageParam,
          limit: NUMBER_ITEM_PER_PAGE,
        },
        signal,
      },
    ),
    getNextPageParam: (lastPage) => {
      const nextToken = lastPage.paging.cursors.before;
      if (nextToken === '') return undefined;
      return nextToken;
    },
  });
}
