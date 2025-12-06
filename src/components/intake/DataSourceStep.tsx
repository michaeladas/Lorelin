import { Database, Upload, Mail, ArrowRight } from 'lucide-react';

interface DataSourceStepProps {
  onSelect: (source: 'connect' | 'upload' | 'invite') => void;
}

export function DataSourceStep({ onSelect }: DataSourceStepProps) {
  return (
    <div className="size-full overflow-auto bg-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto px-[60px] py-[60px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
            How do you want to provide data?
          </h1>
          <p className="text-[14px] text-[#6a7282] leading-[1.5]">
            We'll analyze your claims and payments to identify revenue leakage and recovery opportunities.
          </p>
        </div>

        {/* White Card Container */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          {/* Options Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Connect Billing System */}
            <button
              onClick={() => onSelect('connect')}
              className="group border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all text-left relative"
            >
              <div className="size-[48px] rounded-lg bg-gray-100 flex items-center justify-center mb-5">
                <Database className="size-6 text-[#4a5565]" />
              </div>
              <h3 className="text-[14px] font-semibold text-[#101828] mb-1 tracking-[-0.15px]">
                Connect PM system
              </h3>
              <p className="text-[13px] text-[#6a7282] leading-[1.5] mb-4">
                Direct integration with your EHR/PM systems. Real-time sync, no manual uploads.
              </p>
              <div className="flex items-center gap-2 text-[12px] text-[#6a7282] font-medium">
                <span>Coming soon</span>
              </div>
            </button>

            {/* Upload CSV/Excel */}
            <button
              onClick={() => onSelect('upload')}
              className="group border-2 border-[#101828] rounded-lg p-6 hover:bg-gray-50 transition-all text-left relative"
            >
              <div className="size-[48px] rounded-lg bg-[#101828] flex items-center justify-center mb-5">
                <Upload className="size-6 text-white" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#101828] mb-2 tracking-[-0.02em]">
                Upload CSV / Excel
              </h3>
              <p className="text-[13px] text-[#6a7282] leading-[1.5] mb-4">
                Export claims and payment files from your billing system. We'll guide you through mapping fields.
              </p>
              <div className="flex items-center gap-2 text-[12px] text-[#101828] font-medium">
                <span>Start upload</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Invite Billing Company */}
            <button
              onClick={() => onSelect('invite')}
              className="group border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all text-left relative"
            >
              <div className="size-[48px] rounded-lg bg-gray-100 flex items-center justify-center mb-5">
                <Mail className="size-6 text-[#4a5565]" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#101828] mb-2 tracking-[-0.02em]">
                Invite your billing company
              </h3>
              <p className="text-[13px] text-[#6a7282] leading-[1.5] mb-4">
                Send them a link with instructions. They can securely upload data or connect their systems on your behalf.
              </p>
              <div className="flex items-center gap-2 text-[12px] text-[#6a7282] font-medium">
                <span>Send invitation</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Recommendation Banner */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex gap-4">
            <div className="size-[40px] rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-[18px]">💡</span>
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-[#101828] mb-1">
                Not sure which option to choose?
              </h4>
              <p className="text-[13px] text-[#4a5565] leading-[1.5]">
                <strong>Invite your billing company</strong> — they handle this data every day and can provide the most complete information. They'll receive clear instructions and can upload everything in minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}