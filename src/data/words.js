// Dutch words suitable for a 7-year-old
// Organized by difficulty - starting with simple, common words
export const wordList = [
    // Level 1: Simple 3-letter words (CVC pattern)
    { id: 1, word: 'kat', syllables: ['kat'], difficulty: 1, category: 'dier' },
    { id: 2, word: 'hond', syllables: ['hond'], difficulty: 1, category: 'dier' },
    { id: 3, word: 'zon', syllables: ['zon'], difficulty: 1, category: 'natuur' },
    { id: 4, word: 'bal', syllables: ['bal'], difficulty: 1, category: 'speelgoed' },
    { id: 5, word: 'boom', syllables: ['boom'], difficulty: 1, category: 'natuur' },

    // Level 2: 4-5 letter words
    { id: 6, word: 'huis', syllables: ['huis'], difficulty: 2, category: 'plaats' },
    { id: 7, word: 'bloem', syllables: ['bloem'], difficulty: 2, category: 'natuur' },
    { id: 8, word: 'boot', syllables: ['boot'], difficulty: 2, category: 'voertuig' },
    { id: 9, word: 'tafel', syllables: ['ta', 'fel'], difficulty: 2, category: 'meubel' },
    { id: 10, word: 'stoel', syllables: ['stoel'], difficulty: 2, category: 'meubel' },

    // Level 3: Two-syllable words
    { id: 11, word: 'konijn', syllables: ['ko', 'nijn'], difficulty: 3, category: 'dier' },
    { id: 12, word: 'vissen', syllables: ['vis', 'sen'], difficulty: 3, category: 'dier' },
    { id: 13, word: 'appel', syllables: ['ap', 'pel'], difficulty: 3, category: 'voedsel' },
    { id: 14, word: 'water', syllables: ['wa', 'ter'], difficulty: 3, category: 'natuur' },
    { id: 15, word: 'vogel', syllables: ['vo', 'gel'], difficulty: 3, category: 'dier' },
];

// Get words by difficulty level
export const getWordsByDifficulty = (difficulty) => {
    return wordList.filter(word => word.difficulty === difficulty);
};

// Get a random word from a specific difficulty
export const getRandomWord = (difficulty = null) => {
    const words = difficulty ? getWordsByDifficulty(difficulty) : wordList;
    return words[Math.floor(Math.random() * words.length)];
};

// Shuffle array helper
export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
