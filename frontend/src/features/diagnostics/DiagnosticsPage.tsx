import { useNavigate } from 'react-router-dom';

import { ActionCard } from '../../components/ui/ActionCard';
import { diagnosticsData } from '../../data/diagnosticsData';

export function DiagnosticsPage() {
  const navigate = useNavigate();

  return (
    <section className="diagnostics-page">
      <div className="wizard-heading">
        <p className="wizard-heading__step">Диагностика</p>
        <h1 className="wizard-heading__title">Выберите раздел</h1>
        <p className="wizard-heading__text">
          Откройте подходящую категорию, проверьте базовые причины проблемы и при необходимости создайте заявку.
        </p>
      </div>

      <div className="app-grid">
        {diagnosticsData.map((item) => (
          <ActionCard
            key={item.categoryId}
            icon={item.icon}
            title={item.title}
            text={item.description}
            onClick={() => navigate(`/diagnostics/${item.categoryId}`)}
          />
        ))}
      </div>
    </section>
  );
}