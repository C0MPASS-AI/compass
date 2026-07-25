import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import OptionRow from '../components/OptionRow';
import { STEPS } from '../data/preferencesSteps';

export default function TravelPreferencesForm({ onExit, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const step = STEPS[stepIndex];
  const progress = ((stepIndex + 1) / STEPS.length) * 100;
  const currentAnswer = answers[step.key];

  const isSelected = (option) => {
    if (step.type === 'multi') return (currentAnswer || []).includes(option);
    return currentAnswer === option;
  };

  const toggleOption = (option) => {
    if (step.type === 'multi') {
      const prevList = answers[step.key] || [];
      const nextList = prevList.includes(option)
        ? prevList.filter((o) => o !== option)
        : [...prevList, option];
      setAnswers((prev) => ({ ...prev, [step.key]: nextList }));
    } else {
      setAnswers((prev) => ({ ...prev, [step.key]: option }));
    }
  };

  const canProceed =
    step.type === 'multi' ? (currentAnswer || []).length > 0 : Boolean(currentAnswer);

  const handleNext = () => {
    if (stepIndex === STEPS.length - 1) {
      onComplete?.(answers);
    } else {
      setStepIndex(stepIndex + 1);
    }
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      onExit?.();
    } else {
      setStepIndex(stepIndex - 1);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: 'url(public/background2.jpg)' }}
    >
      {/* Top bar: back arrow + progress */}
      <div className="flex items-center gap-4 px-5 pt-6">
        <button onClick={handleBack} aria-label="Go back" className="text-slate-800">
          <ArrowLeft size={22} />
        </button>
        <ProgressBar percent={progress} />
      </div>

      {/* Heading */}
      <div className="px-5 pt-6">
        <h1 className="text-blue-800 font-bold text-2xl leading-snug">{step.title}</h1>
        {step.subtitle && (
          <p className="text-slate-600 text-sm mt-1">{step.subtitle}</p>
        )}
      </div>

      {/* Options */}
      <div className="flex-1 px-5 pt-6 flex flex-col gap-3 overflow-y-auto pb-4">
        {step.options.map((option) => (
          <OptionRow
            key={option}
            label={option}
            selected={isSelected(option)}
            onClick={() => toggleOption(option)}
          />
        ))}
      </div>

      {/* Next button */}
      <div className="px-5 pb-8 pt-4">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`w-full font-medium rounded-full py-3 flex items-center justify-center gap-2
            transition-colors ${
              canProceed
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
        >
          {stepIndex === STEPS.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}