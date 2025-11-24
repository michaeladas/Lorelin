import { useState } from 'react';
import { Search, Calendar, ChevronDown } from 'lucide-react';
import { DisputesTable } from './DisputesTable';

// Mock data for disputes
const mockDisputes = [
  {
    id: '1',
    patient: { name: 'J. Martinez', claimId: 'Claim #18294' },
    procedure: { name: 'Breast reconstruction', code: 'CPT 19357' },
    payer: { name: 'Aetna PPO', planType: 'Self-funded' },
    billed: 8200,
    paid: 1050,
    potential: 200,
    contractExpected: 1250,
    contractGap: 200,
    type: 'OON - IDR' as const,
    path: 'Federal IDR' as const,
    issue: null,
    status: 'Ready for IDR' as const,
    nextAction: 'Generate IDR packet' as const,
    deadline: { date: 'May 12', label: 'IDR filing' },
    pathTooltip: 'OON ER service; NSA applies; plan appears self-funded → federal IDR candidate',
    isUrgent: true,
  },
  {
    id: '2',
    patient: { name: 'S. Chen', claimId: 'Claim #18291' },
    procedure: { name: 'Rhinoplasty', code: 'CPT 30400' },
    payer: { name: 'UnitedHealthcare', planType: 'PPO' },
    billed: 12500,
    paid: 4200,
    potential: 5800,
    type: 'OON - Negotiation' as const,
    path: 'State IDR' as const,
    issue: null,
    status: 'In negotiation' as const,
    nextAction: 'Generate negotiation letter' as const,
    deadline: { date: 'May 20', label: 'Response due' },
    pathTooltip: 'State-regulated plan; state IDR process applies',
    isUrgent: false,
  },
  {
    id: '3',
    patient: { name: 'M. Patel', claimId: 'Claim #18287' },
    procedure: { name: 'Abdominoplasty', code: 'CPT 15830' },
    payer: { name: 'Cigna HMO' },
    billed: 9800,
    paid: 3500,
    potential: 4200,
    type: 'INN - Denial appeal' as const,
    path: 'Appeal only' as const,
    issue: 'Med necessity denial' as const,
    status: 'New' as const,
    nextAction: 'Draft appeal' as const,
    deadline: { date: 'Jun 2', label: 'Appeal deadline' },
    pathTooltip: 'HMO plan; standard appeal process only',
    isUrgent: false,
  },
  {
    id: '4',
    patient: { name: 'K. Williams', claimId: 'Claim #18283' },
    procedure: { name: 'Facelift', code: 'CPT 30400' }, // Updated code to match user example
    payer: { name: 'Blue Cross Blue Shield', planType: 'Self-funded' },
    billed: 15200,
    paid: 1650,
    potential: 300,
    contractExpected: 1950,
    contractGap: 300,
    type: 'INN - Underpayment' as const, // Changed to match user scenario (Contract Underpayment)
    path: 'Appeal only' as const,
    issue: 'Underpayment',
    status: 'New' as const,
    nextAction: 'Draft appeal' as const,
    deadline: { date: 'May 28', label: 'Appeal deadline' },
    pathTooltip: 'Paid below contract rate',
    isUrgent: true,
  },
  {
    id: '5',
    patient: { name: 'D. Thompson', claimId: 'Claim #18279' },
    procedure: { name: 'Liposuction', code: 'CPT 15876' },
    payer: { name: 'Humana PPO' },
    billed: 7500,
    paid: 2800,
    potential: 2900,
    type: 'OON - Negotiation' as const,
    path: 'State IDR' as const,
    issue: null,
    status: 'In negotiation' as const,
    nextAction: 'Generate negotiation letter' as const,
    deadline: { date: 'May 25', label: 'Negotiation period' },
    pathTooltip: 'State-regulated plan; in active negotiation phase',
    isUrgent: false,
  },
  {
    id: '6',
    patient: { name: 'R. Johnson', claimId: 'Claim #18275' },
    procedure: { name: 'Blepharoplasty', code: 'CPT 15822' },
    payer: { name: 'Kaiser Permanente' },
    billed: 5600,
    paid: 1900,
    potential: 2400,
    type: 'INN - Underpayment' as const,
    path: 'Appeal only' as const,
    issue: 'Downcoded' as const,
    status: 'Appeal submitted' as const,
    nextAction: 'Review result' as const,
    deadline: { date: 'Jun 15', label: 'Decision expected' },
    pathTooltip: 'HMO plan; appeal filed and pending review',
    isUrgent: false,
  },
  {
    id: '7',
    patient: { name: 'A. Rodriguez', claimId: 'Claim #18301' },
    procedure: { name: 'Breast augmentation', code: 'CPT 19324' },
    payer: { name: 'Cigna PPO' },
    billed: 11200,
    paid: 5800,
    potential: 4800,
    type: 'INN - Denial appeal' as const,
    path: 'Appeal only' as const,
    issue: 'Prior auth' as const,
    status: 'New' as const,
    nextAction: 'Draft appeal' as const,
    deadline: { date: 'May 28', label: 'Appeal deadline' },
    pathTooltip: 'Prior authorization not obtained; appeal needed',
    isUrgent: false,
  },
  {
    id: '8',
    patient: { name: 'L. Kim', claimId: 'Claim #18298' },
    procedure: { name: 'Liposuction', code: 'CPT 15877' },
    payer: { name: 'Aetna HMO' },
    billed: 6800,
    paid: 3200,
    potential: 3100,
    type: 'INN - Underpayment' as const,
    path: 'Appeal only' as const,
    issue: 'Underpayment' as const,
    status: 'New' as const,
    nextAction: 'Review & ignore' as const,
    deadline: { date: 'No deadline', label: 'Low priority' },
    pathTooltip: 'Underpayment case; may not be worth pursuing',
    isUrgent: false,
  },
];

type DisputeTypeFilter = 'all' | 'oon' | 'inn' | 'underpayment';

interface DisputesScreenProps {
  onOpenCase: (id: string) => void;
}

export function DisputesScreen({ onOpenCase }: DisputesScreenProps) {
  const [primaryView, setPrimaryView] = useState<'needs-attention' | 'all'>('needs-attention');
  const [disputeTypeFilter, setDisputeTypeFilter] = useState<DisputeTypeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="overflow-auto size-full bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-[60px] py-[32px] pb-[60px]">
        
        {/* Disputes Content */}
        <div className="bg-white relative rounded-[14px] shrink-0 w-full">
          <div aria-hidden="true" className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[20px] items-start px-[33px] py-[25px] relative w-full">
              
              {/* Header */}
              <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
                <div className="flex flex-col gap-1">
                  <h1 className="text-[18px] font-semibold text-[#101828] tracking-[-0.02em]">
                    Disputes & Appeals Worklist
                  </h1>
                  <p className="text-[11px] text-[#6a7282] tracking-[-0.15px] leading-[16px]">
                    All in-network and out-of-network cases identified by the diagnostic and new claims, ordered by priority.
                  </p>
                </div>
              </div>

              {/* Single Control Row */}
              <div className="flex items-center justify-between w-full border-b border-gray-100 pb-4">
                {/* Left side - Primary toggle + Type filter */}
                <div className="flex items-center gap-4">
                  {/* Primary toggle */}
                  <div className="flex items-center gap-1 bg-gray-100/60 rounded-lg p-0.5">
                    <button
                      onClick={() => setPrimaryView('needs-attention')}
                      className={`px-3 py-1.5 rounded-md text-[13px] tracking-[-0.15px] transition-all ${
                        primaryView === 'needs-attention'
                          ? 'bg-white text-[#101828] shadow-sm'
                          : 'text-[#6a7282] hover:text-[#101828]'
                      }`}
                    >
                      Needs attention <span className="text-[#99A1AF]">(2)</span>
                    </button>
                    <button
                      onClick={() => setPrimaryView('all')}
                      className={`px-3 py-1.5 rounded-md text-[13px] tracking-[-0.15px] transition-all ${
                        primaryView === 'all'
                          ? 'bg-white text-[#101828] shadow-sm'
                          : 'text-[#6a7282] hover:text-[#101828]'
                      }`}
                    >
                      All cases <span className="text-[#99A1AF]">(8)</span>
                    </button>
                  </div>

                  {/* Type filter (segmented) */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setDisputeTypeFilter('all')}
                      className={`px-3 py-1.5 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                        disputeTypeFilter === 'all'
                          ? 'bg-[#101828] text-white'
                          : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50'
                      }`}
                    >
                      All types
                    </button>
                    <button
                      onClick={() => setDisputeTypeFilter('oon')}
                      className={`px-3 py-1.5 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                        disputeTypeFilter === 'oon'
                          ? 'bg-[#101828] text-white'
                          : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50'
                      }`}
                    >
                      OON / NSA
                    </button>
                    <button
                      onClick={() => setDisputeTypeFilter('inn')}
                      className={`px-3 py-1.5 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                        disputeTypeFilter === 'inn'
                          ? 'bg-[#101828] text-white'
                          : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50'
                      }`}
                    >
                      In-network
                    </button>
                    <button
                      onClick={() => setDisputeTypeFilter('underpayment')}
                      className={`px-3 py-1.5 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                        disputeTypeFilter === 'underpayment'
                          ? 'bg-[#101828] text-white'
                          : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50'
                      }`}
                    >
                      Underpayments
                    </button>
                  </div>
                </div>

                {/* Right side - Search, Date range, Payer, Min $ */}
                <div className="flex items-center gap-2">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#99A1AF]" />
                    <input
                      type="text"
                      placeholder="Search…"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 h-[32px] w-[160px] text-[13px] text-[#101828] placeholder:text-[#99A1AF] border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 tracking-[-0.15px]"
                    />
                  </div>
                  
                  {/* Date Range Selector */}
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 h-[32px] text-[12px] text-[#6a7282] hover:text-[#101828] hover:bg-gray-50 rounded-md border border-gray-200/60 transition-colors tracking-[-0.15px]">
                    <Calendar className="size-3.5" />
                    <span>Last 90 days</span>
                    <ChevronDown className="size-3" />
                  </button>

                  {/* Payer Filter */}
                  <button className="flex items-center gap-1.5 px-2.5 py-1.5 h-[32px] text-[12px] text-[#6a7282] hover:text-[#101828] hover:bg-gray-50 rounded-md border border-gray-200/60 transition-colors tracking-[-0.15px]">
                    <span>Payer</span>
                    <ChevronDown className="size-3" />
                  </button>
                  
                  {/* Min $ Input */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 h-[32px] text-[12px] text-[#6a7282] border border-gray-200/60 rounded-md bg-white">
                    <span className="text-[#99A1AF]">Min</span>
                    <input
                      type="text"
                      placeholder="$0"
                      className="w-12 bg-transparent border-none outline-none text-[#101828] placeholder:text-[#99A1AF] text-[12px]"
                    />
                  </div>
                </div>
              </div>
              
              {/* Disputes Table */}
              <div className="w-full">
                <DisputesTable disputes={mockDisputes} onOpenCase={onOpenCase} />
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}