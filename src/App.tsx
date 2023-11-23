import { useCallback, useEffect, useState } from 'react';

// components
import ColorButton from './components/ColorButton/ColorButton';
import Button from './components/Button/Button';

// utilities
import { generateGamePattern } from './utils/generate-pattern';

// constants
import { BUTTONS, MAX_PATTERNS, WRONG_BUTTON_PRESSED } from './constants';

// models
import { GameButton } from './models';

// styles
import './App.css';

const App = () => {
  //
  const [gameInProgress, setGameInProgress] = useState(false);
  const [buttons, setButtons] = useState<GameButton[]>(BUTTONS);

  const [gamePattern, setGamePattern] = useState<number[]>([]);
  const [gameLevel, setGameLevel] = useState(0);

  const [isPlayerNext, setIsPlayerNext] = useState(false);
  const [playerLevel, setPlayerLevel] = useState(0);
  const [isWinner, setIsWinner] = useState(false);

  const [playingPatternLevel, setPlayingPatternLevel] = useState(0);

  /**
   * Logic for starting the Simon Game.
   */
  const handleStartGameClick = () => {
    const pattern = generateGamePattern();
    setGamePattern(pattern);
    setGameLevel(0);
    setPlayerLevel(0);
    setPlayingPatternLevel(0);
    setIsPlayerNext(false);
    setGameInProgress(true);
  };

  const playSound = useCallback((btn: GameButton) => {
    btn.tone.play();
  }, []);

  const handleGameButtonClick = (btn: GameButton) => {
    const patternButton = buttons[gamePattern[playerLevel]];

    if (btn.color !== patternButton.color) {
      WRONG_BUTTON_PRESSED.play();
      setGameInProgress(false);
      return;
    }

    playSound(btn);

    if (playerLevel === gameLevel) {
      setGameLevel((prevLevel) => prevLevel + 1);
      setPlayingPatternLevel(0);
      setPlayerLevel(0);
      setIsPlayerNext(false);
    } else {
      setPlayerLevel((prevLevel) => prevLevel + 1);
    }
  };

  useEffect(() => {
    if (!gameInProgress || isPlayerNext) return;

    if (gameLevel === MAX_PATTERNS) {
      setIsWinner(true);
      setGameInProgress(false);
      return;
    }

    function playPattern() {
      if (playingPatternLevel > gameLevel) {
        setButtons((prevButtons) =>
          prevButtons.map((btn) => {
            return {
              ...btn,
              isPlaying: false,
            };
          })
        );

        setIsPlayerNext(true);
        setPlayerLevel(0);
        setPlayingPatternLevel(0);
        return;
      } else {
        //
        const buttonIndex = gamePattern[playingPatternLevel];

        const updatedButtons = buttons.map((btn, index) => {
          return {
            ...btn,
            isPlaying: buttonIndex === index ? true : false,
          };
        });

        playSound(updatedButtons[buttonIndex]);
        setButtons(updatedButtons);
        setPlayingPatternLevel((prevLevel) => prevLevel + 1);
      }
    }

    // Play the game pattern.
    const intervalId = setInterval(() => playPattern(), 750);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    gameInProgress,
    isPlayerNext,
    playingPatternLevel,
    gameLevel,
    buttons,
    gamePattern,
    playSound,
  ]);

  return (
    <main className="App">
      <h1>Simon Game</h1>
      {!isWinner && <h2>Level: {gameLevel}</h2>}
      {isWinner && <h2>You Won!</h2>}
      <Button onClick={handleStartGameClick}>New Game</Button>
      <div className="button-container">
        {buttons.map((btn, index) => (
          <ColorButton
            key={index}
            color={btn.color}
            isPlaying={btn.isPlaying}
            disabled={!gameInProgress}
            onClick={() => handleGameButtonClick(btn)}
          />
        ))}
      </div>
    </main>
  );
};

export default App;
