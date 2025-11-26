import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 'cyberpunk' | 'professional' | 'futuristic' | 'minimal' | 'luxe-gold' | 'ocean-breeze' | 'boom-headshot';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: { name: ThemeName; label: string; description: string }[];
}

const themes: { name: ThemeName; label: string; description: string }[] = [
  { name: 'cyberpunk', label: 'Neon', description: 'Bold cyan & magenta accents' },
  { name: 'professional', label: 'Corporate', description: 'Clean blue, business-ready' },
  { name: 'futuristic', label: 'Ultraviolet', description: 'Electric purple & cyan' },
  { name: 'minimal', label: 'Midnight', description: 'Sophisticated dark blue' },
  { name: 'luxe-gold', label: 'Luxe', description: 'Premium gold & warm tones' },
  { name: 'ocean-breeze', label: 'Aqua', description: 'Calm teal & ocean hues' },
  { name: 'boom-headshot', label: 'Boom Headshot', description: 'Counter-Strike 1.6 tactical' },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('knows-theme') as ThemeName) || 'cyberpunk';
    }
    return 'cyberpunk';
  });

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem('knows-theme', newTheme);
  };

  useEffect(() => {
    // Remove all theme classes
    document.documentElement.classList.remove(
      'theme-cyberpunk',
      'theme-professional',
      'theme-futuristic',
      'theme-minimal',
      'theme-luxe-gold',
      'theme-ocean-breeze',
      'theme-boom-headshot'
    );
    // Add current theme class
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
