import { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface TemplateLayoutProps {
  templateName: string;
  stage: string;
  casePath: string;
  isSystem?: boolean;
  status: 'Active' | 'Draft';
  onStatusChange: (status: 'Active' | 'Draft') => void;
  onBack: () => void;
  onSave: () => void;
  onDuplicate: () => void;
  leftContent: ReactNode;
  rightContent: ReactNode;
  lastSaved?: string;
}

export function TemplateLayout({
  templateName,
  stage,
  casePath,
  isSystem = false,
  status,
  onStatusChange,
  onBack,
  onSave,
  onDuplicate,
  leftContent,
  rightContent,
  lastSaved
}: TemplateLayoutProps) {
  return (
    <div className="h-full flex flex-col bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[13px] text-[#6a7282] hover:text-[#101828] transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back to Templates
          </button>
        </div>

        <div className="flex items-start justify-between">
          {/* Left: Template name and chips */}
          <div className="flex-1">
            <input
              type="text"
              value={templateName}
              className="text-[24px] font-semibold text-[#101828] tracking-[-0.02em] mb-3 bg-transparent border-none outline-none focus:ring-0 px-0 w-full max-w-[600px]"
              placeholder="Template name"
            />
            <div className="flex items-center gap-2">
              {/* Stage chip */}
              <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-[11px] font-medium">
                {stage}
              </span>
              {/* Case path chip */}
              <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-[#4a5565] rounded-full text-[11px] font-medium">
                {casePath}
              </span>
              {/* System badge */}
              {isSystem && (
                <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-[#6a7282] rounded-full text-[10px] font-medium uppercase tracking-wide">
                  System template
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Status dropdown */}
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value as 'Active' | 'Draft')}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
            </select>

            {/* Duplicate button */}
            <button
              onClick={onDuplicate}
              className="px-4 py-2 bg-white border border-gray-300 text-[#101828] rounded-lg text-[13px] font-medium hover:bg-gray-50 transition-colors"
            >
              Duplicate
            </button>

            {/* Save button */}
            <button
              onClick={onSave}
              className="px-5 py-2 bg-[#101828] text-white rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>

      {/* Main content - Two columns */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1600px] mx-auto px-8 py-8">
          <div className="flex gap-8">
            {/* Left column - Template content (70%) */}
            <div className="flex-1" style={{ maxWidth: '70%' }}>
              {leftContent}
            </div>

            {/* Right column - Configuration & variables (30%) */}
            <div className="w-[380px] shrink-0">
              {rightContent}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sticky bar */}
      {lastSaved && (
        <div className="bg-white border-t border-gray-200 px-8 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#6a7282]">
              Last saved {lastSaved}
            </span>
            <div className="flex items-center gap-4">
              <button className="text-[13px] text-[#6a7282] hover:text-[#101828] font-medium transition-colors">
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2 bg-[#101828] text-white rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
