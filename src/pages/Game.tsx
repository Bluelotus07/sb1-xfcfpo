import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TapButton from '../components/TapButton';
import DailyBonus from '../components/DailyBonus';
import SocialTasks from '../components/SocialTasks';
import LevelProgress from '../components/LevelProgress';
import Store from '../components/Store';
import ReferralSystem from '../components/ReferralSystem';
import { RootState } from '../store';
import { useReminder } from '../hooks/useReminder';
import Notification from '../components/Notification';
import { incrementTaps } from '../store/gameSlice';

const Game = () => {
  const dispatch = useDispatch();
  const { taps, coins, level, autoTapActive } = useSelector((state: RootState) => state.game);
  const { showReminder, dismissReminder } = useReminder();
  const [activeTab, setActiveTab] = useState('game');

  // Auto-tap mechanism
  useEffect(() => {
    let interval: number;
    if (autoTapActive) {
      interval = setInterval(() => {
        dispatch(incrementTaps());
      }, 1000) as unknown as number;
    }
    return () => clearInterval(interval);
  }, [autoTapActive, dispatch]);

  const tabs = [
    { id: 'game', label: 'Game' },
    { id: 'social', label: 'Social Tasks' },
    { id: 'store', label: 'Store' },
    { id: 'referral', label: 'Referral' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <Notification
        message="Don't forget to check your Pulse!"
        isVisible={showReminder}
        onClose={dismissReminder}
      />

      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Level {level}</h2>
            <p className="text-purple-400">Coins: {coins.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Taps: {taps.toLocaleString()}</p>
            {autoTapActive && (
              <p className="text-sm text-green-400">Auto Tap Active</p>
            )}
          </div>
        </header>

        <nav className="mb-6">
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {activeTab === 'game' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col items-center justify-center space-y-8">
                  <TapButton />
                  <LevelProgress />
                </div>
              </motion.div>
            )}
            {activeTab === 'social' && <SocialTasks />}
            {activeTab === 'store' && <Store />}
            {activeTab === 'referral' && <ReferralSystem />}
          </div>

          <div className="space-y-6">
            <DailyBonus />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Game;