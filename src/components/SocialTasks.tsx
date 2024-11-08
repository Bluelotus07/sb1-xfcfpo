import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSocialPlatform } from '../store/socialSlice';
import { RootState } from '../store';

const socialPlatforms = [
  {
    name: 'Twitter',
    icon: '🐦',
    key: 'twitterFollowed' as const,
    reward: '50 coins/day',
  },
  {
    name: 'Discord',
    icon: '💬',
    key: 'discordJoined' as const,
    reward: '75 coins/day',
  },
  {
    name: 'YouTube',
    icon: '▶️',
    key: 'youtubeSubscribed' as const,
    reward: '100 coins/day',
  },
  {
    name: 'Instagram',
    icon: '📸',
    key: 'instagramFollowed' as const,
    reward: '60 coins/day',
  },
  {
    name: 'Telegram',
    icon: '📱',
    key: 'telegramJoined' as const,
    reward: '80 coins/day',
  },
];

const SocialTasks = () => {
  const dispatch = useDispatch();
  const socialState = useSelector((state: RootState) => state.social);
  const multiplier = socialState.socialMultiplier;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 text-purple-400">Social Tasks</h3>
      <p className="text-sm text-gray-400 mb-4">
        Current Multiplier: {multiplier.toFixed(1)}x
      </p>
      <div className="space-y-4">
        {socialPlatforms.map((platform) => (
          <motion.div
            key={platform.key}
            className={`p-4 rounded-lg ${
              socialState[platform.key]
                ? 'bg-purple-700'
                : 'bg-gray-700'
            } cursor-pointer`}
            whileHover={{ scale: 1.02 }}
            onClick={() => dispatch(toggleSocialPlatform(platform.key))}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{platform.icon}</span>
                <div>
                  <p className="font-semibold">{platform.name}</p>
                  <p className="text-sm text-gray-300">{platform.reward}</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 ${
                socialState[platform.key]
                  ? 'bg-green-500 border-green-400'
                  : 'border-gray-400'
              } flex items-center justify-center`}>
                {socialState[platform.key] && '✓'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SocialTasks;