import type {
  MaxContactResult,
  MaxPlatform,
  MaxWebApp,
  MaxWebAppInitDataUnsafe,
  MaxWebAppUser,
} from './maxBridgeTypes';

export function getMaxWebApp(): MaxWebApp | undefined {
  return window.WebApp;
}

export function isRunningInsideMax(): boolean {
  return Boolean(window.WebApp);
}

export function getInitData(): string {
  return window.WebApp?.initData ?? '';
}

export function getInitDataUnsafe(): MaxWebAppInitDataUnsafe | undefined {
  return window.WebApp?.initDataUnsafe;
}

export function getCurrentMaxUser(): MaxWebAppUser | undefined {
  return window.WebApp?.initDataUnsafe?.user;
}

export function getStartParam(): string {
  return window.WebApp?.initDataUnsafe?.start_param ?? '';
}

export function getMaxPlatform(): MaxPlatform {
  return window.WebApp?.platform ?? 'web';
}

export function getMaxVersion(): string {
  return window.WebApp?.version ?? 'unknown';
}

export function enableClosingConfirmation(): void {
  window.WebApp?.enableClosingConfirmation?.();
}

export function disableClosingConfirmation(): void {
  window.WebApp?.disableClosingConfirmation?.();
}

export async function requestUserContact(): Promise<MaxContactResult | null> {
  if (!window.WebApp?.requestContact) {
    return null;
  }

  try {
    return await window.WebApp.requestContact();
  } catch (error) {
    console.error('Не удалось получить контакт пользователя MAX:', error);
    return null;
  }
}

export function openExternalLink(url: string): void {
  if (window.WebApp?.openLink) {
    window.WebApp.openLink(url);
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

export function openMaxLink(url: string): void {
  if (window.WebApp?.openMaxLink) {
    window.WebApp.openMaxLink(url);
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

export function shareTextToMax(text: string): void {
  const encodedText = encodeURIComponent(text);
  const shareUrl = `https://max.ru/:share?text=${encodedText}`;

  openMaxLink(shareUrl);
}