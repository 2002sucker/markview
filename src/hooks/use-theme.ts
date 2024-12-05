import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

// Helper function to detect the system theme preference
function getSystemTheme(): 'dark' | 'light' {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
}

export function useTheme() {
  // Initialize state with the theme saved in localStorage or default to "system"
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = window.localStorage.getItem('theme') as Theme;
      if (savedTheme) return savedTheme;
    }
    return 'system';
  });

  // Effect to apply the theme to the document
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove old theme classes
    root.classList.remove('light', 'dark');

    // Determine effective theme
    const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
    root.classList.add(effectiveTheme);

    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Effect to listen for system theme changes when theme is "system"
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(getSystemTheme());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Return the current theme, a function to set the theme, and whether the current theme is dark
  return {
    theme,
    setTheme: setThemeState,
    isDark:
      theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark'),
  };
}
