import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, X } from 'lucide-react';

interface SimplifiedUploadScreenProps {
  onRunDiagnostic: () => void;
}

interface FileData {
  name: string;
  rows: number;
  columns: string[];
}

interface ColumnMapping {
  [key: string]: string;
}

interface CardStatus {
  isReady: boolean;
  message: string;
}

export function SimplifiedUploadScreen({ onRunDiagnostic }: SimplifiedUploadScreenProps) {
  const [claimsFile, setClaimsFile] = useState<FileData | null>(null);
  const [remitsFile, setRemitsFile] = useState<FileData | null>(null);
  const [contractsFile, setContractsFile] = useState<FileData | null>(null);

  const [claimsMapping, setClaimsMapping] = useState<ColumnMapping>({
    claimId: 'claim_id',
    dateOfService: 'service_date',
    payer: 'payer_name',
    cpt: 'cpt_code',
    billedAmount: 'charge_amount',
    provider: 'provider_name',
    placeOfService: 'pos_code'
  });

  const [remitsMapping, setRemitsMapping] = useState<ColumnMapping>({
    claimId: 'claim_id',
    payer: 'payer_name',
    allowedAmount: 'allowed_amt',
    paidAmount: 'paid_amt',
    denialCode: 'denial_code',
    status: 'status'
  });

  const [contractsMapping, setContractsMapping] = useState<ColumnMapping>({
    payer: 'payer_name',
    cpt: 'cpt_code',
    allowedAmount: 'contracted_rate',
    modifier: 'modifier',
    placeOfService: 'pos_code',
    effectiveFrom: 'effective_from',
    effectiveTo: 'effective_to'
  });

  const handleUseSampleData = () => {
    // Auto-fill with sample data
    setClaimsFile({ name: 'sample_claims_Q1_2024.xlsx', rows: 18420, columns: ['claim_id', 'service_date', 'payer_name', 'cpt_code', 'charge_amount', 'provider_name', 'pos_code'] });
    setRemitsFile({ name: 'sample_remits_Q1_2024.xlsx', rows: 18005, columns: ['claim_id', 'payer_name', 'allowed_amt', 'paid_amt', 'denial_code', 'status'] });
    setContractsFile({ name: 'sample_fee_schedules.xlsx', rows: 320, columns: ['payer_name', 'cpt_code', 'contracted_rate', 'modifier', 'pos_code', 'effective_from', 'effective_to'] });
  };

  const getClaimsStatus = (): CardStatus => {
    if (!claimsFile) return { isReady: false, message: '' };
    const required = ['claimId', 'dateOfService', 'payer', 'cpt', 'billedAmount'];
    const allMapped = required.every(key => claimsMapping[key]);
    return allMapped 
      ? { isReady: true, message: 'Ready' }
      : { isReady: false, message: 'Missing required columns' };
  };

  const getRemitsStatus = (): CardStatus => {
    if (!remitsFile) return { isReady: false, message: '' };
    const allMapped = remitsMapping.claimId && remitsMapping.paidAmount;
    return allMapped
      ? { isReady: true, message: 'Ready' }
      : { isReady: false, message: 'Missing required columns' };
  };

  const getContractsStatus = (): CardStatus => {
    if (!contractsFile) return { isReady: false, message: 'No contract data provided – we\'ll still run the diagnostic using historical patterns.' };
    const allMapped = contractsMapping.payer && contractsMapping.cpt && contractsMapping.allowedAmount;
    return allMapped
      ? { isReady: true, message: 'Contracts data will be used' }
      : { isReady: false, message: 'Missing required columns' };
  };

  const claimsStatus = getClaimsStatus();
  const remitsStatus = getRemitsStatus();
  const contractsStatus = getContractsStatus();

  const canRunDiagnostic = claimsStatus.isReady && remitsStatus.isReady;

  // Mock columns for the dropdowns
  const getAvailableColumns = (file: FileData | null) => {
    return file?.columns || [];
  };

  return (
    <div className="overflow-auto size-full bg-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto px-[60px] py-[60px]">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-semibold text-[#101828] tracking-[-0.02em] mb-2">
            New Diagnostic – Upload data
          </h1>
          <p className="text-[13px] text-[#6a7282] mb-4">
            Upload exports from your billing system. We'll analyze them to find underpayments and missed dispute opportunities.
          </p>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-[#101828] font-medium">1. Upload data</span>
            <span className="text-[#99A1AF]">→</span>
            <span className="text-[#99A1AF]">2. View results</span>
          </div>
        </div>

        {/* Claims Card (Required) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-[16px] font-semibold text-[#101828] mb-1">
              Claims <span className="text-red-600">*</span>
            </h2>
            <p className="text-[12px] text-[#6a7282]">
              Charges/encounters for the period you want to scan. Usually exported from your practice management or billing system.
            </p>
          </div>

          {!claimsFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 transition-all cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3">
                  <Upload className="size-5 text-[#6a7282]" />
                </div>
                <div className="text-[13px] font-medium text-[#101828] mb-1">
                  Upload CSV or Excel
                </div>
                <div className="text-[11px] text-[#6a7282]">
                  At minimum we need: claim ID, date of service, payer, CPT/HCPCS, billed amount.
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* File chip */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                <div className="flex-1 text-[13px] text-[#101828]">
                  <span className="font-medium">{claimsFile.name}</span>
                  <span className="text-[#6a7282] ml-2">· {claimsFile.rows.toLocaleString()} rows</span>
                </div>
                <button className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">
                  Change
                </button>
              </div>

              {/* Column mapping table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">We need…</th>
                      <th className="px-4 py-2 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">Map to column</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        Claim ID <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select 
                          className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={claimsMapping.claimId}
                          onChange={(e) => setClaimsMapping({...claimsMapping, claimId: e.target.value})}
                        >
                          {getAvailableColumns(claimsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        Date of service <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={claimsMapping.dateOfService}
                          onChange={(e) => setClaimsMapping({...claimsMapping, dateOfService: e.target.value})}
                        >
                          {getAvailableColumns(claimsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        Payer <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={claimsMapping.payer}
                          onChange={(e) => setClaimsMapping({...claimsMapping, payer: e.target.value})}
                        >
                          {getAvailableColumns(claimsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        CPT/HCPCS <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={claimsMapping.cpt}
                          onChange={(e) => setClaimsMapping({...claimsMapping, cpt: e.target.value})}
                        >
                          {getAvailableColumns(claimsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        Billed amount <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={claimsMapping.billedAmount}
                          onChange={(e) => setClaimsMapping({...claimsMapping, billedAmount: e.target.value})}
                        >
                          {getAvailableColumns(claimsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Provider</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={claimsMapping.provider}
                          onChange={(e) => setClaimsMapping({...claimsMapping, provider: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(claimsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Place of service</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={claimsMapping.placeOfService}
                          onChange={(e) => setClaimsMapping({...claimsMapping, placeOfService: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(claimsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-3">
                <div className="text-[10px] text-[#6a7282] uppercase tracking-wider mb-1.5">Preview (first row)</div>
                <div className="text-[11px] text-[#101828] font-mono">
                  CLM-2024-001 · 2024-01-15 · Aetna PPO · 19357 · $5,500
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-end gap-2">
                {claimsStatus.isReady ? (
                  <>
                    <CheckCircle className="size-4 text-emerald-600" />
                    <span className="text-[12px] text-emerald-600 font-medium">{claimsStatus.message}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="size-4 text-amber-600" />
                    <span className="text-[12px] text-amber-600 font-medium">{claimsStatus.message}</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Remits Card (Required) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-[16px] font-semibold text-[#101828] mb-1">
              Remits & payments <span className="text-red-600">*</span>
            </h2>
            <p className="text-[12px] text-[#6a7282]">
              Payment and adjustment info (835/EOB exports). We use this to see how much each claim was actually paid.
            </p>
          </div>

          {!remitsFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 transition-all cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3">
                  <Upload className="size-5 text-[#6a7282]" />
                </div>
                <div className="text-[13px] font-medium text-[#101828] mb-1">
                  Upload CSV or Excel
                </div>
                <div className="text-[11px] text-[#6a7282]">
                  At minimum we need: claim ID, allowed amount (if available), paid amount, denial code (optional).
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                <div className="flex-1 text-[13px] text-[#101828]">
                  <span className="font-medium">{remitsFile.name}</span>
                  <span className="text-[#6a7282] ml-2">· {remitsFile.rows.toLocaleString()} rows</span>
                </div>
                <button className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">
                  Change
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">We need…</th>
                      <th className="px-4 py-2 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">Map to column</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        Claim ID <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={remitsMapping.claimId}
                          onChange={(e) => setRemitsMapping({...remitsMapping, claimId: e.target.value})}
                        >
                          {getAvailableColumns(remitsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Payer</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={remitsMapping.payer}
                          onChange={(e) => setRemitsMapping({...remitsMapping, payer: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(remitsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Allowed amount</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={remitsMapping.allowedAmount}
                          onChange={(e) => setRemitsMapping({...remitsMapping, allowedAmount: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(remitsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        Paid amount <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={remitsMapping.paidAmount}
                          onChange={(e) => setRemitsMapping({...remitsMapping, paidAmount: e.target.value})}
                        >
                          {getAvailableColumns(remitsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Denial code</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={remitsMapping.denialCode}
                          onChange={(e) => setRemitsMapping({...remitsMapping, denialCode: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(remitsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Status</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={remitsMapping.status}
                          onChange={(e) => setRemitsMapping({...remitsMapping, status: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(remitsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-3">
                <div className="text-[10px] text-[#6a7282] uppercase tracking-wider mb-1.5">Preview (first row)</div>
                <div className="text-[11px] text-[#101828] font-mono">
                  CLM-2024-001 · Aetna PPO · Allowed: $4,200 · Paid: $4,200
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                {remitsStatus.isReady ? (
                  <>
                    <CheckCircle className="size-4 text-emerald-600" />
                    <span className="text-[12px] text-emerald-600 font-medium">{remitsStatus.message}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="size-4 text-amber-600" />
                    <span className="text-[12px] text-amber-600 font-medium">{remitsStatus.message}</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Contracts Card (Optional) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="mb-4">
            <h2 className="text-[16px] font-semibold text-[#101828] mb-1">
              Contracts & fee schedules <span className="text-[#6a7282]">(optional)</span>
            </h2>
            <p className="text-[12px] text-[#6a7282]">
              Optional, but powerful. If you give us fee schedules, we can flag exact underpayments vs contract, not just statistical anomalies.
            </p>
          </div>

          {!contractsFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:border-gray-400 hover:bg-gray-100 transition-all cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="size-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3">
                  <Upload className="size-5 text-[#6a7282]" />
                </div>
                <div className="text-[13px] font-medium text-[#101828] mb-1">
                  Upload CSV or Excel
                </div>
                <div className="text-[11px] text-blue-600 hover:text-blue-700 mb-2 cursor-pointer">
                  Download template
                </div>
                <div className="text-[11px] text-[#6a7282]">
                  You can start with a single file that includes: payer, CPT, allowed amount. We'll focus on your top payers and codes.
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                <div className="flex-1 text-[13px] text-[#101828]">
                  <span className="font-medium">{contractsFile.name}</span>
                  <span className="text-[#6a7282] ml-2">· {contractsFile.rows.toLocaleString()} rows</span>
                </div>
                <button className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">
                  Change
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">We need…</th>
                      <th className="px-4 py-2 text-left text-[11px] text-[#6a7282] uppercase tracking-wider font-medium">Map to column</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        Payer <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={contractsMapping.payer}
                          onChange={(e) => setContractsMapping({...contractsMapping, payer: e.target.value})}
                        >
                          {getAvailableColumns(contractsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        CPT/HCPCS <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={contractsMapping.cpt}
                          onChange={(e) => setContractsMapping({...contractsMapping, cpt: e.target.value})}
                        >
                          {getAvailableColumns(contractsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#101828]">
                        Allowed amount <span className="text-red-600">*</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={contractsMapping.allowedAmount}
                          onChange={(e) => setContractsMapping({...contractsMapping, allowedAmount: e.target.value})}
                        >
                          {getAvailableColumns(contractsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Modifier</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={contractsMapping.modifier}
                          onChange={(e) => setContractsMapping({...contractsMapping, modifier: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(contractsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Place of service</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={contractsMapping.placeOfService}
                          onChange={(e) => setContractsMapping({...contractsMapping, placeOfService: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(contractsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Effective from</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={contractsMapping.effectiveFrom}
                          onChange={(e) => setContractsMapping({...contractsMapping, effectiveFrom: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(contractsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-100">
                      <td className="px-4 py-2.5 text-[12px] text-[#6a7282]">Effective to</td>
                      <td className="px-4 py-2.5">
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded text-[12px] bg-white"
                          value={contractsMapping.effectiveTo}
                          onChange={(e) => setContractsMapping({...contractsMapping, effectiveTo: e.target.value})}
                        >
                          <option value="">--Optional--</option>
                          {getAvailableColumns(contractsFile).map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-3">
                <div className="text-[10px] text-[#6a7282] uppercase tracking-wider mb-1.5">Preview (first row)</div>
                <div className="text-[11px] text-[#101828] font-mono">
                  Aetna PPO · 19357 · $5,500
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                {contractsStatus.isReady ? (
                  <>
                    <CheckCircle className="size-4 text-emerald-600" />
                    <span className="text-[12px] text-emerald-600 font-medium">{contractsStatus.message}</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="size-4 text-amber-600" />
                    <span className="text-[12px] text-amber-600 font-medium">{contractsStatus.message}</span>
                  </>
                )}
              </div>
            </div>
          )}

          {!contractsFile && (
            <div className="mt-4 text-[11px] text-[#6a7282]">
              {contractsStatus.message}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={handleUseSampleData}
            className="text-[13px] text-blue-600 hover:text-blue-700 font-medium"
          >
            Use sample data
          </button>
          <button
            onClick={onRunDiagnostic}
            disabled={!canRunDiagnostic}
            className={`px-6 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
              canRunDiagnostic
                ? 'bg-[#101828] text-white hover:bg-[#1f2937]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Run diagnostic
          </button>
        </div>
      </div>
    </div>
  );
}
