import type { ReactNode } from 'react';

type ActionCardProps = {
  icon: ReactNode;
  title: string;
  text: string;
  onClick: () => void;
};

export function ActionCard({ icon, title, text, onClick }: ActionCardProps) {
  return (
    <button className="action-card" type="button" onClick={onClick}>
      <span className="action-card__icon">{icon}</span>

      <span>
        <span className="action-card__title">{title}</span>
        <span className="action-card__text">{text}</span>
      </span>

      <span className="action-card__arrow">›</span>
    </button>
  );
}