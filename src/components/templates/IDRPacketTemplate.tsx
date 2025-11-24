import { useState } from 'react';
import { TemplateLayout } from './TemplateLayout';
import { VariablesSidebar } from './VariablesSidebar';
import { GripVertical, Plus } from 'lucide-react';

interface IDRPacketTemplateProps {
  onBack: () => void;
}

export function IDRPacketTemplate({ onBack }: IDRPacketTemplateProps) {
  const [status, setStatus] = useState<'Active' | 'Draft'>('Active');
  const [outputs, setOutputs] = useState({
    generatePdf: true,
    copyToClipboard: true,
    markAsFiled: true
  });
  const [requireAllChecked, setRequireAllChecked] = useState(true);

  const handleOutputToggle = (key: 'generatePdf' | 'copyToClipboard' | 'markAsFiled') => {
    setOutputs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const variables = [
    // Offers
    { name: 'ProviderOffer', key: 'ProviderOfferAmount', group: 'Offers' },
    { name: 'PayerOffer', key: 'PayerOfferAmount', group: 'Offers' },
    { name: 'OfferDates', key: 'OfferDates', group: 'Offers' },
    
    // Case info
    { name: 'CaseID', key: 'CaseId', group: 'Case info' },
    { name: 'IDREntity', key: 'IDREntityName', group: 'Case info' },
    { name: 'FilingDeadline', key: 'FilingDeadline', group: 'Case info' },
    { name: 'PatientName', key: 'PatientName', group: 'Case info' },
    { name: 'DOS', key: 'DOSRange', group: 'Case info' },
    
    // Parties
    { name: 'ProviderName', key: 'ProviderName', group: 'Parties' },
    { name: 'PayerName', key: 'PayerName', group: 'Parties' },
    { name: 'PracticeName', key: 'PracticeName', group: 'Parties' }
  ];

  const leftContent = (
    <div className="space-y-6">
      {/* Card 1: Offers summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-1">
          Offers summary
        </h3>
        <p className="text-[11px] text-[#6a7282] mb-4">
          Configure how offers appear in the packet.
        </p>

        {/* Intro text editor */}
        <div className="mb-4">
          <label className="text-[11px] text-[#6a7282] uppercase tracking-wider mb-2 block">
            Introduction text
          </label>
          <textarea
            defaultValue="The following table summarizes the offers exchanged between the parties during the open negotiation period under the No Surprises Act:"
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-[12px] text-[#101828] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Table preview */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2.5 text-left">
                  <input
                    type="text"
                    defaultValue="Party"
                    className="bg-transparent border-none text-[11px] font-medium text-[#6a7282] uppercase tracking-wider focus:outline-none"
                  />
                </th>
                <th className="px-4 py-2.5 text-left">
                  <input
                    type="text"
                    defaultValue="Offer amount"
                    className="bg-transparent border-none text-[11px] font-medium text-[#6a7282] uppercase tracking-wider focus:outline-none"
                  />
                </th>
                <th className="px-4 py-2.5 text-left">
                  <input
                    type="text"
                    defaultValue="Offer date"
                    className="bg-transparent border-none text-[11px] font-medium text-[#6a7282] uppercase tracking-wider focus:outline-none"
                  />
                </th>
                <th className="px-4 py-2.5 text-left">
                  <input
                    type="text"
                    defaultValue="Notes"
                    className="bg-transparent border-none text-[11px] font-medium text-[#6a7282] uppercase tracking-wider focus:outline-none"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 text-[12px] text-[#4a5565]">Provider</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium font-mono">
                    {'{ProviderOfferAmount}'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium font-mono">
                    {'{ProviderOfferDate}'}
                  </span>
                </td>
                <td className="px-4 py-3 text-[12px] text-[#6a7282]">Initial offer</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-3 text-[12px] text-[#4a5565]">Payer</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium font-mono">
                    {'{PayerOfferAmount}'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[11px] font-medium font-mono">
                    {'{PayerOfferDate}'}
                  </span>
                </td>
                <td className="px-4 py-3 text-[12px] text-[#6a7282]">Counter offer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 2: Narrative justification */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-4">
          Narrative justification
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

        {/* Text editor with structured sections */}
        <div className="bg-white border border-gray-300 rounded-lg p-5 min-h-[500px]">
          <div className="space-y-5 text-[13px] text-[#101828] leading-relaxed">
            <div>
              <h3 className="font-semibold mb-2">Background</h3>
              <p className="text-[#4a5565]">
                This section provides context about the services rendered, the patient encounter, and the circumstances that led to this IDR filing...
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Clinical justification</h3>
              <p className="text-[#4a5565]">
                Detail the medical necessity and appropriateness of the services provided. Include relevant clinical information, patient history, and supporting documentation...
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Market & comparative data</h3>
              <p className="text-[#4a5565]">
                Provide market-based evidence supporting the requested payment amount, including comparative rates for similar services in the geographic area...
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Regulatory & NSA references</h3>
              <p className="text-[#4a5565]">
                Cite relevant provisions of the No Surprises Act and supporting regulations that apply to this case...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Filing readiness checklist */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-[14px] font-semibold text-[#101828] mb-1">
          Filing readiness checklist
        </h3>
        <p className="text-[11px] text-[#6a7282] mb-4">
          These items must be completed before marking the IDR filing as submitted.
        </p>

        {/* Checklist items */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group">
            <GripVertical className="size-4 text-[#99A1AF] cursor-grab" />
            <div className="size-5 rounded border-2 border-gray-400 flex-shrink-0" />
            <input
              type="text"
              defaultValue="Offers recorded and verified"
              className="flex-1 bg-transparent border-none text-[13px] text-[#101828] focus:outline-none"
            />
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-medium uppercase tracking-wide">
              Required
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group">
            <GripVertical className="size-4 text-[#99A1AF] cursor-grab" />
            <div className="size-5 rounded border-2 border-gray-400 flex-shrink-0" />
            <input
              type="text"
              defaultValue="Narrative justification complete"
              className="flex-1 bg-transparent border-none text-[13px] text-[#101828] focus:outline-none"
            />
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-medium uppercase tracking-wide">
              Required
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group">
            <GripVertical className="size-4 text-[#99A1AF] cursor-grab" />
            <div className="size-5 rounded border-2 border-gray-400 flex-shrink-0" />
            <input
              type="text"
              defaultValue="Supporting documentation attached"
              className="flex-1 bg-transparent border-none text-[13px] text-[#101828] focus:outline-none"
            />
            <span className="px-2 py-0.5 bg-gray-100 text-[#6a7282] rounded text-[10px] font-medium uppercase tracking-wide">
              Optional
            </span>
          </div>
        </div>

        <button className="flex items-center gap-2 text-[12px] text-blue-600 hover:text-blue-700 font-medium mb-4">
          <Plus className="size-4" />
          Add checklist item
        </button>

        {/* Configuration toggle */}
        <div className="pt-4 border-t border-gray-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={requireAllChecked}
              onChange={(e) => setRequireAllChecked(e.target.checked)}
              className="mt-0.5 size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-[12px] text-[#101828] leading-relaxed">
              Require all required items to be checked before "Mark as filed" is available
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const rightContent = (
    <VariablesSidebar
      templateType="Packet"
      stage="IDR filing"
      casePath="NSA"
      outputs={outputs}
      onOutputToggle={handleOutputToggle}
      variables={variables}
      onPreview={() => console.log('Preview')}
    />
  );

  return (
    <TemplateLayout
      templateName="IDR Position Statement Packet"
      stage="IDR filing"
      casePath="NSA"
      isSystem={true}
      status={status}
      onStatusChange={setStatus}
      onBack={onBack}
      onSave={() => console.log('Save')}
      onDuplicate={() => console.log('Duplicate')}
      leftContent={leftContent}
      rightContent={rightContent}
      lastSaved="5 min ago by Alex C."
    />
  );
}
