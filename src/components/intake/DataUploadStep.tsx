import { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, ChevronLeft, ArrowRight, FilePlus } from 'lucide-react';

interface DataUploadStepProps {
  onComplete: () => void;
  onBack: () => void;
}

export function DataUploadStep({ onComplete, onBack }: DataUploadStepProps) {
  const [claimsFile, setClaimsFile] = useState<File | null>(null);
  const [paymentsFile, setPaymentsFile] = useState<File | null>(null);
  const [contractsFile, setContractsFile] = useState<File | null>(null);
  const [showMapping, setShowMapping] = useState(false);
  const [usingSampleData, setUsingSampleData] = useState(false);
  
  // Mock column detection
  const [claimsMapping, setClaimsMapping] = useState({
    dateOfService: 'DOS',
    cpt: 'CPT_Code',
    billedAmount: 'Charged_Amount',
    payer: 'Insurance_Name',
    denialCode: 'Denial_Code',
  });

  const [paymentsMapping, setPaymentsMapping] = useState({
    paidAmount: 'Paid_Amt',
    allowedAmount: 'Allowed_Amt',
    adjustments: 'Adjustments',
  });

  const [contractsMapping, setContractsMapping] = useState({
    payer: 'Payer_ID',
    cpt: 'CPT_Code',
    allowedAmount: 'Contract_Rate',
  });

  const handleFileUpload = (type: 'claims' | 'payments' | 'contracts', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'claims') {
        setClaimsFile(file);
      } else if (type === 'payments') {
        setPaymentsFile(file);
      } else {
        setContractsFile(file);
      }
    }
  };

  const handleContinueToMapping = () => {
    if (claimsFile && paymentsFile) {
      setShowMapping(true);
    }
  };

  const handleUseSampleData = () => {
    setUsingSampleData(true);
    setShowMapping(true);
  };

  if (showMapping) {
    return (
      <div className="size-full overflow-auto bg-[#f5f5f7]">
        <div className="max-w-[1200px] mx-auto px-[60px] py-[60px]">
          {/* Header */}
          <button
            onClick={() => setShowMapping(false)}
            className="flex items-center gap-2 text-[13px] text-[#6a7282] hover:text-[#101828] mb-6 transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back to upload
          </button>

          <div className="mb-8">
            <h1 className="text-[28px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
              Map your data fields
            </h1>
            <p className="text-[14px] text-[#6a7282] leading-[1.5]">
              We've detected your columns and auto-mapped where possible. Adjust if needed.
            </p>
          </div>

          {/* Mapping Tables - White Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
            <div className="grid grid-cols-3 gap-8">
              {/* Claims Mapping */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#101828] mb-4">Claims file mapping</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Date of Service', required: true, mapped: claimsMapping.dateOfService },
                    { label: 'CPT Code', required: true, mapped: claimsMapping.cpt },
                    { label: 'Billed Amount', required: true, mapped: claimsMapping.billedAmount },
                    { label: 'Payer Name', required: true, mapped: claimsMapping.payer },
                    { label: 'Denial Code', required: false, mapped: claimsMapping.denialCode },
                  ].map((field) => (
                    <div key={field.label} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[#101828]">{field.label}</span>
                        {field.required && (
                          <span className="text-[10px] text-red-600 uppercase tracking-wider">Required</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[#6a7282] font-mono">{field.mapped}</span>
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payments Mapping */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#101828] mb-4">Payments file mapping</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Paid Amount', required: true, mapped: paymentsMapping.paidAmount },
                    { label: 'Allowed Amount', required: true, mapped: paymentsMapping.allowedAmount },
                    { label: 'Adjustments', required: false, mapped: paymentsMapping.adjustments },
                  ].map((field) => (
                    <div key={field.label} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[#101828]">{field.label}</span>
                        {field.required && (
                          <span className="text-[10px] text-red-600 uppercase tracking-wider">Required</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-[#6a7282] font-mono">{field.mapped}</span>
                        <CheckCircle2 className="size-4 text-emerald-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contracts Mapping (Optional) */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#101828] mb-4">Contracts mapping</h3>
                {contractsFile || usingSampleData ? (
                  <div className="space-y-3">
                    {[
                      { label: 'Payer ID', required: true, mapped: contractsMapping.payer },
                      { label: 'CPT Code', required: true, mapped: contractsMapping.cpt },
                      { label: 'Contract Rate', required: true, mapped: contractsMapping.allowedAmount },
                    ].map((field) => (
                      <div key={field.label} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-[#101828]">{field.label}</span>
                          {field.required && (
                            <span className="text-[10px] text-red-600 uppercase tracking-wider">Required</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] text-[#6a7282] font-mono">{field.mapped}</span>
                          <CheckCircle2 className="size-4 text-emerald-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-center border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-[13px] text-[#6a7282]">No contract file uploaded</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Data Quality Preview - White Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-[14px] font-semibold text-[#101828] mb-4">Data quality preview</h3>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-[24px] font-semibold text-[#101828] mb-1">45,234</div>
                <div className="text-[11px] text-[#6a7282]">Total claims detected</div>
              </div>
              <div>
                <div className="text-[24px] font-semibold text-emerald-600 mb-1">92%</div>
                <div className="text-[11px] text-[#6a7282]">Have CPT + paid amount</div>
              </div>
              <div>
                <div className="text-[24px] font-semibold text-amber-600 mb-1">60%</div>
                <div className="text-[11px] text-[#6a7282]">Have denial codes</div>
              </div>
              <div>
                <div className="text-[24px] font-semibold text-[#101828] mb-1">18</div>
                <div className="text-[11px] text-[#6a7282]">Unique payers</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowMapping(false)}
              className="flex items-center gap-2 text-[13px] text-[#6a7282] hover:text-[#101828] transition-colors"
            >
              <ChevronLeft className="size-4" />
              Change files
            </button>
            <button
              onClick={onComplete}
              className="bg-[#101828] text-white px-6 py-2.5 rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors flex items-center gap-2"
            >
              Continue to scan setup
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-auto bg-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto px-[60px] py-[60px]">
        {/* Header */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[13px] text-[#6a7282] hover:text-[#101828] mb-6 transition-colors"
        >
          <ChevronLeft className="size-4" />
          Back to data source
        </button>

        <div className="mb-8">
          <h1 className="text-[28px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
            Upload your data files
          </h1>
          <p className="text-[14px] text-[#6a7282] leading-[1.5]">
            Export these files from your billing system. We support CSV, Excel, and most common formats.
          </p>
        </div>

        {/* Upload Cards - White Card Container */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Claims File */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-[15px] font-semibold text-[#101828] mb-1 tracking-[-0.02em]">
                    Claims file
                  </h3>
                  <p className="text-[12px] text-[#6a7282] leading-[1.5]">
                    Required fields: DOS, CPT, billed amount, payer, status
                  </p>
                </div>
                {claimsFile && <CheckCircle2 className="size-5 text-emerald-600" />}
              </div>

              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => handleFileUpload('claims', e)}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors text-center">
                  {claimsFile ? (
                    <div>
                      <FileText className="size-8 text-emerald-600 mx-auto mb-3" />
                      <div className="text-[13px] font-medium text-[#101828] mb-1">{claimsFile.name}</div>
                      <div className="text-[11px] text-[#6a7282]">
                        {(claimsFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="size-8 text-gray-400 mx-auto mb-3" />
                      <div className="text-[13px] font-medium text-[#101828] mb-1">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-[11px] text-[#6a7282]">CSV or Excel up to 100MB</div>
                    </div>
                  )}
                </div>
              </label>

              {/* Example fields */}
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider mb-2">Example columns</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Date of Service', 'CPT Code', 'Billed Amount', 'Payer', 'Status', 'Denial Code'].map((col) => (
                    <span key={col} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded">
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Payments File */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-[15px] font-semibold text-[#101828] mb-1 tracking-[-0.02em]">
                    Payments file
                  </h3>
                  <p className="text-[12px] text-[#6a7282] leading-[1.5]">
                    Required fields: paid amount, allowed amount, adjustments
                  </p>
                </div>
                {paymentsFile && <CheckCircle2 className="size-5 text-emerald-600" />}
              </div>

              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => handleFileUpload('payments', e)}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gray-400 transition-colors text-center">
                  {paymentsFile ? (
                    <div>
                      <FileText className="size-8 text-emerald-600 mx-auto mb-3" />
                      <div className="text-[13px] font-medium text-[#101828] mb-1">{paymentsFile.name}</div>
                      <div className="text-[11px] text-[#6a7282]">
                        {(paymentsFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="size-8 text-gray-400 mx-auto mb-3" />
                      <div className="text-[13px] font-medium text-[#101828] mb-1">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-[11px] text-[#6a7282]">CSV or Excel up to 100MB</div>
                    </div>
                  )}
                </div>
              </label>

              {/* Example fields */}
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider mb-2">Example columns</div>
                <div className="flex flex-wrap gap-1.5">
                  {['Paid Amount', 'Allowed Amount', 'Adjustments', 'Denial Codes', 'Payment Date'].map((col) => (
                    <span key={col} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded">
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contracts File (Full Width) */}
            <div className="col-span-2 border border-gray-200 rounded-lg p-6 bg-blue-50/30 border-blue-100">
              <div className="flex items-start justify-between mb-5">
                <div className="max-w-[600px]">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[15px] font-semibold text-[#101828] tracking-[-0.02em]">
                      Add contracts & fee schedules
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[11px] font-medium rounded-full">
                      Optional but recommended
                    </span>
                  </div>
                  <p className="text-[13px] text-[#6a7282] leading-[1.5] mb-3">
                    Adding contracts lets us detect exact underpayments vs contract, build payer compliance scorecards, and strengthen OON/IDR recommendations.
                  </p>
                  <p className="text-[12px] text-[#6a7282]">
                    You can start with just your top payers and top codes.
                  </p>
                </div>
                {contractsFile && <CheckCircle2 className="size-5 text-emerald-600" />}
              </div>

              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => handleFileUpload('contracts', e)}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50/50 transition-colors text-center bg-white">
                  {contractsFile ? (
                    <div>
                      <FileText className="size-8 text-emerald-600 mx-auto mb-3" />
                      <div className="text-[13px] font-medium text-[#101828] mb-1">{contractsFile.name}</div>
                      <div className="text-[11px] text-[#6a7282]">
                        {(contractsFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-8">
                      <div className="flex flex-col items-center">
                         <FilePlus className="size-8 text-blue-400 mb-2" />
                         <div className="text-[13px] font-medium text-[#101828]">
                           Upload fee schedule
                         </div>
                         <div className="text-[11px] text-[#6a7282]">CSV/Excel</div>
                      </div>
                      <div className="h-12 w-px bg-gray-200"></div>
                      <div className="text-left max-w-[200px]">
                        <div className="text-[11px] text-[#99A1AF] uppercase tracking-wider mb-1">Example data</div>
                        <div className="space-y-1">
                          <div className="text-[11px] text-[#6a7282]">CPT 19357 · $1,250.00</div>
                          <div className="text-[11px] text-[#6a7282]">CPT 15830 · $900.00</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Help Text - White Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex gap-4">
            <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-medium text-[#101828] mb-2">
                Tips for best results
              </h4>
              <ul className="text-[13px] text-[#6a7282] leading-[1.6] space-y-1">
                <li>• Include at least 12 months of data for accurate trend analysis</li>
                <li>• Make sure denial codes are included if available (helps identify patterns)</li>
                <li>• If you have contract rates, include them for more precise recovery estimates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleUseSampleData}
            className="text-[13px] text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Use sample data instead →
          </button>
          <button
            onClick={handleContinueToMapping}
            disabled={!claimsFile || !paymentsFile}
            className="bg-[#101828] text-white px-6 py-2.5 rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors flex items-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue to mapping
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}