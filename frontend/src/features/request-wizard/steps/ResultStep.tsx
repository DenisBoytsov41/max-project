import { useMemo, useState } from 'react';

import { AppButton } from '../../../components/ui/AppButton';
import { copyToClipboard } from '../../../shared/utils/clipboard';
import type { RequestWizardData } from '../requestWizardTypes';
import { buildRequestText } from '../requestTextBuilder';

type ResultStepProps = {
  data: RequestWizardData;
  onBack: () => void;
  onRestart: () => void;
};

export function ResultStep({ data, onBack, onRestart }: ResultStepProps) {
  const [copyStatus, setCopyStatus] = useState('');

  const requestText = useMemo(() => buildRequestText(data), [data]);

  async function handleCopy() {
    const isCopied = await copyToClipboard(requestText);

    setCopyStatus(isCopied ? 'Текст заявки скопирован.' : 'Не удалось скопировать текст.');
  }

  return (
    <section className="wizard-section">
      <div className="wizard-heading">
        <p className="wizard-heading__step">Шаг 6 из 6</p>
        <h1 className="wizard-heading__title">Заявка сформирована</h1>
        <p className="wizard-heading__text">
          Скопируйте текст и отправьте его в чат с ботом. Во второй версии добавим
          отправку заявки напрямую на сервер.
        </p>
      </div>

      <div className="request-result">
        <pre className="request-result__text">{requestText}</pre>
      </div>

      {copyStatus ? <p className="copy-status">{copyStatus}</p> : null}

      <div className="wizard-actions wizard-actions--stacked">
        <AppButton onClick={handleCopy}>Скопировать текст заявки</AppButton>

        <div className="wizard-actions">
          <AppButton variant="secondary" onClick={onBack}>
            Назад
          </AppButton>

          <AppButton variant="ghost" onClick={onRestart}>
            Новая заявка
          </AppButton>
        </div>
      </div>
    </section>
  );
}