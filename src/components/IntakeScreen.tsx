import { useState } from 'react';
import { DataSourceStep } from './intake/DataSourceStep';
import { DataUploadStep } from './intake/DataUploadStep';
import { ScanScopeStep } from './intake/ScanScopeStep';
import { RunScanStep } from './intake/RunScanStep';
import { ResultsView } from './intake/ResultsView';

export type IntakeStep = 'data-source' | 'upload' | 'scope' | 'scan' | 'results';

export function IntakeScreen() {
  const [currentStep, setCurrentStep] = useState<IntakeStep>('data-source');
  const [dataSource, setDataSource] = useState<'connect' | 'upload' | 'invite' | null>(null);

  const handleDataSourceSelect = (source: 'connect' | 'upload' | 'invite') => {
    setDataSource(source);
    if (source === 'upload') {
      setCurrentStep('upload');
    } else if (source === 'invite') {
      // For invite, we might show a confirmation and then go back to the start
      // For now, just stay on data-source
      alert('Invitation sent! They will receive instructions via email.');
    } else {
      // For connect, would show API connection flow
      alert('Billing system integration coming soon!');
    }
  };

  const handleUploadComplete = () => {
    setCurrentStep('scope');
  };

  const handleScopeComplete = () => {
    setCurrentStep('scan');
  };

  const handleScanComplete = () => {
    setCurrentStep('results');
  };

  return (
    <div className="overflow-auto size-full bg-white">
      {currentStep === 'data-source' && (
        <DataSourceStep onSelect={handleDataSourceSelect} />
      )}
      {currentStep === 'upload' && (
        <DataUploadStep onComplete={handleUploadComplete} onBack={() => setCurrentStep('data-source')} />
      )}
      {currentStep === 'scope' && (
        <ScanScopeStep onComplete={handleScopeComplete} onBack={() => setCurrentStep('upload')} />
      )}
      {currentStep === 'scan' && (
        <RunScanStep onComplete={handleScanComplete} />
      )}
      {currentStep === 'results' && (
        <ResultsView />
      )}
    </div>
  );
}
