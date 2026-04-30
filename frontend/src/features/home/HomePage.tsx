import { useNavigate } from 'react-router-dom';

import { appConfig } from '../../app/appConfig';
import { routes } from '../../app/routes';
import { ActionCard } from '../../components/ui/ActionCard';
import { getCurrentMaxUser } from '../../services/max/maxBridge';

export function HomePage() {
  const navigate = useNavigate();
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
          onClick={() => navigate(routes.request)}
        />

        <ActionCard
          icon="🛠️"
          title="Диагностика проблемы"
          text="Выберите категорию: 1С, касса, ЭДО, принтер, сеть или компьютер."
          onClick={() => navigate(routes.diagnostics)}
        />

        <ActionCard
          icon="📚"
          title="Частые инструкции"
          text="Короткие подсказки по типовым проблемам перед обращением."
          onClick={() => navigate(routes.knowledge)}
        />

        <ActionCard
          icon="☎️"
          title="Контакты"
          text="Телефон, почта, график работы и способы связи с поддержкой."
          onClick={() => navigate(routes.contacts)}
        />

        <ActionCard
          icon="ℹ️"
          title="О компании"
          text="Кратко о К-Сервис, возможностях приложения и планах развития."
          onClick={() => navigate(routes.about)}
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