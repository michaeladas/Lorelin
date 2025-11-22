import { useState } from 'react';
import { ArrowLeft, ChevronDown, Download, Copy, AlertCircle, CheckCircle2, FileText, AlertTriangle, X } from 'lucide-react';

// Mock case data for IDR-ready case
const caseData = {
  id: '4',
  patient: {
    name: 'K. Williams',
    gender: 'F',
    age: 47,
  },
  claim: {
    id: '18283',
    dateOfService: 'Mar 4, 2025',
  },
  procedure: {
    name: 'Facelift',
    code: 'CPT 15824',
  },
  payer: {
    name: 'Blue Cross Blue Shield',
    planType: 'Self-funded',
  },
  facility: {
    type: 'Outpatient hospital',
  },
  emergency: false,
  noticeAndConsent: false,
  financials: {
    billed: 15200,
    allowed: 8900,
    paid: 5800,
    potential: 6100,
    providerOffer: 11900,
    planOffer: 5800,
  },
  benchmarks: {
    internal: {
      median: 11200,
      rangeMin: 10500,
      rangeMax: 12800,
    },
    external: {
      usualCustomary: 12100,
      marketRangeMin: 10800,
      marketRangeMax: 13200,
    },
  },
  clinicalFactors: [
    'Revision procedure with prior scarring',
    'Extended OR time vs typical case',
    'Comorbidities increasing anesthesia and monitoring needs',
  ],
  venue: 'Federal IDR',
  status: 'Ready for IDR',
  eligibility: {
    venue: 'Federal IDR',
    reasons: [
      'Out-of-network provider',
      'Non-emergency service at in-network facility',
      'Plan type: self-funded ERISA',
      'Open negotiation completed; no agreement reached',
    ],
  },
  timeline: {
    deadline: 'IDR filing deadline in 5 days',
    daysUntilDeadline: 5,
    events: [
      { date: 'Mar 28', label: 'Initial payment received', completed: true },
      { date: 'Apr 1', label: 'Open negotiation started', completed: true },
      { date: 'Apr 25', label: 'Negotiation window ended (no agreement)', completed: true },
      { date: 'May 5', label: 'IDR filing deadline', completed: false, current: true },
    ],
  },
  documents: [
    { name: 'EOB / remit', status: 'uploaded' as const, action: 'View' },
    { name: 'Clinical notes', status: 'uploaded' as const, action: 'View' },
    { name: 'Contract excerpt (if applicable)', status: 'missing' as const, action: 'Attach' },
    { name: 'Any additional pricing benchmarks', status: 'optional' as const, action: 'Attach' },
  ],
  nextStep: {
    action: 'Prepare IDR position statement',
    description: 'Review the draft below, file in the official IDR portal, and then mark as filed.',
    buttonText: 'Mark as filed',
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

interface CaseDetailIDRProps {
  onBack: () => void;
}

export function CaseDetailIDR({ onBack }: CaseDetailIDRProps) {
  const [status, setStatus] = useState(caseData.status);
  const [showToast, setShowToast] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleMarkAsFiled = () => {
    setShowConfirmDialog(true);
  };

  const confirmFiling = () => {
    setStatus('Filed');
    setShowConfirmDialog(false);
    setToastMessage('Case marked as filed');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCopyText = () => {
    setToastMessage('Copied to clipboard');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const getVenueColor = (venue: string) => {
    if (venue === 'Federal IDR') return 'bg-blue-50/70 text-blue-700/90 border-blue-200/40';
    if (venue === 'State IDR') return 'bg-blue-50/50 text-blue-600/90 border-blue-200/30';
    return 'bg-slate-50/70 text-slate-600/90 border-slate-200/40';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Ready for IDR') return 'bg-orange-50/70 text-orange-700/90 border-orange-200/40';
    if (status === 'Filed') return 'bg-slate-50/70 text-slate-600/90 border-slate-200/40';
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

            {/* Card 2: Sources & rationale */}
            <InfoCard title="Sources & rationale">
              <div className="space-y-5">
                
                {/* Requested vs paid */}
                <div>
                  <h4 className="text-[12px] font-medium text-[#6a7282] tracking-[-0.15px] mb-3">Requested vs paid</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-[#99A1AF]">Billed</span>
                      <span className="text-[13px] text-[#101828] tracking-[-0.15px]">${caseData.financials.billed.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-[#99A1AF]">QPA</span>
                      <span className="text-[13px] text-[#101828] tracking-[-0.15px]">${caseData.financials.allowed.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-[#99A1AF]">Paid by plan</span>
                      <span className="text-[13px] text-[#101828] tracking-[-0.15px]">${caseData.financials.paid.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-[#99A1AF]">Requested (our offer)</span>
                      <span className="text-[15px] font-semibold text-emerald-700 tracking-[-0.2px]">${caseData.financials.providerOffer.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Internal benchmarks */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-[12px] font-medium text-[#6a7282] tracking-[-0.15px] mb-2">Internal benchmarks</h4>
                  <div className="bg-blue-50/30 border border-blue-200/30 rounded-md px-3 py-2.5 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] text-[#4a5565]">Our experience</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-[#6a7282]">Median allowed (similar cases, last 12 mo)</span>
                      <span className="text-[12px] text-[#101828] font-medium">${caseData.benchmarks.internal.median.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-[#6a7282]">Range for similar cases</span>
                      <span className="text-[12px] text-[#101828]">${caseData.benchmarks.internal.rangeMin.toLocaleString()} – ${caseData.benchmarks.internal.rangeMax.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* External benchmarks */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-[12px] font-medium text-[#6a7282] tracking-[-0.15px] mb-2">External benchmarks</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start py-1">
                      <span className="text-[12px] text-[#4a5565]">Usual & customary estimate</span>
                      <span className="text-[12px] text-[#101828] font-medium">${caseData.benchmarks.external.usualCustomary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-start py-1">
                      <span className="text-[12px] text-[#4a5565]">Regional market range</span>
                      <span className="text-[12px] text-[#101828]">${caseData.benchmarks.external.marketRangeMin.toLocaleString()} – ${caseData.benchmarks.external.marketRangeMax.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Clinical complexity factors */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-[12px] font-medium text-[#6a7282] tracking-[-0.15px] mb-2">Clinical complexity</h4>
                  <div className="space-y-1.5">
                    {caseData.clinicalFactors.map((factor, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-[12px] text-[#4a5565] tracking-[-0.15px] leading-relaxed">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer note */}
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-[11px] text-[#99A1AF] italic">
                    These data points are referenced in the IDR position statement.
                  </p>
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
                          <div className="size-4 rounded-full border-2 border-orange-600 bg-white" />
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

            {/* Card 5: Documents Checklist */}
            <InfoCard title="Supporting documents">
              <div className="space-y-2">
                {caseData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-2">
                      {doc.status === 'uploaded' && <CheckCircle2 className="size-4 text-emerald-600" />}
                      {doc.status === 'missing' && <AlertTriangle className="size-4 text-amber-600" />}
                      {doc.status === 'optional' && <AlertTriangle className="size-4 text-gray-400" />}
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

          {/* Right Column - IDR Position Statement */}
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
                    onClick={handleMarkAsFiled}
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
                  
                  {/* Offers Summary Panel */}
                  <div className="bg-blue-50/50 border border-blue-200/40 rounded-lg p-5 mb-8">
                    <h3 className="text-[13px] font-semibold text-[#101828] tracking-[-0.15px] mb-4">Offers summary</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1">
                            <span className="text-[12px] text-[#6a7282]">Plan offer</span>
                            <span className="text-[12px] text-[#101828] font-medium">${caseData.financials.planOffer.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-[12px] text-[#6a7282]">Provider offer</span>
                            <span className="text-[12px] text-[#101828] font-medium">${caseData.financials.providerOffer.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <div className="flex justify-between py-1">
                            <span className="text-[12px] text-[#6a7282]">Billed</span>
                            <span className="text-[12px] text-[#101828]">${caseData.financials.billed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-[12px] text-[#6a7282]">QPA</span>
                            <span className="text-[12px] text-[#101828]">${caseData.financials.allowed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-[12px] text-[#6a7282]">Paid</span>
                            <span className="text-[12px] text-[#101828]">${caseData.financials.paid.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between py-1 border-t border-blue-200/40 pt-1">
                            <span className="text-[12px] text-[#6a7282] font-medium">Requested</span>
                            <span className="text-[12px] text-emerald-700 font-semibold">${caseData.financials.providerOffer.toLocaleString()}</span>
                          </div>
                        </div>
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
                    April 30, 2025
                  </div>

                  {/* Subject Line */}
                  <div className="mb-6 text-[13px] font-semibold text-[#101828]">
                    Re: IDR Position Statement for Claim #{caseData.claim.id} – {caseData.patient.name}
                  </div>

                  {/* Body */}
                  <div className="space-y-5 text-[13px] text-[#4a5565] leading-relaxed">
                    <div>
                      <h4 className="font-semibold text-[#101828] mb-2">Background</h4>
                      <p>
                        This Independent Dispute Resolution (IDR) case concerns services provided to {caseData.patient.name} on {caseData.claim.dateOfService} at our out-of-network facility. The patient underwent {caseData.procedure.name} ({caseData.procedure.code}), a medically necessary procedure performed at {caseData.facility.type}.
                      </p>
                      <p className="mt-2">
                        Following initial payment, we initiated open negotiation with {caseData.payer.name} in good faith. Despite our efforts, the parties were unable to reach an agreement within the 30-business-day negotiation period.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#101828] mb-2">Payment details and QPA comparison</h4>
                      <p>
                        The plan's initial payment of ${caseData.financials.paid.toLocaleString()} falls significantly below both our billed amount of ${caseData.financials.billed.toLocaleString()} and the Qualifying Payment Amount (QPA) of ${caseData.financials.allowed.toLocaleString()}.
                      </p>
                      <p className="mt-2">
                        During open negotiation, the plan offered ${caseData.financials.planOffer.toLocaleString()}, while our provider offer was ${caseData.financials.providerOffer.toLocaleString()}. Our offer reflects the complexity of this procedure, the specialized expertise required, and prevailing market rates in our geographic area.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#101828] mb-2">Clinical complexity & justification</h4>
                      <p>The requested payment is justified by the following factors:</p>
                      <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                        <li>Highly complex surgical procedure requiring advanced board-certified specialist</li>
                        <li>Extended procedure time and specialized equipment required</li>
                        <li>Significant post-operative monitoring and care coordination</li>
                        <li>Market analysis shows regional rates for comparable services ranging from ${Math.floor(caseData.financials.providerOffer * 0.9).toLocaleString()} to ${Math.floor(caseData.financials.providerOffer * 1.15).toLocaleString()}</li>
                        <li>Our facility maintains high quality standards and patient safety protocols that exceed minimum requirements</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#101828] mb-2">Requested payment</h4>
                      <p>
                        Based on the clinical complexity, market data, and the specialized nature of this service, we respectfully request that the certified IDR entity determine a payment amount of <strong className="text-[#101828]">${caseData.financials.providerOffer.toLocaleString()}</strong>.
                      </p>
                      <p className="mt-2">
                        This amount represents a fair and reasonable reimbursement that accounts for the unique circumstances of this case while remaining within the range of commercially reasonable rates for similar services in our market.
                      </p>
                    </div>

                    <p className="pt-4">Respectfully submitted,</p>

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

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[440px] p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-[18px] font-semibold text-[#101828] tracking-[-0.2px]">
                Confirm IDR filing
              </h3>
              <button 
                onClick={() => setShowConfirmDialog(false)}
                className="text-[#6a7282] hover:text-[#101828] transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
            <p className="text-[14px] text-[#4a5565] tracking-[-0.15px] leading-relaxed mb-6">
              Have you filed this case in the official IDR portal?
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 text-[13px] text-[#4a5565] border border-gray-200 rounded-md hover:bg-gray-50 transition-colors tracking-[-0.15px]"
              >
                Cancel
              </button>
              <button
                onClick={confirmFiling}
                className="px-4 py-2 bg-[#101828] text-white text-[13px] rounded-md hover:bg-[#2a2f3a] transition-colors tracking-[-0.15px] font-medium"
              >
                Yes, mark as filed
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