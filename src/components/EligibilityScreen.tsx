import { useState } from 'react';
import { Search, ChevronDown, Check, Download, Copy, Link } from 'lucide-react';

type EligibilityStatus = 'active' | 'inactive' | 'needs-review';

interface CoverageItem {
  service: string;
  responsibility: string;
}

interface EligibilityResult {
  patient: string;
  payer: string;
  status: EligibilityStatus;
  date: string;
  deductibleRemaining: string;
  deductibleTotal: string;
  oopRemaining: string;
  oopTotal: string;
  planType: string;
  network: string;
  coverage: CoverageItem[];
}

export function EligibilityScreen() {
  const [hasResult, setHasResult] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Mock result data
  const mockResult: EligibilityResult = {
    patient: 'J. Martinez',
    payer: 'Aetna PPO',
    status: 'active',
    date: 'Today',
    deductibleRemaining: '$320',
    deductibleTotal: '$500',
    oopRemaining: '$1,200',
    oopTotal: '$3,000',
    planType: 'PPO',
    network: 'In-network',
    coverage: [
      { service: 'Office visit', responsibility: '$25 copay' },
      { service: 'Telemed visit', responsibility: '$15 copay' },
      { service: 'EKG / diagnostics', responsibility: '20% after deductible' },
      { service: 'Vaccines / immunizations', responsibility: '$0 (preventive)' },
    ],
  };

  const recentChecks = [
    {
      id: '1',
      patient: 'J. Martinez',
      payer: 'Aetna PPO',
      status: 'active' as EligibilityStatus,
      dateOfVisit: 'Today',
      checkedBy: 'Sarah L.',
    },
    {
      id: '2',
      patient: 'Maria Garcia',
      payer: 'Medicare',
      status: 'active' as EligibilityStatus,
      dateOfVisit: 'Tomorrow',
      checkedBy: 'Sarah L.',
    },
    {
      id: '3',
      patient: 'K. Williams',
      payer: 'BCBS',
      status: 'needs-review' as EligibilityStatus,
      dateOfVisit: 'Jan 29',
      checkedBy: 'Alex M.',
    },
    {
      id: '4',
      patient: 'S. Chen',
      payer: 'Humana PPO',
      status: 'inactive' as EligibilityStatus,
      dateOfVisit: 'Jan 28',
      checkedBy: 'Sarah L.',
    },
  ];

  const getStatusStyle = (status: EligibilityStatus) => {
    if (status === 'active') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'inactive') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  const getStatusLabel = (status: EligibilityStatus) => {
    if (status === 'active') return 'Active';
    if (status === 'inactive') return 'Inactive';
    return 'Needs manual review';
  };

  const handleRunCheck = () => {
    setHasResult(true);
  };

  return (
    <div className="overflow-auto size-full bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-[60px] py-[32px] pb-[60px]">
        
        {/* Card 1: New eligibility check */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="px-8 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-semibold text-[#101828] tracking-[-0.02em]">
                New eligibility check
              </h2>
              <p className="text-[12px] text-[#6a7282]">
                Front desk · Real-time eligibility
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-wrap items-end gap-3">
              {/* Patient */}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-1.5">
                  Patient
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search patient name or MRN"
                    className="w-full px-3 py-2 pl-9 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#99A1AF]" />
                </div>
              </div>

              {/* Payer */}
              <div className="flex-1 min-w-[180px]">
                <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-1.5">
                  Payer
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none px-3 py-2 pr-8 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="">Select payer</option>
                    <option value="aetna">Aetna PPO</option>
                    <option value="bcbs">Blue Cross Blue Shield</option>
                    <option value="uhc">UnitedHealthcare</option>
                    <option value="cigna">Cigna PPO</option>
                    <option value="humana">Humana PPO</option>
                    <option value="medicare">Medicare</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-[#6a7282] pointer-events-none" />
                </div>
              </div>

              {/* Member ID */}
              <div className="w-[160px]">
                <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-1.5">
                  Member ID
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Group # */}
              <div className="w-[140px]">
                <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-1.5">
                  Group # <span className="text-[#99A1AF]">(optional)</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Date of visit */}
              <div className="w-[160px]">
                <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-1.5">
                  Date of visit
                </label>
                <input
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              {/* Run check button */}
              <button
                onClick={handleRunCheck}
                className="px-6 py-2 bg-[#101828] text-white rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors"
              >
                Run check
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Result (shown after check is run) */}
        {hasResult && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-[14px] text-[#4a5565]">
                <span className="font-medium text-[#101828]">Result</span>
                <span>·</span>
                <span>{mockResult.patient}</span>
                <span>·</span>
                <span>{mockResult.payer}</span>
                <span>·</span>
                <span>{mockResult.date}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider border ${getStatusStyle(mockResult.status)}`}>
                {getStatusLabel(mockResult.status)}
              </div>
            </div>

            {/* Body - Two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 py-6">
              
              {/* Left column - Plan snapshot */}
              <div>
                <h3 className="text-[11px] text-[#99A1AF] uppercase tracking-wider mb-4">
                  Plan snapshot
                </h3>
                
                <div className="space-y-4 mb-4">
                  {/* Deductible */}
                  <div>
                    <div className="text-[11px] text-[#6a7282] mb-1">Deductible remaining</div>
                    <div className="text-[24px] font-semibold text-[#101828] tracking-[-0.02em]">
                      {mockResult.deductibleRemaining} <span className="text-[16px] text-[#6a7282] font-normal">of {mockResult.deductibleTotal}</span>
                    </div>
                  </div>

                  {/* Out-of-pocket */}
                  <div>
                    <div className="text-[11px] text-[#6a7282] mb-1">Out-of-pocket remaining</div>
                    <div className="text-[24px] font-semibold text-[#101828] tracking-[-0.02em]">
                      {mockResult.oopRemaining} <span className="text-[16px] text-[#6a7282] font-normal">of {mockResult.oopTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[12px] text-[#6a7282]">
                  Plan type: <span className="text-[#4a5565] font-medium">{mockResult.planType}</span> · <span className="text-[#4a5565] font-medium">{mockResult.network}</span>
                </div>
              </div>

              {/* Right column - Coverage snapshot */}
              <div>
                <h3 className="text-[11px] text-[#99A1AF] uppercase tracking-wider mb-4">
                  Coverage snapshot
                </h3>
                
                <div className="space-y-3">
                  {mockResult.coverage.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                      <div className="shrink-0 size-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="size-3 text-emerald-700" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] text-[#4a5565] font-medium">
                          {item.service}
                        </div>
                      </div>
                      <div className="text-[12px] text-[#6a7282]">
                        {item.responsibility}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-8 py-5 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-[12px] text-[#6a7282] hover:text-[#101828] font-medium flex items-center gap-1"
                >
                  Show details
                  <ChevronDown className={`size-3.5 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 text-[#101828] rounded-lg text-[13px] font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Link className="size-4" />
                    Attach to visit
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-[#101828] rounded-lg text-[13px] font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Copy className="size-4" />
                    Copy summary
                  </button>
                  <button className="px-4 py-2 bg-[#101828] text-white rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors flex items-center gap-2">
                    <Download className="size-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card 3: Recent eligibility checks */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-8 py-6">
            <h2 className="text-[16px] font-semibold text-[#101828] tracking-[-0.02em] mb-6">
              Recent eligibility checks
            </h2>

            {/* Table */}
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-2.5 text-left">
                      <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Patient</span>
                    </th>
                    <th className="px-3 py-2.5 text-left">
                      <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Payer</span>
                    </th>
                    <th className="px-3 py-2.5 text-left">
                      <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Status</span>
                    </th>
                    <th className="px-3 py-2.5 text-left">
                      <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Date of visit</span>
                    </th>
                    <th className="px-3 py-2.5 text-left">
                      <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Checked by</span>
                    </th>
                    <th className="px-3 py-2.5 text-right">
                      <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentChecks.map((check) => (
                    <tr 
                      key={check.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-3 py-3">
                        <span className="text-[13px] font-medium text-[#101828] tracking-[-0.15px]">
                          {check.patient}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-[13px] text-[#4a5565] tracking-[-0.15px]">
                          {check.payer}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium border ${getStatusStyle(check.status)}`}>
                          {getStatusLabel(check.status)}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-[13px] text-[#4a5565] tracking-[-0.15px]">
                          {check.dateOfVisit}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-[13px] text-[#4a5565] tracking-[-0.15px]">
                          {check.checkedBy}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right">
                        <button className="text-[#99A1AF] hover:text-[#101828] transition-colors">
                          <ChevronDown className="size-4 -rotate-90" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}