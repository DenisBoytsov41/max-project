import { useMemo, useState } from 'react';

import { AppButton } from '../../../components/ui/AppButton';
import {
  createSupportRequest,
  type SupportRequestResponse,
} from '../../../services/api/requestsApi';
import {
  getCurrentMaxUser,
  getInitData,
} from '../../../services/max/maxBridge';
import { findCategory, findProblem, findUrgency } from '../../../data/issueCategories';
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
  const [submitStatus, setSubmitStatus] = useState('');
  const [createdRequest, setCreatedRequest] = useState<SupportRequestResponse | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestText = useMemo(() => buildRequestText(data), [data]);

  async function handleCopy() {
    const isCopied = await copyToClipboard(requestText);

    setCopyStatus(isCopied ? 'Текст заявки скопирован.' : 'Не удалось скопировать текст.');
  }

  async function handleSubmit() {
    const category = findCategory(data.categoryId);
    const problem = findProblem(data.categoryId, data.problemId);
    const urgency = findUrgency(data.urgencyId);
    const maxUser = getCurrentMaxUser();

    if (!category || !problem || !urgency) {
      setSubmitStatus('Не удалось отправить заявку: не заполнены категория, проблема или срочность.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');
    setCreatedRequest(null);

    try {
      const response = await createSupportRequest({
        category_id: category.id,
        category_title: category.title,

        problem_id: problem.id,
        problem_title: problem.title,

        urgency_id: urgency.id,
        urgency_title: urgency.title,

        organization: data.organization,
        contact_name: data.contactName,
        phone: data.phone,

        description: data.description,

        init_data: getInitData() || null,
        max_user_id: maxUser?.id ? String(maxUser.id) : null,
        max_username: maxUser?.username ?? null,
      });

      setCreatedRequest(response);
      setSubmitStatus(`Заявка отправлена. Номер: ${response.request_number}`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Не удалось отправить заявку. Проверьте backend.';

      setSubmitStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="wizard-section">
      <div className="wizard-heading">
        <p className="wizard-heading__step">Шаг 6 из 6</p>
        <h1 className="wizard-heading__title">Заявка сформирована</h1>
        <p className="wizard-heading__text">
          Можно отправить заявку на backend или скопировать текст и отправить его в чат с ботом.
        </p>
      </div>

      <div className="request-result">
        <pre className="request-result__text">{requestText}</pre>
      </div>

      {createdRequest ? (
        <section className="api-success">
          <h2 className="api-success__title">Заявка создана</h2>
          <p className="api-success__text">
            Номер заявки: <strong>{createdRequest.request_number}</strong>
          </p>
          <p className="api-success__text">
            Статус: <strong>{createdRequest.status}</strong>
          </p>
        </section>
      ) : null}

      {submitStatus ? <p className="api-status">{submitStatus}</p> : null}
      {copyStatus ? <p className="copy-status">{copyStatus}</p> : null}

      <div className="wizard-actions wizard-actions--stacked">
        <AppButton onClick={handleSubmit} disabled={isSubmitting || Boolean(createdRequest)}>
          {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
        </AppButton>

        <AppButton variant="secondary" onClick={handleCopy}>
          Скопировать текст заявки
        </AppButton>

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