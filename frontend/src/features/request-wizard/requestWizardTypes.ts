export type IssueCategoryId =
  | 'one-c'
  | 'cashbox'
  | 'edo'
  | 'printer'
  | 'computer'
  | 'network'
  | 'other';

export type UrgencyId = 'low' | 'normal' | 'high' | 'critical';

export type IssueProblem = {
  id: string;
  title: string;
  description: string;
};

export type IssueCategory = {
  id: IssueCategoryId;
  icon: string;
  title: string;
  description: string;
  problems: IssueProblem[];
};

export type UrgencyOption = {
  id: UrgencyId;
  title: string;
  description: string;
};

export type RequestWizardData = {
  categoryId: IssueCategoryId | '';
  problemId: string;
  urgencyId: UrgencyId | '';
  organization: string;
  contactName: string;
  phone: string;
  description: string;
};

export type RequestWizardStep =
  | 'category'
  | 'problem'
  | 'urgency'
  | 'contact'
  | 'description'
  | 'result';