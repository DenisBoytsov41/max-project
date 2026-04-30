import { NavLink } from 'react-router-dom';

import { navigationItems } from '../../app/routes';

export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Основная навигация">
      <div className="bottom-nav__inner">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`
            }
          >
            <span className="bottom-nav__icon">{item.emoji}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}