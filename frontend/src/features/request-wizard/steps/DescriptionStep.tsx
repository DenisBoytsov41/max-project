import { AppButton } from '../../../components/ui/AppButton';
import { AppTextarea } from '../../../components/ui/AppTextarea';
import type { RequestWizardData } from '../requestWizardTypes';

type DescriptionStepProps = {
  data: RequestWizardData;
  onChange: (patch: Partial<RequestWizardData>) => void;
  onBack: () => void;
  onNext: () => void;
};

export function DescriptionStep({
  data,
  onChange,
  onBack,
  onNext,
}: DescriptionStepProps) {
  const canGoNext = data.description.trim().length >= 5;

  return (
    <section className="wizard-section">
      <div className="wizard-heading">
        <p className="wizard-heading__step">Шаг 5 из 6</p>
        <h1 className="wizard-heading__title">Опишите проблему</h1>
        <p className="wizard-heading__text">
          Напишите, что делали перед ошибкой, у кого возникла проблема и когда она началась.
        </p>
      </div>

      <div className="form-card">
        <AppTextarea
          label="Описание"
          name="description"
          placeholder="Например: при открытии базы появляется ошибка, работать в программе не получается..."
          rows={7}
          value={data.description}
          hint="Минимум 5 символов. Чем подробнее описание, тем быстрее специалист поймёт ситуацию."
          onChange={(event) => onChange({ description: event.target.value })}
        />
      </div>

      <div className="wizard-actions">
        <AppButton variant="secondary" onClick={onBack}>
          Назад
        </AppButton>

        <AppButton onClick={onNext} disabled={!canGoNext}>
          Сформировать заявку
        </AppButton>
      </div>
    </section>
  );
}