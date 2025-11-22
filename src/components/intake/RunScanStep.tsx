import { useEffect, useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface RunScanStepProps {
  onComplete: () => void;
}

export function RunScanStep({ onComplete }: RunScanStepProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'Validating data files', duration: 1000 },
    { label: 'Analyzing claim patterns', duration: 2000 },
    { label: 'Calculating payment variances', duration: 2000 },
    { label: 'Identifying underpayments', duration: 1500 },
    { label: 'Detecting IDR opportunities', duration: 1500 },
    { label: 'Generating diagnostic report', duration: 1000 },
  ];

  useEffect(() => {
    let stepIndex = 0;
    let progressValue = 0;

    const runSteps = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        const stepDuration = steps[stepIndex].duration;
        const progressIncrement = (100 / steps.length) / (stepDuration / 100);

        const interval = setInterval(() => {
          progressValue += progressIncrement;
          setProgress(Math.min(progressValue, ((stepIndex + 1) / steps.length) * 100));
        }, 100);

        setTimeout(() => {
          clearInterval(interval);
          stepIndex++;
          runSteps();
        }, stepDuration);
      } else {
        // All steps complete
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    };

    runSteps();
  }, [onComplete]);

  return (
    <div className="size-full overflow-auto bg-[#f5f5f7]">
      <div className="max-w-[800px] mx-auto px-[60px] py-[80px]">
        <div className="text-center mb-12">
          <div className="size-[80px] rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
            <Loader2 className="size-10 text-blue-600 animate-spin" />
          </div>
          <h1 className="text-[28px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
            Running diagnostic scan
          </h1>
          <p className="text-[14px] text-[#6a7282] leading-[1.5]">
            We're analyzing your claims and remittances to identify recovery opportunities.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[12px] text-[#6a7282] text-center mt-2">
            {Math.round(progress)}% complete
          </div>
        </div>

        {/* Steps List - White Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                {index < currentStep ? (
                  <CheckCircle2 className="size-5 text-emerald-600 flex-shrink-0" />
                ) : index === currentStep ? (
                  <Loader2 className="size-5 text-blue-600 animate-spin flex-shrink-0" />
                ) : (
                  <div className="size-5 rounded-full border-2 border-gray-200 flex-shrink-0" />
                )}
                <span
                  className={`text-[13px] ${
                    index <= currentStep ? 'text-[#101828] font-medium' : 'text-[#6a7282]'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box - White Card */}
        <div className="bg-white rounded-lg border border-blue-200 p-6 text-center">
          <p className="text-[13px] text-[#4a5565] leading-[1.5]">
            <strong>What happens next?</strong> When the scan is complete, we'll email you a link to your Revenue Leakage Diagnostic report. You can also view it here in the app.
          </p>
        </div>
      </div>
    </div>
  );
}