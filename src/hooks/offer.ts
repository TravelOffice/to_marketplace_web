import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import authorizedRequest from '@/services/authorizedRequest';
import { CREATE_SUCCESS, SOMETHING_WRONG, UPDATE_SUCCESS } from '@/utils/constants';
import { Offer } from '@/models/TourPost/Offer.ts';

export function useOffersOfPost(tourPostId: string) {
  return useQuery(
    ['offers_of_post', tourPostId],
    ({ signal }) => authorizedRequest.get(`/posts/${tourPostId}/offers`, {
      signal,
    }),
  );
}

export function useCreateOffer(tourPostId: string, offer: Offer) {
  return useMutation(
    () => authorizedRequest.post(`/posts/${tourPostId}/offers`, offer),
    {
      onSuccess: () => {
        // Show success toast
        toast.success(CREATE_SUCCESS);
      },
      onError: () => {
        toast.error(SOMETHING_WRONG);
      },
    },
  );
}

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
