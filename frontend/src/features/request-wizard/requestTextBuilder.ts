import {
  findCategory,
  findProblem,
  findUrgency,
} from '../../data/issueCategories';
import type { RequestWizardData } from './requestWizardTypes';

function valueOrDash(value: string): string {
  const preparedValue = value.trim();

  return preparedValue.length > 0 ? preparedValue : 'не указано';
}

export function buildRequestText(data: RequestWizardData): string {
  const category = findCategory(data.categoryId);
  const problem = findProblem(data.categoryId, data.problemId);
  const urgency = findUrgency(data.urgencyId);

  return [
    'Заявка в ООО «К-Сервис»',
    '',
    `Организация: ${valueOrDash(data.organization)}`,
    `Контактное лицо: ${valueOrDash(data.contactName)}`,
    `Телефон: ${valueOrDash(data.phone)}`,
    '',
    `Категория: ${category?.title ?? 'не указано'}`,
    `Проблема: ${problem?.title ?? 'не указано'}`,
    `Срочность: ${urgency?.title ?? 'не указано'}`,
    '',
    'Описание:',
    valueOrDash(data.description),
    '',
    'Прошу связаться для решения проблемы.',
  ].join('\n');
}