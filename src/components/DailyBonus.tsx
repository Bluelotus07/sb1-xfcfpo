import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { claimDailyBonus } from '../store/userSlice';
import { RootState } from '../store';

const DailyBonus = () => {
  const dispatch = useDispatch();
  const lastDailyBonus = useSelector((state: RootState) => state.user.lastDailyBonus);
  const [canClaim, setCanClaim] = useState(false);
  const [bonus, setBonus] = useState(0);

  useEffect(() => {
    const checkClaimEligibility = () => {
      if (!lastDailyBonus) {
        setCanClaim(true);
        return;
      }

      const lastClaim = new Date(lastDailyBonus);
      const now = new Date();
      const hoursSinceLastClaim = (now.getTime() - lastClaim.getTime()) / (1000 * 60 * 60);
      setCanClaim(hoursSinceLastClaim >= 24);
    };

    checkClaimEligibility();
    const interval = setInterval(checkClaimEligibility, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastDailyBonus]);

  const handleClaim = () => {
    if (!canClaim) return;
    
    // Generate random bonus between 10 and 1,000,000
    const newBonus = Math.floor(Math.random() * (1000000 - 10 + 1)) + 10;
    setBonus(newBonus);
    dispatch(claimDailyBonus(newBonus));
    setCanClaim(false);
  };

  return (
    <motion.div
      className="bg-purple-800 rounded-lg p-6 shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-xl font-bold mb-4">Daily Bonus</h3>
      {canClaim ? (
        <button
          onClick={handleClaim}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Claim Now!
        </button>
      ) : (
        <div className="text-center">
          <p className="text-gray-300">Next claim available in:</p>
          <CountdownTimer lastClaim={lastDailyBonus!} />
        </div>
      )}
      {bonus > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-green-400 font-bold"
        >
          + {bonus} coins claimed!
        </motion.div>
      )}
    </motion.div>
  );
};

const CountdownTimer = ({ lastClaim }: { lastClaim: string }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const lastClaimDate = new Date(lastClaim);
      const nextClaimDate = new Date(lastClaimDate.getTime() + 24 * 60 * 60 * 1000);
      const diff = nextClaimDate.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [lastClaim]);

  return <p className="text-xl font-bold text-yellow-400">{timeLeft}</p>;
};

export default DailyBonus;