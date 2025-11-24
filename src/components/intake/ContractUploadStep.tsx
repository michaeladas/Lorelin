import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, ArrowRight } from 'lucide-react';

interface ContractUploadStepProps {
  onComplete: () => void;
  onBack: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  payer?: string;
  status: 'uploading' | 'success' | 'error';
  codesCount?: number;
}

export function ContractUploadStep({ onComplete, onBack }: ContractUploadStepProps) {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Aetna_PPO_Fee_Schedule_2024.pdf',
      size: '2.4 MB',
      payer: 'Aetna PPO',
      status: 'success',
      codesCount: 1250
    },
    {
      id: '2',
      name: 'BCBS_Contract_Rates.xlsx',
      size: '1.8 MB',
      payer: 'Blue Cross Blue Shield',
      status: 'success',
      codesCount: 980
    }
  ]);

  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    // Handle file drop logic here
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const totalCodes = files.reduce((sum, file) => sum + (file.codesCount || 0), 0);

  return (
    <div className="overflow-auto size-full bg-white">
      <div className="max-w-[900px] mx-auto px-[60px] py-[60px]">
        
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="text-[12px] text-[#6a7282] hover:text-[#101828] mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <FileText className="size-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-[24px] font-semibold text-[#101828] tracking-[-0.02em]">
                Upload payer contracts & fee schedules
              </h1>
              <p className="text-[13px] text-[#6a7282]">
                Optional • Helps us detect exact underpayments against your contracted rates
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-[13px] font-medium text-[#101828] mb-1">
                Why upload contracts?
              </div>
              <div className="text-[12px] text-[#4a5565] mb-3">
                Without contracts, we estimate underpayments using historical patterns. With your contracts, we can detect the exact gap between what you should have been paid vs. what you received.
              </div>
              <div className="text-[11px] text-[#6a7282]">
                <strong>We accept:</strong> PDF fee schedules, Excel rate sheets, contract PDFs
              </div>
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-12 mb-6 transition-all ${
            isDragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }`}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center text-center">
            <div className="size-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-4">
              <Upload className="size-7 text-[#6a7282]" />
            </div>
            <div className="text-[14px] font-medium text-[#101828] mb-1">
              Drag & drop contract files here
            </div>
            <div className="text-[12px] text-[#6a7282] mb-4">
              or click to browse from your computer
            </div>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[12px] font-medium text-[#101828] hover:bg-gray-50 transition-colors">
              Choose files
            </button>
          </div>
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-medium text-[#101828]">
                Uploaded contracts ({files.length})
              </h3>
              <div className="text-[12px] text-[#6a7282]">
                {totalCodes.toLocaleString()} CPT codes loaded
              </div>
            </div>
            <div className="space-y-3">
              {files.map((file) => (
                <div 
                  key={file.id} 
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="size-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="size-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#101828] mb-0.5">
                      {file.name}
                    </div>
                    <div className="text-[11px] text-[#6a7282]">
                      {file.size} • {file.payer} • {file.codesCount?.toLocaleString()} CPT codes
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(file.id)}
                    className="size-8 rounded-lg flex items-center justify-center text-[#99A1AF] hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Coverage Summary */}
        {files.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-[13px] font-medium text-[#101828] mb-2">
                  Contract coverage summary
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-[11px] text-[#6a7282] mb-1">Payers with contracts</div>
                    <div className="text-[20px] font-semibold text-[#101828]">2</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#6a7282] mb-1">Estimated claim coverage</div>
                    <div className="text-[20px] font-semibold text-[#101828]">83%</div>
                  </div>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-emerald-500 w-[83%] rounded-full transition-all" />
                </div>
                <div className="text-[11px] text-[#6a7282]">
                  Based on your claims data, these contracts cover approximately 83% of your in-network charges
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-4 py-2 text-[13px] font-medium text-[#6a7282] hover:text-[#101828] transition-colors"
          >
            Back
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onComplete}
              className="px-4 py-2 text-[13px] font-medium text-[#6a7282] hover:text-[#101828] transition-colors"
            >
              Skip for now
            </button>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 bg-[#101828] text-white rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors flex items-center gap-2"
            >
              Continue with analysis
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
