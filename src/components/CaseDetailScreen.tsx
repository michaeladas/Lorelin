import { useState } from 'react';
import { ArrowLeft, ChevronDown, Download, Copy, AlertCircle, CheckCircle2 } from 'lucide-react';

// Mock case data
const caseData = {
  id: '1',
  patient: {
    name: 'J. Martinez',
    gender: 'F',
    age: 47,
  },
  claim: {
    id: '18294',
    dateOfService: 'Mar 4, 2025',
  },
  procedure: {
    name: 'Breast reconstruction',
    code: 'CPT 19357',
  },
  payer: {
    name: 'Aetna PPO',
    planType: 'Self-funded',
  },
  facility: {
    type: 'Outpatient hospital',
  },
  emergency: false,
  noticeAndConsent: false,
  financials: {
    billed: 8200,
    allowed: 3700,
    paid: 2100,
    potential: 3400,
  },
  venue: 'Federal IDR',
  status: 'Needs negotiation',
  eligibility: {
    venue: 'Federal IDR',
    reasons: [
      'Out-of-network provider',
      'Non-emergency service at in-network facility',
      'Plan type: self-funded ERISA',
      'Open negotiation not yet started',
    ],
  },
  timeline: {
    deadline: 'IDR filing deadline in 9 days',
    events: [
      { date: 'Mar 28', label: 'Initial payment received', completed: true },
      { date: 'Mar 29', label: 'Open negotiation window opens', completed: true },
      { date: 'Apr 27', label: 'Negotiation window ends', completed: false, current: true },
      { date: 'May 4', label: 'IDR filing deadline', completed: false },
    ],
  },
  nextStep: {
    action: 'Start open negotiation with Aetna',
    description: "We've prepared a draft letter for you to review and send.",
    buttonText: 'Mark as sent',
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

interface CaseDetailScreenProps {
  onBack: () => void;
}

export function CaseDetailScreen({ onBack }: CaseDetailScreenProps) {
  const [status, setStatus] = useState(caseData.status);
  const [showToast, setShowToast] = useState(false);

  const handleMarkAsSent = () => {
    setStatus('In negotiation');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getVenueColor = (venue: string) => {
    if (venue === 'Federal IDR') return 'bg-blue-50/70 text-blue-700/90 border-blue-200/40';
    if (venue === 'State IDR') return 'bg-blue-50/50 text-blue-600/90 border-blue-200/30';
    return 'bg-slate-50/70 text-slate-600/90 border-slate-200/40';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Needs negotiation') return 'bg-amber-50/80 text-amber-700/90 border-amber-200/40';
    if (status === 'In negotiation') return 'bg-blue-50/70 text-blue-700/90 border-blue-200/40';
    if (status === 'Ready for IDR') return 'bg-orange-50/70 text-orange-700/90 border-orange-200/40';
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
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-[#4a5565] border border-gray-200 rounded-md hover:bg-gray-50 transition-colors tracking-[-0.15px]">
                <span>More</span>
                <ChevronDown className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-6 w-full flex-1">
          {/* Left Column - Info Cards */}
          <div className="w-[400px] flex flex-col gap-4">
            
            {/* Card 1: Case Overview */}
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
                  value={caseData.noticeAndConsent ? 'Obtained' : 'Not obtained'}
                />
              </div>
            </InfoCard>

            {/* Card 2: Financials */}
            <InfoCard title="Financials">
              <div className="space-y-3">
                <div className="flex justify-between py-1.5">
                  <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">Billed amount</span>
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px]">${caseData.financials.billed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">Allowed / QPA</span>
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
                  <p className="text-[11px] text-[#99A1AF] mt-1">Based on typical outcomes for similar cases</p>
                </div>
              </div>
            </InfoCard>

            {/* Card 3: Eligibility & Routing */}
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

            {/* Card 4: Timeline & Deadlines */}
            <InfoCard title="Timeline & deadlines">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <AlertCircle className="size-4 text-orange-600" />
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{caseData.timeline.deadline}</span>
                </div>
                
                <div className="space-y-3">
                  {caseData.timeline.events.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        {event.completed ? (
                          <CheckCircle2 className="size-4 text-emerald-600" />
                        ) : event.current ? (
                          <div className="size-4 rounded-full border-2 border-blue-600 bg-white" />
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
          </div>

          {/* Right Column - Document Preview */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex-1 flex flex-col">
              {/* Card Header */}
              <div className="border-b border-gray-200 p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] text-[#99A1AF] tracking-[-0.15px] uppercase">Recommended next step</span>
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
                  <button className="flex items-center gap-1.5 px-3 py-2 text-[13px] text-[#4a5565] border border-gray-200 rounded-md hover:bg-gray-50 transition-colors tracking-[-0.15px]">
                    <Copy className="size-3.5" />
                    <span>Copy text</span>
                  </button>
                </div>
              </div>

              {/* Document Preview */}
              <div className="flex-1 overflow-auto p-8 bg-gray-50/30">
                <div className="bg-white max-w-[700px] mx-auto p-12 rounded-sm shadow-sm border border-gray-200">
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
                    April 18, 2025
                  </div>

                  {/* Recipient */}
                  <div className="mb-8 text-[13px] text-[#4a5565] leading-relaxed">
                    <div className="font-medium text-[#101828]">Aetna Provider Services</div>
                    <div>Attention: Claims Department</div>
                    <div>P.O. Box 981106</div>
                    <div>El Paso, TX 79998</div>
                  </div>

                  {/* Subject Line */}
                  <div className="mb-6 text-[13px] font-semibold text-[#101828]">
                    Re: Notice of Underpayment – Claim #{caseData.claim.id} – {caseData.patient.name}
                  </div>

                  {/* Body */}
                  <div className="space-y-4 text-[13px] text-[#4a5565] leading-relaxed">
                    <p>Dear Claims Department,</p>
                    
                    <p>
                      We are writing to address what we believe to be an underpayment on the above-referenced claim for services rendered to {caseData.patient.name} on {caseData.claim.dateOfService}. The patient received medically necessary care at our out-of-network facility.
                    </p>

                    <p>
                      <strong className="text-[#101828]">Claim Details:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li>Patient: {caseData.patient.name}</li>
                      <li>Claim Number: {caseData.claim.id}</li>
                      <li>Date of Service: {caseData.claim.dateOfService}</li>
                      <li>Procedure: {caseData.procedure.name} ({caseData.procedure.code})</li>
                      <li>Billed Amount: ${caseData.financials.billed.toLocaleString()}</li>
                      <li>Amount Paid: ${caseData.financials.paid.toLocaleString()}</li>
                    </ul>

                    <p>
                      We believe the appropriate reimbursement for this service should be significantly higher based on the complexity of the procedure, the qualifications required to perform it safely, and prevailing market rates for similar services in our geographic area.
                    </p>

                    <p>
                      Under the No Surprises Act, we are initiating the open negotiation period. We request that you review this claim and provide a substantive response within 30 business days. We are prepared to provide additional documentation, including our standard charges, regional rate comparisons, and clinical notes, to support our position.
                    </p>

                    <p>
                      Please contact our billing department at (415) 555-0125 or billing@premierplasticsurgery.com to discuss resolution of this matter. We appreciate your prompt attention and look forward to reaching a fair agreement.
                    </p>

                    <p className="pt-4">Sincerely,</p>

                    <div className="pt-8">
                      <div className="text-[#101828] font-medium">Dr. Sarah Chen</div>
                      <div>Medical Director</div>
                      <div>Premier Plastic Surgery Associates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-[#101828] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 z-50">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span className="text-[13px] tracking-[-0.15px]">Negotiation marked as sent</span>
        </div>
      )}
    </>
  );
}
