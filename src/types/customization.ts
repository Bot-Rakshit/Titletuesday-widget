export type Theme = 'dark' | 'light';
export type ThemePreset = 'classic' | 'ocean' | 'crimson' | 'sunset' | 'purple';

export interface CustomizationOptions {
  theme: Theme;
  themePreset: ThemePreset;
  bgColor: string;
  textColor: string;
  winColor: string;
  lossColor: string;
  drawColor: string;
  noneColor: string;
  boxBgColor: string;
  fontSize: string;
}

interface ThemeColors {
  bgColor: string;
  textColor: string;
  winColor: string;
  lossColor: string;
  drawColor: string;
  noneColor: string;
  boxBgColor: string;
}

// Dark theme presets
export const DARK_THEME_PRESETS: Record<ThemePreset, ThemeColors> = {
  classic: {
    bgColor: '#00FF00',
    textColor: '#ffffff',
    winColor: '#0EA5E9',
    lossColor: '#ef4444',
    drawColor: '#9ca3af',
    noneColor: '#374151',
    boxBgColor: 'rgba(0, 0, 0, 0.85)',
  },
  ocean: {
    bgColor: '#00FF00',
    textColor: '#e0f2fe',
    winColor: '#06b6d4',
    lossColor: '#f43f5e',
    drawColor: '#64748b',
    noneColor: '#334155',
    boxBgColor: 'rgba(15, 23, 42, 0.85)',
  },
  crimson: {
    bgColor: '#00FF00',
    textColor: '#ffe4e6',
    winColor: '#ec4899',
    lossColor: '#dc2626',
    drawColor: '#94a3b8',
    noneColor: '#404040',
    boxBgColor: 'rgba(30, 10, 20, 0.85)',
  },
  sunset: {
    bgColor: '#00FF00',
    textColor: '#fef3c7',
    winColor: '#f59e0b',
    lossColor: '#dc2626',
    drawColor: '#d97706',
    noneColor: '#451a03',
    boxBgColor: 'rgba(30, 20, 10, 0.85)',
  },
  purple: {
    bgColor: '#00FF00',
    textColor: '#f3e8ff',
    winColor: '#a855f7',
    lossColor: '#f43f5e',
    drawColor: '#94a3b8',
    noneColor: '#4c1d95',
    boxBgColor: 'rgba(30, 20, 50, 0.85)',
  },
};

// Light theme presets
export const LIGHT_THEME_PRESETS: Record<ThemePreset, ThemeColors> = {
  classic: {
    bgColor: '#00FF00',
    textColor: '#1f2937',
    winColor: '#3b82f6',
    lossColor: '#f87171',
    drawColor: '#6b7280',
    noneColor: '#d1d5db',
    boxBgColor: 'rgba(255, 255, 255, 0.95)',
  },
  ocean: {
    bgColor: '#00FF00',
    textColor: '#0c4a6e',
    winColor: '#0891b2',
    lossColor: '#e11d48',
    drawColor: '#475569',
    noneColor: '#cbd5e1',
    boxBgColor: 'rgba(240, 249, 255, 0.95)',
  },
  crimson: {
    bgColor: '#00FF00',
    textColor: '#881337',
    winColor: '#f43f5e',
    lossColor: '#dc2626',
    drawColor: '#737373',
    noneColor: '#fecdd3',
    boxBgColor: 'rgba(255, 241, 242, 0.95)',
  },
  sunset: {
    bgColor: '#00FF00',
    textColor: '#78350f',
    winColor: '#d97706',
    lossColor: '#b91c1c',
    drawColor: '#b45309',
    noneColor: '#fef3c7',
    boxBgColor: 'rgba(255, 251, 235, 0.95)',
  },
  purple: {
    bgColor: '#00FF00',
    textColor: '#581c87',
    winColor: '#9333ea',
    lossColor: '#e11d48',
    drawColor: '#64748b',
    noneColor: '#e9d5ff',
    boxBgColor: 'rgba(250, 245, 255, 0.95)',
  },
};

export const THEME_PRESET_NAMES: Record<ThemePreset, string> = {
  classic: '🎨 Classic',
  ocean: '🌊 Ocean Blue',
  crimson: '💎 Crimson Rose',
  sunset: '🌅 Sunset',
  purple: '💜 Purple Haze',
};

export const DEFAULT_CUSTOMIZATION: CustomizationOptions = {
  theme: 'dark',
  themePreset: 'classic',
  ...DARK_THEME_PRESETS.classic,
  fontSize: 'medium',
};

export const getThemeColors = (theme: Theme, preset: ThemePreset): ThemeColors => {
  const presets = theme === 'dark' ? DARK_THEME_PRESETS : LIGHT_THEME_PRESETS;
  return presets[preset];
};
