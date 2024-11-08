import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification = ({ message, isVisible, onClose }: NotificationProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Notification;