import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import marketplaceApi from '@/services/marketplaceApi';
import {
  MarketplaceTermsAcceptedEvidence,
} from '@/models/MarketplaceTermsAcceptedEvidence/MarketplaceTermsAcceptedEvidence';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import { Organization } from '@/models/Organization/Organization';
import { APP_VERSION } from '@/utils/constants';

const onboardingStatus = [
  'checking', // Default status
  'not_started', // User has not accepted terms
  'not_created_organization', // User has accepted terms, but has not created organization
  'need_to_upgrade_terms', // User has created organization, but need to upgrade terms
  'completed', // User has created accepted terms and created organization
] as const;

type OnboardingStatus = typeof onboardingStatus[number];

// eslint-disable-next-line import/prefer-default-export
export function useOnboardingStatus(): OnboardingStatus {
  const [firstFetch, setFirstFetch] = useState(false);
  const {
    data: evidence, isFetched: isFetchedEvidence,
  } = useQuery(['acceptTerms'], () => marketplaceApi.get<MarketplaceTermsAcceptedEvidence>('/accept-terms'));

  const {
    data: organization, isFetched: isFetchedOrganization,
  } = useQuery(['myOrganization'], async () => {
    const currentUser = await marketplaceApi.get<MarketplaceUser>('/me');
    const org = await marketplaceApi.get<Organization>(`/organizations/${currentUser.organization}`);
    console.log('org', org);
    return org;
  });

  useEffect(() => {
    if (isFetchedEvidence && isFetchedOrganization && !firstFetch) {
      setFirstFetch(true);
    }
  }, [isFetchedEvidence, isFetchedOrganization, firstFetch]);
  console.log('onboarding', evidence, organization);
  return useMemo(() => {
    if (!firstFetch) return 'checking';

    if (!evidence || !evidence.isAccepted) return 'not_started';

    if (evidence.termsVersion !== APP_VERSION) return 'need_to_upgrade_terms';

    if (!organization) return 'not_created_organization';

    return 'completed';
  }, [evidence, organization, firstFetch]);
}
