import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 'cyberpunk' | 'professional' | 'futuristic' | 'minimal' | 'luxe-gold' | 'ocean-breeze';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: { name: ThemeName; label: string; description: string }[];
}

const themes: { name: ThemeName; label: string; description: string }[] = [
  { name: 'cyberpunk', label: 'Cyberpunk', description: 'Neon cyan & pink with dark vibes' },
  { name: 'professional', label: 'Professional', description: 'Sleek, modern & corporate' },
  { name: 'futuristic', label: 'Futuristic', description: 'High-tech with electric blues' },
  { name: 'minimal', label: 'Minimal', description: 'Clean, elegant & understated' },
  { name: 'luxe-gold', label: 'Luxe Gold', description: 'Premium gold & champagne tones' },
  { name: 'ocean-breeze', label: 'Ocean Breeze', description: 'Calm teals & soft gradients' },
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
      'theme-ocean-breeze'
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
