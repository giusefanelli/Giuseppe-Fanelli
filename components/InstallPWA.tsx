
import React, { useState, useEffect } from 'react';
import { BeforeInstallPromptEvent } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShareIcon } from './icons/ShareIcon';

const InstallPWA: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosBanner, setShowIosBanner] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isIos && !isStandalone) {
      setShowIosBanner(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then(() => {
      setInstallPrompt(null);
    });
  };
  
  const handleCloseIosBanner = () => {
    setShowIosBanner(false);
  }

  if (installPrompt) {
    return (
      <div className="mb-8 p-4 bg-cyan-900/50 border border-cyan-700 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-cyan-200 text-center sm:text-left">
          Installa IArnold sul tuo dispositivo per un accesso rapido e offline!
        </p>
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-2 px-5 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
        >
          <DownloadIcon className="w-5 h-5" />
          Installa App
        </button>
      </div>
    );
  }

  if (showIosBanner) {
      return (
          <div className="mb-8 p-4 bg-slate-800 border border-slate-700 rounded-lg relative">
             <button onClick={handleCloseIosBanner} className="absolute top-2 right-2 text-slate-400 hover:text-white">&times;</button>
              <p className="text-slate-300 text-center text-sm">
                  Per installare IArnold, tocca l'icona <ShareIcon className="inline-block w-4 h-4 mx-1" /> in basso e seleziona "Aggiungi a schermata Home".
              </p>
          </div>
      )
  }

  return null;
};

export default InstallPWA;