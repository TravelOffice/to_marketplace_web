import { useQuery } from '@tanstack/react-query';
import marketplaceApi from '@/services/marketplaceApi';
import { MarketplaceStatistic } from '@/models/Marketplace/MarketplaceStatistic';

export function useStatistic() {
  return useQuery(
    ['statistic'],
    ({ signal }) => marketplaceApi.get<MarketplaceStatistic>('/statistic', {
      signal,
    }),
  );
}
