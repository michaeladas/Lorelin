import { useState } from 'react';
import { ChevronLeft, ArrowRight, Calendar } from 'lucide-react';

interface ScanScopeStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export function ScanScopeStep({ onComplete, onBack }: ScanScopeStepProps) {
  const [dateRange, setDateRange] = useState('12');
  const [payerScope, setPayerScope] = useState<'all' | 'top'>('all');
  const [topPayersCount, setTopPayersCount] = useState('10');
  const [includeOON, setIncludeOON] = useState(true);

  return (
    <div className="size-full overflow-auto bg-[#f5f5f7]">
      <div className="max-w-[900px] mx-auto px-[60px] py-[60px]">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] text-[#6a7282] hover:text-[#101828] mb-6 transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back to mapping
        </button>

        <div className="mb-8">
          <h1 className="text-[28px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
            Configure scan scope
          </h1>
          <p className="text-[14px] text-[#6a7282] leading-[1.5]">
            Choose what data to analyze in your revenue leakage diagnostic.
          </p>
        </div>

        {/* Configuration Form - White Cards */}
        <div className="space-y-6">
          {/* Date Range */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-4">
              <Calendar className="size-5 text-[#6a7282] mt-0.5" />
              <div className="flex-1">
                <h3 className="text-[14px] font-semibold text-[#101828] mb-1">Date range</h3>
                <p className="text-[12px] text-[#6a7282] mb-4">
                  How far back should we analyze? More data = better pattern detection.
                </p>
                
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: '6', label: '6 months' },
                    { value: '12', label: '12 months' },
                    { value: '18', label: '18 months' },
                    { value: '24', label: '24 months' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDateRange(option.value)}
                      className={`px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                        dateRange === option.value
                          ? 'bg-[#101828] text-white'
                          : 'bg-gray-50 text-[#6a7282] hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payer Scope */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-[14px] font-semibold text-[#101828] mb-4">Payers to include</h3>
            
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payer-scope"
                  checked={payerScope === 'all'}
                  onChange={() => setPayerScope('all')}
                  className="mt-1"
                />
                <div>
                  <div className="text-[13px] font-medium text-[#101828]">All payers</div>
                  <div className="text-[12px] text-[#6a7282]">
                    Comprehensive analysis across all insurance companies
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payer-scope"
                  checked={payerScope === 'top'}
                  onChange={() => setPayerScope('top')}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-[#101828] mb-3">Top payers by volume</div>
                  {payerScope === 'top' && (
                    <select
                      value={topPayersCount}
                      onChange={(e) => setTopPayersCount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="5">Top 5 payers</option>
                      <option value="10">Top 10 payers</option>
                      <option value="15">Top 15 payers</option>
                      <option value="20">Top 20 payers</option>
                    </select>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* OON Indicators */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-[14px] font-semibold text-[#101828] mb-4">Out-of-network analysis</h3>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeOON}
                onChange={(e) => setIncludeOON(e.target.checked)}
                className="mt-1"
              />
              <div>
                <div className="text-[13px] font-medium text-[#101828]">
                  Flag potential OON/NSA/IDR opportunities
                </div>
                <div className="text-[12px] text-[#6a7282] mt-1">
                  If your data includes network status indicators, we'll identify cases that may qualify for No Surprises Act (NSA) protections and Independent Dispute Resolution (IDR).
                </div>
              </div>
            </label>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg border border-blue-200 p-6">
            <h4 className="text-[13px] font-semibold text-[#101828] mb-3">Scan summary</h4>
            <div className="grid grid-cols-2 gap-4 text-[13px]">
              <div>
                <span className="text-[#6a7282]">Date range:</span>{' '}
                <span className="font-medium text-[#101828]">Last {dateRange} months</span>
              </div>
              <div>
                <span className="text-[#6a7282]">Payers:</span>{' '}
                <span className="font-medium text-[#101828]">
                  {payerScope === 'all' ? 'All payers' : `Top ${topPayersCount}`}
                </span>
              </div>
              <div>
                <span className="text-[#6a7282]">OON analysis:</span>{' '}
                <span className="font-medium text-[#101828]">{includeOON ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div>
                <span className="text-[#6a7282]">Est. processing time:</span>{' '}
                <span className="font-medium text-[#101828]">5-10 minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[13px] text-[#6a7282] hover:text-[#101828] transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back
          </button>
          <button
            onClick={onComplete}
            className="bg-[#101828] text-white px-6 py-2.5 rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors flex items-center gap-2"
          >
            Run diagnostic
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}