
import React from 'react';
import { ShareAppIcon } from './icons/ShareAppIcon';

interface FooterProps {
  onShareClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShareClick }) => {
  return (
    <footer className="text-center py-6 mt-auto print:hidden">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <p className="text-slate-500 text-sm">
          Powered by <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-400 hover:text-cyan-400 transition-colors">Google Gemini</a>
        </p>
        <button 
          onClick={onShareClick} 
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-900/50 rounded-full hover:bg-cyan-900/80 transition-colors"
          aria-label="Condividi applicazione"
        >
          <ShareAppIcon className="w-4 h-4" />
          Condividi App
        </button>
      </div>
    </footer>
  );
};

export default Footer;