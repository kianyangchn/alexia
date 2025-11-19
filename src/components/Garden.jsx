import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Sparkles, Star } from 'lucide-react';

const Garden = ({ score, maxScore = 10 }) => {
    const flowers = Array.from({ length: score }, (_, i) => i);

    return (
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-garden-grass to-transparent pointer-events-none">
            <div className="relative h-full max-w-4xl mx-auto px-4">
                <AnimatePresence>
                    {flowers.map((flower, index) => (
                        <motion.div
                            key={`flower-${index}`}
                            className="absolute bottom-0"
                            style={{
                                left: `${(index / maxScore) * 100}%`,
                            }}
                            initial={{ y: 100, scale: 0, rotate: -45 }}
                            animate={{ y: 0, scale: 1, rotate: 0 }}
                            exit={{ y: -100, scale: 0, opacity: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 200,
                                damping: 15,
                                delay: index * 0.1,
                            }}
                        >
                            <Flower2
                                className="text-pink-500 w-12 h-12 md:w-16 md:h-16 drop-shadow-lg"
                                fill="currentColor"
                            />
                            <motion.div
                                className="absolute -top-2 -right-2"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                }}
                            >
                                <Star className="text-yellow-300 w-4 h-4" fill="currentColor" />
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Sun in the sky */}
                <motion.div
                    className="absolute top-4 right-4"
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <Sparkles className="text-garden-sun w-12 h-12 drop-shadow-lg" />
                </motion.div>
            </div>
        </div>
    );
};

export default Garden;
