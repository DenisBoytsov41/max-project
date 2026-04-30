import { useNavigate, useParams } from 'react-router-dom';

import { routes } from '../../app/routes';
import { AppButton } from '../../components/ui/AppButton';
import { findKnowledgeArticle } from '../../data/knowledgeBase';
import type { IssueCategoryId } from '../request-wizard/requestWizardTypes';

export function KnowledgeArticlePage() {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const article = findKnowledgeArticle(articleId);

  if (!article) {
    return (
      <section className="wizard-section">
        <div className="wizard-heading">
          <p className="wizard-heading__step">Инструкции</p>
          <h1 className="wizard-heading__title">Статья не найдена</h1>
          <p className="wizard-heading__text">
            Такой инструкции нет. Вернитесь к списку статей.
          </p>
        </div>

        <AppButton variant="secondary" onClick={() => navigate(routes.knowledge)}>
          Назад к инструкциям
        </AppButton>
      </section>
    );
  }

  function handleCreateRequest() {
    navigate(routes.request, {
      state: {
        categoryId: article?.categoryId as IssueCategoryId,
      },
    });
  }

  return (
    <article className="knowledge-article">
      <div className="knowledge-article__hero">
        <div className="knowledge-article__icon">{article.icon}</div>

        <div>
          <p className="wizard-heading__step">Инструкция</p>
          <h1 className="wizard-heading__title">{article.title}</h1>
          <p className="wizard-heading__text">{article.description}</p>
        </div>
      </div>

      <section className="knowledge-card">
        <h2 className="knowledge-card__title">Что сделать</h2>

        <ol className="knowledge-steps">
          {article.steps.map((step, index) => (
            <li key={step} className="knowledge-steps__item">
              <span className="knowledge-steps__number">{index + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {article.warning ? (
        <section className="knowledge-warning">
          <h2 className="knowledge-warning__title">Важно</h2>
          <p className="knowledge-warning__text">{article.warning}</p>
        </section>
      ) : null}

      <section className="knowledge-tags" aria-label="Теги статьи">
        {article.tags.map((tag) => (
          <span key={tag} className="knowledge-tag">
            {tag}
          </span>
        ))}
      </section>

      <div className="diagnostic-actions">
        <AppButton onClick={handleCreateRequest}>
          Создать заявку по этой теме
        </AppButton>

        <AppButton variant="secondary" onClick={() => navigate(routes.knowledge)}>
          Назад к инструкциям
        </AppButton>
      </div>
    </article>
  );
}