import React from 'react';
import { CustomizationOptions, DEFAULT_CUSTOMIZATION, getThemeColors, Theme, ThemePreset, THEME_PRESET_NAMES } from '../types/customization';

interface CustomizePanelProps {
  isOpen: boolean;
  onClose: () => void;
  options: CustomizationOptions;
  onOptionsChange: (options: CustomizationOptions) => void;
}

const CustomizePanel: React.FC<CustomizePanelProps> = ({
  isOpen,
  onClose,
  options,
  onOptionsChange,
}) => {
  if (!isOpen) return null;

  const handleReset = () => {
    onOptionsChange(DEFAULT_CUSTOMIZATION);
  };

  const handleThemeToggle = (theme: Theme) => {
    const themeColors = getThemeColors(theme, options.themePreset);
    onOptionsChange({
      ...options,
      theme,
      ...themeColors,
    });
  };

  const handlePresetChange = (preset: ThemePreset) => {
    const themeColors = getThemeColors(options.theme, preset);
    onOptionsChange({
      ...options,
      themePreset: preset,
      ...themeColors,
    });
  };

  const ColorPicker = ({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="flex gap-3 items-center">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-600 hover:border-gray-500 transition-colors"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  return (
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-gray-900 shadow-2xl border-l border-gray-700 z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Customize</h2>
            <p className="text-xs text-gray-400 mt-1">Changes apply instantly</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Theme Toggle Section */}
          <div className="space-y-4 pb-4 border-b border-gray-700/50">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              Theme Mode
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleThemeToggle('dark')}
                className={`px-4 py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  options.theme === 'dark'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Dark
              </button>
              <button
                onClick={() => handleThemeToggle('light')}
                className={`px-4 py-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                  options.theme === 'light'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Light
              </button>
            </div>
          </div>

          {/* Color Preset Section */}
          <div className="space-y-4 pb-4 border-b border-gray-700/50">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Color Scheme
            </h3>
            <select
              value={options.themePreset}
              onChange={(e) => handlePresetChange(e.target.value as ThemePreset)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:bg-gray-750 transition-colors"
            >
              {(Object.keys(THEME_PRESET_NAMES) as ThemePreset[]).map((preset) => (
                <option key={preset} value={preset}>
                  {THEME_PRESET_NAMES[preset]}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 italic">
              Choose a color scheme for {options.theme} mode
            </p>
          </div>

          {/* Background Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Background
            </h3>
            <ColorPicker
              label="Chroma Key Color"
              value={options.bgColor}
              onChange={(value) => onOptionsChange({ ...options, bgColor: value })}
            />
          </div>

          {/* Text Section */}
          <div className="space-y-4 pt-4 border-t border-gray-700/50">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Text & Boxes
            </h3>
            <ColorPicker
              label="Text Color"
              value={options.textColor}
              onChange={(value) => onOptionsChange({ ...options, textColor: value })}
            />
            <ColorPicker
              label="Box Background"
              value={options.boxBgColor.replace('rgba(0, 0, 0, 0.85)', '#000000')}
              onChange={(value) => onOptionsChange({ ...options, boxBgColor: `${value}dd` })}
            />
          </div>

          {/* Game Results Section */}
          <div className="space-y-4 pt-4 border-t border-gray-700/50">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Game Results
            </h3>
            <ColorPicker
              label="Win (1 point)"
              value={options.winColor}
              onChange={(value) => onOptionsChange({ ...options, winColor: value })}
            />
            <ColorPicker
              label="Draw (0.5 points)"
              value={options.drawColor}
              onChange={(value) => onOptionsChange({ ...options, drawColor: value })}
            />
            <ColorPicker
              label="Loss (0 points)"
              value={options.lossColor}
              onChange={(value) => onOptionsChange({ ...options, lossColor: value })}
            />
            <ColorPicker
              label="Not Played"
              value={options.noneColor}
              onChange={(value) => onOptionsChange({ ...options, noneColor: value })}
            />
          </div>

          {/* Font Size Section */}
          <div className="space-y-4 pt-4 border-t border-gray-700/50">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              Font Size
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => onOptionsChange({ ...options, fontSize: size })}
                  className={`px-4 py-3 rounded-lg font-medium text-sm capitalize transition-colors ${
                    options.fontSize === size
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleReset}
            className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset to Default
          </button>
        </div>
    </div>
  );
};

export default CustomizePanel;
