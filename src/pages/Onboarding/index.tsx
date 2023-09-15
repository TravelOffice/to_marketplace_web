import React, { useMemo } from 'react';
import Stepper, { Step } from '@/pages/Onboarding/components/Stepper';
import OnboardingCompany from '@/pages/Onboarding/tabs/OnboardingCompany';
import OnboardingAddUsers from '@/pages/Onboarding/tabs/OnboardingAddUsers';
import OnboardingReview from '@/pages/Onboarding/tabs/OnboardingReview';

const steps: Step[] = [
  { title: 'Thông tin công ty' },
  { title: 'Thêm thành viên' },
  { title: 'Hoàn thành' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const renderedTab = useMemo(() => {
    if (currentStep === 0) {
      return (
        <OnboardingCompany
          onNext={() => setCurrentStep(1)}
        />
      );
    }
    if (currentStep === 1) {
      return (
        <OnboardingAddUsers
          onNext={() => setCurrentStep(2)}
        />
      );
    }
    return <OnboardingReview />;
  }, [currentStep]);

  return (
    <div className="z-40 bg-gray-50 dark:bg-[#161d31]">
      <div className="max-w-4xl mx-auto mt-16">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>
      <div>
        {renderedTab}
      </div>
    </div>
  );
}
