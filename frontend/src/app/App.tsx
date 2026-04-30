import { useMemo, useState } from 'react';

import { appConfig } from './appConfig';
import { navigationItems, routes, type AppRoute } from './routes';
import {
  getCurrentMaxUser,
  getMaxPlatform,
  getMaxVersion,
  isRunningInsideMax,
} from '../services/max/maxBridge';

type ActionCardProps = {
  icon: string;
  title: string;
  text: string;
  onClick: () => void;
};

function ActionCard({ icon, title, text, onClick }: ActionCardProps) {
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

type BottomNavigationProps = {
  activeRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
};

function BottomNavigation({ activeRoute, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      <div className="bottom-nav__inner">
        {navigationItems.map((item) => {
          const isActive = item.path === activeRoute;

          return (
            <button
              key={item.path}
              className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
              type="button"
              onClick={() => onNavigate(item.path)}
            >
              <span className="bottom-nav__icon">{item.emoji}</span>
              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function HomePage({ onNavigate }: { onNavigate: (route: AppRoute) => void }) {
  const user = getCurrentMaxUser();

  const helloText = user?.first_name
    ? `Здравствуйте, ${user.first_name}!`
    : 'Здравствуйте!';

  return (
    <>
      <section className="app-hero">
        <div className="app-hero__badge">🛠️ {appConfig.companyName}</div>

        <h1 className="app-hero__title">{appConfig.appName}</h1>

        <p className="app-hero__text">
          {helloText} Здесь можно быстро создать обращение в поддержку, пройти
          первичную диагностику и открыть частые инструкции.
        </p>
      </section>

      <section className="app-grid" aria-label="Действия">
        <ActionCard
          icon="📝"
          title="Создать заявку"
          text="Пошагово опишем проблему и сформируем готовый текст обращения."
          onClick={() => onNavigate(routes.request)}
        />

        <ActionCard
          icon="🛠️"
          title="Диагностика проблемы"
          text="Выберите категорию: 1С, касса, ЭДО, принтер, сеть или компьютер."
          onClick={() => onNavigate(routes.diagnostics)}
        />

        <ActionCard
          icon="📚"
          title="Частые инструкции"
          text="Короткие подсказки по типовым проблемам перед обращением."
          onClick={() => onNavigate(routes.knowledge)}
        />

        <ActionCard
          icon="☎️"
          title="Контакты"
          text="Телефон, почта, график работы и способы связи с поддержкой."
          onClick={() => onNavigate(routes.contacts)}
        />
      </section>

      <section className="info-panel">
        <h2 className="info-panel__title">Версия MVP</h2>
        <p className="info-panel__text">
          Сейчас приложение работает без backend: оно помогает собрать данные и
          сформировать текст заявки. Отправку заявки на сервер, статусы и историю
          обращений добавим во второй версии.
        </p>
      </section>
    </>
  );
}

function PlaceholderPage({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="page-placeholder">
      <div className="page-placeholder__card">
        <h1 className="page-placeholder__title">{title}</h1>
        <p className="page-placeholder__text">{text}</p>
      </div>
    </section>
  );
}

function renderPage(route: AppRoute, onNavigate: (route: AppRoute) => void) {
  switch (route) {
    case routes.home:
      return <HomePage onNavigate={onNavigate} />;

    case routes.request:
      return (
        <PlaceholderPage
          title="Создание заявки"
          text="На следующем шаге добавим мастер: категория проблемы, уточнение, срочность, контакты, описание и итоговый текст."
        />
      );

    case routes.diagnostics:
      return (
        <PlaceholderPage
          title="Диагностика"
          text="Здесь будет пошаговая диагностика по категориям: 1С, кассы, ЭДО, принтеры, сеть и компьютеры."
        />
      );

    case routes.knowledge:
      return (
        <PlaceholderPage
          title="Частые инструкции"
          text="Здесь разместим базу коротких инструкций для клиентов ООО «К-Сервис»."
        />
      );

    case routes.contacts:
      return (
        <PlaceholderPage
          title="Контакты"
          text={`${appConfig.companyName}. Телефон: ${appConfig.supportPhone}. Почта: ${appConfig.supportEmail}. График: ${appConfig.workSchedule}.`}
        />
      );

    case routes.about:
      return (
        <PlaceholderPage
          title="О компании"
          text="ООО «К-Сервис» — техническая поддержка, сопровождение 1С, касс, ЭДО и рабочих мест."
        />
      );

    default:
      return <HomePage onNavigate={onNavigate} />;
  }
}

export function App() {
  const [activeRoute, setActiveRoute] = useState<AppRoute>(routes.home);

  const environmentText = useMemo(() => {
    const maxStatus = isRunningInsideMax() ? 'запущено внутри MAX' : 'локальный режим';
    const platform = getMaxPlatform();
    const version = getMaxVersion();

    return `${maxStatus}; платформа: ${platform}; версия MAX: ${version}`;
  }, []);

  return (
    <>
      <main className="app-page">
        {renderPage(activeRoute, setActiveRoute)}

        <section className="info-panel">
          <h2 className="info-panel__title">Среда запуска</h2>
          <p className="info-panel__text">{environmentText}</p>
        </section>
      </main>

      <BottomNavigation activeRoute={activeRoute} onNavigate={setActiveRoute} />
    </>
  );
}