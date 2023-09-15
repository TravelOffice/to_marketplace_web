import { useEffect, useState } from 'react';
import marketplaceApi from '@/services/marketplaceApi';
import {
  MarketplaceTermsAcceptedEvidence,
} from '@/models/MarketplaceTermsAcceptedEvidence/MarketplaceTermsAcceptedEvidence';
import { MarketplaceUser } from '@/models/MarketplaceUser/MarketplaceUser';
import { Organization } from '@/models/Organization/Organization';
import { APP_VERSION } from '@/utils/constants';

const onboardingStatuses = [
  'checking', // Default status
  'skip_checking', // User has skipped checking due to access denied
  'not_started', // User has not accepted terms
  'not_created_organization', // User has accepted terms, but has not created organization
  'need_to_upgrade_terms', // User has created organization, but need to upgrade terms
  'completed', // User has created accepted terms and created organization
] as const;

type OnboardingStatus = typeof onboardingStatuses[number];

async function getOnboardingStatus(): Promise<OnboardingStatus> {
  const currentUser = await marketplaceApi.get<MarketplaceUser>('/me');

  const { roles } = currentUser;
  if (!roles.includes('ROOT')) return 'skip_checking';

  const evidence = await marketplaceApi.get<MarketplaceTermsAcceptedEvidence | undefined>('/accept-terms');
  if (!evidence || !evidence.isAccepted) return 'not_started';

  if (evidence.termsVersion !== APP_VERSION) return 'need_to_upgrade_terms';

  const organization = await marketplaceApi.get<Organization | undefined>(`/organizations/${currentUser.organization}`);
  if (!organization) return 'not_created_organization';

  return 'completed';
}

// eslint-disable-next-line import/prefer-default-export
export function useOnboardingStatus(): OnboardingStatus {
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus>('checking');
  useEffect(() => {
    getOnboardingStatus().then((status) => {
      setOnboardingStatus(status);
    });
  }, []);
  return onboardingStatus;
}
