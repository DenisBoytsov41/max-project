import type {
  IssueCategory,
  UrgencyOption,
} from '../features/request-wizard/requestWizardTypes';

export const issueCategories: IssueCategory[] = [
  {
    id: 'one-c',
    icon: '🧾',
    title: '1С',
    description: 'Базы, документы, печать, обмены, ошибки запуска.',
    problems: [
      {
        id: 'one-c-not-starting',
        title: 'Не запускается 1С',
        description: 'Платформа не открывается или сразу закрывается.',
      },
      {
        id: 'one-c-login-error',
        title: 'Ошибка при входе',
        description: 'Не получается войти в базу или появляется ошибка авторизации.',
      },
      {
        id: 'one-c-database-not-open',
        title: 'Не открывается база',
        description: 'База есть в списке, но при открытии появляется ошибка.',
      },
      {
        id: 'one-c-slow',
        title: 'Медленно работает',
        description: 'Долго открываются документы, отчёты или списки.',
      },
      {
        id: 'one-c-print-error',
        title: 'Ошибка при печати',
        description: 'Не печатаются формы, счета, УПД, ценники или отчёты.',
      },
      {
        id: 'one-c-exchange-error',
        title: 'Ошибка обмена',
        description: 'Не проходит обмен с сайтом, маркетплейсом, РИБ или другой базой.',
      },
      {
        id: 'one-c-other',
        title: 'Другое',
        description: 'Проблема с 1С, которой нет в списке.',
      },
    ],
  },
  {
    id: 'cashbox',
    icon: '💳',
    title: 'Касса / ОФД',
    description: 'Чеки, смены, ОФД, кассовое оборудование.',
    problems: [
      {
        id: 'cashbox-no-check',
        title: 'Не печатает чек',
        description: 'Чек не выходит из кассы или печатается некорректно.',
      },
      {
        id: 'cashbox-ofd-error',
        title: 'Ошибка ОФД',
        description: 'Чеки не уходят в ОФД или появляется ошибка передачи.',
      },
      {
        id: 'cashbox-close-shift-error',
        title: 'Не закрывается смена',
        description: 'При закрытии смены появляется ошибка.',
      },
      {
        id: 'cashbox-open-shift-error',
        title: 'Не открывается смена',
        description: 'Касса не даёт открыть новую смену.',
      },
      {
        id: 'cashbox-other',
        title: 'Другое',
        description: 'Другая проблема с кассой или ОФД.',
      },
    ],
  },
  {
    id: 'edo',
    icon: '📄',
    title: 'ЭДО',
    description: 'Документы, подписи, сертификаты, обмен.',
    problems: [
      {
        id: 'edo-send-error',
        title: 'Не отправляется документ',
        description: 'Документ не уходит контрагенту.',
      },
      {
        id: 'edo-sign-error',
        title: 'Не подписывается документ',
        description: 'Ошибка при подписании или выборе сертификата.',
      },
      {
        id: 'edo-certificate-error',
        title: 'Ошибка сертификата',
        description: 'Сертификат не найден, истёк или не подходит.',
      },
      {
        id: 'edo-receive-error',
        title: 'Не приходит документ',
        description: 'Ожидаемый документ не появляется во входящих.',
      },
      {
        id: 'edo-other',
        title: 'Другое',
        description: 'Другая проблема с ЭДО.',
      },
    ],
  },
  {
    id: 'printer',
    icon: '🖨️',
    title: 'Принтер / сканер',
    description: 'Печать, сканирование, очередь, драйверы.',
    problems: [
      {
        id: 'printer-no-print',
        title: 'Не печатает',
        description: 'Документы отправляются, но не выходят на печать.',
      },
      {
        id: 'printer-bad-quality',
        title: 'Плохое качество печати',
        description: 'Бледная печать, полосы, смазывание или обрезание.',
      },
      {
        id: 'printer-queue-stuck',
        title: 'Зависла очередь печати',
        description: 'Документы стоят в очереди и не печатаются.',
      },
      {
        id: 'scanner-error',
        title: 'Не работает сканер',
        description: 'Сканер не определяется или выдаёт ошибку.',
      },
      {
        id: 'printer-other',
        title: 'Другое',
        description: 'Другая проблема с печатью или сканированием.',
      },
    ],
  },
  {
    id: 'computer',
    icon: '💻',
    title: 'Компьютер',
    description: 'Windows, программы, производительность, ошибки.',
    problems: [
      {
        id: 'computer-slow',
        title: 'Медленно работает',
        description: 'Компьютер зависает или долго открывает программы.',
      },
      {
        id: 'computer-program-error',
        title: 'Ошибка программы',
        description: 'Не запускается или падает нужная программа.',
      },
      {
        id: 'computer-windows-error',
        title: 'Ошибка Windows',
        description: 'Появляются системные ошибки или синий экран.',
      },
      {
        id: 'computer-other',
        title: 'Другое',
        description: 'Другая проблема с компьютером.',
      },
    ],
  },
  {
    id: 'network',
    icon: '🌐',
    title: 'Интернет / сеть',
    description: 'Интернет, Wi-Fi, доступ к серверу, VPN, RDP.',
    problems: [
      {
        id: 'network-no-internet',
        title: 'Нет интернета',
        description: 'Сайты не открываются или пропало подключение.',
      },
      {
        id: 'network-server-no-access',
        title: 'Нет доступа к серверу',
        description: 'Не открывается общая папка, база или сервер.',
      },
      {
        id: 'network-vpn-error',
        title: 'Ошибка VPN',
        description: 'Не получается подключиться к офисной сети.',
      },
      {
        id: 'network-rdp-error',
        title: 'Ошибка RDP',
        description: 'Не получается подключиться к удалённому рабочему столу.',
      },
      {
        id: 'network-other',
        title: 'Другое',
        description: 'Другая проблема с сетью.',
      },
    ],
  },
  {
    id: 'other',
    icon: '❓',
    title: 'Другое',
    description: 'Если подходящей категории нет.',
    problems: [
      {
        id: 'other-question',
        title: 'Вопрос или консультация',
        description: 'Нужна помощь специалиста или консультация.',
      },
      {
        id: 'other-unknown',
        title: 'Не понимаю, что произошло',
        description: 'Проблема есть, но сложно определить категорию.',
      },
    ],
  },
];

export const urgencyOptions: UrgencyOption[] = [
  {
    id: 'low',
    title: 'Низкая',
    description: 'Можно решить в течение дня, работа не остановлена.',
  },
  {
    id: 'normal',
    title: 'Обычная',
    description: 'Проблема мешает работе, но есть обходной вариант.',
  },
  {
    id: 'high',
    title: 'Высокая',
    description: 'Работа серьёзно затруднена, нужен быстрый ответ.',
  },
  {
    id: 'critical',
    title: 'Критичная',
    description: 'Работа полностью остановлена.',
  },
];

export function findCategory(categoryId: string) {
  return issueCategories.find((category) => category.id === categoryId);
}

export function findProblem(categoryId: string, problemId: string) {
  return findCategory(categoryId)?.problems.find((problem) => problem.id === problemId);
}

export function findUrgency(urgencyId: string) {
  return urgencyOptions.find((urgency) => urgency.id === urgencyId);
}