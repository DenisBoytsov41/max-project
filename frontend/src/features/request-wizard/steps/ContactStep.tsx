import { AppButton } from '../../../components/ui/AppButton';
import { AppInput } from '../../../components/ui/AppInput';
import { requestUserContact } from '../../../services/max/maxBridge';
import type { RequestWizardData } from '../requestWizardTypes';

type ContactStepProps = {
  data: RequestWizardData;
  onChange: (patch: Partial<RequestWizardData>) => void;
  onBack: () => void;
  onNext: () => void;
};

export function ContactStep({
  data,
  onChange,
  onBack,
  onNext,
}: ContactStepProps) {
  const canGoNext = data.contactName.trim().length > 0 || data.phone.trim().length > 0;

  async function handleRequestContact() {
    const contact = await requestUserContact();

    if (contact?.phone) {
      onChange({ phone: contact.phone });
    }
  }

  return (
    <section className="wizard-section">
      <div className="wizard-heading">
        <p className="wizard-heading__step">Шаг 4 из 6</p>
        <h1 className="wizard-heading__title">Контактные данные</h1>
        <p className="wizard-heading__text">
          Укажите, с кем связаться по заявке. Номер можно ввести вручную или
          запросить через MAX.
        </p>
      </div>

      <div className="form-card">
        <AppInput
          label="Организация"
          name="organization"
          placeholder="Например: ООО Ромашка"
          value={data.organization}
          onChange={(event) => onChange({ organization: event.target.value })}
        />

        <AppInput
          label="Контактное лицо"
          name="contactName"
          placeholder="Например: Иван Петров"
          value={data.contactName}
          onChange={(event) => onChange({ contactName: event.target.value })}
        />

        <AppInput
          label="Телефон"
          name="phone"
          placeholder="+7 900 000-00-00"
          value={data.phone}
          onChange={(event) => onChange({ phone: event.target.value })}
        />

        <AppButton variant="secondary" onClick={handleRequestContact}>
          Запросить телефон из MAX
        </AppButton>
      </div>

      <div className="wizard-actions">
        <AppButton variant="secondary" onClick={onBack}>
          Назад
        </AppButton>

        <AppButton onClick={onNext} disabled={!canGoNext}>
          Далее
        </AppButton>
      </div>
    </section>
  );
}