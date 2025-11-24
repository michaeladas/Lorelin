import { useState } from 'react';
import { Search, Plus, Mail, FileText, Copy } from 'lucide-react';

type Phase = 'all' | 'open-negotiation' | 'idr-filing' | 'appeal-only' | 'pre-idr';
type CasePath = 'all' | 'nsa' | 'appeal-only';
type TemplateType = 'all' | 'letter' | 'packet';

interface Template {
  id: string;
  name: string;
  isSystem: boolean;
  phase: string;
  phaseValue: Phase;
  casePath: string;
  casePathValue: CasePath;
  type: string;
  typeValue: TemplateType;
  outputs: ('email' | 'pdf' | 'copy')[];
  lastUpdated: string;
  updatedBy: string;
}

interface TemplatesScreenProps {
  onViewTemplate: (templateId: string) => void;
}

export function TemplatesScreen({ onViewTemplate }: TemplatesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [phaseFilter, setPhaseFilter] = useState<Phase>('all');
  const [casePathFilter, setCasePathFilter] = useState<CasePath>('all');
  const [typeFilter, setTypeFilter] = useState<TemplateType>('all');

  const templates: Template[] = [
    {
      id: '1',
      name: 'NSA Open Negotiation Letter',
      isSystem: true,
      phase: 'Open negotiation',
      phaseValue: 'open-negotiation',
      casePath: 'NSA',
      casePathValue: 'nsa',
      type: 'Letter',
      typeValue: 'letter',
      outputs: ['email', 'pdf', 'copy'],
      lastUpdated: 'Aug 12, 2025',
      updatedBy: 'AC'
    },
    {
      id: '2',
      name: 'IDR Position Statement Packet',
      isSystem: true,
      phase: 'IDR filing',
      phaseValue: 'idr-filing',
      casePath: 'NSA',
      casePathValue: 'nsa',
      type: 'Packet',
      typeValue: 'packet',
      outputs: ['pdf', 'copy'],
      lastUpdated: 'Aug 10, 2025',
      updatedBy: 'AC'
    },
    {
      id: '3',
      name: 'Appeal Letter – Appeal-only Disputes',
      isSystem: true,
      phase: 'Appeal-only',
      phaseValue: 'appeal-only',
      casePath: 'Appeal-only',
      casePathValue: 'appeal-only',
      type: 'Letter',
      typeValue: 'letter',
      outputs: ['pdf', 'copy'],
      lastUpdated: 'Jul 30, 2025',
      updatedBy: 'AC'
    },
    {
      id: '4',
      name: 'Denial Reconsideration / Peer Review Request',
      isSystem: true,
      phase: 'Pre-IDR reconsideration',
      phaseValue: 'pre-idr',
      casePath: 'NSA',
      casePathValue: 'nsa',
      type: 'Letter',
      typeValue: 'letter',
      outputs: ['email', 'pdf', 'copy'],
      lastUpdated: 'Aug 5, 2025',
      updatedBy: 'AC'
    }
  ];

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!template.name.toLowerCase().includes(query) && 
          !template.phase.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Phase filter
    if (phaseFilter !== 'all' && template.phaseValue !== phaseFilter) {
      return false;
    }

    // Case path filter
    if (casePathFilter !== 'all' && template.casePathValue !== casePathFilter) {
      return false;
    }

    // Type filter
    if (typeFilter !== 'all' && template.typeValue !== typeFilter) {
      return false;
    }

    return true;
  });

  const hasActiveFilters = searchQuery || phaseFilter !== 'all' || casePathFilter !== 'all' || typeFilter !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setPhaseFilter('all');
    setCasePathFilter('all');
    setTypeFilter('all');
  };

  return (
    <div className="overflow-auto size-full bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-[60px] py-[60px]">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-[28px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
                Templates
              </h1>
              <p className="text-[13px] text-[#6a7282]">
                Prebuilt letters and packets used across NSA and appeal workflows.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#101828] text-white rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors">
              <Plus className="size-4" />
              New template
            </button>
          </div>

          {/* Phase chips */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setPhaseFilter('all')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                phaseFilter === 'all'
                  ? 'bg-[#101828] text-white'
                  : 'bg-white border border-gray-300 text-[#4a5565] hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPhaseFilter('open-negotiation')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                phaseFilter === 'open-negotiation'
                  ? 'bg-[#101828] text-white'
                  : 'bg-white border border-gray-300 text-[#4a5565] hover:bg-gray-50'
              }`}
            >
              Open negotiation
            </button>
            <button
              onClick={() => setPhaseFilter('idr-filing')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                phaseFilter === 'idr-filing'
                  ? 'bg-[#101828] text-white'
                  : 'bg-white border border-gray-300 text-[#4a5565] hover:bg-gray-50'
              }`}
            >
              IDR filing
            </button>
            <button
              onClick={() => setPhaseFilter('appeal-only')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                phaseFilter === 'appeal-only'
                  ? 'bg-[#101828] text-white'
                  : 'bg-white border border-gray-300 text-[#4a5565] hover:bg-gray-50'
              }`}
            >
              Appeal-only
            </button>
            <button
              onClick={() => setPhaseFilter('pre-idr')}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                phaseFilter === 'pre-idr'
                  ? 'bg-[#101828] text-white'
                  : 'bg-white border border-gray-300 text-[#4a5565] hover:bg-gray-50'
              }`}
            >
              Pre-IDR
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#99A1AF]" />
            <input
              type="text"
              placeholder="Search by name or phase…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Case path filter */}
          <select
            value={casePathFilter}
            onChange={(e) => setCasePathFilter(e.target.value as CasePath)}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="all">Case path: All</option>
            <option value="nsa">NSA</option>
            <option value="appeal-only">Appeal-only</option>
          </select>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as TemplateType)}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          >
            <option value="all">Type: All</option>
            <option value="letter">Letters</option>
            <option value="packet">Packets</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-[12px] text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Main Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Section header */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <div className="text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
              Core NSA templates ({filteredTemplates.length})
            </div>
          </div>

          {filteredTemplates.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Template
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Phase
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Case path
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Outputs
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Last updated
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTemplates.map((template) => (
                  <tr
                    key={template.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <button className="text-left group">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-medium text-[#101828] group-hover:text-blue-600 transition-colors">
                            {template.name}
                          </span>
                          {template.isSystem && (
                            <span className="inline-flex items-center px-1.5 py-0.5 bg-gray-100 text-[#6a7282] rounded text-[10px] font-medium uppercase tracking-wide">
                              System
                            </span>
                          )}
                        </div>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-[#4a5565]">
                        {template.phase}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-[#4a5565]">
                        {template.casePath}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-[#4a5565]">
                        {template.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {template.outputs.includes('email') && (
                          <div className="size-6 rounded bg-gray-100 flex items-center justify-center" title="Email">
                            <Mail className="size-3.5 text-[#6a7282]" />
                          </div>
                        )}
                        {template.outputs.includes('pdf') && (
                          <div className="size-6 rounded bg-gray-100 flex items-center justify-center" title="PDF">
                            <FileText className="size-3.5 text-[#6a7282]" />
                          </div>
                        )}
                        {template.outputs.includes('copy') && (
                          <div className="size-6 rounded bg-gray-100 flex items-center justify-center" title="Copy">
                            <Copy className="size-3.5 text-[#6a7282]" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[12px] text-[#4a5565]">
                        {template.lastUpdated} · {template.updatedBy}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-[12px] text-blue-600 hover:text-blue-700 font-medium"
                        onClick={() => onViewTemplate(template.id)}
                      >
                        View ›
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-[14px] text-[#4a5565] mb-2">
                No templates match these filters.
              </div>
              <button
                onClick={clearFilters}
                className="text-[13px] text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
              <span className="text-[13px] text-[#6a7282] mx-2">or</span>
              <button className="text-[13px] text-blue-600 hover:text-blue-700 font-medium">
                create a new template
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}