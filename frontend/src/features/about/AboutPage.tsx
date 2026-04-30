import { useNavigate } from 'react-router-dom';

import { routes } from '../../app/routes';
import { AppButton } from '../../components/ui/AppButton';
import { companyInfo } from '../../data/companyInfo';
import {
  getMaxPlatform,
  getMaxVersion,
  isRunningInsideMax,
} from '../../services/max/maxBridge';

const supportDirections = [
  {
    icon: '🧾',
    title: '1С',
    text: 'Помощь с запуском, базами, печатными формами, обменами, ошибками и сопровождением.',
  },
  {
    icon: '💳',
    title: 'Кассы и ОФД',
    text: 'Проверка кассового оборудования, чеков, смен и передачи данных оператору фискальных данных.',
  },
  {
    icon: '📄',
    title: 'ЭДО',
    text: 'Помощь с электронными документами, сертификатами, подписями и обменом с контрагентами.',
  },
  {
    icon: '🖨️',
    title: 'Оборудование',
    text: 'Принтеры, сканеры, рабочие места, периферия и типовые офисные проблемы.',
  },
  {
    icon: '🌐',
    title: 'Сеть и доступ',
    text: 'Интернет, локальная сеть, VPN, RDP, доступ к серверу и удалённая работа.',
  },
];

const mvpFeatures = [
  'Создание текста заявки без backend.',
  'Пошаговый выбор категории и проблемы.',
  'Определение срочности обращения.',
  'Контактные данные клиента.',
  'Копирование готового текста заявки.',
  'Диагностика по основным категориям.',
  'Частые инструкции по типовым проблемам.',
];

const nextVersionFeatures = [
  'Отправка заявки на сервер.',
  'Номер заявки после создания.',
  'Уведомление пользователя через бота.',
  'История обращений клиента.',
  'Статусы: новая, в работе, ожидает ответа, выполнена.',
  'Авторизация пользователя через проверку MAX initData.',
];

function AboutInfoCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <section className="about-info-card">
      <div className="about-info-card__icon">{icon}</div>

      <div>
        <h2 className="about-info-card__title">{title}</h2>
        <p className="about-info-card__text">{text}</p>
      </div>
    </section>
  );
}

function FeatureList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="about-card">
      <h2 className="about-card__title">{title}</h2>

      <ul className="about-list">
        {items.map((item) => (
          <li key={item} className="about-list__item">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AboutPage() {
  const navigate = useNavigate();

  const launchEnvironment = isRunningInsideMax()
    ? `Запущено внутри MAX · ${getMaxPlatform()} · версия ${getMaxVersion()}`
    : 'Локальный режим разработки';

  return (
    <section className="about-page">
      <div className="about-hero">
        <div className="about-hero__icon">🛠️</div>

        <div>
          <p className="wizard-heading__step">О приложении</p>
          <h1 className="wizard-heading__title">{companyInfo.appName}</h1>
          <p className="wizard-heading__text">
            Мини-приложение для клиентов {companyInfo.name}: помогает быстро
            описать проблему, пройти первичную диагностику и подготовить
            обращение для специалиста.
          </p>
        </div>
      </div>

      <section className="about-card">
        <h2 className="about-card__title">О компании</h2>
        <p className="about-card__text">
          {companyInfo.name} занимается технической поддержкой пользователей,
          сопровождением рабочих мест, помощью с 1С, кассами, ЭДО, сетью,
          удалённым доступом и офисной инфраструктурой.
        </p>
      </section>

      <section className="about-directions">
        {supportDirections.map((direction) => (
          <AboutInfoCard
            key={direction.title}
            icon={direction.icon}
            title={direction.title}
            text={direction.text}
          />
        ))}
      </section>

      <FeatureList title="Что умеет первая версия" items={mvpFeatures} />

      <FeatureList title="Что добавим позже" items={nextVersionFeatures} />

      <section className="about-card">
        <h2 className="about-card__title">Среда запуска</h2>
        <p className="about-card__text">{launchEnvironment}</p>
      </section>

      <section className="about-cta">
        <h2 className="about-cta__title">Нужна помощь?</h2>
        <p className="about-cta__text">
          Начните с диагностики или сразу создайте заявку. Приложение поможет
          сформировать обращение так, чтобы специалист быстрее понял проблему.
        </p>

        <div className="about-cta__actions">
          <AppButton onClick={() => navigate(routes.request)}>
            Создать заявку
          </AppButton>

          <AppButton
            variant="secondary"
            onClick={() => navigate(routes.diagnostics)}
          >
            Диагностика
          </AppButton>

          <AppButton
            variant="ghost"
            onClick={() => navigate(routes.contacts)}
          >
            Контакты
          </AppButton>
        </div>
      </section>
    </section>
  );
}