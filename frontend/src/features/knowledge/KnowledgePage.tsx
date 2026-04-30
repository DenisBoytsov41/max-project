import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ActionCard } from '../../components/ui/ActionCard';
import { knowledgeBase } from '../../data/knowledgeBase';

export function KnowledgePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    const preparedQuery = searchQuery.trim().toLowerCase();

    if (!preparedQuery) {
      return knowledgeBase;
    }

    return knowledgeBase.filter((article) => {
      const searchableText = [
        article.title,
        article.description,
        ...article.tags,
        ...article.steps,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(preparedQuery);
    });
  }, [searchQuery]);

  return (
    <section className="knowledge-page">
      <div className="wizard-heading">
        <p className="wizard-heading__step">Инструкции</p>
        <h1 className="wizard-heading__title">Частые инструкции</h1>
        <p className="wizard-heading__text">
          Короткие подсказки по типовым проблемам. Если инструкция не помогла,
          можно сразу создать заявку.
        </p>
      </div>

      <label className="knowledge-search">
        <span className="knowledge-search__label">Поиск по инструкциям</span>
        <input
          className="knowledge-search__input"
          type="search"
          placeholder="Например: 1С, касса, VPN, печать..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </label>

      <div className="app-grid">
        {filteredArticles.map((article) => (
          <ActionCard
            key={article.id}
            icon={article.icon}
            title={article.title}
            text={article.description}
            onClick={() => navigate(`/knowledge/${article.id}`)}
          />
        ))}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="empty-state">
          <h2 className="empty-state__title">Ничего не найдено</h2>
          <p className="empty-state__text">
            Попробуйте другой запрос или создайте заявку в поддержку.
          </p>
        </div>
      ) : null}
    </section>
  );
}