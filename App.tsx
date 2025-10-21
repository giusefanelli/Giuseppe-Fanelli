
import React, { useState, useCallback } from 'react';
import { UserData, WorkoutPlanType } from './types';
import { generateWorkoutPlan } from './services/geminiService';
import Header from './components/Header';
import WorkoutForm from './components/WorkoutForm';
import WorkoutPlan from './components/WorkoutPlan';
import Loader from './components/Loader';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';
import ApiKeyPrompt from './components/ApiKeyPrompt';
import ShareModal from './components/ShareModal';

function App() {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlanType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleGeneratePlan = useCallback(async (userData: UserData) => {
    setIsLoading(true);
    setError(null);
    setWorkoutPlan(null);

    try {
      const plan = await generateWorkoutPlan(userData);
      setWorkoutPlan(plan);
    } catch (err) {
      console.error(err);
      setError('Si è verificato un errore durante la generazione della scheda. Assicurati che la tua API Key sia configurata correttamente e riprova.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setWorkoutPlan(null);
    setError(null);
    setIsLoading(false);
  };

  const renderContent = () => {
    // Check for API Key at the top level.
    const isApiKeyMissing = !process.env.API_KEY;
    // If API key is missing, show a dedicated prompt.
    if (isApiKeyMissing) {
      return <ApiKeyPrompt />;
    }
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Riprova
          </button>
        </div>
      );
    }
    if (workoutPlan) {
      return <WorkoutPlan plan={workoutPlan} onReset={handleReset} />;
    }
    return <WorkoutForm onSubmit={handleGeneratePlan} isLoading={isLoading} />;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-900/30 z-0"></div>
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <InstallPWA />
            {renderContent()}
          </div>
        </main>
        <Footer onShareClick={() => setIsShareModalOpen(true)} />
      </div>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}

export default App;