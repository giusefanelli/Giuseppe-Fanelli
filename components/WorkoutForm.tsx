import React, { useState } from 'react';
import { UserData } from '../types';
import { GOALS, EXPERIENCE_LEVELS, MUSCLE_GROUPS, TRAINING_TYPES, RECOMMENDED_SPLITS, EQUIPMENT_OPTIONS } from '../constants';
import { SparklesIcon } from './icons/SparklesIcon';

interface Props {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

const WorkoutForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Omit<UserData, 'previousPlan'>>({
    name: '',
    gender: 'male',
    age: 25,
    height: 175,
    weight: 70,
    equipment: 'gym',
    trainingDays: 4,
    goal: 'hypertrophy',
    experience: 'intermediate',
    trainingType: 'multifrequenza',
    focusMuscleGroups: [],
    recommendedSplit: RECOMMENDED_SPLITS[0],
  });

  const [previousPlanFile, setPreviousPlanFile] = useState<{
    name: string;
    content: string;
    type: 'image' | 'text';
    mimeType?: string;
  } | null>(null);

  const [fileError, setFileError] = useState<string | null>(null);
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' || name === 'height' || name === 'weight' || name === 'trainingDays' ? parseInt(value) : value }));
  };

  const handleMuscleGroupChange = (muscle: string) => {
    setFormData(prev => {
      const newFocusMuscleGroups = prev.focusMuscleGroups.includes(muscle)
        ? prev.focusMuscleGroups.filter(m => m !== muscle)
        : [...prev.focusMuscleGroups, muscle];
      return { ...prev, focusMuscleGroups: newFocusMuscleGroups };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit: UserData = { ...formData };
    if (previousPlanFile) {
        dataToSubmit.previousPlan = {
            content: previousPlanFile.content,
            type: previousPlanFile.type,
            mimeType: previousPlanFile.mimeType,
        };
    }
    onSubmit(dataToSubmit);
  };
  
  const handleSplitChange = (split: string) => {
    setFormData(prev => ({ ...prev, recommendedSplit: split }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) {
      setPreviousPlanFile(null);
      return;
    }
    
    const reader = new FileReader();

    if (file.type.startsWith('image/')) {
        reader.onload = (loadEvent) => {
            const base64String = (loadEvent.target?.result as string).split(',')[1];
            setPreviousPlanFile({
                name: file.name,
                content: base64String,
                type: 'image',
                mimeType: file.type,
            });
        };
        reader.readAsDataURL(file);
    } else if (file.type === 'text/plain') {
        reader.onload = (loadEvent) => {
            const textContent = loadEvent.target?.result as string;
            setPreviousPlanFile({
                name: file.name,
                content: textContent,
                type: 'text',
            });
        };
        reader.readAsText(file);
    } else {
        setFileError('Formato file non supportato. Carica un\'immagine (es: .jpg, .png) o un file di testo (.txt).');
        if(e.target) e.target.value = '';
        setPreviousPlanFile(null);
    }
  };

  const removeFile = () => {
    setPreviousPlanFile(null);
    setFileError(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Sezione Dati Personali */}
      <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Dati Personali</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Come vuoi che ti chiami?</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" placeholder="Es. Mario" />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-slate-300 mb-1">Sesso</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
              <option value="male">Uomo</option>
              <option value="female">Donna</option>
              <option value="other">Altro</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-1">Età</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" min="14" max="99" />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-slate-300 mb-1">Altezza (cm)</label>
            <input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" min="100" max="250" />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-slate-300 mb-1">Peso (kg)</label>
            <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" min="30" max="200" />
          </div>
        </div>
      </div>

      {/* Sezione Obiettivi e Livello */}
      <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Obiettivi e Livello</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
            <label htmlFor="trainingDays" className="block text-sm font-medium text-slate-300 mb-1">Giorni di allenamento / settimana</label>
            <input type="number" id="trainingDays" name="trainingDays" value={formData.trainingDays} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" min="2" max="7" />
          </div>
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-slate-300 mb-1">Obiettivo principale</label>
            <select id="goal" name="goal" value={formData.goal} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
              {GOALS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-slate-300 mb-1">Livello di esperienza</label>
            <select id="experience" name="experience" value={formData.experience} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
              {EXPERIENCE_LEVELS.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
          </div>
           <div>
            <label htmlFor="trainingType" className="block text-sm font-medium text-slate-300 mb-1">Tipologia di allenamento</label>
            <select id="trainingType" name="trainingType" value={formData.trainingType} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
              {TRAINING_TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
           <div className="md:col-span-2">
            <label htmlFor="equipment" className="block text-sm font-medium text-slate-300 mb-1">Attrezzatura Disponibile</label>
            <select id="equipment" name="equipment" value={formData.equipment} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
              {EQUIPMENT_OPTIONS.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
            </select>
          </div>
        </div>
      </div>
      
      {/* Sezione Carica Scheda */}
      <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Continua da una scheda esistente (Opzionale)</h2>
        <p className="text-slate-400 mb-4 text-sm">Allega la tua scheda attuale (immagine o .txt) per permettere all'IA di creare una progressione.</p>
        <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="image/*,.txt"
            className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-900/50 file:text-cyan-300 hover:file:bg-cyan-900"
        />
        {fileError && <p className="text-red-400 text-sm mt-2">{fileError}</p>}
        {previousPlanFile && (
            <div className="mt-4 p-3 bg-slate-900/50 rounded-md flex items-center justify-between">
                <p className="text-sm text-slate-300 truncate">File: <span className="font-medium text-white">{previousPlanFile.name}</span></p>
                <button type="button" onClick={removeFile} className="text-xs font-bold text-red-400 hover:text-red-300 ml-4">RIMUOVI</button>
            </div>
        )}
      </div>

      {/* Sezione Struttura Scheda Consigliata */}
      <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Struttura Scheda Consigliata</h2>
        <p className="text-slate-400 mb-4 text-sm">Puoi dare un suggerimento all'IA sulla struttura da seguire, altrimenti sceglierà lei la migliore per te.</p>
        <div className="flex flex-wrap gap-3">
          {RECOMMENDED_SPLITS.map(split => (
            <button
              key={split}
              type="button"
              onClick={() => handleSplitChange(split)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                formData.recommendedSplit === split
                  ? 'bg-cyan-500 text-slate-900 ring-2 ring-offset-2 ring-offset-slate-800 ring-cyan-500'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              {split}
            </button>
          ))}
        </div>
      </div>

      {/* Sezione Muscoli Carenti / Focus */}
      <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">Muscoli Carenti / Focus</h2>
        <p className="text-slate-400 mb-4 text-sm">Seleziona i gruppi muscolari su cui vuoi porre maggiore enfasi. L'IA aumenterà il volume o la priorità su di essi.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {MUSCLE_GROUPS.map(muscle => (
            <label key={muscle} className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-md cursor-pointer hover:bg-slate-700/50 transition-colors border border-transparent has-[:checked]:border-cyan-500 has-[:checked]:bg-cyan-900/20">
              <input
                type="checkbox"
                checked={formData.focusMuscleGroups.includes(muscle)}
                onChange={() => handleMuscleGroupChange(muscle)}
                className="h-5 w-5 rounded border-slate-600 text-cyan-600 bg-slate-800 focus:ring-cyan-500"
              />
              <span className="font-medium text-slate-200">{muscle}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-600 text-white font-bold text-lg rounded-lg hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          <SparklesIcon className="w-6 h-6" />
          {isLoading ? 'Creazione in corso...' : 'Genera la mia scheda'}
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;
