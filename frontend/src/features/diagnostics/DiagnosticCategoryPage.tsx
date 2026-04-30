import { useNavigate, useParams } from 'react-router-dom';

import { routes } from '../../app/routes';
import { AppButton } from '../../components/ui/AppButton';
import { findDiagnosticItem } from '../../data/diagnosticsData';
import type { IssueCategoryId } from '../request-wizard/requestWizardTypes';

function DiagnosticList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="diagnostic-card">
      <h2 className="diagnostic-card__title">{title}</h2>

      <ul className="diagnostic-list">
        {items.map((item) => (
          <li key={item} className="diagnostic-list__item">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function DiagnosticCategoryPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const diagnostic = findDiagnosticItem(categoryId);

  if (!diagnostic) {
    return (
      <section className="wizard-section">
        <div className="wizard-heading">
          <p className="wizard-heading__step">Диагностика</p>
          <h1 className="wizard-heading__title">Раздел не найден</h1>
          <p className="wizard-heading__text">
            Такой категории диагностики нет. Вернитесь к списку разделов.
          </p>
        </div>

        <AppButton variant="secondary" onClick={() => navigate(routes.diagnostics)}>
          Назад к диагностике
        </AppButton>
      </section>
    );
  }

  function handleCreateRequest() {
    navigate(routes.request, {
      state: {
        categoryId: diagnostic?.categoryId as IssueCategoryId,
      },
    });
  }

  return (
    <section className="wizard-section">
      <div className="diagnostic-hero">
        <div className="diagnostic-hero__icon">{diagnostic.icon}</div>

        <div>
          <p className="wizard-heading__step">Диагностика</p>
          <h1 className="wizard-heading__title">{diagnostic.title}</h1>
          <p className="wizard-heading__text">{diagnostic.description}</p>
        </div>
      </div>

      <DiagnosticList title="Что проверить сначала" items={diagnostic.checks} />

      <DiagnosticList title="Что можно попробовать" items={diagnostic.quickActions} />

      <DiagnosticList
        title="Когда лучше создать заявку"
        items={diagnostic.whenToCreateRequest}
      />

      <div className="diagnostic-actions">
        <AppButton onClick={handleCreateRequest}>
          Создать заявку по этой проблеме
        </AppButton>

        <AppButton variant="secondary" onClick={() => navigate(routes.diagnostics)}>
          Назад к разделам
        </AppButton>
      </div>
    </section>
  );
}