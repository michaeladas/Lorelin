import { useState } from 'react';
import { TemplateLayout } from './TemplateLayout';
import { VariablesSidebar } from './VariablesSidebar';

interface ReconsiderationLetterTemplateProps {
  onBack: () => void;
}

export function ReconsiderationLetterTemplate({ onBack }: ReconsiderationLetterTemplateProps) {
  const [status, setStatus] = useState<'Active' | 'Draft'>('Active');
  const [outputs, setOutputs] = useState({
    generatePdf: true,
    copyToClipboard: true
  });

  const handleOutputToggle = (key: 'generatePdf' | 'copyToClipboard') => {
    setOutputs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const variables = [
    // Payer details
    { name: 'PayerName', key: 'PayerName', group: 'Payer details' },
    { name: 'PayerAddress', key: 'PayerAddressLine1', group: 'Payer details' },
    { name: 'City', key: 'City', group: 'Payer details' },
    { name: 'State', key: 'State', group: 'Payer details' },
    { name: 'ZIP', key: 'ZIP', group: 'Payer details' },
    { name: 'ContactName', key: 'PayerContactName', group: 'Payer details' },
    
    // Case & claim
    { name: 'ClaimID', key: 'ClaimId', group: 'Case & claim' },
    { name: 'PatientName', key: 'PatientName', group: 'Case & claim' },
    { name: 'DOS', key: 'DOSRange', group: 'Case & claim' },
    { name: 'CPTCodes', key: 'CPTCodes', group: 'Case & claim' },
    
    // Denial summary
    { name: 'PrimaryDenialCode', key: 'PrimaryDenialCode', group: 'Denial summary' },
    { name: 'DenialReason', key: 'DenialReasonShort', group: 'Denial summary' },
    
    // Financials
    { name: 'BilledAmount', key: 'BilledAmount', group: 'Financials' },
    { name: 'DeniedAmount', key: 'DeniedAmount', group: 'Financials' },
    
    // Provider
    { name: 'ProviderName', key: 'ProviderName', group: 'Provider' },
    { name: 'PracticeName', key: 'PracticeName', group: 'Provider' }
  ];

  const leftContent = (
    <div className="space-y-6">
      {/* Card 1: Payer header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-4">
          Payer & header block
        </h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 font-mono text-[12px] text-[#4a5565] space-y-1.5">
          <div className="text-[#6a7282]">{'{TodayDate}'}</div>
          <div className="mt-3 space-y-1">
            <div className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">
              {'{PayerName}'}
            </div>
          </div>
          <div className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">
            {'{PayerAddressLine1}'}
          </div>
          <div className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">
            {'{PayerAddressLine2}'}
          </div>
          <div>
            <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium mr-1">
              {'{City}'}
            </span>
            <span className="text-[#6a7282]">, </span>
            <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium mx-1">
              {'{State}'}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium ml-1">
              {'{ZIP}'}
            </span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-300 space-y-1">
            <div className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">
              {'{ProviderName}'}
            </div>
          </div>
          <div className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">
            {'{PracticeName}'}
          </div>
          <div className="text-[#6a7282]">
            NPI: <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">
              {'{ProviderNPI}'}
            </span>
          </div>
        </div>
        <p className="text-[11px] text-[#6a7282] mt-3">
          This header appears at the top of the letter and includes payer and provider details.
        </p>
      </div>

      {/* Card 2: Subject */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-4">
          Subject
        </h3>
        <input
          type="text"
          defaultValue="Request for Denial Reconsideration / Peer Review – {PatientName} / {ClaimId}"
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Card 3: Body (tuned for quick rebuttals) */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-1">
          Body
        </h3>
        <p className="text-[11px] text-[#6a7282] mb-4">
          This template is designed for quick, concise rebuttals and peer review requests.
        </p>

        {/* Payer variant indicator */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[11px] text-[#6a7282]">Template variant:</span>
          <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-[#4a5565] rounded-full text-[11px] font-medium">
            Base template
          </span>
        </div>

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
            •
          </button>
          <button className="px-2 py-1 text-[12px] text-[#4a5565] hover:bg-gray-200 rounded">
            1.
          </button>
        </div>

        {/* Text editor - shorter, more focused */}
        <div className="bg-white border border-gray-300 rounded-lg p-5 min-h-[350px] max-w-[650px]">
          <div className="space-y-4 text-[13px] text-[#101828] leading-relaxed">
            <p>
              Dear <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{PayerContactName}'}</span>,
            </p>
            
            <p>
              We are requesting reconsideration and peer review for Claim <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{ClaimId}'}</span>, which was denied on <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{DenialDate}'}</span> citing <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium font-mono">{'{PrimaryDenialCode}'}</span> – <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{DenialReasonShort}'}</span>.
            </p>

            <div>
              <h3 className="font-semibold mb-2">Reason for Reconsideration</h3>
              <p>
                The denial appears to be based on an incomplete review of the clinical documentation. A peer-to-peer review will clarify the medical necessity and appropriateness of these services.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Key Facts</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-[#4a5565]">
                <li>Services were medically necessary based on patient presentation and clinical findings</li>
                <li>All required documentation was submitted with the original claim</li>
                <li>CPT codes <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium font-mono">{'{CPTCodes}'}</span> accurately reflect services performed</li>
                <li>Denial criteria cited do not apply to this clinical scenario</li>
              </ul>
            </div>

            <p>
              We request that you initiate a peer review within 5 business days. Our physician is available for discussion at your earliest convenience.
            </p>

            <p className="mt-4">
              Sincerely,<br />
              <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{ProviderName}'}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-[11px] text-blue-800">
            <span className="font-medium">Tip:</span> This template is intentionally concise to encourage quick turnaround on reconsideration requests. Keep the tone professional but direct.
          </p>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <VariablesSidebar
      templateType="Letter"
      stage="Early dispute"
      casePath="NSA"
      outputs={outputs}
      onOutputToggle={handleOutputToggle}
      variables={variables}
      onPreview={() => console.log('Preview')}
    />
  );

  return (
    <TemplateLayout
      templateName="Denial Reconsideration / Peer Review Request"
      stage="Pre-IDR reconsideration"
      casePath="NSA"
      isSystem={true}
      status={status}
      onStatusChange={setStatus}
      onBack={onBack}
      onSave={() => console.log('Save')}
      onDuplicate={() => console.log('Duplicate')}
      leftContent={leftContent}
      rightContent={rightContent}
      lastSaved="8 min ago by Alex C."
    />
  );
}
