import { useState } from 'react';
import { SimplifiedUploadScreen } from './intake/SimplifiedUploadScreen';
import { SimplifiedResultsView } from './intake/SimplifiedResultsView';

export type IntakeStep = 'upload' | 'results';

export function IntakeScreen() {
  const [currentStep, setCurrentStep] = useState<IntakeStep>('upload');

  const handleRunDiagnostic = () => {
    setCurrentStep('results');
  };

  return (
    <div className="overflow-auto size-full bg-white">
      {currentStep === 'upload' ? (
        <SimplifiedUploadScreen onRunDiagnostic={handleRunDiagnostic} />
      ) : (
        <SimplifiedResultsView />
      )}
    </div>
  );
}
