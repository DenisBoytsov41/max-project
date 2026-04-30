import { appConfig } from '../../app/appConfig';
import { PagePlaceholder } from '../../components/ui/PagePlaceholder';

export function ContactsPage() {
  return (
    <PagePlaceholder
      title="Контакты"
      text={`${appConfig.companyName}. Телефон: ${appConfig.supportPhone}. Почта: ${appConfig.supportEmail}. График: ${appConfig.workSchedule}.`}
    />
  );
}