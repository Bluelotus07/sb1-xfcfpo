import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ReferralSystem = () => {
  const { isPremium, referralCount, referralEarnings } = useSelector(
    (state: RootState) => state.user
  );
  const [copied, setCopied] = useState(false);

  const referralLink = `https://pulse-tap.com/ref/${Math.random().toString(36).substr(2, 9)}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Your Referrals</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Total Referrals</p>
            <p className="text-2xl font-bold text-purple-400">{referralCount}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-400">Total Earnings</p>
            <p className="text-2xl font-bold text-green-400">
              {referralEarnings.toLocaleString()} TON
            </p>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-400 mb-2">Your Referral Link</p>
          <div className="flex space-x-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-gray-800 rounded px-3 py-2 text-sm"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
            >
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="font-bold mb-2">Referral Rewards</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Normal Users: 10% of referral earnings</li>
            <li>• Premium Users: 25% of referral earnings</li>
            <li>• Bonus multiplier for active referrals</li>
            {isPremium && (
              <li className="text-purple-400">
                • Premium Bonus: Extra 5% from sub-referrals
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReferralSystem;