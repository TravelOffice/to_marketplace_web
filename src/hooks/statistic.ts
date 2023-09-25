import { useQuery } from '@tanstack/react-query';
import marketplaceApi from '@/services/marketplaceApi';
import { MarketplaceStatistic } from '@/models/Marketplace/MarketplaceStatistic';
import { useCurrentUser } from './auth';

export function useStatistic() {
  return useQuery(
    ['statistic'],
    ({ signal }) => marketplaceApi.get<MarketplaceStatistic>('/statistic', {
      signal,
    }),
  );
}

export function useOrganizationStatistic(organization: string) {
  const { data } = useQuery(
    ['statistic', organization],
    ({ signal }) => marketplaceApi.get<MarketplaceStatistic>(`/organizations/${organization}/statistic`, {
      signal,
    }),
  );
  return data;
}

export function useCurrentOrganizationStatistic() {
  const currentUser = useCurrentUser();
  if (currentUser) {
    return useOrganizationStatistic(currentUser.organization);
  }
  return undefined;
}
