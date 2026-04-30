import { issueCategories } from '../../../data/issueCategories';
import { ActionCard } from '../../../components/ui/ActionCard';
import type {
  IssueCategoryId,
  RequestWizardData,
} from '../requestWizardTypes';

type CategoryStepProps = {
  data: RequestWizardData;
  onChange: (patch: Partial<RequestWizardData>) => void;
  onNext: () => void;
};

export function CategoryStep({ onChange, onNext }: CategoryStepProps) {
  function handleSelect(categoryId: IssueCategoryId) {
    onChange({
      categoryId,
      problemId: '',
    });

    onNext();
  }

  return (
    <section className="wizard-section">
      <div className="wizard-heading">
        <p className="wizard-heading__step">Шаг 1 из 6</p>
        <h1 className="wizard-heading__title">Что у вас не работает?</h1>
        <p className="wizard-heading__text">
          Выберите основную категорию проблемы. Дальше зададим уточняющие вопросы.
        </p>
      </div>

      <div className="app-grid">
        {issueCategories.map((category) => (
          <ActionCard
            key={category.id}
            icon={category.icon}
            title={category.title}
            text={category.description}
            onClick={() => handleSelect(category.id)}
          />
        ))}
      </div>
    </section>
  );
}