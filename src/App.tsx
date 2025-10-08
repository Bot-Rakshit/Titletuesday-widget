import { useEffect, useState } from 'react';
import UsernameInput from './components/UsernameInput';
import ScoreDisplay from './components/ScoreDisplay';
import RoundResults from './components/RoundResults';
import CustomizePanel from './components/CustomizePanel';
import { fetchPlayerGames, filterTitledTuesdayGames } from './services/chessComApi';
import { TitledTuesdayGame, GameResult } from './types';
import { CustomizationOptions, DEFAULT_CUSTOMIZATION } from './types/customization';

function App() {
  const [username, setUsername] = useState<string>('');
  const [games, setGames] = useState<TitledTuesdayGame[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastGameCount, setLastGameCount] = useState(0);
  const [customization, setCustomization] = useState<CustomizationOptions>(DEFAULT_CUSTOMIZATION);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const usernameParam = params.get('username');

    // Load customization from URL
    const customOptions: CustomizationOptions = {
      theme: (params.get('theme') as 'dark' | 'light') || DEFAULT_CUSTOMIZATION.theme,
      themePreset: (params.get('themePreset') as 'classic' | 'ocean' | 'crimson' | 'sunset' | 'purple') || DEFAULT_CUSTOMIZATION.themePreset,
      bgColor: params.get('bgColor') || DEFAULT_CUSTOMIZATION.bgColor,
      textColor: params.get('textColor') || DEFAULT_CUSTOMIZATION.textColor,
      winColor: params.get('winColor') || DEFAULT_CUSTOMIZATION.winColor,
      lossColor: params.get('lossColor') || DEFAULT_CUSTOMIZATION.lossColor,
      drawColor: params.get('drawColor') || DEFAULT_CUSTOMIZATION.drawColor,
      noneColor: params.get('noneColor') || DEFAULT_CUSTOMIZATION.noneColor,
      boxBgColor: params.get('boxBgColor') || DEFAULT_CUSTOMIZATION.boxBgColor,
      fontSize: params.get('fontSize') || DEFAULT_CUSTOMIZATION.fontSize,
    };

    setCustomization(customOptions);

    if (usernameParam) {
      handleLoadGames(usernameParam);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    const pollInterval = setInterval(async () => {
      try {
        const fetchedGames = await fetchPlayerGames(username);
        const titledTuesdayGames = filterTitledTuesdayGames(fetchedGames, username);

        if (titledTuesdayGames.length > lastGameCount) {
          console.log(`New games detected: ${titledTuesdayGames.length} games`);
          setGames(titledTuesdayGames);
          setLastGameCount(titledTuesdayGames.length);
        }
      } catch (error) {
        console.error('Error polling for new games:', error);
      }
    }, 30000);

    return () => clearInterval(pollInterval);
  }, [username, lastGameCount]);

  const updateURL = (user?: string, customOptions?: CustomizationOptions) => {
    const params = new URLSearchParams(window.location.search);

    if (user) {
      params.set('username', user);
    }

    const options = customOptions || customization;
    params.set('theme', options.theme);
    params.set('themePreset', options.themePreset);
    params.set('bgColor', options.bgColor);
    params.set('textColor', options.textColor);
    params.set('winColor', options.winColor);
    params.set('lossColor', options.lossColor);
    params.set('drawColor', options.drawColor);
    params.set('noneColor', options.noneColor);
    params.set('boxBgColor', options.boxBgColor);
    params.set('fontSize', options.fontSize);

    params.delete('sessionMode');
    params.delete('sessionStart');

    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  };

  const handleLoadGames = async (user: string) => {
    setIsLoading(true);
    setUsername(user);

    updateURL(user);

    try {
      const fetchedGames = await fetchPlayerGames(user);
      const titledTuesdayGames = filterTitledTuesdayGames(fetchedGames, user);
      setGames(titledTuesdayGames);
      setLastGameCount(titledTuesdayGames.length);
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomizationChange = (options: CustomizationOptions) => {
    setCustomization(options);
    updateURL(username, options);
  };

  const score = games.reduce((total, game) => {
    if (game.result === 'win') return total + 1;
    if (game.result === 'draw') return total + 0.5;
    return total;
  }, 0);

  const results: GameResult[] = games.map(g => g.result);

  const getFontSizeValue = () => {
    switch (customization.fontSize) {
      case 'small': return { score: '30px', label: '12px', round: '10px' };
      case 'large': return { score: '40px', label: '15px', round: '13px' };
      default: return { score: '36px', label: '14px', round: '12px' };
    }
  };

  const fontSizes = getFontSizeValue();

  return (
    <div
      className="min-h-screen p-6 transition-colors duration-300"
      style={{ backgroundColor: customization.bgColor }}
    >
      <div className="w-full max-w-[280px] mx-auto">
        <UsernameInput
          onSubmit={handleLoadGames}
          onCustomize={() => setIsCustomizeOpen(true)}
          isLoading={isLoading}
        />

        {username && (
          <div className="animate-in fade-in duration-500">
            <ScoreDisplay
              score={score}
              total={games.length}
              customization={customization}
              fontSize={fontSizes}
            />
            <RoundResults
              results={results}
              maxRounds={11}
              customization={customization}
              fontSize={fontSizes}
            />
          </div>
        )}

        {isLoading && (
          <div className="text-center text-black text-sm mt-8 font-semibold animate-pulse">
            Loading games...
          </div>
        )}
      </div>

      <CustomizePanel
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        options={customization}
        onOptionsChange={handleCustomizationChange}
      />
    </div>
  );
}

export default App;
