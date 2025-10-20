import React from 'react';
import { WorkoutPlanType } from '../types';

interface Props {
  plan: WorkoutPlanType;
  onReset: () => void;
}

const WorkoutPlan: React.FC<Props> = ({ plan, onReset }) => {

  const formatPlanToText = () => {
    let textContent = `${plan.title.mainTitle} - ${plan.title.subtitle}\n`;
    textContent += "========================================\n\n";
    textContent += `${plan.description}\n\n`;

    if (plan.notes && plan.notes.length > 0) {
      textContent += "Note Importanti:\n";
      plan.notes.forEach(note => {
        textContent += `- ${note}\n`;
      });
      textContent += "\n";
    }

    plan.plan.forEach(dayPlan => {
      textContent += `--- ${dayPlan.day}: ${dayPlan.focus} ---\n`;
      dayPlan.exercises.forEach(exercise => {
        textContent += `- ${exercise.name}: ${exercise.sets} set x ${exercise.reps} reps (recupero ${exercise.rest})\n`;
        if (exercise.note) {
          textContent += `  *Nota: ${exercise.note}\n`;
        }
      });
      textContent += "\n";
    });
    
    return textContent;
  };

  const handleDownload = () => {
    const textContent = formatPlanToText();
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'iarnold-scheda-allenamento.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div id="printable-area" className="p-6 md:p-8 bg-slate-800/50 border border-slate-700 rounded-lg space-y-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400">{plan.title.mainTitle}</h1>
          <p className="mt-1 text-xl md:text-2xl font-semibold text-slate-200">{plan.title.subtitle}</p>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">{plan.description}</p>
        </div>
        
        {plan.notes && plan.notes.length > 0 && (
            <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-md">
                <h3 className="font-bold text-lg text-white mb-2">Note importanti dell'IA:</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {plan.notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            </div>
        )}

        <div className="space-y-8">
          {plan.plan.map((dayPlan, index) => (
            <div key={index} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">{dayPlan.day} - <span className="text-cyan-400">{dayPlan.focus}</span></h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm md:text-base">
                  <thead className="text-xs text-slate-200 uppercase bg-slate-800/50">
                    <tr>
                      <th scope="col" className="px-4 py-3">Esercizio</th>
                      <th scope="col" className="px-4 py-3 text-center">Serie</th>
                      <th scope="col" className="px-4 py-3 text-center">Reps</th>
                      <th scope="col" className="px-4 py-3 text-center">Recupero</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dayPlan.exercises.map((exercise, exIndex) => (
                      <tr key={exIndex} className="border-b border-slate-700/50 hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                          {exercise.name}
                          {exercise.note && <p className="text-xs text-slate-400 font-normal mt-1">{exercise.note}</p>}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-100">{exercise.sets}</td>
                        <td className="px-4 py-3 text-center text-slate-100">{exercise.reps}</td>
                        <td className="px-4 py-3 text-center text-slate-100">{exercise.rest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 no-print">
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
        >
          Crea una nuova scheda
        </button>
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Stampa Scheda
        </button>
         <button
          onClick={handleDownload}
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          Scarica (.txt)
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlan;