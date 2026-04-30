import { useEffect, useMemo, useState } from 'react';

import {
  disableClosingConfirmation,
  enableClosingConfirmation,
} from '../../services/max/maxBridge';
import type {
  RequestWizardData,
  RequestWizardStep,
} from './requestWizardTypes';
import { CategoryStep } from './steps/CategoryStep';
import { ContactStep } from './steps/ContactStep';
import { DescriptionStep } from './steps/DescriptionStep';
import { ProblemStep } from './steps/ProblemStep';
import { ResultStep } from './steps/ResultStep';
import { UrgencyStep } from './steps/UrgencyStep';

const initialData: RequestWizardData = {
  categoryId: '',
  problemId: '',
  urgencyId: '',
  organization: '',
  contactName: '',
  phone: '',
  description: '',
};

const steps: RequestWizardStep[] = [
  'category',
  'problem',
  'urgency',
  'contact',
  'description',
  'result',
];

export function RequestWizardPage() {
  const [data, setData] = useState<RequestWizardData>(initialData);
  const [activeStep, setActiveStep] = useState<RequestWizardStep>('category');

  const activeStepIndex = useMemo(() => steps.indexOf(activeStep), [activeStep]);

  const isDirty = useMemo(() => {
    return Object.values(data).some((value) => value.trim().length > 0);
  }, [data]);

  useEffect(() => {
    if (isDirty && activeStep !== 'result') {
      enableClosingConfirmation();
      return;
    }

    disableClosingConfirmation();
  }, [activeStep, isDirty]);

  useEffect(() => {
    return () => {
      disableClosingConfirmation();
    };
  }, []);

  function handleChange(patch: Partial<RequestWizardData>) {
    setData((currentData) => ({
      ...currentData,
      ...patch,
    }));
  }

  function goNext() {
    const nextStep = steps[activeStepIndex + 1];

    if (nextStep) {
      setActiveStep(nextStep);
    }
  }

  function goBack() {
    const previousStep = steps[activeStepIndex - 1];

    if (previousStep) {
      setActiveStep(previousStep);
    }
  }

  function restart() {
    setData(initialData);
    setActiveStep('category');
    disableClosingConfirmation();
  }

  switch (activeStep) {
    case 'category':
      return <CategoryStep data={data} onChange={handleChange} onNext={goNext} />;

    case 'problem':
      return (
        <ProblemStep
          data={data}
          onChange={handleChange}
          onBack={goBack}
          onNext={goNext}
        />
      );

    case 'urgency':
      return (
        <UrgencyStep
          data={data}
          onChange={handleChange}
          onBack={goBack}
          onNext={goNext}
        />
      );

    case 'contact':
      return (
        <ContactStep
          data={data}
          onChange={handleChange}
          onBack={goBack}
          onNext={goNext}
        />
      );

    case 'description':
      return (
        <DescriptionStep
          data={data}
          onChange={handleChange}
          onBack={goBack}
          onNext={goNext}
        />
      );

    case 'result':
      return <ResultStep data={data} onBack={goBack} onRestart={restart} />;

    default:
      return <CategoryStep data={data} onChange={handleChange} onNext={goNext} />;
  }
}