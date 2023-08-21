import React from 'react';
import classNames from 'classnames';
import { FiCheck } from 'react-icons/fi';

export interface Step {
  title: string,
}

export interface StepperProps {
  steps: Step[],
  currentStep: number,
}

export default function Stepper(props: StepperProps) {
  const { steps, currentStep } = props;
  return (
    <div className="flex relative dark:text-white">
      {
        steps.map((step, i) => (
          <div className="relative flex-1" key={step.title}>
            <div
              className={classNames(
                'absolute top-3 border-[1px] border-primary opacity-30',
                i > 0 ? '-left-1/2 w-full scale-90' : '',
              )}
            />
            <div className="flex flex-col items-center" key={step.title}>
              <div
                className={classNames(
                  'w-6 h-6 rounded-full relative flex items-center justify-center text-white',
                  i < currentStep ? 'bg-primary' : '',
                  i === currentStep ? 'border-[3px] border-primary' : '',
                  i > currentStep ? 'border-[2px] stroke-gray-200' : '',
                )}
              >
                {i < currentStep && <FiCheck size={16} />}
              </div>
              <span className="text-sm mt-2">{step.title}</span>
            </div>
          </div>
        ))
      }
    </div>
  );
}
