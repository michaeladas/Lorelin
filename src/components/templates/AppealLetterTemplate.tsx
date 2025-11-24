import { useState } from 'react';
import { TemplateLayout } from './TemplateLayout';
import { VariablesSidebar } from './VariablesSidebar';

interface AppealLetterTemplateProps {
  onBack: () => void;
}

export function AppealLetterTemplate({ onBack }: AppealLetterTemplateProps) {
  const [status, setStatus] = useState<'Active' | 'Draft'>('Active');
  const [outputs, setOutputs] = useState({
    generatePdf: true,
    copyToClipboard: true
  });

  const handleOutputToggle = (key: 'generatePdf' | 'copyToClipboard') => {
    setOutputs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const variables = [
    // Denial info
    { name: 'DenialCodes', key: 'DenialCodes', group: 'Denial info' },
    { name: 'DenialReason', key: 'DenialReasonShort', group: 'Denial info' },
    { name: 'FullReason', key: 'DenialReasonLong', group: 'Denial info' },
    { name: 'ServiceLines', key: 'ServiceLinesSummary', group: 'Denial info' },
    
    // Financials
    { name: 'DeniedAmount', key: 'DeniedAmount', group: 'Financials' },
    { name: 'DisputedAmount', key: 'DisputedAmount', group: 'Financials' },
    { name: 'BilledAmount', key: 'BilledAmount', group: 'Financials' },
    
    // Patient & claim
    { name: 'PatientName', key: 'PatientName', group: 'Patient & claim' },
    { name: 'ClaimID', key: 'ClaimId', group: 'Patient & claim' },
    { name: 'DOS', key: 'DOSRange', group: 'Patient & claim' },
    { name: 'CPTCodes', key: 'CPTCodes', group: 'Patient & claim' },
    
    // Payer
    { name: 'PayerName', key: 'PayerName', group: 'Payer' },
    { name: 'PayerContact', key: 'PayerContactName', group: 'Payer' }
  ];

  const leftContent = (
    <div className="space-y-6">
      {/* Card 1: Denial summary strip */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-1">
          Payer reason summary strip
        </h3>
        <p className="text-[11px] text-[#6a7282] mb-4">
          This highlighted box appears at the top of the letter, summarizing the denial.
        </p>

        {/* Preview of the denial strip */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-[11px] text-[#6a7282] uppercase tracking-wider min-w-[120px]">
                Denial reason code(s):
              </span>
              <span className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[11px] font-medium font-mono">
                {'{DenialCodes}'}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[11px] text-[#6a7282] uppercase tracking-wider min-w-[120px]">
                Reason:
              </span>
              <span className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[11px] font-medium">
                {'{DenialReasonShort}'}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[11px] text-[#6a7282] uppercase tracking-wider min-w-[120px]">
                Service lines:
              </span>
              <span className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[11px] font-medium font-mono">
                {'{ServiceLinesSummary}'}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[11px] text-[#6a7282] uppercase tracking-wider min-w-[120px]">
                Denied amount:
              </span>
              <span className="inline-flex items-center px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[11px] font-medium font-mono">
                {'{DeniedAmount}'}
              </span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#6a7282] mt-3">
          The strip uses a distinct background color to stand out from the body text.
        </p>
      </div>

      {/* Card 2: Subject */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-1">
          Subject
        </h3>
        <p className="text-[11px] text-[#6a7282] mb-4">
          Shown as the letter subject and/or email subject when sent to the payer.
        </p>
        <input
          type="text"
          defaultValue="Appeal of Claim Denial – {PatientName} / {ClaimId}"
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Card 3: Body */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-4">
          Body
        </h3>

        {/* WYSIWYG toolbar */}
        <div className="mb-3 flex items-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded-lg">
          <button className="px-2 py-1 text-[12px] text-[#4a5565] hover:bg-gray-200 rounded font-semibold">
            B
          </button>
          <button className="px-2 py-1 text-[12px] text-[#4a5565] hover:bg-gray-200 rounded italic">
            I
          </button>
          <button className="px-2 py-1 text-[12px] text-[#4a5565] hover:bg-gray-200 rounded underline">
            U
          </button>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <button className="px-2 py-1 text-[12px] text-[#4a5565] hover:bg-gray-200 rounded">
            H2
          </button>
          <button className="px-2 py-1 text-[12px] text-[#4a5565] hover:bg-gray-200 rounded">
            H3
          </button>
          <button className="px-2 py-1 text-[12px] text-[#4a5565] hover:bg-gray-200 rounded">
            •
          </button>
        </div>

        {/* Text editor */}
        <div className="bg-white border border-gray-300 rounded-lg p-5 min-h-[450px] max-w-[650px]">
          <div className="space-y-4 text-[13px] text-[#101828] leading-relaxed">
            <p>
              Dear <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{PayerContactName}'}</span>,
            </p>
            
            <p>
              This letter constitutes a formal appeal of your denial for services provided to <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{PatientName}'}</span> on <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{DOSRange}'}</span>, Claim ID <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{ClaimId}'}</span>.
            </p>

            <div>
              <h3 className="font-semibold mt-4 mb-2">Summary of Denial</h3>
              <p>
                Your organization denied this claim citing <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{DenialReasonShort}'}</span>. We respectfully disagree with this determination for the following reasons.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mt-4 mb-2">Clinical and Coding Rationale</h3>
              <p className="mb-2">
                The services rendered were medically necessary and appropriately coded. Specifically:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#4a5565]">
                <li>All services met medical necessity criteria per established guidelines</li>
                <li>CPT codes <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium font-mono">{'{CPTCodes}'}</span> were correctly assigned</li>
                <li>Supporting documentation was provided at time of initial submission</li>
                <li>Services were within the scope of the patient's coverage</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mt-4 mb-2">Requested Outcome</h3>
              <p>
                We request reversal of the denial and payment of the full billed amount of <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{DisputedAmount}'}</span>. Supporting clinical documentation is attached for your review.
              </p>
            </div>

            <p className="mt-4">
              Please respond within 30 days with your determination. If you require additional information, please contact our billing office.
            </p>

            <p className="mt-4">
              Sincerely,<br />
              <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{ProviderName}'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <VariablesSidebar
      templateType="Letter"
      stage="Appeal-only"
      casePath="Appeal-only"
      outputs={outputs}
      onOutputToggle={handleOutputToggle}
      variables={variables}
      onPreview={() => console.log('Preview')}
    />
  );

  return (
    <TemplateLayout
      templateName="Appeal Letter – Appeal-only Disputes"
      stage="Appeal-only"
      casePath="Appeal-only"
      isSystem={true}
      status={status}
      onStatusChange={setStatus}
      onBack={onBack}
      onSave={() => console.log('Save')}
      onDuplicate={() => console.log('Duplicate')}
      leftContent={leftContent}
      rightContent={rightContent}
      lastSaved="10 min ago by Alex C."
    />
  );
}
