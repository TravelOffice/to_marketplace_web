import { toast } from 'react-toastify';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import authorizedRequest from '@/services/authorizedRequest';
import { SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import { CreateOfferFormData, Offer } from '@/models/TourPost/Offer';

export function useOffersOfPost(tourPostId: string, enabled?: boolean) {
  return useQuery(
    {
      queryKey: ['offers_of_post', tourPostId],
      queryFn: ({ signal }) => authorizedRequest.get(`/posts/${tourPostId}/offers`, {
        signal,
      }),
      enabled,
    },
  );
}

export const useCreateOfferMutation = (
  options: UseMutationOptions<Offer, Error, CreateOfferFormData>,
) => useMutation(
  (offer: CreateOfferFormData) => authorizedRequest.post<Offer>(`/posts/${offer.tourPostId}/offers`, offer),
  options,
);

export function useSentOfferOfOrganization(organization: string) {
  return useQuery(
    ['sent_offers_of_org', organization],
    ({ signal }) => authorizedRequest.get(`/organizations/${organization}/sent-offers`, {
      signal,
    }),
  );
}

export function useReceivedOfferOfOrganization(organization: string) {
  return useQuery(
    ['received_offers_of_org', organization],
    ({ signal }) => authorizedRequest.get(`/me/organizations/${organization}/received-offers`, {
      signal,
    }),
  );
}

export function useOffer(offerId: string) {
  return useQuery(
    ['offer', offerId],
    ({ signal }) => authorizedRequest.get(`/offers/${offerId}`, {
      signal,
    }),
  );
}

export function useUpdateOffer(offer: Offer) {
  return useMutation(
    () => authorizedRequest.put(`/offers/${offer.code}`, offer),
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
    () => authorizedRequest.put(`/offers/${offerId}/cancel`, { cancelReason }),
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

export function useAcceptOffer(offerId: string) {
  return useMutation(
    () => authorizedRequest.put(`/offers/${offerId}/accept`),
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

export function useRejectOffer(offerId: string, rejectReason: string) {
  return useMutation(
    () => authorizedRequest.put(`/offers/${offerId}/reject`, { rejectReason }),
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

export function useMySentOffers() {
  return useQuery(
    ['my_sent_offer'],
    ({ signal }) => authorizedRequest.get('/me/sent-offers', {
      signal,
    }),
  );
}

export function useMyReceivedOffers() {
  return useQuery(
    ['my_received_offer'],
    ({ signal }) => authorizedRequest.get('/me/received-offers', {
      signal,
    }),
  );
}
