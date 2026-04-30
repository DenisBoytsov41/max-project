import { findCategory } from '../../../data/issueCategories';
import { ActionCard } from '../../../components/ui/ActionCard';
import { AppButton } from '../../../components/ui/AppButton';
import type { RequestWizardData } from '../requestWizardTypes';

type ProblemStepProps = {
  data: RequestWizardData;
  onChange: (patch: Partial<RequestWizardData>) => void;
  onBack: () => void;
  onNext: () => void;
};

export function ProblemStep({
  data,
  onChange,
  onBack,
  onNext,
}: ProblemStepProps) {
  const category = findCategory(data.categoryId);

  if (!category) {
    return (
      <section className="wizard-section">
        <div className="wizard-heading">
          <h1 className="wizard-heading__title">Категория не выбрана</h1>
          <p className="wizard-heading__text">
            Вернитесь назад и выберите категорию проблемы.
          </p>
        </div>

        <AppButton variant="secondary" onClick={onBack}>
          Назад
        </AppButton>
      </section>
    );
  }

  function handleSelect(problemId: string) {
    onChange({ problemId });
    onNext();
  }

  return (
    <section className="wizard-section">
      <div className="wizard-heading">
        <p className="wizard-heading__step">Шаг 2 из 6</p>
        <h1 className="wizard-heading__title">Уточните проблему</h1>
        <p className="wizard-heading__text">
          Категория: {category.icon} {category.title}
        </p>
      </div>

      <div className="app-grid">
        {category.problems.map((problem) => (
          <ActionCard
            key={problem.id}
            icon="•"
            title={problem.title}
            text={problem.description}
            onClick={() => handleSelect(problem.id)}
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