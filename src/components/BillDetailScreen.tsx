import { useState } from 'react';
import { ArrowLeft, Mail, Phone, FileText, CheckCircle2, Clock, AlertCircle, MessageSquare } from 'lucide-react';

// Mock bill data
const billData = {
  id: '1',
  patient: {
    name: 'Anita Patel',
    dob: '02/14/1980',
    id: 'PT-20481',
    address: {
      line1: '742 Evergreen Terrace',
      line2: 'Apt 3B',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
    },
    email: 'anita.patel@email.com',
    phone: '(555) 234-5678',
  },
  bill: {
    totalAmount: 126.45,
    dateOfService: 'Oct 4, 2024',
    daysOutstanding: 64,
    provider: 'Dr. Sarah Chen',
    serviceDescription: 'Annual physical exam with lab work',
    importedDate: 'Oct 10, 2024',
  },
  insurance: {
    payer: 'Blue Cross PPO',
    lastResponse: 'Sep 28, 2024',
  },
  status: 'In progress', // Can be: 'Paid', 'In progress', 'Not contactable', 'Not yet contacted'
  paymentHistory: [
    { date: 'Nov 15, 2024', type: 'Payment', amount: -50.00 },
    { date: 'Oct 20, 2024', type: 'Adjustment', amount: -23.55 },
  ],
  communications: [
    { date: 'Dec 1, 2024', type: 'email', event: 'Reminder sent via email', status: 'opened' },
    { date: 'Nov 22, 2024', type: 'sms', event: 'Reminder sent via SMS', status: 'delivered' },
    { date: 'Nov 8, 2024', type: 'email', event: 'Reminder sent via email', status: 'clicked' },
    { date: 'Oct 25, 2024', type: 'email', event: 'Initial reminder sent', status: 'opened' },
  ],
  nextReminder: {
    date: 'Dec 8, 2024',
    channel: 'Email',
  },
};

function InfoCard({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-5 ${className || ''}`}>
      <h3 className="text-[14px] font-semibold text-[#101828] tracking-[-0.15px] mb-4">{title}</h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value, subtext }: { label: string; value: string; subtext?: string }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">{label}</span>
      <div className="flex flex-col items-end gap-0.5">
        <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{value}</span>
        {subtext && <span className="text-[12px] text-[#99A1AF]">{subtext}</span>}
      </div>
    </div>
  );
}

interface BillDetailScreenProps {
  onBack: () => void;
}

export function BillDetailScreen({ onBack }: BillDetailScreenProps) {
  const [status, setStatus] = useState(billData.status);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handlePrimaryAction = () => {
    if (status === 'Paid') {
      setStatus('In progress');
      setToastMessage('Bill marked as unpaid');
    } else if (status === 'In progress') {
      setToastMessage('Manual reminder sent');
    } else if (status === 'Not contactable') {
      setToastMessage('Contact info update dialog would open');
    } else if (status === 'Not yet contacted') {
      setStatus('In progress');
      setToastMessage('Reminder series started');
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Paid') return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (status === 'In progress') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (status === 'Not contactable') return 'bg-gray-100 text-gray-700 border-gray-300';
    if (status === 'Not yet contacted') return 'bg-gray-50 text-gray-600 border-gray-200';
    return 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const getPrimaryActionLabel = () => {
    if (status === 'Paid') return 'Mark as unpaid';
    if (status === 'In progress') return 'Send manual reminder';
    if (status === 'Not contactable') return 'Add contact info';
    if (status === 'Not yet contacted') return 'Start reminders';
    return 'Action';
  };

  const getAmountLabel = () => {
    if (status === 'Paid') return 'Paid';
    return 'Outstanding';
  };

  const getSubtext = () => {
    if (status === 'Paid') return 'Paid on Nov 20, 2024 via Online card';
    if (status === 'In progress') return `Reminders active · Last reminder sent Dec 1, 2024`;
    if (status === 'Not contactable') return 'No valid email or mobile phone on file';
    if (status === 'Not yet contacted') return `Imported on ${billData.bill.importedDate} · No reminders sent yet`;
    return '';
  };

  const getStatusCallout = () => {
    if (status === 'Not yet contacted') {
      return (
        <div className="flex items-start gap-2 p-3 bg-blue-50/50 border border-blue-200/50 rounded-md">
          <AlertCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[12px] text-blue-700 tracking-[-0.15px]">
              This balance has not been contacted via Lorelin yet.
            </p>
          </div>
        </div>
      );
    }
    if (status === 'In progress') {
      return (
        <div className="flex items-start gap-2 p-3 bg-amber-50/50 border border-amber-200/50 rounded-md">
          <Clock className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[12px] text-amber-700 tracking-[-0.15px]">
              Balance is {billData.bill.daysOutstanding} days old.
            </p>
          </div>
        </div>
      );
    }
    return null;
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
                <span>Patient balances</span>
              </button>
              <h1 className="text-[26px] font-semibold text-[#101828] tracking-[-0.4px] leading-tight">
                Patient bill: {billData.patient.name}
              </h1>
              <p className="text-[13px] text-[#6a7282] tracking-[-0.15px]">
                DOS {billData.bill.dateOfService} · {billData.bill.provider}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] border ${getStatusColor(status)}`}>
                {status}
              </span>
              <button 
                onClick={handlePrimaryAction}
                className="px-4 py-2 bg-[#101828] text-white text-[13px] rounded-md hover:bg-[#2a2f3a] transition-colors tracking-[-0.15px] font-medium"
              >
                {getPrimaryActionLabel()}
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-6 w-full flex-1">
          {/* Left Column - Bill & Payments */}
          <div className="flex-[0_0_60%] flex flex-col gap-4">
            
            {/* Summary Card */}
            <InfoCard title="Summary">
              <div className="space-y-4">
                {/* Primary Amount */}
                <div className="pb-3 border-b border-gray-200">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[11px] text-[#99A1AF] uppercase tracking-wider">{getAmountLabel()}</span>
                    <span className={`text-[24px] font-semibold tracking-[-0.3px] ${
                      status === 'Paid' ? 'text-emerald-700' : 'text-[#101828]'
                    }`}>
                      ${billData.bill.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#6a7282] tracking-[-0.15px]">
                    {getSubtext()}
                  </p>
                </div>

                {/* Patient Basics */}
                <div className="space-y-0">
                  <InfoRow 
                    label="Patient name" 
                    value={billData.patient.name}
                  />
                  <InfoRow 
                    label="DOB" 
                    value={billData.patient.dob}
                  />
                  <InfoRow 
                    label="Patient ID" 
                    value={billData.patient.id}
                  />
                </div>

                {/* Insurance Info */}
                <div className="pt-3 border-t border-gray-200">
                  <InfoRow 
                    label="Payer" 
                    value={billData.insurance.payer}
                  />
                  <InfoRow 
                    label="Last insurance response" 
                    value={billData.insurance.lastResponse}
                  />
                </div>

                {/* Quick Actions */}
                <div className="pt-3 border-t border-gray-200 flex items-center gap-2">
                  <button className="text-[12px] text-blue-600 hover:text-blue-700 tracking-[-0.15px]">
                    View in EHR
                  </button>
                  <span className="text-gray-300">·</span>
                  <button className="text-[12px] text-blue-600 hover:text-blue-700 tracking-[-0.15px]">
                    Download statement
                  </button>
                </div>
              </div>
            </InfoCard>

            {/* Bill Details Card */}
            <InfoCard title="Bill details">
              <div className="space-y-4">
                <div className="space-y-0">
                  <InfoRow 
                    label="Total amount" 
                    value={`$${billData.bill.totalAmount.toFixed(2)}`}
                  />
                  <InfoRow 
                    label="Date of service" 
                    value={billData.bill.dateOfService}
                  />
                  <InfoRow 
                    label="Provider" 
                    value={billData.bill.provider}
                  />
                  <InfoRow 
                    label="Days outstanding" 
                    value={`${billData.bill.daysOutstanding} days`}
                  />
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="text-[13px] text-[#4a5565] leading-relaxed mb-1">
                    <span className="font-medium text-[#101828]">Service:</span> {billData.bill.serviceDescription}
                  </div>
                  <p className="text-[12px] text-[#6a7282] leading-relaxed mt-2">
                    Insurance has processed this visit and assigned this amount to patient responsibility.
                  </p>
                </div>

                {/* Status-specific callout */}
                {getStatusCallout() && (
                  <div className="pt-3 border-t border-gray-200">
                    {getStatusCallout()}
                  </div>
                )}
              </div>
            </InfoCard>

            {/* Payment History Card */}
            <InfoCard title="Payment history">
              {billData.paymentHistory.length === 0 ? (
                <div className="py-4 text-center text-[13px] text-[#6a7282]">
                  No payments recorded yet.
                </div>
              ) : (
                <div className="space-y-0">
                  {billData.paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{payment.type}</span>
                        <span className="text-[11px] text-[#6a7282]">{payment.date}</span>
                      </div>
                      <span className={`text-[13px] font-medium tracking-[-0.15px] ${
                        payment.amount < 0 ? 'text-emerald-700' : 'text-[#101828]'
                      }`}>
                        {payment.amount < 0 ? '-' : '+'}${Math.abs(payment.amount).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {status === 'Paid' && (
                    <div className="pt-3 mt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-[#101828] tracking-[-0.15px]">Remaining balance</span>
                        <span className="text-[15px] font-semibold text-emerald-700 tracking-[-0.2px]">$0.00</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </InfoCard>
          </div>

          {/* Right Column - Patient Info & Communications */}
          <div className="flex-1 flex flex-col gap-4">
            
            {/* Patient & Contact Info Card */}
            <InfoCard title="Patient & contact">
              <div className="space-y-4">
                {/* Warning for Not contactable status */}
                {status === 'Not contactable' && (
                  <div className="flex items-start gap-2 p-3 bg-red-50/50 border border-red-200/50 rounded-md mb-3">
                    <AlertCircle className="size-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-[12px] text-red-700 font-medium tracking-[-0.15px] mb-2">
                        No email or mobile phone available – we cannot send digital reminders.
                      </p>
                      <button 
                        onClick={handlePrimaryAction}
                        className="px-3 py-1.5 bg-[#101828] text-white text-[12px] rounded-md hover:bg-[#2a2f3a] transition-colors tracking-[-0.15px]"
                      >
                        Update contact details
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-0">
                  <InfoRow 
                    label="Name" 
                    value={billData.patient.name}
                  />
                  <div className="flex items-start justify-between py-2 border-b border-gray-100">
                    <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">Address</span>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-[13px] text-[#101828] tracking-[-0.15px] text-right">
                        {billData.patient.address.line1}
                      </span>
                      {billData.patient.address.line2 && (
                        <span className="text-[13px] text-[#101828] tracking-[-0.15px]">
                          {billData.patient.address.line2}
                        </span>
                      )}
                      <span className="text-[13px] text-[#101828] tracking-[-0.15px]">
                        {billData.patient.address.city}, {billData.patient.address.state} {billData.patient.address.zip}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between py-2 border-b border-gray-100">
                    <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">Email</span>
                    <div className="flex items-center gap-1.5">
                      {billData.patient.email ? (
                        <>
                          <Mail className="size-3.5 text-[#6a7282]" />
                          <span className="text-[13px] text-[#101828] tracking-[-0.15px]">
                            {billData.patient.email}
                          </span>
                        </>
                      ) : (
                        <span className="text-[13px] text-[#99A1AF] tracking-[-0.15px]">No email on file</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start justify-between py-2">
                    <span className="text-[13px] text-[#6a7282] tracking-[-0.15px]">Mobile</span>
                    <div className="flex items-center gap-1.5">
                      {billData.patient.phone ? (
                        <>
                          <Phone className="size-3.5 text-[#6a7282]" />
                          <span className="text-[13px] text-[#101828] tracking-[-0.15px]">
                            {billData.patient.phone}
                          </span>
                        </>
                      ) : (
                        <span className="text-[13px] text-[#99A1AF] tracking-[-0.15px]">No mobile on file</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>

            {/* Communications & Activity Card */}
            <InfoCard title="Communications & activity" className="flex-1">
              <div className="space-y-4">
                {/* Status-specific content */}
                {status === 'Paid' && (
                  <>
                    {/* Timeline */}
                    <div className="space-y-3">
                      {billData.communications.map((comm, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className="size-7 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                              {comm.type === 'email' ? (
                                <Mail className="size-3.5 text-gray-500" />
                              ) : (
                                <MessageSquare className="size-3.5 text-gray-500" />
                              )}
                            </div>
                            {index < billData.communications.length - 1 && (
                              <div className="w-0.5 h-6 mt-1 bg-gray-200" />
                            )}
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="text-[12px] text-[#6a7282] tracking-[-0.15px]">{comm.date}</div>
                            <div className="text-[13px] text-[#4a5565] tracking-[-0.15px]">{comm.event}</div>
                            {comm.status && (
                              <div className="text-[11px] text-[#99A1AF] mt-0.5">
                                {comm.status === 'opened' && '✓ Opened'}
                                {comm.status === 'clicked' && '✓ Clicked link'}
                                {comm.status === 'delivered' && '✓ Delivered'}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="flex items-start gap-3">
                        <div className="size-7 rounded-full border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center">
                          <CheckCircle2 className="size-4 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-[12px] text-[#6a7282] tracking-[-0.15px]">Nov 20, 2024</div>
                          <div className="text-[13px] text-[#101828] font-medium tracking-[-0.15px]">Payment completed</div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-[12px] text-[#6a7282] tracking-[-0.15px]">
                        No future reminders — account is paid.
                      </p>
                    </div>
                  </>
                )}

                {status === 'In progress' && (
                  <>
                    {/* Next scheduled reminder */}
                    <div className="flex items-start gap-2 p-3 bg-blue-50/50 border border-blue-200/50 rounded-md">
                      <Clock className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[12px] text-blue-700 tracking-[-0.15px] mb-2">
                          Next reminder scheduled: {billData.nextReminder.date} · {billData.nextReminder.channel}
                        </p>
                        <div className="flex items-center gap-2">
                          <button className="text-[11px] text-blue-700 hover:text-blue-800 tracking-[-0.15px] underline">
                            Send now
                          </button>
                          <span className="text-blue-300">·</span>
                          <button className="text-[11px] text-blue-700 hover:text-blue-800 tracking-[-0.15px] underline">
                            Pause series
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-3">
                      {billData.communications.map((comm, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div className="size-7 rounded-full border-2 border-emerald-200 bg-emerald-50 flex items-center justify-center">
                              {comm.type === 'email' ? (
                                <Mail className="size-3.5 text-emerald-600" />
                              ) : (
                                <MessageSquare className="size-3.5 text-emerald-600" />
                              )}
                            </div>
                            {index < billData.communications.length - 1 && (
                              <div className="w-0.5 h-6 mt-1 bg-emerald-200" />
                            )}
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="text-[12px] text-[#6a7282] tracking-[-0.15px]">{comm.date}</div>
                            <div className="text-[13px] text-[#4a5565] tracking-[-0.15px]">{comm.event}</div>
                            {comm.status && (
                              <div className="text-[11px] text-[#99A1AF] mt-0.5">
                                {comm.status === 'opened' && '✓ Opened'}
                                {comm.status === 'clicked' && '✓ Clicked link'}
                                {comm.status === 'delivered' && '✓ Delivered'}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {status === 'Not contactable' && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <AlertCircle className="size-6 text-gray-400" />
                    </div>
                    <p className="text-[13px] text-[#101828] font-medium tracking-[-0.15px] mb-1">
                      No digital reminders sent — patient not contactable.
                    </p>
                    <p className="text-[12px] text-[#6a7282] tracking-[-0.15px]">
                      Add email or mobile to enable reminders.
                    </p>
                  </div>
                )}

                {status === 'Not yet contacted' && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                      <FileText className="size-6 text-blue-600" />
                    </div>
                    <p className="text-[13px] text-[#101828] font-medium tracking-[-0.15px] mb-1">
                      No reminders sent yet for this bill.
                    </p>
                    <p className="text-[12px] text-[#6a7282] tracking-[-0.15px] mb-4">
                      Start the reminder series to begin collections.
                    </p>
                    <button 
                      onClick={handlePrimaryAction}
                      className="px-4 py-2 bg-[#101828] text-white text-[13px] rounded-md hover:bg-[#2a2f3a] transition-colors tracking-[-0.15px] font-medium"
                    >
                      Start reminder series
                    </button>
                    <button className="text-[12px] text-blue-600 hover:text-blue-700 tracking-[-0.15px] mt-3">
                      Send one-time reminder only
                    </button>
                  </div>
                )}

                {/* Internal Notes */}
                <div className="pt-3 border-t border-gray-200">
                  <label className="block text-[12px] text-[#6a7282] tracking-[-0.15px] mb-2">
                    Internal notes
                  </label>
                  <div className="flex gap-2">
                    <textarea
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={2}
                      placeholder="Add a note about this patient..."
                    />
                  </div>
                  <button className="mt-2 px-3 py-1.5 border border-gray-200 text-[#4a5565] text-[12px] rounded-md hover:bg-gray-50 transition-colors tracking-[-0.15px]">
                    Add note
                  </button>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </div>

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