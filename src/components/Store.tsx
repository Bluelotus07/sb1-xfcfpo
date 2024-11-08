import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleAutoTap, setMultiplier } from '../store/gameSlice';
import { setPremiumStatus } from '../store/userSlice';

const Store = () => {
  const dispatch = useDispatch();
  const { autoTapActive, multiplier } = useSelector((state: RootState) => state.game);
  const { isPremium } = useSelector((state: RootState) => state.user);

  const storeItems = [
    {
      id: 'premium',
      name: 'Premium Status',
      description: '2x earnings, exclusive rewards, VIP support',
      price: '5 TON',
      action: () => dispatch(setPremiumStatus(true)),
      disabled: isPremium,
    },
    {
      id: 'autoTap',
      name: 'Auto Tap',
      description: 'Automatically taps for you',
      price: '1 TON',
      action: () => dispatch(toggleAutoTap()),
      disabled: autoTapActive,
    },
    {
      id: 'multiplier2x',
      name: '2x Multiplier',
      description: 'Double your tapping power',
      price: '2 TON',
      action: () => dispatch(setMultiplier(2)),
      disabled: multiplier >= 2,
    },
    {
      id: 'multiplier5x',
      name: '5x Multiplier',
      description: '5x tapping power',
      price: '5 TON',
      action: () => dispatch(setMultiplier(5)),
      disabled: multiplier >= 5,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {storeItems.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">{item.name}</h3>
          <p className="text-gray-400 mb-4">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-purple-400 font-bold">{item.price}</span>
            <button
              onClick={item.action}
              disabled={item.disabled}
              className={`px-4 py-2 rounded-lg ${
                item.disabled
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              } transition-colors`}
            >
              {item.disabled ? 'Owned' : 'Purchase'}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Store;