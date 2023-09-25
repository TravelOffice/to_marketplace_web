import TourCategory from './TourCategory';
import { TourServicePrice } from './TourServicePrice';
import TourType from './TourType';

export interface TourTemplate {
  name: string,
  readonly code: string;
  category: TourCategory,
  type: TourType,
  visitorCount: number,
  startingLocation: string,
  endingLocation: string,
  durationInDays: number,
  durationInNights: number,
  services: TourServicePrice[],
  policiesAndRegulations: {
    inclusionAndExclusion?: string,
    policyConditionsAndExtraFee?: string,
    cancellationTerms?: string
  },
  readonly createdAt: number,
  readonly updatedAt: number,
  readonly creatorId: string,
  readonly creatorName: string,
}
