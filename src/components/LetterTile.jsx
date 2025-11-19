import { motion } from 'framer-motion';

const LetterTile = ({ letter, onClick, isCorrect, isIncorrect, disabled }) => {
    return (
        <motion.button
            className={`letter-tile ${isCorrect
                    ? 'bg-gradient-to-br from-green-400 to-green-600'
                    : isIncorrect
                        ? 'bg-gradient-to-br from-red-400 to-red-600'
                        : ''
                }`}
            onClick={onClick}
            disabled={disabled || isCorrect}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {letter}
        </motion.button>
    );
};

export default LetterTile;
