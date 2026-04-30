export const routes = {
  home: '/',
  request: '/request',
  diagnostics: '/diagnostics',
  knowledge: '/knowledge',
  contacts: '/contacts',
  about: '/about',
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

export type NavigationItem = {
  title: string;
  path: AppRoute;
  emoji: string;
};

export const navigationItems: NavigationItem[] = [
  {
    title: 'Главная',
    path: routes.home,
    emoji: '🏠',
  },
  {
    title: 'Заявка',
    path: routes.request,
    emoji: '📝',
  },
  {
    title: 'Диагностика',
    path: routes.diagnostics,
    emoji: '🛠️',
  },
  {
    title: 'Инструкции',
    path: routes.knowledge,
    emoji: '📚',
  },
  {
    title: 'Контакты',
    path: routes.contacts,
    emoji: '☎️',
  },
];