import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from './routes';
import { AppShell } from '../components/layout/AppShell';
import { AboutPage } from '../features/about/AboutPage';
import { ContactsPage } from '../features/contacts/ContactsPage';
import { DiagnosticCategoryPage } from '../features/diagnostics/DiagnosticCategoryPage';
import { DiagnosticsPage } from '../features/diagnostics/DiagnosticsPage';
import { HomePage } from '../features/home/HomePage';
import { KnowledgeArticlePage } from '../features/knowledge/KnowledgeArticlePage';
import { KnowledgePage } from '../features/knowledge/KnowledgePage';
import { RequestWizardPage } from '../features/request-wizard/RequestWizardPage';

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.request} element={<RequestWizardPage />} />
        <Route path={routes.diagnostics} element={<DiagnosticsPage />} />
        <Route path="/diagnostics/:categoryId" element={<DiagnosticCategoryPage />} />
        <Route path={routes.knowledge} element={<KnowledgePage />} />
        <Route path="/knowledge/:articleId" element={<KnowledgeArticlePage />} />
        <Route path={routes.contacts} element={<ContactsPage />} />
        <Route path={routes.about} element={<AboutPage />} />

        <Route path="*" element={<Navigate to={routes.home} replace />} />
      </Route>
    </Routes>
  );
}