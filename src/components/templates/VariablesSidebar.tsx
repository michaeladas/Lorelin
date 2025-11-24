import { Search } from 'lucide-react';

interface Variable {
  name: string;
  key: string;
  group: string;
}

interface VariablesSidebarProps {
  templateType: string;
  stage: string;
  casePath: string;
  outputs: {
    generatePdf: boolean;
    copyToClipboard: boolean;
    markAsFiled?: boolean;
  };
  onOutputToggle: (key: 'generatePdf' | 'copyToClipboard' | 'markAsFiled') => void;
  variables: Variable[];
  onPreview: () => void;
}

export function VariablesSidebar({
  templateType,
  stage,
  casePath,
  outputs,
  onOutputToggle,
  variables,
  onPreview
}: VariablesSidebarProps) {
  const groupedVariables = variables.reduce((acc, variable) => {
    if (!acc[variable.group]) {
      acc[variable.group] = [];
    }
    acc[variable.group].push(variable);
    return acc;
  }, {} as Record<string, Variable[]>);

  return (
    <div className="space-y-6">
      {/* Usage & settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-[13px] font-semibold text-[#101828] mb-4">
          Usage & settings
        </h3>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#6a7282]">Template type</span>
            <span className="text-[12px] font-medium text-[#101828]">{templateType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#6a7282]">Stage</span>
            <span className="text-[12px] font-medium text-[#101828]">{stage}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#6a7282]">Case path</span>
            <span className="text-[12px] font-medium text-[#101828]">{casePath}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="text-[11px] text-[#6a7282] uppercase tracking-wider mb-3">
            Outputs
          </div>
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={outputs.generatePdf}
                onChange={() => onOutputToggle('generatePdf')}
                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[12px] text-[#101828]">Generate PDF</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={outputs.copyToClipboard}
                onChange={() => onOutputToggle('copyToClipboard')}
                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[12px] text-[#101828]">Copy to clipboard</span>
            </label>
            {outputs.markAsFiled !== undefined && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={outputs.markAsFiled}
                  onChange={() => onOutputToggle('markAsFiled')}
                  className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[12px] text-[#101828]">Show "Mark as filed" button</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Variables */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-[13px] font-semibold text-[#101828] mb-4">
          Variables
        </h3>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#99A1AF]" />
          <input
            type="text"
            placeholder="Search variables..."
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded text-[12px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Grouped variables */}
        <div className="space-y-4">
          {Object.entries(groupedVariables).map(([group, vars]) => (
            <div key={group}>
              <div className="text-[10px] text-[#6a7282] uppercase tracking-wider mb-2">
                {group}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {vars.map((variable) => (
                  <button
                    key={variable.key}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 hover:bg-gray-200 text-[#4a5565] rounded text-[11px] font-mono transition-colors cursor-pointer"
                    title={`Click to insert {${variable.key}}`}
                  >
                    {variable.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-[13px] font-semibold text-[#101828] mb-4">
          Preview
        </h3>

        <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-[12px] text-[#101828] mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Sample case: CLM-2024-001</option>
          <option>Sample case: CLM-2024-002</option>
          <option>Sample case: CLM-2024-003</option>
        </select>

        <button
          onClick={onPreview}
          className="w-full px-4 py-2 bg-[#101828] text-white rounded-lg text-[12px] font-medium hover:bg-[#1f2937] transition-colors"
        >
          Open preview
        </button>
      </div>
    </div>
  );
}
