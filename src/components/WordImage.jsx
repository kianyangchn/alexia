import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const WordImage = ({ word, onLoadImage }) => {
    return (
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="word-card flex flex-col items-center gap-4"
        >
            <div className="relative">
                <img
                    src={`/images/${word.word}.png`}
                    alt={word.word}
                    className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl"
                    onLoad={onLoadImage}
                    onError={(e) => {
                        // Fallback: show the word if image doesn't exist
                        e.target.style.display = 'none';
                    }}
                />
                <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                    <Sparkles className="text-yellow-400 w-8 h-8" />
                </motion.div>
            </div>
            <div className="text-center">
                <p className="text-sm text-gray-500 uppercase tracking-widest">
                    Welk woord is dit?
                </p>
            </div>
        </motion.div>
    );
};

export default WordImage;
