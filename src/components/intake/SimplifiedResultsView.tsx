import { useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export function SimplifiedResultsView() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [payerFilter, setPayerFilter] = useState<string | null>(null);
  const [procedureFilter, setProcedureFilter] = useState<string | null>(null);

  const mockOpportunities = [
    {
      claimId: '18294',
      patient: 'J. Martinez (#18294)',
      payer: 'Aetna PPO',
      procedure: 'Breast reconstruction',
      cpt: '19357',
      type: 'INN – Underpayment',
      category: 'inn-underpayment',
      potentialDelta: 3400,
      contractAllowed: 5500,
      paidAmount: 2100,
      deadline: 'Jun 2',
      deadlineLabel: 'Appeal deadline'
    },
    {
      claimId: '19104',
      patient: 'K. Williams (#19104)',
      payer: 'Cigna PPO',
      procedure: 'Facelift',
      cpt: '15824',
      type: 'OON – IDR',
      category: 'oon',
      potentialDelta: 5800,
      contractAllowed: null,
      paidAmount: 4200,
      billedAmount: 32000,
      deadline: 'May 20',
      deadlineLabel: 'IDR filing'
    },
    {
      claimId: '18502',
      patient: 'S. Chen (#18502)',
      payer: 'United Healthcare',
      procedure: 'Rhinoplasty',
      cpt: '30400',
      type: 'INN – Underpayment',
      category: 'inn-underpayment',
      potentialDelta: 2200,
      contractAllowed: 4800,
      paidAmount: 2600,
      deadline: 'Jun 15',
      deadlineLabel: 'Appeal deadline'
    },
    {
      claimId: '19388',
      patient: 'M. Rodriguez (#19388)',
      payer: 'Aetna PPO',
      procedure: 'Breast augmentation',
      cpt: '19325',
      type: 'INN – Denial',
      category: 'inn-denial',
      potentialDelta: 1900,
      contractAllowed: 4200,
      paidAmount: 0,
      deadline: 'May 30',
      deadlineLabel: 'Appeal deadline'
    },
    {
      claimId: '18721',
      patient: 'D. Thompson (#18721)',
      payer: 'BCBS',
      procedure: 'Abdominoplasty',
      cpt: '15830',
      type: 'INN – Underpayment',
      category: 'inn-underpayment',
      potentialDelta: 2800,
      contractAllowed: 6100,
      paidAmount: 3300,
      deadline: 'Jun 8',
      deadlineLabel: 'Appeal deadline'
    },
    {
      claimId: '19205',
      patient: 'L. Kim (#19205)',
      payer: 'Cigna HMO',
      procedure: 'Breast reconstruction',
      cpt: '19357',
      type: 'OON – IDR',
      category: 'oon',
      potentialDelta: 4200,
      paidAmount: 3800,
      billedAmount: 28000,
      deadline: 'May 25',
      deadlineLabel: 'IDR filing'
    }
  ];

  const leakageBreakdown = [
    { name: 'In-network underpayments', value: 175000, count: 196, color: '#3b82f6', category: 'inn-underpayment' },
    { name: 'In-network denials', value: 95000, count: 87, color: '#8b5cf6', category: 'inn-denial' },
    { name: 'OON / NSA / IDR', value: 140000, count: 124, color: '#10b981', category: 'oon' }
  ];

  const payerLeakage = [
    { name: 'Aetna PPO', total: 82000, contract: 60000, other: 22000, claims: 145 },
    { name: 'Cigna HMO', total: 54000, contract: 38000, other: 16000, claims: 98 },
    { name: 'BCBS', total: 39000, contract: 28000, other: 11000, claims: 76 },
    { name: 'UnitedHealthcare', total: 28000, contract: 19000, other: 9000, claims: 54 },
    { name: 'Humana', total: 19000, contract: 12000, other: 7000, claims: 42 }
  ];

  const procedureLeakage = [
    { name: 'Breast reconstruction', value: 120000, claims: 89 },
    { name: 'Facelift', value: 65000, claims: 56 },
    { name: 'Abdominoplasty', value: 48000, claims: 42 },
    { name: 'Rhinoplasty', value: 31000, claims: 38 }
  ];

  const topPayers = [
    { name: 'Aetna PPO', amount: 82000 },
    { name: 'Cigna HMO', amount: 54000 },
    { name: 'BCBS', amount: 39000 }
  ];

  // Filter opportunities based on active filters
  const filteredOpportunities = mockOpportunities.filter(opp => {
    if (categoryFilter && opp.category !== categoryFilter) return false;
    if (payerFilter && opp.payer !== payerFilter) return false;
    if (procedureFilter && opp.procedure !== procedureFilter) return false;
    return true;
  });

  const DonutTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#101828] text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
          <div className="text-[11px] font-medium mb-1">{data.name}</div>
          <div className="text-[13px] font-semibold mb-0.5">
            ${(data.value / 1000).toFixed(0)}k
          </div>
          <div className="text-[10px] text-white/70">
            {((data.value / 410000) * 100).toFixed(0)}% of total · {data.count} claims
          </div>
        </div>
      );
    }
    return null;
  };

  const PayerBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#101828] text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
          <div className="text-[11px] font-medium mb-1.5">{data.name}</div>
          <div className="space-y-0.5 text-[11px]">
            <div className="flex justify-between gap-3">
              <span className="text-white/70">Total leakage</span>
              <span className="font-medium">${(data.total / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-white/70">Contract underpayments</span>
              <span className="font-medium">${(data.contract / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-white/70">Impacted claims</span>
              <span className="font-medium">{data.claims}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const clearFilters = () => {
    setCategoryFilter(null);
    setPayerFilter(null);
    setProcedureFilter(null);
  };

  return (
    <div className="overflow-auto size-full bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-[60px] py-[60px]">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[28px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
            Diagnostic results – Grace Plastic Surgery
          </h1>
          <p className="text-[13px] text-[#6a7282] mb-3">
            Scan period: Jan 1 – Mar 31, 2024 · 18,420 claims · 18,005 remits · Contracts for: Aetna, Cigna, United
          </p>
          
          {/* Data Quality Strip */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5">
            <div className="flex items-center gap-6 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#6a7282]">Data coverage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#101828] font-medium">Claims matched to remits: 97%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#101828] font-medium">Claims with contract rates: 83%</span>
                <span className="text-[#6a7282]">of in-network dollars</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#6a7282]">Diagnostic confidence:</span>
                <span className="text-emerald-700 font-semibold">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Total Potential Recovery */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider mb-3">
              Total potential recovery
            </div>
            <div className="text-[42px] font-semibold text-[#101828] tracking-[-0.02em] mb-3">
              $410,000
            </div>
            <div className="space-y-1.5 text-[12px]">
              <div className="text-[#4a5565]">
                <span className="font-medium text-[#101828]">$270,000</span> in-network
              </div>
              <div className="text-[#4a5565]">
                <span className="font-medium text-[#101828]">$140,000</span> OON / NSA / IDR
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-[11px] text-[#6a7282]">
              Estimated based on claims + remits.
            </div>
          </div>

          {/* Contract Underpayments */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider mb-3">
              Contract underpayments
            </div>
            <div className="text-[42px] font-semibold text-[#101828] tracking-[-0.02em] mb-3">
              $175,000
            </div>
            <div className="space-y-1.5 text-[12px]">
              <div className="text-[#4a5565]">
                Across <span className="font-medium text-[#101828]">196 claims</span>
              </div>
              <div className="text-[#4a5565]">
                Payers: <span className="font-medium text-[#101828]">Aetna, Cigna, United</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-[10px] font-semibold uppercase tracking-wide">
                ✓ Contract-aware analysis
              </div>
            </div>
          </div>

          {/* Top Payers */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider mb-3">
              Top payers with leakage
            </div>
            <div className="space-y-3 mb-4">
              {topPayers.map((payer, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[13px] text-[#4a5565]">{payer.name}</span>
                  <span className="text-[14px] font-semibold text-[#101828]">
                    ${(payer.amount / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-8">
          <button className="px-5 py-2.5 bg-[#101828] text-white rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors flex items-center gap-2">
            View worklist
            <ArrowRight className="size-4" />
          </button>
          <button className="px-5 py-2.5 bg-white border border-gray-300 text-[#101828] rounded-lg text-[13px] font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="size-4" />
            Download report
          </button>
        </div>

        {/* Breakdowns Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Where the leakage comes from - Donut */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-[16px] font-semibold text-[#101828] mb-1">
              Where the leakage comes from
            </h3>
            <p className="text-[11px] text-[#6a7282] mb-4">
              Click a segment to filter cases below
            </p>

            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leakageBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    onClick={(data) => setCategoryFilter(data.category === categoryFilter ? null : data.category)}
                    style={{ cursor: 'pointer' }}
                  >
                    {leakageBreakdown.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        opacity={categoryFilter && categoryFilter !== entry.category ? 0.3 : 1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              {leakageBreakdown.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setCategoryFilter(item.category === categoryFilter ? null : item.category)}
                  className={`w-full flex items-center justify-between text-[12px] p-2 rounded transition-colors ${
                    categoryFilter === item.category 
                      ? 'bg-gray-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="size-2.5 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[#4a5565]">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#101828]">
                      ${(item.value / 1000).toFixed(0)}k
                    </span>
                    <span className="text-[#99A1AF]">
                      ({((item.value / 410000) * 100).toFixed(0)}%)
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Top payers by leakage - Bar Chart */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-[16px] font-semibold text-[#101828] mb-1">
              Top payers by leakage
            </h3>
            <p className="text-[11px] text-[#6a7282] mb-4">
              Click a bar to filter cases below
            </p>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={payerLeakage} 
                  layout="vertical"
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#101828', fontSize: 12 }}
                    width={120}
                  />
                  <Tooltip content={<PayerBarTooltip />} />
                  <Bar 
                    dataKey="contract" 
                    stackId="a" 
                    fill="#3b82f6" 
                    radius={[0, 0, 0, 0]}
                    onClick={(data) => setPayerFilter(data.name === payerFilter ? null : data.name)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Bar 
                    dataKey="other" 
                    stackId="a" 
                    fill="#93c5fd" 
                    radius={[0, 4, 4, 0]}
                    onClick={(data) => setPayerFilter(data.name === payerFilter ? null : data.name)}
                    style={{ cursor: 'pointer' }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top procedures by leakage - List */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-[16px] font-semibold text-[#101828] mb-1">
              Top procedures by leakage
            </h3>
            <p className="text-[11px] text-[#6a7282] mb-4">
              Click to filter cases below
            </p>

            <div className="space-y-3">
              {procedureLeakage.map((proc, i) => (
                <button
                  key={i}
                  onClick={() => setProcedureFilter(proc.name === procedureFilter ? null : proc.name)}
                  className={`w-full text-left p-3 rounded transition-colors ${
                    procedureFilter === proc.name 
                      ? 'bg-gray-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-medium text-[#101828]">
                      {proc.name}
                    </span>
                    <span className="text-[14px] font-semibold text-[#101828]">
                      ${(proc.value / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${(proc.value / 120000) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#99A1AF]">
                      {proc.claims} claims
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* High-Value Cases Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[18px] font-semibold text-[#101828] mb-1">
                  High-value cases to act on
                  {(categoryFilter || payerFilter || procedureFilter) && (
                    <span className="ml-2 text-[13px] font-normal text-blue-600">
                      (Filtered)
                    </span>
                  )}
                </h2>
                <p className="text-[12px] text-[#6a7282]">
                  These claims have the largest upside based on payment vs contract or expected patterns, and are still within appeal/IDR windows.
                </p>
              </div>
              {(categoryFilter || payerFilter || procedureFilter) && (
                <button
                  onClick={clearFilters}
                  className="text-[12px] text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Patient
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Payer
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Procedure
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Value
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Deadline
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOpportunities.length > 0 ? (
                  filteredOpportunities.map((opp, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="text-[13px] font-medium text-[#101828]">
                          {opp.patient}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[13px] text-[#4a5565]">
                          {opp.payer}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[13px] text-[#4a5565]">
                          {opp.procedure}
                        </div>
                        <div className="text-[11px] text-[#99A1AF] font-mono">
                          CPT {opp.cpt}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[12px] text-[#4a5565]">
                          {opp.type}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[15px] font-semibold text-emerald-600">
                          +${opp.potentialDelta.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-[#6a7282]">
                          {opp.contractAllowed ? (
                            <>Contract ${opp.contractAllowed.toLocaleString()} · Paid ${opp.paidAmount.toLocaleString()}</>
                          ) : (
                            <>Billed ${opp.billedAmount?.toLocaleString()} · Paid ${opp.paidAmount.toLocaleString()}</>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-[13px] text-[#101828]">
                          {opp.deadline}
                        </div>
                        <div className="text-[11px] text-[#6a7282]">
                          {opp.deadlineLabel}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button className="text-[12px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                          View in worklist
                          <ArrowRight className="size-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center">
                      <div className="text-[13px] text-[#6a7282]">
                        No cases match the current filters
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button className="text-[12px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              See all opportunities in the Worklist
              <ArrowRight className="size-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}