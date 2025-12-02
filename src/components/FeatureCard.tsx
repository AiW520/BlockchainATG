import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function FeatureCard({ title, description, icon, link }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        to={link}
        className="block p-6 rounded-xl border border-[#1a1a3a] hover-card bg-[#0c0c2a] h-full flex flex-col"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#00ff9d] flex items-center justify-center text-[#0a0a1f] mb-6">
          <i className={`fa-brands ${icon} text-2xl`}></i>
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-300 mb-6 flex-grow">{description}</p>
        <div className="flex items-center text-[#00f5ff] font-medium">
          <span>了解更多</span>
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </div>
      </Link>
    </motion.div>
  );
}