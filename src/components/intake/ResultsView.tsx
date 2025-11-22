import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, AlertCircle, Calendar, DollarSign, FileText, ArrowRight, ExternalLink } from 'lucide-react';

export function ResultsView() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  // Mock data
  const payerData = [
    { name: 'Aetna', recoverable: 28400, claims: 1234 },
    { name: 'UnitedHealthcare', recoverable: 22100, claims: 987 },
    { name: 'Blue Cross', recoverable: 18900, claims: 856 },
    { name: 'Cigna', recoverable: 15200, claims: 723 },
    { name: 'Humana', recoverable: 12800, claims: 645 },
  ];

  const procedureData = [
    { name: 'Breast reconstruction', recoverable: 34200, claims: 234 },
    { name: 'Rhinoplasty', recoverable: 28600, claims: 312 },
    { name: 'Facelift', recoverable: 19800, claims: 189 },
    { name: 'Abdominoplasty', recoverable: 15400, claims: 267 },
    { name: 'Liposuction', recoverable: 12500, claims: 398 },
  ];

  const idrData = [
    { category: 'Eligible', value: 45, color: '#10b981' },
    { category: 'Deadline approaching', value: 23, color: '#f59e0b' },
    { category: 'Review needed', value: 32, color: '#6b7280' },
  ];

  return (
    <div className="overflow-auto size-full bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-[60px] py-[60px]">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-[28px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
                Revenue Leakage Diagnostic
              </h1>
              <p className="text-[13px] text-[#6a7282]">
                Analysis period: January 2024 – December 2024 • Generated November 22, 2025
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] text-[#101828] hover:bg-gray-50 transition-colors">
              <ExternalLink className="size-4" />
              Export report
            </button>
          </div>
        </div>

        {/* Hero Stats - White Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-[36px] rounded-lg bg-emerald-50 flex items-center justify-center">
                  <DollarSign className="size-5 text-emerald-600" />
                </div>
                <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider">
                  Recoverable Revenue
                </div>
              </div>
              <div className="text-[36px] font-semibold text-[#101828] tracking-[-0.02em] mb-1">
                $127,500
              </div>
              <div className="text-[12px] text-emerald-600 font-medium">
                8.3% of total collections
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-[36px] rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="size-5 text-blue-600" />
                </div>
                <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider">
                  Impacted Claims
                </div>
              </div>
              <div className="text-[36px] font-semibold text-[#101828] tracking-[-0.02em] mb-1">
                3,847
              </div>
              <div className="text-[12px] text-[#6a7282]">
                of 45,234 total claims
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-[36px] rounded-lg bg-amber-50 flex items-center justify-center">
                  <TrendingUp className="size-5 text-amber-600" />
                </div>
                <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider">
                  Avg Underpayment
                </div>
              </div>
              <div className="text-[36px] font-semibold text-[#101828] tracking-[-0.02em] mb-1">
                $33.15
              </div>
              <div className="text-[12px] text-[#6a7282]">
                per affected claim
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-[36px] rounded-lg bg-purple-50 flex items-center justify-center">
                  <AlertCircle className="size-5 text-purple-600" />
                </div>
                <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider">
                  Data Quality
                </div>
              </div>
              <div className="text-[36px] font-semibold text-[#101828] tracking-[-0.02em] mb-1">
                8/10
              </div>
              <div className="text-[12px] text-[#6a7282]">
                Good coverage
              </div>
            </div>
          </div>
        </div>

        {/* Data Quality Note - White Card */}
        <div className="bg-white rounded-lg border border-blue-200 p-5 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[13px] font-medium text-[#101828] mb-1">
                Data completeness note
              </div>
              <div className="text-[12px] text-[#4a5565]">
                No contract rates provided in your files. We're using historical allowed amounts and payer benchmarks to estimate underpayments. Actual recovery may be higher with contract rate verification.
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* By Payer */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[16px] font-semibold text-[#101828] mb-1">Revenue leakage by payer</h3>
                <p className="text-[12px] text-[#6a7282]">Top 5 payers by recoverable amount</p>
              </div>
              <button className="text-[12px] text-blue-600 font-medium hover:text-blue-700">
                View all →
              </button>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payerData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={true} vertical={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#99A1AF', fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#101828', fontSize: 12 }} width={120} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px', 
                      fontSize: '12px',
                      color: 'white',
                      padding: '8px 12px'
                    }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Recoverable']}
                  />
                  <Bar dataKey="recoverable" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-[11px] text-[#6a7282] mb-2">What our platform would do here:</div>
              <div className="text-[12px] text-[#101828]">
                Auto-generate appeals for top underpaid claims at each payer with evidence-based documentation.
              </div>
            </div>
          </div>

          {/* By Procedure */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[16px] font-semibold text-[#101828] mb-1">Revenue leakage by procedure</h3>
                <p className="text-[12px] text-[#6a7282]">Top 5 CPT codes by recoverable amount</p>
              </div>
              <button className="text-[12px] text-blue-600 font-medium hover:text-blue-700">
                View all →
              </button>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={procedureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#99A1AF', fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#99A1AF', fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: 'none', 
                      borderRadius: '8px', 
                      fontSize: '12px',
                      color: 'white',
                      padding: '8px 12px'
                    }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Recoverable']}
                  />
                  <Bar dataKey="recoverable" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-[11px] text-[#6a7282] mb-2">Example:</div>
              <div className="text-[12px] text-[#101828]">
                Breast reconstruction (CPT 19357): 234 underpaid claims, avg shortage $146/claim. Pattern suggests payer applying wrong fee schedule.
              </div>
            </div>
          </div>
        </div>

        {/* IDR Opportunities */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[16px] font-semibold text-[#101828] mb-1">NSA/IDR opportunities</h3>
              <p className="text-[12px] text-[#6a7282]">Out-of-network cases that may qualify for Independent Dispute Resolution</p>
            </div>
            <button className="text-[12px] text-blue-600 font-medium hover:text-blue-700">
              View details →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="h-[180px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={idrData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {idrData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {idrData.map((item) => (
                  <div key={item.category} className="flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[#6a7282]">{item.category}</span>
                    </div>
                    <span className="font-medium text-[#101828]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-[13px] font-medium text-[#101828]">45 claims ready to file</div>
                    <div className="text-[16px] font-semibold text-emerald-700">$34,200</div>
                  </div>
                  <div className="text-[11px] text-[#4a5565] mb-3">
                    All criteria met: emergency services, OON facility, within NSA timeframe
                  </div>
                  <button className="text-[11px] text-emerald-700 font-medium hover:text-emerald-800">
                    See claim list →
                  </button>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-[13px] font-medium text-[#101828]">23 claims with approaching deadlines</div>
                    <div className="text-[16px] font-semibold text-amber-700">$18,900</div>
                  </div>
                  <div className="text-[11px] text-[#4a5565] mb-3">
                    30-day IDR filing window closes within 2 weeks
                  </div>
                  <button className="text-[11px] text-amber-700 font-medium hover:text-amber-800">
                    Prioritize these →
                  </button>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-[13px] font-medium text-[#101828]">32 claims need documentation review</div>
                    <div className="text-[16px] font-semibold text-[#6a7282]">$22,400</div>
                  </div>
                  <div className="text-[11px] text-[#4a5565]">
                    Missing network status or service date info
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="text-[11px] text-[#6a7282] mb-2">What our platform would do here:</div>
            <div className="text-[12px] text-[#101828]">
              Automatically prepare IDR packages for the 45 eligible claims, including QPA calculations, evidence documentation, and federal portal submissions.
            </div>
          </div>
        </div>

        {/* Denials & Appeals */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[16px] font-semibold text-[#101828] mb-1">Denials & appeals behavior</h3>
              <p className="text-[12px] text-[#6a7282]">Pattern analysis of denied claims and appeal opportunities</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-[28px] font-semibold text-[#101828] mb-1">1,247</div>
              <div className="text-[11px] text-[#6a7282] uppercase tracking-wider mb-3">Denials detected</div>
              <div className="text-[12px] text-[#101828]">
                Top denial reason: "Not medically necessary" (38%)
              </div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-[28px] font-semibold text-amber-600 mb-1">23%</div>
              <div className="text-[11px] text-[#6a7282] uppercase tracking-wider mb-3">Appeal rate</div>
              <div className="text-[12px] text-[#101828]">
                Industry avg is 45% — significant opportunity
              </div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-[28px] font-semibold text-emerald-600 mb-1">67%</div>
              <div className="text-[11px] text-[#6a7282] uppercase tracking-wider mb-3">Win rate</div>
              <div className="text-[12px] text-[#101828]">
                Good success when appeals are filed
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="text-[11px] text-[#6a7282] mb-2">Recommendation:</div>
            <div className="text-[12px] text-[#101828]">
              With a 67% win rate, you should appeal far more denials. Our platform can automate appeal generation for the ~960 unappealed denials, potentially recovering an additional $82,000.
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-[24px] font-semibold mb-3">
                Next steps with Lorelin
              </h3>
              <p className="text-[14px] text-blue-50 mb-6 max-w-[600px] leading-[1.5]">
                This diagnostic identified $127,500 in recoverable revenue. Here's how our platform can help you capture it:
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[12px]">✓</span>
                  </div>
                  <div className="text-[13px] text-blue-50">
                    Turn this into a <strong className="text-white">live dashboard</strong> that updates as new claims come in
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[12px]">✓</span>
                  </div>
                  <div className="text-[13px] text-blue-50">
                    <strong className="text-white">Auto-generate appeals and IDR packages</strong> for your top 100 recovery opportunities
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[12px]">✓</span>
                  </div>
                  <div className="text-[13px] text-blue-50">
                    <strong className="text-white">Track status and outcomes</strong> across payers with automated follow-up
                  </div>
                </div>
              </div>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg text-[14px] font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                Schedule review & recovery plan
                <ArrowRight className="size-4" />
              </button>
            </div>
            <div className="text-right">
              <div className="text-[48px] font-semibold mb-2">$127,500</div>
              <div className="text-[13px] text-blue-100">Ready to recover</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}