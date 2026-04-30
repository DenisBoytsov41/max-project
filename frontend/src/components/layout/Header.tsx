import { appConfig } from '../../app/appConfig';
import {
  getMaxPlatform,
  getMaxVersion,
  isRunningInsideMax,
} from '../../services/max/maxBridge';

export function Header() {
  const environmentText = isRunningInsideMax()
    ? `MAX · ${getMaxPlatform()} · ${getMaxVersion()}`
    : 'Локальный режим';

  return (
    <header className="app-header">
      <div>
        <p className="app-header__company">{appConfig.companyName}</p>
        <p className="app-header__env">{environmentText}</p>
      </div>
    </header>
  );
}