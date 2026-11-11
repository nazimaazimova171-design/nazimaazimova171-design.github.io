(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const icon = button.querySelector('.theme-icon');
  const label = button.querySelector('.theme-label');
  const storedTheme = localStorage.getItem('homepage-theme');
  const initialTheme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function setTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    icon.textContent = isDark ? '☀' : '☾';
    label.textContent = isDark ? 'Light mode' : 'Dark mode';
    button.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    document.querySelector('meta[name="theme-color"]').content = isDark ? '#0d1422' : '#f5f8fc';
  }

  setTheme(initialTheme);
  button.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('homepage-theme', nextTheme);
  });
})();
