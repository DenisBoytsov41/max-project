import { Outlet } from 'react-router-dom';

import { BottomNavigation } from './BottomNavigation';
import { Header } from './Header';

export function AppShell() {
  return (
    <>
      <main className="app-page">
        <Header />
        <Outlet />
      </main>

      <BottomNavigation />
    </>
  );
}