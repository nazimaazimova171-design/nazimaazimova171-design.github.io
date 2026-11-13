(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Keep the selected color theme between visits when browser storage is available.
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('homepage-theme'); } catch (_) { /* Local files may restrict storage. */ }
  const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function setTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeButton.querySelector('.theme-icon').textContent = dark ? '☀' : '☾';
    themeButton.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
    document.querySelector('meta[name="theme-color"]').content = dark ? '#0b1220' : '#f5f7fb';
  }

  setTheme(initialTheme);
  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('homepage-theme', next); } catch (_) { /* Theme still works for this visit. */ }
  });

  // Mobile navigation stays keyboard accessible and closes after a destination is chosen.
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('is-open');
  }

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navLinks.classList.toggle('is-open', open);
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 561px)').matches) closeMenu();
  });
})();
