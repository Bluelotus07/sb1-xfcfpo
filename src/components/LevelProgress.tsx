import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const levels = [
  { name: "Novice", range: "0 - 1K", requirement: 1000 },
  { name: "Apprentice", range: "1K - 10K", requirement: 10000 },
  { name: "Explorer", range: "10K - 100K", requirement: 100000 },
  { name: "Pro", range: "100K - 1M", requirement: 1000000 },
  { name: "Master", range: "1M - 10M", requirement: 10000000 },
  { name: "Champion", range: "10M - 100M", requirement: 100000000 },
  { name: "Legend", range: "100M - 1B", requirement: 1000000000 },
  { name: "Titan", range: "1B - 8B", requirement: 8000000000 },
  { name: "God", range: "8B+", requirement: Infinity },
];

const LevelProgress = () => {
  const { level, coins } = useSelector((state: RootState) => state.game);
  const currentLevel = levels[level];
  const nextLevel = levels[level + 1];

  const progress = nextLevel
    ? (coins / nextLevel.requirement) * 100
    : 100;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-purple-400">
          Level {level}: {currentLevel.name}
        </h3>
        <span className="text-sm text-gray-400">{currentLevel.range}</span>
      </div>

      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {nextLevel && (
        <div className="mt-2 text-sm text-gray-400">
          Next Level: {nextLevel.name} ({nextLevel.range})
        </div>
      )}
    </div>
  );
};

export default LevelProgress;