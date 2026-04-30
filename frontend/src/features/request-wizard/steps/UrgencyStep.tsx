import { urgencyOptions } from '../../../data/issueCategories';
import { ActionCard } from '../../../components/ui/ActionCard';
import { AppButton } from '../../../components/ui/AppButton';
import type { RequestWizardData, UrgencyId } from '../requestWizardTypes';

type UrgencyStepProps = {
  data: RequestWizardData;
  onChange: (patch: Partial<RequestWizardData>) => void;
  onBack: () => void;
  onNext: () => void;
};

const urgencyIcons: Record<UrgencyId, string> = {
  low: '🟢',
  normal: '🔵',
  high: '🟠',
  critical: '🔴',
};

export function UrgencyStep({ onChange, onBack, onNext }: UrgencyStepProps) {
  function handleSelect(urgencyId: UrgencyId) {
    onChange({ urgencyId });
    onNext();
  }

  return (
    <section className="wizard-section">
      <div className="wizard-heading">
        <p className="wizard-heading__step">Шаг 3 из 6</p>
        <h1 className="wizard-heading__title">Насколько срочно?</h1>
        <p className="wizard-heading__text">
          Срочность поможет специалисту быстрее оценить ситуацию.
        </p>
      </div>

      <div className="app-grid">
        {urgencyOptions.map((urgency) => (
          <ActionCard
            key={urgency.id}
            icon={urgencyIcons[urgency.id]}
            title={urgency.title}
            text={urgency.description}
            onClick={() => handleSelect(urgency.id)}
          />
        ))}
      </div>

      <div className="wizard-actions">
        <AppButton variant="secondary" onClick={onBack}>
          Назад
        </AppButton>
      </div>
    </section>
  );
}