import { useState } from 'react';
import { TemplateLayout } from './TemplateLayout';
import { VariablesSidebar } from './VariablesSidebar';

interface NegotiationLetterTemplateProps {
  onBack: () => void;
}

export function NegotiationLetterTemplate({ onBack }: NegotiationLetterTemplateProps) {
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
    { name: 'DOS Range', key: 'DOSRange', group: 'Case & claim' },
    { name: 'ServiceLines', key: 'ServiceLines', group: 'Case & claim' },
    
    // Financials
    { name: 'BilledAmount', key: 'BilledAmount', group: 'Financials' },
    { name: 'AllowedAmount', key: 'AllowedAmount', group: 'Financials' },
    { name: 'PaidAmount', key: 'PaidAmount', group: 'Financials' },
    { name: 'DisputedAmount', key: 'DisputedAmount', group: 'Financials' },
    
    // Timelines
    { name: 'NegotiationStart', key: 'NegotiationStartDate', group: 'Timelines' },
    { name: 'Deadline', key: 'NegotiationDeadline', group: 'Timelines' },
    { name: 'TodayDate', key: 'TodayDate', group: 'Timelines' }
  ];

  const leftContent = (
    <div className="space-y-6">
      {/* Card 1: Payer & header block */}
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

      {/* Card 2: Subject line */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-1">
          Subject
        </h3>
        <p className="text-[11px] text-[#6a7282] mb-4">
          This appears as the letter subject and/or email subject.
        </p>
        <input
          type="text"
          defaultValue="Open Negotiation under the No Surprises Act – {PatientName} / {ClaimId}"
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Card 3: Body text */}
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
            H1
          </button>
          <button className="px-2 py-1 text-[12px] text-[#4a5565] hover:bg-gray-200 rounded">
            H2
          </button>
          <button className="px-2 py-1 text-[12px] text-[#4a5565] hover:bg-gray-200 rounded">
            •
          </button>
        </div>

        {/* Text editor */}
        <div className="bg-white border border-gray-300 rounded-lg p-5 min-h-[400px] max-w-[650px]">
          <div className="space-y-4 text-[13px] text-[#101828] leading-relaxed">
            <p>
              Dear <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{PayerContactName}'}</span>,
            </p>
            
            <p>
              This letter serves as formal notification of open negotiation under the No Surprises Act regarding services provided to patient <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{PatientName}'}</span> on <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{DOSRange}'}</span>.
            </p>

            <p className="font-medium mt-4">Summary of Dispute:</p>
            
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Claim ID: <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{ClaimId}'}</span></li>
              <li>Billed amount: <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{BilledAmount}'}</span></li>
              <li>Allowed amount: <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{AllowedAmount}'}</span></li>
              <li>Paid amount: <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{PaidAmount}'}</span></li>
              <li>Disputed amount: <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{DisputedAmount}'}</span></li>
            </ul>

            <p className="mt-4">
              We believe the payment is inconsistent with the Qualifying Payment Amount (QPA) methodology and request good-faith negotiation to resolve this matter. Per NSA regulations, we have 30 business days from <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{NegotiationStartDate}'}</span> to reach resolution before proceeding to Independent Dispute Resolution.
            </p>

            <p className="mt-4">
              Please respond by <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium">{'{NegotiationDeadline}'}</span> with your proposed resolution.
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
      stage="Open negotiation"
      casePath="NSA"
      outputs={outputs}
      onOutputToggle={handleOutputToggle}
      variables={variables}
      onPreview={() => console.log('Preview')}
    />
  );

  return (
    <TemplateLayout
      templateName="NSA – Open Negotiation Letter"
      stage="Open negotiation"
      casePath="NSA"
      isSystem={true}
      status={status}
      onStatusChange={setStatus}
      onBack={onBack}
      onSave={() => console.log('Save')}
      onDuplicate={() => console.log('Duplicate')}
      leftContent={leftContent}
      rightContent={rightContent}
      lastSaved="2 min ago by Alex C."
    />
  );
}
