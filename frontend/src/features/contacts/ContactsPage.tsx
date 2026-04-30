import { useNavigate } from 'react-router-dom';

import { routes } from '../../app/routes';
import { AppButton } from '../../components/ui/AppButton';
import { companyInfo } from '../../data/companyInfo';
import {
  openExternalLink,
  openMaxLink,
} from '../../services/max/maxBridge';

type ContactCardProps = {
  icon: string;
  title: string;
  value: string;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
};

function ContactCard({
  icon,
  title,
  value,
  text,
  actionLabel,
  onAction,
}: ContactCardProps) {
  return (
    <section className="contact-card">
      <div className="contact-card__icon">{icon}</div>

      <div className="contact-card__content">
        <p className="contact-card__title">{title}</p>
        <p className="contact-card__value">{value}</p>
        <p className="contact-card__text">{text}</p>

        {actionLabel && onAction ? (
          <AppButton variant="secondary" onClick={onAction}>
            {actionLabel}
          </AppButton>
        ) : null}
      </div>
    </section>
  );
}

export function ContactsPage() {
  const navigate = useNavigate();

  return (
    <section className="contacts-page">
      <div className="contacts-hero">
        <div className="contacts-hero__icon">☎️</div>

        <div>
          <p className="wizard-heading__step">Контакты</p>
          <h1 className="wizard-heading__title">{companyInfo.name}</h1>
          <p className="wizard-heading__text">{companyInfo.description}</p>
        </div>
      </div>

      <div className="contacts-grid">
        <ContactCard
          icon="📞"
          title="Телефон поддержки"
          value={companyInfo.phone}
          text="Позвоните, если вопрос срочный или работа полностью остановлена."
          actionLabel="Позвонить"
          onAction={() => openExternalLink(companyInfo.phoneHref)}
        />

        <ContactCard
          icon="✉️"
          title="Email"
          value={companyInfo.email}
          text="Подходит для описания несрочных вопросов, отправки скриншотов и документов."
          actionLabel="Написать письмо"
          onAction={() => openExternalLink(companyInfo.emailHref)}
        />

        <ContactCard
          icon="💬"
          title="Чат в MAX"
          value="Написать боту"
          text="Откройте чат с ботом поддержки и отправьте сформированный текст заявки."
          actionLabel="Открыть чат"
          onAction={() => openMaxLink(companyInfo.maxBotUrl)}
        />

        <ContactCard
          icon="🕘"
          title="График работы"
          value={companyInfo.workSchedule}
          text={companyInfo.responseNote}
        />
      </div>

      <section className="contact-cta">
        <h2 className="contact-cta__title">Не знаете, куда обратиться?</h2>
        <p className="contact-cta__text">
          Создайте заявку через мастер. Приложение поможет выбрать категорию,
          уточнить проблему и сформировать понятное обращение для специалиста.
        </p>

        <div className="contact-cta__actions">
          <AppButton onClick={() => navigate(routes.request)}>
            Создать заявку
          </AppButton>

          <AppButton
            variant="secondary"
            onClick={() => navigate(routes.diagnostics)}
          >
            Пройти диагностику
          </AppButton>
        </div>
      </section>

      <section className="contact-note">
        <h2 className="contact-note__title">Что лучше указать при обращении</h2>

        <ul className="contact-note__list">
          <li>Название организации.</li>
          <li>Контактное лицо и телефон.</li>
          <li>Что именно не работает.</li>
          <li>Текст ошибки или скриншот, если он есть.</li>
          <li>Насколько срочно нужно решить проблему.</li>
        </ul>
      </section>
    </section>
  );
}