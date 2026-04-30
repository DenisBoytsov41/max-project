export type MaxPlatform = 'ios' | 'android' | 'desktop' | 'web' | string;

export type MaxChatType = 'DIALOG' | 'CHAT' | 'CHANNEL' | string;

export type MaxWebAppUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
};

export type MaxWebAppChat = {
  id: number;
  type: MaxChatType;
};

export type MaxWebAppInitDataUnsafe = {
  query_id?: string;
  ip?: string;
  auth_date?: number;
  hash?: string;
  user?: MaxWebAppUser;
  chat?: MaxWebAppChat;
  start_param?: string;
};

export type MaxContactResult = {
  phone: string;
};

export type MaxBridgeError = {
  error?: {
    code?: string;
  };
};

export type MaxWebApp = {
  initData?: string;
  initDataUnsafe?: MaxWebAppInitDataUnsafe;
  platform?: MaxPlatform;
  version?: string;

  requestContact?: () => Promise<MaxContactResult>;

  enableClosingConfirmation?: () => void;
  disableClosingConfirmation?: () => void;

  openLink?: (url: string) => void;
  openMaxLink?: (url: string) => void;

  BackButton?: {
    isVisible?: boolean;
    show?: () => void;
    hide?: () => void;
    onClick?: (callback: () => void) => void;
    offClick?: (callback: () => void) => void;
  };
};

declare global {
  interface Window {
    WebApp?: MaxWebApp;
  }
}