import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { incrementTaps } from '../store/gameSlice';

const TapButton = () => {
  const dispatch = useDispatch();

  const handleTap = () => {
    dispatch(incrementTaps());
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleTap}
      className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                 shadow-lg flex items-center justify-center text-white font-bold text-xl
                 hover:from-purple-600 hover:to-pink-600 transition-colors"
    >
      TAP!
    </motion.button>
  );
};

export default TapButton;