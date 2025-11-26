import { useState } from 'react';
import { Palette, Check, ChevronDown } from 'lucide-react';
import { useTheme, ThemeName } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const themeColors: Record<ThemeName, { primary: string; secondary: string }> = {
  cyberpunk: { primary: '#00ffff', secondary: '#ff0080' },
  professional: { primary: '#3b82f6', secondary: '#818cf8' },
  futuristic: { primary: '#8b5cf6', secondary: '#22d3ee' },
  minimal: { primary: '#5b8def', secondary: '#8b5cf6' },
  'luxe-gold': { primary: '#f5c342', secondary: '#e8a030' },
  'ocean-breeze': { primary: '#14b8a6', secondary: '#38bdf8' },
  'boom-headshot': { primary: '#ff4500', secondary: '#32cd32' },
};

export const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (newTheme: ThemeName) => {
    console.log('Switching theme from', theme, 'to', newTheme);
    setTheme(newTheme);
    // Check if class was applied
    setTimeout(() => {
      console.log('Current theme classes:', document.documentElement.className);
      console.log('Current theme CSS variables:', getComputedStyle(document.documentElement).getPropertyValue('--primary'));
    }, 100);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white hover:border-slate-300 shadow-sm transition-all duration-300"
        >
          <div className="relative">
            <Palette className="w-4 h-4" />
            <div
              className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white"
              style={{ backgroundColor: themeColors[theme].primary }}
            />
          </div>
          <span className="hidden sm:inline text-sm">Theme</span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl"
      >
        <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
          Choose Style
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => handleThemeChange(t.name)}
            className="flex items-center gap-3 py-3 cursor-pointer focus:bg-foreground/10 transition-all duration-200"
          >
            <div className="flex gap-1">
              <div
                className="w-4 h-4 rounded-full shadow-lg"
                style={{ backgroundColor: themeColors[t.name].primary }}
              />
              <div
                className="w-4 h-4 rounded-full shadow-lg -ml-2"
                style={{ backgroundColor: themeColors[t.name].secondary }}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{t.label}</p>
              <p className="text-xs text-muted-foreground">{t.description}</p>
            </div>
            {theme === t.name && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
