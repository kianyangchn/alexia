import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Play } from 'lucide-react';
import WordImage from './components/WordImage';
import LetterTile from './components/LetterTile';
import Garden from './components/Garden';
import { getRandomWord, shuffleArray } from './data/words';
import './index.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'win'
  const [currentWord, setCurrentWord] = useState(null);
  const [shuffledLetters, setShuffledLetters] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(''); // 'correct', 'incorrect', ''
  const [difficulty, setDifficulty] = useState(1);

  const maxScore = 10;

  // Start a new game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setDifficulty(1);
    loadNewWord();
  };

  // Load a new word
  const loadNewWord = () => {
    const word = getRandomWord(difficulty);
    setCurrentWord(word);
    setShuffledLetters(shuffleArray(word.word.split('')));
    setUserAnswer('');
    setFeedback('');
  };

  // Handle letter click
  const handleLetterClick = (letter, index) => {
    const newAnswer = userAnswer + letter;
    setUserAnswer(newAnswer);

    // Check if the answer is correct
    if (newAnswer === currentWord.word) {
      setFeedback('correct');
      setScore((prev) => prev + 1);

      // Increase difficulty every 3 correct answers
      if ((score + 1) % 3 === 0 && difficulty < 3) {
        setDifficulty((prev) => prev + 1);
      }

      // Check for win condition
      if (score + 1 >= maxScore) {
        setTimeout(() => {
          setGameState('win');
        }, 1500);
      } else {
        setTimeout(() => {
          loadNewWord();
        }, 1500);
      }
    } else if (newAnswer.length >= currentWord.word.length) {
      // Answer is complete but incorrect
      setFeedback('incorrect');
      setTimeout(() => {
        setUserAnswer('');
        setFeedback('');
      }, 1000);
    }
  };

  // Reset the current answer
  const resetAnswer = () => {
    setUserAnswer('');
    setFeedback('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Garden visualization */}
      <Garden score={score} maxScore={maxScore} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {gameState === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-8"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Woordentuin
              </motion.h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-md mx-auto leading-relaxed">
                Bouw een mooie tuin door woorden te maken! 🌸
              </p>
              <motion.button
                className="game-button inline-flex items-center gap-3 text-lg md:text-xl"
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6" />
                Start Spel
              </motion.button>
            </motion.div>
          )}

          {gameState === 'playing' && currentWord && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl space-y-8"
            >
              {/* Score display */}
              <div className="text-center">
                <motion.div
                  className="inline-block bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-lg"
                  key={score}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-2xl font-bold text-purple-600">
                    {score} / {maxScore} 🌸
                  </p>
                </motion.div>
              </div>

              {/* Word image */}
              <WordImage word={currentWord} />

              {/* User answer display */}
              <div className="min-h-20 flex items-center justify-center">
                <motion.div
                  className={`text-4xl md:text-6xl font-bold tracking-widest rounded-2xl px-8 py-4 ${feedback === 'correct'
                      ? 'bg-green-200 text-green-800'
                      : feedback === 'incorrect'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-white/80 text-gray-800'
                    }`}
                  key={userAnswer}
                  animate={
                    feedback === 'correct'
                      ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }
                      : feedback === 'incorrect'
                        ? { x: [-10, 10, -10, 10, 0] }
                        : {}
                  }
                >
                  {userAnswer || '_'.repeat(currentWord.word.length)}
                </motion.div>
              </div>

              {/* Letter tiles */}
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                {shuffledLetters.map((letter, index) => (
                  <LetterTile
                    key={`${letter}-${index}`}
                    letter={letter}
                    onClick={() => handleLetterClick(letter, index)}
                    disabled={feedback !== ''}
                  />
                ))}
              </div>

              {/* Reset button */}
              {userAnswer && feedback === '' && (
                <div className="flex justify-center">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors inline-flex items-center gap-2"
                    onClick={resetAnswer}
                  >
                    <RotateCcw className="w-5 h-5" />
                    Opnieuw
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {gameState === 'win' && (
            <motion.div
              key="win"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center space-y-8"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <Trophy className="w-32 h-32 md:w-40 md:h-40 mx-auto text-yellow-500" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Gefeliciteerd! 🎉
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Je tuin is prachtig! Je hebt alle woorden goed gemaakt!
              </p>
              <motion.button
                className="game-button inline-flex items-center gap-3"
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-6 h-6" />
                Speel Opnieuw
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
