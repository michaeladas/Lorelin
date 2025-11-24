import { ChevronDown, ChevronRight } from 'lucide-react';

interface Dispute {
  id: string;
  patient: {
    name: string;
    claimId: string;
  };
  procedure: {
    name: string;
    code: string;
  };
  payer: {
    name: string;
    planType?: string;
  };
  billed: number;
  paid: number;
  potential: number;
  contractExpected?: number;
  contractGap?: number;
  type: 'OON - IDR' | 'OON - Negotiation' | 'INN - Denial appeal' | 'INN - Underpayment';
  path: 'Federal IDR' | 'State IDR' | 'Appeal only';
  issue: string | null;
  status: 'New' | 'In negotiation' | 'Ready for IDR' | 'IDR filed' | 'Appeal drafted' | 'Appeal submitted' | 'Closed';
  nextAction: 'Generate negotiation letter' | 'Draft appeal' | 'Generate IDR packet' | 'Review result' | 'No action' | 'Review & ignore';
  deadline: {
    date: string;
    label: string;
  };
  pathTooltip: string;
  isUrgent?: boolean;
}

interface DisputesTableProps {
  disputes: Dispute[];
  onOpenCase: (id: string) => void;
}

export function DisputesTable({ disputes, onOpenCase }: DisputesTableProps) {
  const getStatusDot = (status: string) => {
    if (status === 'Ready for IDR') return 'bg-orange-500';
    if (status === 'In negotiation') return 'bg-amber-500';
    if (status === 'New') return 'bg-slate-400';
    return 'bg-slate-300';
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="border-b border-gray-200">
            <th className="px-3 py-2.5 text-left bg-white">
              <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Patient</span>
            </th>
            <th className="px-3 py-2.5 text-left bg-white">
              <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Procedure</span>
            </th>
            <th className="px-3 py-2.5 text-left bg-white">
              <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Payer</span>
            </th>
            <th className="px-3 py-2.5 text-left bg-white">
              <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Dispute</span>
            </th>
            <th className="px-3 py-2.5 text-right bg-white">
              <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Value</span>
            </th>
            <th className="px-3 py-2.5 text-left cursor-pointer hover:text-[#101828] transition-colors group bg-white">
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase group-hover:text-[#101828]">Deadline</span>
                <ChevronDown className="size-3 text-[#6a7282]" />
              </div>
            </th>
            <th className="px-3 py-2.5 text-right bg-white">
              <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((dispute, index) => (
            <tr
              key={dispute.id}
              className={`border-b border-gray-100 hover:bg-blue-50/20 cursor-pointer transition-colors group ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
              }`}
              onClick={() => onOpenCase(dispute.id)}
            >
              {/* Patient */}
              <td className="px-3 py-2.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{dispute.patient.name}</span>
                  <span className="text-[12px] text-[#6a7282]">{dispute.patient.claimId.replace('Claim ', '')}</span>
                </div>
              </td>

              {/* Procedure */}
              <td className="px-3 py-2.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{dispute.procedure.name}</span>
                  <span className="text-[12px] text-[#6a7282]">{dispute.procedure.code}</span>
                </div>
              </td>

              {/* Payer */}
              <td className="px-3 py-2.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px]">{dispute.payer.name}</span>
                  {dispute.payer.planType && (
                    <span className="text-[11px] text-[#6a7282]">
                      {dispute.payer.planType}
                    </span>
                  )}
                </div>
              </td>

              {/* Dispute (combines Type + Path + Status) */}
              <td className="px-3 py-2.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] text-[#101828] tracking-[-0.15px] font-medium">{dispute.type}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#6a7282]">{dispute.path}</span>
                    <span className="text-[#d1d5db]">·</span>
                    <div className="flex items-center gap-1">
                      <div className={`size-1.5 rounded-full ${getStatusDot(dispute.status)}`} />
                      <span className="text-[11px] text-[#6a7282]">{dispute.status}</span>
                    </div>
                  </div>
                </div>
              </td>

              {/* Value (combines Potential + Billed/Paid or Contract data) */}
              <td className="px-3 py-2.5 text-right">
                <div className="flex flex-col gap-0.5 items-end">
                  {dispute.contractGap ? (
                    <>
                      <span className="text-[15px] font-semibold text-emerald-700 tracking-[-0.2px]">
                        +${dispute.contractGap.toLocaleString()} (contract gap)
                      </span>
                      <span className="text-[11px] text-[#99A1AF]">
                        Contract ${dispute.contractExpected?.toLocaleString()} · Paid ${dispute.paid.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[15px] font-semibold text-emerald-700 tracking-[-0.2px]">
                        +${dispute.potential.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-[#99A1AF]">
                        Billed ${dispute.billed.toLocaleString()} · Paid ${dispute.paid.toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
              </td>

              {/* Deadline */}
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  {dispute.isUrgent && (
                    <div className="size-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  )}
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-[13px] tracking-[-0.15px] ${dispute.isUrgent ? 'text-[#101828] font-medium' : 'text-[#4a5565]'}`}>
                      {dispute.deadline.date}
                    </span>
                    <span className="text-[11px] text-[#99A1AF]">{dispute.deadline.label}</span>
                  </div>
                </div>
              </td>

              {/* Action */}
              <td className="px-3 py-2.5 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCase(dispute.id);
                  }}
                  className="inline-flex items-center gap-1 text-[13px] text-[#4a5565] hover:text-[#101828] transition-colors tracking-[-0.15px]"
                >
                  <span>Open</span>
                  <ChevronRight className="size-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}