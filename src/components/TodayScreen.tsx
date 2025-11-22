import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronRight, AlertCircle } from 'lucide-react';

// Mock data for the stacked bar chart - with OON and In-network breakdown
const chartDataAll = [
  { week: 'Week 1', oonRecovered: 10200, oonOnTable: 5100, innRecovered: 8000, innOnTable: 3800 },
  { week: 'Week 2', oonRecovered: 12800, oonOnTable: 7200, innRecovered: 9300, innOnTable: 5100 },
  { week: 'Week 3', oonRecovered: 9100, oonOnTable: 5400, innRecovered: 6700, innOnTable: 3800 },
  { week: 'Week 4', oonRecovered: 16400, oonOnTable: 6900, innRecovered: 12000, innOnTable: 4900 },
  { week: 'Week 5', oonRecovered: 17100, oonOnTable: 8800, innRecovered: 12300, innOnTable: 6300 },
  { week: 'Week 6', oonRecovered: 11400, oonOnTable: 7800, innRecovered: 8200, innOnTable: 5600 },
  { week: 'Week 7', oonRecovered: 14100, oonOnTable: 6200, innRecovered: 10200, innOnTable: 4400 },
  { week: 'Week 8', oonRecovered: 12500, oonOnTable: 8300, innRecovered: 9000, innOnTable: 5900 },
];

const chartDataOON = [
  { week: 'Week 1', oonRecovered: 10200, oonOnTable: 5100 },
  { week: 'Week 2', oonRecovered: 12800, oonOnTable: 7200 },
  { week: 'Week 3', oonRecovered: 9100, oonOnTable: 5400 },
  { week: 'Week 4', oonRecovered: 16400, oonOnTable: 6900 },
  { week: 'Week 5', oonRecovered: 17100, oonOnTable: 8800 },
  { week: 'Week 6', oonRecovered: 11400, oonOnTable: 7800 },
  { week: 'Week 7', oonRecovered: 14100, oonOnTable: 6200 },
  { week: 'Week 8', oonRecovered: 12500, oonOnTable: 8300 },
];

const chartDataINN = [
  { week: 'Week 1', innRecovered: 8000, innOnTable: 3800 },
  { week: 'Week 2', innRecovered: 9300, innOnTable: 5100 },
  { week: 'Week 3', innRecovered: 6700, innOnTable: 3800 },
  { week: 'Week 4', innRecovered: 12000, innOnTable: 4900 },
  { week: 'Week 5', innRecovered: 12300, innOnTable: 6300 },
  { week: 'Week 6', innRecovered: 8200, innOnTable: 5600 },
  { week: 'Week 7', innRecovered: 10200, innOnTable: 4400 },
  { week: 'Week 8', innRecovered: 9000, innOnTable: 5900 },
];

// Mock data for cases table
const mockCases = [
  {
    id: '1',
    patient: 'J. Martinez',
    procedure: 'Breast reconstruction',
    payer: 'Aetna PPO',
    potential: 3400,
    type: 'OON - IDR' as const,
    action: 'Generate IDR packet' as const,
    deadline: 'IDR filing closes today',
    daysUntilDeadline: 0,
  },
  {
    id: '4',
    patient: 'K. Williams',
    procedure: 'Facelift',
    payer: 'Blue Cross Blue Shield',
    potential: 6100,
    type: 'OON - IDR' as const,
    action: 'Generate IDR packet' as const,
    deadline: 'IDR filing closes in 2 days',
    daysUntilDeadline: 2,
  },
  {
    id: '2',
    patient: 'S. Chen',
    procedure: 'Rhinoplasty',
    payer: 'UnitedHealthcare',
    potential: 5800,
    type: 'OON - Negotiation' as const,
    action: 'Generate negotiation letter' as const,
    deadline: 'Open negotiation window: 5 days left',
    daysUntilDeadline: 5,
  },
  {
    id: '7',
    patient: 'A. Rodriguez',
    procedure: 'Breast augmentation',
    payer: 'Cigna PPO',
    potential: 4800,
    type: 'INN - Appeal' as const,
    action: 'Draft appeal' as const,
    deadline: 'Appeal window: 3 days left',
    daysUntilDeadline: 3,
  },
  {
    id: '5',
    patient: 'D. Thompson',
    procedure: 'Liposuction',
    payer: 'Humana PPO',
    potential: 2900,
    type: 'OON - Negotiation' as const,
    action: 'Generate negotiation letter' as const,
    deadline: 'Open negotiation window: 8 days left',
    daysUntilDeadline: 8,
  },
  {
    id: '8',
    patient: 'L. Kim',
    procedure: 'Abdominoplasty',
    payer: 'Aetna HMO',
    potential: 3200,
    type: 'INN - Underpayment' as const,
    action: 'Review & ignore' as const,
    deadline: 'No formal deadline',
    daysUntilDeadline: 999,
  },
  {
    id: '3',
    patient: 'M. Patel',
    procedure: 'Abdominoplasty',
    payer: 'Cigna HMO',
    potential: 4200,
    type: 'INN - Appeal' as const,
    action: 'Draft appeal' as const,
    deadline: 'Appeal window: 12 days left',
    daysUntilDeadline: 12,
  },
  {
    id: '6',
    patient: 'R. Johnson',
    procedure: 'Blepharoplasty',
    payer: 'Kaiser Permanente',
    potential: 2400,
    type: 'INN - Underpayment' as const,
    action: 'Review & ignore' as const,
    deadline: 'No formal deadline',
    daysUntilDeadline: 999,
  },
];

type DisputeTypeFilter = 'all' | 'oon' | 'inn';
type ActionFilter = 'all' | 'negotiation' | 'idr' | 'appeal';
type ChartView = 'all' | 'oon' | 'inn';

interface TodayScreenProps {
  onOpenCase: (id: string) => void;
}

export function TodayScreen({ onOpenCase }: TodayScreenProps) {
  const [disputeTypeFilter, setDisputeTypeFilter] = useState<DisputeTypeFilter>('all');
  const [actionFilter, setActionFilter] = useState<ActionFilter>('all');
  const [chartView, setChartView] = useState<ChartView>('all');

  const getTypeColor = (type: string) => {
    // Simplified to just use slate for all types
    return 'bg-slate-50/60 text-slate-600/85 border-slate-200/40';
  };

  const getActionColor = (action: string) => {
    // Simplified color scheme based on design system
    if (action === 'Generate IDR packet') return 'bg-orange-50/60 text-orange-700/85 border-orange-200/40 hover:bg-orange-100/60';
    if (action === 'Generate negotiation letter') return 'bg-amber-50/70 text-amber-700/85 border-amber-200/40 hover:bg-amber-100/70';
    if (action === 'Draft appeal') return 'bg-slate-50/60 text-slate-600/85 border-slate-200/40 hover:bg-slate-100/60';
    if (action === 'Review & ignore') return 'bg-slate-50/60 text-slate-600/85 border-slate-200/40 hover:bg-slate-100/60';
    return 'bg-slate-50/60 text-slate-600/85 border-slate-200/40 hover:bg-slate-100/60';
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 2) return 'text-[#101828] font-medium';
    if (days <= 7) return 'text-[#101828]';
    return 'text-[#4a5565]';
  };

  const getUrgencyIndicator = (days: number) => {
    if (days <= 2) return { color: 'bg-red-500', show: true };
    if (days <= 7) return { color: 'bg-amber-400', show: true };
    return { color: 'bg-gray-300', show: false };
  };

  const filteredCases = mockCases.filter(c => {
    // Dispute type filter
    if (disputeTypeFilter === 'oon' && !c.type.startsWith('OON')) return false;
    if (disputeTypeFilter === 'inn' && !c.type.startsWith('INN')) return false;
    
    // Action filter
    if (actionFilter === 'negotiation' && c.action !== 'Generate negotiation letter') return false;
    if (actionFilter === 'idr' && c.action !== 'Generate IDR packet') return false;
    if (actionFilter === 'appeal' && c.action !== 'Draft appeal') return false;
    
    return true;
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      if (chartView === 'all') {
        const oonRecovered = data.oonRecovered / 1000;
        const oonOnTable = data.oonOnTable / 1000;
        const innRecovered = data.innRecovered / 1000;
        const innOnTable = data.innOnTable / 1000;
        const total = oonRecovered + oonOnTable + innRecovered + innOnTable;

        return (
          <div className="bg-[#101828] text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
            <div className="text-[11px] font-medium mb-1.5">{data.week}</div>
            <div className="space-y-0.5 text-[11px]">
              <div className="flex justify-between gap-4">
                <span className="text-white/70">OON Recovered</span>
                <span className="font-medium">${oonRecovered.toFixed(1)}k</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/70">OON On table</span>
                <span className="font-medium">${oonOnTable.toFixed(1)}k</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/70">INN Recovered</span>
                <span className="font-medium">${innRecovered.toFixed(1)}k</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/70">INN On table</span>
                <span className="font-medium">${innOnTable.toFixed(1)}k</span>
              </div>
              <div className="flex justify-between gap-4 pt-0.5 border-t border-white/20">
                <span className="text-white/70">Total</span>
                <span className="font-medium">${total.toFixed(1)}k</span>
              </div>
            </div>
          </div>
        );
      } else if (chartView === 'oon') {
        const recovered = data.oonRecovered / 1000;
        const onTable = data.oonOnTable / 1000;
        const total = recovered + onTable;

        return (
          <div className="bg-[#101828] text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
            <div className="text-[11px] font-medium mb-1">{data.week}</div>
            <div className="space-y-0.5 text-[11px]">
              <div className="flex justify-between gap-3">
                <span className="text-white/70">Recovered</span>
                <span className="font-medium">${recovered.toFixed(1)}k</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-white/70">Still on table</span>
                <span className="font-medium">${onTable.toFixed(1)}k</span>
              </div>
              <div className="flex justify-between gap-3 pt-0.5 border-t border-white/20">
                <span className="text-white/70">Total OON</span>
                <span className="font-medium">${total.toFixed(1)}k</span>
              </div>
            </div>
          </div>
        );
      } else {
        const recovered = data.innRecovered / 1000;
        const onTable = data.innOnTable / 1000;
        const total = recovered + onTable;

        return (
          <div className="bg-[#101828] text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
            <div className="text-[11px] font-medium mb-1">{data.week}</div>
            <div className="space-y-0.5 text-[11px]">
              <div className="flex justify-between gap-3">
                <span className="text-white/70">Recovered</span>
                <span className="font-medium">${recovered.toFixed(1)}k</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-white/70">Still on table</span>
                <span className="font-medium">${onTable.toFixed(1)}k</span>
              </div>
              <div className="flex justify-between gap-3 pt-0.5 border-t border-white/20">
                <span className="text-white/70">Total INN</span>
                <span className="font-medium">${total.toFixed(1)}k</span>
              </div>
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const getChartData = () => {
    if (chartView === 'oon') return chartDataOON;
    if (chartView === 'inn') return chartDataINN;
    return chartDataAll;
  };

  return (
    <div className="overflow-auto size-full bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-[60px] py-[32px] pb-[60px]">
        
        {/* Hero Card: Potential Recovery */}
        <div className="bg-white relative rounded-[14px] shrink-0 w-full mb-6">
          <div aria-hidden="true" className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[24px] items-start px-[33px] py-[25px] relative w-full">
              
              {/* KPI Strip - Two Column Layout */}
              <div className="flex items-start justify-between w-full gap-8">
                {/* Left: Total + Breakdown */}
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex flex-col gap-1">
                    <div className="text-[10px] text-[#99A1AF] tracking-[0.05em] uppercase font-medium">
                      Total potential recovery · Last 90 days
                    </div>
                    <div className="text-[42px] font-semibold text-[#101828] tracking-[-0.02em] leading-[1.1]">
                      $83,400
                    </div>
                  </div>
                  
                  {/* Breakdown by type */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[#4a5565]">$48,200</span>
                      <span className="text-[12px] text-[#6a7282]">from OON / NSA / IDR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-[#4a5565]">$35,200</span>
                      <span className="text-[12px] text-[#6a7282]">from In-network denials/underpayments</span>
                    </div>
                  </div>
                </div>

                {/* Right: Status chips */}
                <div className="flex flex-col gap-2 pt-[22px]">
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] border border-gray-200/60 bg-transparent text-[#6a7282]">
                    $31,200 recovered
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] border border-gray-200/60 bg-transparent text-[#6a7282]">
                    $41,500 in progress
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] border border-amber-200/40 bg-amber-50/40 text-amber-700/80">
                    $10,700 at risk
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="text-[11px] text-[#99A1AF]">
                Breakdown by OON vs In-network · Based on last diagnostic + new claims
              </div>

              {/* Chart Section */}
              <div className="w-full border-t border-gray-100 pt-6">
                {/* Chart header with toggle */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] text-[#99A1AF]">Recovered vs still on the table by week</span>
                  <div className="flex items-center gap-4">
                    {/* Toggle */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setChartView('all')}
                        className={`px-2.5 py-1 rounded text-[11px] tracking-[-0.15px] transition-all ${
                          chartView === 'all'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setChartView('oon')}
                        className={`px-2.5 py-1 rounded text-[11px] tracking-[-0.15px] transition-all ${
                          chartView === 'oon'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50'
                        }`}
                      >
                        OON / NSA
                      </button>
                      <button
                        onClick={() => setChartView('inn')}
                        className={`px-2.5 py-1 rounded text-[11px] tracking-[-0.15px] transition-all ${
                          chartView === 'inn'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50'
                        }`}
                      >
                        In-network
                      </button>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center gap-3.5">
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-emerald-600" />
                        <span className="text-[10px] text-[#99A1AF]">Recovered</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="size-1.5 rounded-full bg-gray-300" />
                        <span className="text-[10px] text-[#99A1AF]">Still on the table</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chart */}
                <div className="w-full h-[220px] pt-2 pb-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getChartData()} barGap={4} margin={{ top: 10, right: 10, bottom: 5, left: 0 }}>
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="#e5e7eb" 
                        vertical={false}
                      />
                      <XAxis 
                        dataKey="week" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#99A1AF', fontSize: 10 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#99A1AF', fontSize: 10 }}
                        tickFormatter={(value) => `${value / 1000}k`}
                        ticks={[0, 25000, 50000]}
                        domain={[0, 50000]}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                      {chartView === 'all' ? (
                        <>
                          <Bar dataKey="oonRecovered" stackId="recovered" fill="#10b981" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="innRecovered" stackId="recovered" fill="#059669" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="oonOnTable" stackId="onTable" fill="#d1d5db" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="innOnTable" stackId="onTable" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                        </>
                      ) : chartView === 'oon' ? (
                        <>
                          <Bar dataKey="oonRecovered" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="oonOnTable" stackId="a" fill="#d1d5db" radius={[4, 4, 0, 0]} />
                        </>
                      ) : (
                        <>
                          <Bar dataKey="innRecovered" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="innOnTable" stackId="a" fill="#d1d5db" radius={[4, 4, 0, 0]} />
                        </>
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Since Last Visit Banner */}
        <div className="bg-white relative rounded-[14px] shrink-0 w-full mb-6">
          <div aria-hidden="true" className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
          <div className="size-full">
            <div className="box-border content-stretch flex items-center gap-6 px-[33px] py-[20px] relative w-full">
              <div className="flex items-center gap-2">
                <AlertCircle className="size-4 text-[#101828]" />
                <span className="text-[13px] font-medium text-[#101828]">Since you last logged in:</span>
              </div>
              <button 
                onClick={() => setDisputeTypeFilter('oon')}
                className="text-[13px] text-[#6a7282] hover:text-[#101828] transition-colors"
              >
                <span className="font-semibold text-[#101828]">7</span> new OON cases flagged
              </button>
              <button 
                onClick={() => setDisputeTypeFilter('inn')}
                className="text-[13px] text-[#6a7282] hover:text-[#101828] transition-colors"
              >
                <span className="font-semibold text-[#101828]">12</span> in-network denials worth appealing
              </button>
              <button 
                onClick={() => {
                  setDisputeTypeFilter('oon');
                  setActionFilter('idr');
                }}
                className="text-[13px] text-[#6a7282] hover:text-[#101828] transition-colors"
              >
                <span className="font-semibold text-[#101828]">3</span> approaching IDR deadlines
              </button>
            </div>
          </div>
        </div>

        {/* Cases to Act On Card */}
        <div className="bg-white relative rounded-[14px] shrink-0 w-full">
          <div aria-hidden="true" className="absolute border border-gray-100 border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col items-start px-[33px] py-[25px] relative w-full">
              
              {/* Card Header with Filters */}
              <div className="flex flex-col gap-3 w-full mb-5">
                <h2 className="text-[14px] font-medium text-[#101828] tracking-[-0.15px]">
                  Cases to act on
                </h2>
                
                {/* Two rows of filters */}
                <div className="flex flex-col gap-2">
                  {/* Row 1: Dispute type filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#99A1AF] uppercase tracking-wider min-w-[80px]">Type</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setDisputeTypeFilter('all')}
                        className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                          disputeTypeFilter === 'all'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setDisputeTypeFilter('oon')}
                        className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                          disputeTypeFilter === 'oon'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        OON / NSA
                      </button>
                      <button
                        onClick={() => setDisputeTypeFilter('inn')}
                        className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                          disputeTypeFilter === 'inn'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        In-network
                      </button>
                    </div>
                  </div>

                  {/* Row 2: Action filter */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#99A1AF] uppercase tracking-wider min-w-[80px]">Action</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setActionFilter('all')}
                        className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                          actionFilter === 'all'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setActionFilter('negotiation')}
                        className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                          actionFilter === 'negotiation'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        Needs negotiation
                      </button>
                      <button
                        onClick={() => setActionFilter('idr')}
                        className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                          actionFilter === 'idr'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        File IDR
                      </button>
                      <button
                        onClick={() => setActionFilter('appeal')}
                        className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all ${
                          actionFilter === 'appeal'
                            ? 'bg-[#101828] text-white'
                            : 'text-[#6a7282] hover:text-[#101828] hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        Draft appeal
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="w-full">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-3 py-2.5 text-left">
                        <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Patient</span>
                      </th>
                      <th className="px-3 py-2.5 text-left">
                        <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Procedure</span>
                      </th>
                      <th className="px-3 py-2.5 text-left">
                        <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Payer</span>
                      </th>
                      <th className="px-3 py-2.5 text-left">
                        <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Type</span>
                      </th>
                      <th className="px-3 py-2.5 text-right">
                        <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Potential +$</span>
                      </th>
                      <th className="px-3 py-2.5 text-left">
                        <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Next action</span>
                      </th>
                      <th className="px-3 py-2.5 text-left">
                        <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Deadline</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCases.map((caseItem, index) => (
                      <tr
                        key={caseItem.id}
                        onClick={() => onOpenCase(caseItem.id)}
                        className={`border-b border-gray-100 hover:bg-blue-50/20 cursor-pointer transition-colors group ${ 
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                        }`}
                      >
                        <td className="px-3 py-2.5">
                          <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{caseItem.patient}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{caseItem.procedure}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="text-[13px] text-[#4a5565] tracking-[-0.15px]">{caseItem.payer}</span>
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] border ${getTypeColor(
                              caseItem.type
                            )}`}
                          >
                            {caseItem.type}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <span className="text-[15px] font-semibold text-emerald-700 tracking-[-0.2px]">
                            +${caseItem.potential.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle action
                            }}
                            className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] border transition-colors ${getActionColor(
                              caseItem.action
                            )}`}
                          >
                            {caseItem.action}
                          </button>
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              {getUrgencyIndicator(caseItem.daysUntilDeadline).show && (
                                <div className={`size-1.5 rounded-full ${getUrgencyIndicator(caseItem.daysUntilDeadline).color} flex-shrink-0`} />
                              )}
                              <span className={`text-[13px] tracking-[-0.15px] ${getUrgencyColor(caseItem.daysUntilDeadline)}`}>
                                {caseItem.deadline}
                              </span>
                            </div>
                            <ChevronRight className="size-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
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
    </div>
  );
}