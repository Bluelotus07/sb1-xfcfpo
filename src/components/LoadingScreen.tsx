import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen bg-gray-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-purple-500 mb-4">Pulse Tap</h1>
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
        <p className="text-gray-400 mt-4">Tap into your rewards!</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;