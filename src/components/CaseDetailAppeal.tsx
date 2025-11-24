import { useState } from 'react';
import { ArrowLeft, ChevronDown, Download, Copy, AlertCircle, CheckCircle2, AlertTriangle, X, Clock } from 'lucide-react';

// Mock case data for appeal-only case
const caseData = {
  id: '3',
  patient: {
    name: 'M. Patel',
    gender: 'F',
    age: 47,
  },
  claim: {
    id: '18287',
    dateOfService: 'Mar 4, 2025',
  },
  procedure: {
    name: 'Abdominoplasty',
    code: 'CPT 15830',
  },
  payer: {
    name: 'Cigna HMO',
    planType: 'Fully insured',
  },
  facility: {
    type: 'Outpatient hospital',
  },
  emergency: false,
  noticeAndConsent: 'Not applicable',
  financials: {
    billed: 9800,
    allowed: 3000,
    paid: 1150,
    potential: 1850,
    requesting: 3000,
  },
  payerReason: 'Charge exceeds contracted fee schedule (CARC 45)',
  venue: 'Appeal only',
  status: 'Needs appeal',
  eligibility: {
    venue: 'Appeal only',
    reasons: [
      'Plan type and service not eligible for federal or state IDR',
      'Contracted in-network rate dispute',
      'Internal payer appeal required before any external options',
    ],
  },
  timeline: {
    deadline: 'Appeal filing deadline in 21 days',
    daysUntilDeadline: 21,
    events: [
      { date: 'Apr 2', label: 'Initial payment / denial received', completed: true },
      { date: 'Apr 3', label: 'Case flagged for appeal', completed: true },
      { date: 'May 3', label: 'Appeal filing deadline', completed: false, current: true },
    ],
  },
  documents: [
    { name: 'EOB / remit', status: 'uploaded' as const, action: 'View' },
    { name: 'Clinical notes', status: 'missing' as const, action: 'Attach' },
    { name: 'Contract excerpt / fee schedule', status: 'optional' as const, action: 'Attach' },
    { name: 'Any additional evidence', status: 'optional' as const, action: 'Attach' },
  ],
  nextStep: {
    action: 'Prepare appeal letter',
    description: 'Review the draft below, submit through the payer portal, then mark as sent.',
    buttonText: 'Mark appeal as sent',
  },
};

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-[14px] font-semibold text-[#101828] tracking-[-0.15px] mb-4">{title}</h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value, subtext, chip }: { label: string; value: string; subtext?: string; chip?: string }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">{label}</span>
      <div className="flex flex-col items-end gap-1">
        <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{value}</span>
        {subtext && <span className="text-[12px] text-[#99A1AF]">{subtext}</span>}
        {chip && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-gray-100/80 text-[#6a7282] border border-gray-200/50">
            {chip}
          </span>
        )}
      </div>
    </div>
  );
}

interface CaseDetailAppealProps {
  onBack: () => void;
}

export function CaseDetailAppeal({ onBack }: CaseDetailAppealProps) {
  const [status, setStatus] = useState(caseData.status);
  const [showToast, setShowToast] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleMarkAsSent = () => {
    setShowConfirmDialog(true);
  };

  const confirmSent = () => {
    setStatus('In appeal');
    setShowConfirmDialog(false);
    setToastMessage('Appeal marked as sent');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopyText = () => {
    setToastMessage('Copied to clipboard');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const getVenueColor = (venue: string) => {
    if (venue === 'Appeal only') return 'bg-slate-50/70 text-slate-600/90 border-slate-200/40';
    return 'bg-gray-50/70 text-gray-600/90 border-gray-200/40';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Needs appeal') return 'bg-amber-50/80 text-amber-700/90 border-amber-200/40';
    if (status === 'In appeal') return 'bg-blue-50/70 text-blue-700/90 border-blue-200/40';
    return 'bg-gray-50/70 text-gray-600/90 border-gray-200/40';
  };

  return (
    <>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-8 pt-6 px-8 relative w-full min-h-full">
        
        {/* Header Bar */}
        <div className="w-full mb-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-col gap-2">
              <button 
                onClick={onBack}
                className="flex items-center gap-1.5 text-[13px] text-[#6a7282] hover:text-[#101828] transition-colors tracking-[-0.15px] w-fit"
              >
                <ArrowLeft className="size-3.5" />
                <span>Disputes</span>
              </button>
              <h1 className="text-[26px] font-semibold text-[#101828] tracking-[-0.4px] leading-tight">
                {caseData.patient.name} · {caseData.procedure.name}
              </h1>
              <p className="text-[13px] text-[#6a7282] tracking-[-0.15px]">
                Claim #{caseData.claim.id} · {caseData.payer.name} · DOS {caseData.claim.dateOfService}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[18px] font-semibold text-emerald-700 tracking-[-0.2px]">
                  +${caseData.financials.potential.toLocaleString()}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] border ${getVenueColor(caseData.venue)}`}>
                  {caseData.venue}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] border ${getStatusColor(status)}`}>
                  {status}
                </span>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-[#4a5565] border border-gray-200 rounded-md hover:bg-gray-50 transition-colors tracking-[-0.15px]">
                <span>Assign</span>
                <ChevronDown className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-6 w-full flex-1">
          {/* Left Column - Info Cards */}
          <div className="w-[400px] flex flex-col gap-4">
            
            {/* Card A: Case Overview */}
            <InfoCard title="Case overview">
              <div className="space-y-0">
                <InfoRow 
                  label="Patient" 
                  value={`${caseData.patient.name} · ${caseData.patient.gender}, ${caseData.patient.age}`} 
                />
                <InfoRow 
                  label="Procedure" 
                  value={caseData.procedure.name}
                  subtext={caseData.procedure.code}
                />
                <InfoRow 
                  label="Facility / POS" 
                  value={caseData.facility.type}
                />
                <InfoRow 
                  label="Date of service" 
                  value={caseData.claim.dateOfService}
                />
                <InfoRow 
                  label="Payer / plan" 
                  value={caseData.payer.name}
                  chip={caseData.payer.planType}
                />
                <InfoRow 
                  label="Emergency" 
                  value={caseData.emergency ? 'Yes' : 'No'}
                />
                <InfoRow 
                  label="Notice & consent" 
                  value={caseData.noticeAndConsent}
                />
              </div>
            </InfoCard>

            {/* Card B: Financials & Payer Decision */}
            <InfoCard title="Financials">
              <div className="space-y-3">
                <div className="flex justify-between py-1.5">
                  <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">Billed amount</span>
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px]">${caseData.financials.billed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">Allowed amount</span>
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px]">${caseData.financials.allowed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">Paid amount</span>
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px]">${caseData.financials.paid.toLocaleString()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-[13px] font-medium text-[#101828] tracking-[-0.15px]">Potential additional revenue</span>
                    <span className="text-[17px] font-semibold text-emerald-700 tracking-[-0.2px]">
                      +${caseData.financials.potential.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Payer Decision Summary */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="space-y-2">
                    <span className="text-[12px] text-[#6a7282] tracking-[-0.15px]">Payer reason</span>
                    <div className="bg-amber-50/50 border border-amber-200/40 rounded-md px-3 py-2">
                      <p className="text-[12px] text-[#4a5565] tracking-[-0.15px] leading-relaxed font-mono">
                        {caseData.payerReason}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>

            {/* Card C: Eligibility & Routing */}
            <InfoCard title="Eligibility & routing">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">Venue</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] border ${getVenueColor(caseData.eligibility.venue)}`}>
                    {caseData.eligibility.venue}
                  </span>
                </div>
                <ul className="space-y-2 mt-3">
                  {caseData.eligibility.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="size-1.5 rounded-full bg-[#6a7282] mt-1.5 flex-shrink-0" />
                      <span className="text-[13px] text-[#4a5565] tracking-[-0.15px] leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </InfoCard>

            {/* Card D: Timeline & Deadlines */}
            <InfoCard title="Timeline & deadlines">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Clock className="size-4 text-amber-600" />
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{caseData.timeline.deadline}</span>
                </div>
                
                <div className="space-y-3">
                  {caseData.timeline.events.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        {event.completed ? (
                          <CheckCircle2 className="size-4 text-emerald-600" />
                        ) : event.current ? (
                          <div className="size-4 rounded-full border-2 border-amber-600 bg-white" />
                        ) : (
                          <div className="size-4 rounded-full border-2 border-gray-300 bg-white" />
                        )}
                        {index < caseData.timeline.events.length - 1 && (
                          <div className={`w-0.5 h-6 mt-1 ${event.completed ? 'bg-emerald-200' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="text-[12px] font-medium text-[#4a5565] tracking-[-0.15px]">{event.date}</div>
                        <div className={`text-[13px] tracking-[-0.15px] ${event.current ? 'text-[#101828] font-medium' : 'text-[#6a7282]'}`}>
                          {event.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </InfoCard>

            {/* Card E: Supporting Documents */}
            <InfoCard title="Supporting documents">
              <div className="space-y-2">
                {caseData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      {doc.status === 'uploaded' && <CheckCircle2 className="size-4 text-emerald-600" />}
                      {doc.status === 'missing' && <AlertTriangle className="size-4 text-amber-600" />}
                      {doc.status === 'optional' && (
                        <div className="size-4 rounded-full border-2 border-gray-300 bg-white" />
                      )}
                      <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{doc.name}</span>
                    </div>
                    <button className="text-[12px] text-[#4a5565] hover:text-[#101828] tracking-[-0.15px] underline">
                      {doc.action}
                    </button>
                  </div>
                ))}
              </div>
            </InfoCard>
          </div>

          {/* Right Column - Appeal Letter Document */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex-1 flex flex-col">
              {/* Card Header */}
              <div className="border-b border-gray-200 p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] text-[#99A1AF] tracking-[-0.15px] uppercase">Next step</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200">
                        Draft generated
                      </span>
                    </div>
                    <h2 className="text-[18px] font-semibold text-[#101828] tracking-[-0.2px] mb-1">
                      {caseData.nextStep.action}
                    </h2>
                    <p className="text-[13px] text-[#6a7282] tracking-[-0.15px]">
                      {caseData.nextStep.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleMarkAsSent}
                    className="px-4 py-2 bg-[#101828] text-white text-[13px] rounded-md hover:bg-[#2a2f3a] transition-colors tracking-[-0.15px] font-medium"
                  >
                    {caseData.nextStep.buttonText}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#4a5565] border border-gray-200 rounded-md hover:bg-gray-50 transition-colors tracking-[-0.15px]">
                    <Download className="size-3.5" />
                    <span>Download PDF</span>
                  </button>
                  <button 
                    onClick={handleCopyText}
                    className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#4a5565] border border-gray-200 rounded-md hover:bg-gray-50 transition-colors tracking-[-0.15px]"
                  >
                    <Copy className="size-3.5" />
                    <span>Copy text</span>
                  </button>
                </div>
              </div>

              {/* Document Preview */}
              <div className="flex-1 overflow-auto p-8 bg-gray-50/30">
                <div className="bg-white max-w-[700px] mx-auto p-12 rounded-sm shadow-sm border border-gray-200">
                  
                  {/* Document Summary Strip */}
                  <div className="bg-slate-50/70 border border-slate-200/60 rounded-lg p-4 mb-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-[11px] text-[#6a7282] mb-1">Issue</div>
                        <div className="text-[13px] text-[#101828] font-medium tracking-[-0.15px]">Underpayment vs contract</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-[#6a7282] mb-1">Payer reason</div>
                        <div className="text-[12px] text-[#101828] font-medium tracking-[-0.15px] font-mono">CARC 45</div>
                        <div className="text-[11px] text-[#6a7282] mt-0.5">Exceeds fee schedule</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-[#6a7282] mb-1">We are requesting</div>
                        <div className="text-[15px] text-emerald-700 font-semibold tracking-[-0.2px]">${caseData.financials.requesting.toLocaleString()}</div>
                        <div className="text-[11px] text-[#6a7282] mt-0.5">Additional ${caseData.financials.potential.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  {/* Letter Header */}
                  <div className="mb-8">
                    <div className="font-mono text-[11px] text-[#4a5565] leading-relaxed">
                      <div className="font-semibold text-[#101828]">Premier Plastic Surgery Associates</div>
                      <div>123 Medical Plaza, Suite 400</div>
                      <div>San Francisco, CA 94102</div>
                      <div>Phone: (415) 555-0123</div>
                      <div>Fax: (415) 555-0124</div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mb-8 text-[13px] text-[#4a5565]">
                    April 12, 2025
                  </div>

                  {/* Payer Address */}
                  <div className="mb-8 text-[13px] text-[#4a5565] leading-relaxed">
                    <div className="font-medium text-[#101828]">Cigna Claims Department</div>
                    <div>P.O. Box 188037</div>
                    <div>Chattanooga, TN 37422</div>
                  </div>

                  {/* Subject Line */}
                  <div className="mb-6 text-[13px] font-semibold text-[#101828]">
                    Re: Appeal of Claim #{caseData.claim.id} – {caseData.patient.name}
                  </div>

                  {/* Body */}
                  <div className="space-y-5 text-[13px] text-[#4a5565] leading-relaxed">
                    <p>Dear Claims Review Team,</p>
                    
                    <div>
                      <h4 className="font-semibold text-[#101828] mb-2">Background</h4>
                      <p>
                        We are writing to appeal the underpayment on the above-referenced claim for services provided to {caseData.patient.name} on {caseData.claim.dateOfService}. The patient underwent {caseData.procedure.name} ({caseData.procedure.code}) at {caseData.facility.type}, a medically necessary procedure.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#101828] mb-2">Payer decision</h4>
                      <p>
                        The Explanation of Benefits indicates the claim was adjusted with the reason: "{caseData.payerReason}". The payment of ${caseData.financials.paid.toLocaleString()} represents only {Math.round((caseData.financials.paid / caseData.financials.billed) * 100)}% of the billed amount of ${caseData.financials.billed.toLocaleString()}.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#101828] mb-2">Contract and payment details</h4>
                      <p>
                        Based on our review of the contract fee schedule and standard reimbursement rates for this service:
                      </p>
                      <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                        <li>Billed amount: ${caseData.financials.billed.toLocaleString()}</li>
                        <li>Expected contract rate: ${caseData.financials.requesting.toLocaleString()}</li>
                        <li>Amount paid: ${caseData.financials.paid.toLocaleString()}</li>
                        <li>Underpayment: ${caseData.financials.potential.toLocaleString()}</li>
                      </ul>
                      <p className="mt-2">
                        Your contract with us specifies an allowed amount of <strong>${caseData.financials.requesting.toLocaleString()}</strong> for CPT {caseData.procedure.code.replace('CPT ', '')} in POS 22 ({caseData.facility.type}). This claim was paid at ${caseData.financials.paid.toLocaleString()}. Please reprocess to the contracted rate.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#101828] mb-2">Clinical / coding context</h4>
                      <p>
                        This procedure required significant operative time, specialized surgical expertise, and post-operative care. The service was properly coded and documented, and all medical necessity requirements were met. The clinical notes (attached) demonstrate the complexity and appropriateness of the care provided.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#101828] mb-2">Requested adjustment</h4>
                      <p>
                        We respectfully request that you adjust the payment to <strong className="text-[#101828]">${caseData.financials.requesting.toLocaleString()}</strong>, representing the correct contracted rate for this service. This would result in an additional payment of ${caseData.financials.potential.toLocaleString()}.
                      </p>
                      <p className="mt-2">
                        If you require any additional documentation or have questions regarding this appeal, please contact our billing department at (415) 555-0125 or billing@premierplasticsurgery.com.
                      </p>
                    </div>

                    <p className="pt-4">Thank you for your prompt review of this matter.</p>

                    <p>Sincerely,</p>

                    <div className="pt-8">
                      <div className="text-[#101828] font-medium">Jane Rodriguez, CPC</div>
                      <div>Revenue Cycle Manager</div>
                      <div>Premier Plastic Surgery Associates</div>
                    </div>

                    <div className="pt-6 text-[11px] text-[#6a7282]">
                      <p>Enclosures:</p>
                      <ul className="list-disc list-inside pl-2 mt-1">
                        <li>Copy of Explanation of Benefits</li>
                        <li>Clinical documentation</li>
                        <li>Contract fee schedule reference</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[440px] p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[18px] font-semibold text-[#101828] tracking-[-0.2px]">
                Confirm appeal sent
              </h3>
              <button 
                onClick={() => setShowConfirmDialog(false)}
                className="text-[#6a7282] hover:text-[#101828] transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="text-[14px] text-[#4a5565] tracking-[-0.15px] leading-relaxed mb-6">
              Have you submitted this appeal through the payer portal or via fax/email?
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-[13px] text-[#4a5565] border border-gray-200 rounded-md hover:bg-gray-50 transition-colors tracking-[-0.15px]"
              >
                Cancel
              </button>
              <button
                onClick={confirmSent}
                className="px-4 py-2 bg-[#101828] text-white text-[13px] rounded-md hover:bg-[#2a2f3a] transition-colors tracking-[-0.15px] font-medium"
              >
                Yes, mark as sent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#101828] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 z-50">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span className="text-[13px] tracking-[-0.15px]">{toastMessage}</span>
        </div>
      )}
    </>
  );
}
