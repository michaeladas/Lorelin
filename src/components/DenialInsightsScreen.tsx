import { useState } from 'react';
import { ChevronDown, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DenialInsightsScreen() {
  const [trendSecondaryMetric, setTrendSecondaryMetric] = useState<'denied-dollars' | 'clean-claim-rate'>('denied-dollars');

  // Sample data for trend chart
  const trendData = [
    { month: 'Jan', denialRate: 6.8, deniedDollars: 3.9, cleanClaimRate: 85 },
    { month: 'Feb', denialRate: 7.1, deniedDollars: 4.2, cleanClaimRate: 84 },
    { month: 'Mar', denialRate: 6.9, deniedDollars: 4.0, cleanClaimRate: 86 },
    { month: 'Apr', denialRate: 7.4, deniedDollars: 4.8, cleanClaimRate: 83 },
    { month: 'May', denialRate: 7.0, deniedDollars: 4.1, cleanClaimRate: 87 },
    { month: 'Jun', denialRate: 7.2, deniedDollars: 4.3, cleanClaimRate: 88 },
  ];

  // Sample data for top denial categories
  const categoryData = [
    { category: 'Eligibility', value: 1.2 },
    { category: 'Authorization', value: 1.0 },
    { category: 'Coding', value: 0.8 },
    { category: 'Medical necessity', value: 0.7 },
    { category: 'Timely filing', value: 0.6 },
  ];

  // Sample data for backlog
  const backlogData = [
    { bucket: '0–30d', value: 0.9 },
    { bucket: '31–60d', value: 0.7 },
    { bucket: '61–90d', value: 0.5 },
    { bucket: '90+d', value: 0.7 },
  ];

  // Sample payer performance data
  const payerData = [
    { payer: 'UnitedHealthcare', claims: 1240, denialRate: 8.2, deniedDollars: '$1.2M', appealSuccess: 58 },
    { payer: 'Anthem BCBS', claims: 980, denialRate: 6.8, deniedDollars: '$890K', appealSuccess: 64 },
    { payer: 'Aetna', claims: 750, denialRate: 7.1, deniedDollars: '$720K', appealSuccess: 61 },
    { payer: 'Cigna', claims: 620, denialRate: 6.4, deniedDollars: '$550K', appealSuccess: 67 },
    { payer: 'Humana', claims: 510, denialRate: 9.3, deniedDollars: '$680K', appealSuccess: 52 },
  ];

  // Sample denial details data
  const denialDetails = [
    { claimId: 'CLM-2024-1240', payer: 'UnitedHealthcare', dos: '11/15/24', category: 'Eligibility', deniedAmount: '$1,240', status: 'Under appeal', days: 12 },
    { claimId: 'CLM-2024-1239', payer: 'Anthem BCBS', dos: '11/14/24', category: 'Authorization', deniedAmount: '$890', status: 'Open', days: 13 },
    { claimId: 'CLM-2024-1238', payer: 'Aetna', dos: '11/13/24', category: 'Coding', deniedAmount: '$650', status: 'Under appeal', days: 14 },
    { claimId: 'CLM-2024-1237', payer: 'Cigna', dos: '11/12/24', category: 'Medical necessity', deniedAmount: '$1,120', status: 'Open', days: 15 },
    { claimId: 'CLM-2024-1236', payer: 'Humana', dos: '11/11/24', category: 'Timely filing', deniedAmount: '$780', status: 'Closed - paid', days: 16 },
  ];

  const getDenialRateColor = (rate: number) => {
    if (rate >= 8) return 'bg-red-50 text-red-700';
    if (rate >= 7) return 'bg-amber-50 text-amber-700';
    return '';
  };

  const getAppealSuccessColor = (rate: number) => {
    if (rate >= 65) return 'bg-emerald-50 text-emerald-700';
    return '';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Closed - paid') return 'bg-emerald-100 text-emerald-800';
    if (status === 'Under appeal') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="size-full overflow-auto bg-[#f5f5f7]">
      <div className="max-w-[1600px] mx-auto px-[60px] py-[60px]">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[24px] font-semibold text-[#101828] tracking-[-0.02em] mb-1">
            Denial Insights
          </h1>
          <p className="text-[13px] text-[#6a7282]">
            Monitor denial patterns and track resolution performance
          </p>
        </div>

        {/* Filters card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                <option>Last 6 months</option>
                <option>Last 3 months</option>
                <option>Last month</option>
                <option>Custom range</option>
              </select>

              <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                <option>All payers</option>
                <option>UnitedHealthcare</option>
                <option>Anthem BCBS</option>
                <option>Aetna</option>
                <option>Cigna</option>
              </select>

              <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                <option>All locations</option>
                <option>Main campus</option>
                <option>North clinic</option>
                <option>South clinic</option>
              </select>

              <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer">
                <option>All categories</option>
                <option>Eligibility</option>
                <option>Authorization</option>
                <option>Coding</option>
                <option>Medical necessity</option>
              </select>

              <button className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#6a7282] hover:text-[#4a5565] font-medium">
                More filters
                <ChevronDown className="size-4" />
              </button>
            </div>

            <button className="text-[13px] text-blue-600 hover:text-blue-700 font-medium">
              Reset filters
            </button>
          </div>
        </div>

        {/* KPI cards row */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {/* Denial rate */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="text-[11px] text-[#6a7282] uppercase tracking-wider font-medium mb-2">
              Denial rate
            </div>
            <div className="text-[32px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
              7.2%
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <TrendingUp className="size-3.5 text-red-600" />
              <span className="text-red-600 font-medium">+0.8 pts</span>
              <span className="text-[#6a7282]">vs last month</span>
            </div>
          </div>

          {/* Denied dollars */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="text-[11px] text-[#6a7282] uppercase tracking-wider font-medium mb-2">
              Denied dollars
            </div>
            <div className="text-[32px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
              $4.3M
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <TrendingDown className="size-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-medium">-12%</span>
              <span className="text-[#6a7282]">vs last month</span>
            </div>
          </div>

          {/* Clean claim rate */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="text-[11px] text-[#6a7282] uppercase tracking-wider font-medium mb-2">
              Clean claim rate
            </div>
            <div className="text-[32px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
              88%
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <TrendingUp className="size-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-medium">+3 pts</span>
              <span className="text-[#6a7282]">vs last month</span>
            </div>
          </div>

          {/* Appeal success rate */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="text-[11px] text-[#6a7282] uppercase tracking-wider font-medium mb-2">
              Appeal success rate
            </div>
            <div className="text-[32px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
              61%
            </div>
            <div className="flex items-center gap-1.5 text-[12px]">
              <TrendingUp className="size-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-medium">+5 pts</span>
              <span className="text-[#6a7282]">vs last month</span>
            </div>
          </div>
        </div>

        {/* Main charts row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Trend chart */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[15px] font-semibold text-[#101828]">
                Denial trend over time
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTrendSecondaryMetric('denied-dollars')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    trendSecondaryMetric === 'denied-dollars'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-[#6a7282] hover:bg-gray-100'
                  }`}
                >
                  Denied $
                </button>
                <button
                  onClick={() => setTrendSecondaryMetric('clean-claim-rate')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    trendSecondaryMetric === 'clean-claim-rate'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-[#6a7282] hover:bg-gray-100'
                  }`}
                >
                  Clean claim rate
                </button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#6a7282' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6a7282' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
                  iconType="circle"
                />
                <Line 
                  type="monotone" 
                  dataKey="denialRate" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Denial rate (%)"
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
                {trendSecondaryMetric === 'denied-dollars' ? (
                  <Line 
                    type="monotone" 
                    dataKey="deniedDollars" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    name="Denied $ (M)"
                    dot={{ fill: '#6366f1', r: 4 }}
                  />
                ) : (
                  <Line 
                    type="monotone" 
                    dataKey="cleanClaimRate" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Clean claim rate (%)"
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top denial categories */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-[15px] font-semibold text-[#101828] mb-6">
              Top denial categories
            </h2>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart 
                data={categoryData} 
                layout="vertical"
                margin={{ top: 0, right: 40, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 12, fill: '#6a7282' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="category" 
                  tick={{ fontSize: 12, fill: '#4a5565' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  width={120}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`$${value}M`, 'Denied']}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  label={{ position: 'right', fontSize: 11, fill: '#6a7282', formatter: (value: any) => `$${value}M` }}
                />
              </BarChart>
            </ResponsiveContainer>

            <p className="text-[11px] text-[#6a7282] mt-4">
              Click a bar to filter details table
            </p>
          </div>
        </div>

        {/* Payer performance + Backlog row */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Payer performance table */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-[15px] font-semibold text-[#101828] mb-4">
              Payer performance
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-2 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                      Payer
                    </th>
                    <th className="px-3 py-2 text-right text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                      Claims
                    </th>
                    <th className="px-3 py-2 text-right text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                      Denial rate
                    </th>
                    <th className="px-3 py-2 text-right text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                      Denied $
                    </th>
                    <th className="px-3 py-2 text-right text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                      Appeal success
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payerData.map((payer, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-0">
                      <td className="px-3 py-3 text-[13px] text-[#101828] font-medium">
                        {payer.payer}
                      </td>
                      <td className="px-3 py-3 text-[13px] text-[#4a5565] text-right">
                        {payer.claims.toLocaleString()}
                      </td>
                      <td className={`px-3 py-3 text-[13px] text-right font-medium rounded ${getDenialRateColor(payer.denialRate)}`}>
                        {payer.denialRate}%
                      </td>
                      <td className="px-3 py-3 text-[13px] text-[#4a5565] text-right">
                        {payer.deniedDollars}
                      </td>
                      <td className={`px-3 py-3 text-[13px] text-right font-medium rounded ${getAppealSuccessColor(payer.appealSuccess)}`}>
                        {payer.appealSuccess}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Backlog card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-[15px] font-semibold text-[#101828] mb-6">
              Denial backlog by age
            </h2>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={backlogData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="bucket" 
                  tick={{ fontSize: 12, fill: '#6a7282' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6a7282' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  label={{ value: '$ Millions', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#6a7282' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`$${value}M`, 'Open denied']}
                />
                <Bar 
                  dataKey="value" 
                  fill="#71717a"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div>
                <div className="text-[11px] text-[#6a7282] mb-1">Open denials</div>
                <div className="text-[20px] font-semibold text-[#101828]">1,240</div>
              </div>
              <div>
                <div className="text-[11px] text-[#6a7282] mb-1">Open denied $</div>
                <div className="text-[20px] font-semibold text-[#101828]">$2.8M</div>
              </div>
              <div>
                <div className="text-[11px] text-[#6a7282] mb-1">&gt;30 days</div>
                <div className="text-[20px] font-semibold text-red-600">54%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Denial details table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-[#101828]">
              Denial details
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6a7282]" />
              <input
                type="text"
                placeholder="Search claims"
                className="pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[240px]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Claim ID
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Payer
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    DOS
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Denial category
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Denied $
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">
                    Days since denial
                  </th>
                </tr>
              </thead>
              <tbody>
                {denialDetails.map((detail, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-[13px] text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                      {detail.claimId}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#4a5565]">
                      {detail.payer}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#4a5565]">
                      {detail.dos}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#4a5565]">
                      {detail.category}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#101828] font-medium text-right">
                      {detail.deniedAmount}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-medium ${getStatusColor(detail.status)}`}>
                        {detail.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#4a5565] text-right">
                      {detail.days}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="text-[12px] text-[#6a7282]">
              Showing 1 to 5 of 1,240 results
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-[12px] text-[#6a7282] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1.5 bg-[#101828] text-white rounded-lg text-[12px] font-medium">
                1
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-[12px] text-[#6a7282] hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-[12px] text-[#6a7282] hover:bg-gray-50 transition-colors">
                3
              </button>
              <span className="px-2 text-[#6a7282]">...</span>
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-[12px] text-[#6a7282] hover:bg-gray-50 transition-colors">
                248
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-[12px] text-[#6a7282] hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}