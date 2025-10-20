import React from 'react';
import { DumbbellIcon } from './icons/DumbbellIcon';

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4 flex justify-center items-center gap-4">
        <DumbbellIcon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            IArnold
          </h1>
          <p className="text-md md:text-lg font-medium text-slate-300 -mt-1">
            Generatore schede palestra <span className="text-cyan-400">AI</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;