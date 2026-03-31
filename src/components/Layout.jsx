import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  ['/', 'Dashboard'],
  ['/revise', 'Revise'],
  ['/practice', 'Practice'],
  ['/pastpapers', 'Past Papers'],
  ['/glossary', 'Glossary']
];

export default function Layout({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <h1>OCR Business</h1>
        <p>GCSE Revision Hub</p>
        <nav>
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
        </button>
      </aside>
      <main>
        <header className="topbar">
          <button className="menu-btn" onClick={() => setOpen((v) => !v)}>☰</button>
          <span>OCR GCSE Business Studies</span>
        </header>
        <div className="page-wrap">{children}</div>
      </main>
    </div>
  );
}
