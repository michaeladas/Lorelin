import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Mail, Phone, Eye, ChevronDown, ChevronRight } from 'lucide-react';

// Mock data for the stacked bar chart
const chartData = [
  { date: 'Week 1', paid: 12, inProgress: 8, notContactable: 3, notYetContacted: 5 },
  { date: 'Week 2', paid: 15, inProgress: 10, notContactable: 2, notYetContacted: 7 },
  { date: 'Week 3', paid: 18, inProgress: 12, notContactable: 4, notYetContacted: 3 },
  { date: 'Week 4', paid: 22, inProgress: 9, notContactable: 3, notYetContacted: 6 },
  { date: 'Week 5', paid: 19, inProgress: 11, notContactable: 2, notYetContacted: 4 },
  { date: 'Week 6', paid: 24, inProgress: 13, notContactable: 5, notYetContacted: 8 },
  { date: 'Week 7', paid: 21, inProgress: 15, notContactable: 3, notYetContacted: 5 },
  { date: 'Week 8', paid: 26, inProgress: 10, notContactable: 4, notYetContacted: 6 },
  { date: 'Week 9', paid: 23, inProgress: 14, notContactable: 2, notYetContacted: 7 },
  { date: 'Week 10', paid: 28, inProgress: 12, notContactable: 3, notYetContacted: 4 },
  { date: 'Week 11', paid: 25, inProgress: 16, notContactable: 5, notYetContacted: 9 },
  { date: 'Week 12', paid: 30, inProgress: 11, notContactable: 2, notYetContacted: 5 },
  { date: 'Week 13', paid: 27, inProgress: 13, notContactable: 4, notYetContacted: 6 },
  { date: 'Week 14', paid: 32, inProgress: 15, notContactable: 3, notYetContacted: 8 },
  { date: 'Week 15', paid: 29, inProgress: 14, notContactable: 2, notYetContacted: 4 },
  { date: 'Week 16', paid: 35, inProgress: 12, notContactable: 5, notYetContacted: 7 },
];

// Mock data for the patient balances table
const mockPatients = [
  {
    id: '1',
    name: 'Anita Patel',
    dob: '02/14/1980',
    hasEmail: true,
    hasPhone: true,
    balance: 126.45,
    dateOfService: 'Oct 4, 2024',
    daysOutstanding: 64,
    status: 'In progress',
    lastActivity: 'Email viewed 5 hours ago',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    dob: '08/22/1975',
    hasEmail: true,
    hasPhone: false,
    balance: 450.00,
    dateOfService: 'Sep 15, 2024',
    daysOutstanding: 83,
    status: 'Not contactable',
    lastActivity: 'Email bounced 3 days ago',
  },
  {
    id: '3',
    name: 'Sarah Chen',
    dob: '11/30/1992',
    hasEmail: true,
    hasPhone: true,
    balance: 85.00,
    dateOfService: 'Nov 28, 2024',
    daysOutstanding: 9,
    status: 'Not yet contacted',
    lastActivity: '—',
  },
  {
    id: '4',
    name: 'James Williams',
    dob: '03/18/1988',
    hasEmail: true,
    hasPhone: true,
    balance: 0.00,
    dateOfService: 'Oct 20, 2024',
    daysOutstanding: 48,
    status: 'Paid',
    lastActivity: 'Paid online yesterday',
  },
  {
    id: '5',
    name: 'Emily Rodriguez',
    dob: '06/05/1990',
    hasEmail: false,
    hasPhone: false,
    balance: 275.80,
    dateOfService: 'Sep 28, 2024',
    daysOutstanding: 70,
    status: 'Not contactable',
    lastActivity: 'No contact info',
  },
  {
    id: '6',
    name: 'David Kim',
    dob: '12/12/1985',
    hasEmail: true,
    hasPhone: true,
    balance: 192.30,
    dateOfService: 'Nov 10, 2024',
    daysOutstanding: 27,
    status: 'In progress',
    lastActivity: 'Email sent 2 days ago',
  },
  {
    id: '7',
    name: 'Lisa Thompson',
    dob: '04/25/1978',
    hasEmail: true,
    hasPhone: true,
    balance: 0.00,
    dateOfService: 'Oct 8, 2024',
    daysOutstanding: 60,
    status: 'Paid',
    lastActivity: 'Paid by check 1 week ago',
  },
  {
    id: '8',
    name: 'Robert Martinez',
    dob: '09/14/1982',
    hasEmail: true,
    hasPhone: true,
    balance: 315.50,
    dateOfService: 'Sep 22, 2024',
    daysOutstanding: 76,
    status: 'In progress',
    lastActivity: 'SMS sent yesterday',
  },
];

const statusColors = {
  'Paid': '#10b981',
  'In progress': '#f59e0b',
  'Not contactable': '#ef4444',
  'Not yet contacted': '#9ca3af',
};

const chartColors = {
  paid: '#10b981',
  inProgress: '#f59e0b',
  notContactable: '#ef4444',
  notYetContacted: '#9ca3af',
};

interface PatientBalancesScreenProps {
  onOpenBill?: (id: string) => void;
  onBack?: () => void;
}

export function PatientBalancesScreen({ onOpenBill }: PatientBalancesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState('Last 4 months');
  const [campaign, setCampaign] = useState('All campaigns');
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    const baseClass = 'inline-flex items-center px-2 py-1 rounded-full text-[12px] leading-[16px] tracking-[-0.15px]';
    switch (status) {
      case 'Paid':
        return `${baseClass} bg-emerald-50 text-emerald-700`;
      case 'In progress':
        return `${baseClass} bg-amber-50 text-amber-700`;
      case 'Not contactable':
        return `${baseClass} bg-red-50 text-red-700`;
      case 'Not yet contacted':
        return `${baseClass} bg-gray-100 text-gray-600`;
      default:
        return baseClass;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold text-[14px] text-[#101828] mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-[12px]">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-[#4a5565]">{entry.name}:</span>
              <span className="font-semibold text-[#101828]">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="overflow-auto size-full bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-[60px] py-[32px] pb-[60px]">
        
        {/* Top Summary Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
            <div>
              <h2 className="text-[16px] font-semibold text-[#101828] tracking-[-0.02em] mb-1">
                Patient balances over time
              </h2>
              <p className="text-[12px] text-[#6a7282]">
                Account status by count across all campaigns
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Date Range Dropdown */}
              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="appearance-none px-3 py-1.5 pr-8 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 4 months</option>
                  <option>Last 12 months</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-[#6a7282] pointer-events-none" />
              </div>

              {/* Campaign Dropdown */}
              <div className="relative">
                <select
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="appearance-none px-3 py-1.5 pr-8 bg-white border border-gray-300 rounded-lg text-[13px] text-[#101828] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option>All campaigns</option>
                  <option>Q4 2024 Campaign</option>
                  <option>End of Year Campaign</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-[#6a7282] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="px-8 pb-6">
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData}
                  barSize={20}
                  barGap={2} 
                  margin={{ top: 20, right: 0, bottom: 0, left: -20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} strokeOpacity={0.5} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#99A1AF', fontSize: 10 }}
                    height={20}
                    interval={1}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#99A1AF', fontSize: 10 }} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                  <Bar dataKey="paid" stackId="a" fill="#047857" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="inProgress" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="notContactable" stackId="a" fill="#6b7280" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="notYetContacted" stackId="a" fill="#d1d5db" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-sm bg-[#047857]" />
                <span className="text-[11px] text-[#4a5565] font-medium">Paid</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-sm bg-[#10b981]" />
                <span className="text-[11px] text-[#4a5565] font-medium">In progress</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-sm bg-[#6b7280]" />
                <span className="text-[11px] text-[#4a5565] font-medium">Not contactable</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-sm bg-[#d1d5db]" />
                <span className="text-[11px] text-[#4a5565] font-medium">Not yet contacted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Table Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-[16px] font-semibold text-[#101828] tracking-[-0.02em] mb-1">
                Patient balances
              </h2>
              <p className="text-[12px] text-[#6a7282]">
                All outstanding patient account balances
              </p>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-200">
            {/* Search */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#99A1AF] uppercase tracking-wider">Search</span>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#99A1AF]" />
                <input
                  type="text"
                  placeholder="Patient name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1 border border-gray-200 rounded-md text-[12px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[180px]"
                />
              </div>
            </div>

            {/* Status filter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#99A1AF] uppercase tracking-wider">Status</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setStatusFilter('All')}
                  className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all border ${
                    statusFilter === 'All'
                      ? 'bg-[#101828] text-white border-[#101828]'
                      : 'text-[#6a7282] border-gray-200 hover:text-[#101828] hover:bg-gray-50'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('Paid')}
                  className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all border ${
                    statusFilter === 'Paid'
                      ? 'bg-[#101828] text-white border-[#101828]'
                      : 'text-[#6a7282] border-gray-200 hover:text-[#101828] hover:bg-gray-50'
                  }`}
                >
                  Paid
                </button>
                <button
                  onClick={() => setStatusFilter('In progress')}
                  className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all border ${
                    statusFilter === 'In progress'
                      ? 'bg-[#101828] text-white border-[#101828]'
                      : 'text-[#6a7282] border-gray-200 hover:text-[#101828] hover:bg-gray-50'
                  }`}
                >
                  In progress
                </button>
                <button
                  onClick={() => setStatusFilter('Not contactable')}
                  className={`px-3 py-1 rounded-md text-[12px] tracking-[-0.15px] transition-all border ${
                    statusFilter === 'Not contactable'
                      ? 'bg-[#101828] text-white border-[#101828]'
                      : 'text-[#6a7282] border-gray-200 hover:text-[#101828] hover:bg-gray-50'
                  }`}
                >
                  Not contactable
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2.5 text-left">
                    <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Patient</span>
                  </th>
                  <th className="px-3 py-2.5 text-left">
                    <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Contact</span>
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Balance</span>
                  </th>
                  <th className="px-3 py-2.5 text-left">
                    <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Date of Service</span>
                  </th>
                  <th className="px-3 py-2.5 text-left">
                    <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Days Out</span>
                  </th>
                  <th className="px-3 py-2.5 text-left">
                    <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Status</span>
                  </th>
                  <th className="px-3 py-2.5 text-left">
                    <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Last Activity</span>
                  </th>
                  <th className="px-3 py-2.5 text-right">
                    <span className="text-[11px] text-[#6a7282] tracking-[0.05em] uppercase">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    onClick={() => {
                      if (onOpenBill) {
                        onOpenBill(patient.id);
                      }
                    }}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                    <td className="px-3 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-medium text-[#101828] tracking-[-0.15px]">
                          {patient.name}
                        </span>
                        <span className="text-[12px] text-[#6a7282] tracking-[-0.15px]">
                          DOB {patient.dob}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        {patient.hasEmail && <Mail className="size-3.5 text-[#6a7282]" />}
                        {patient.hasPhone && <Phone className="size-3.5 text-[#6a7282]" />}
                        {!patient.hasEmail && !patient.hasPhone && (
                          <span className="text-[11px] text-[#99A1AF]">None</span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className={`text-[13px] font-medium tracking-[-0.15px] ${
                        patient.balance === 0 ? 'text-emerald-700' : 'text-[#101828]'
                      }`}>
                        ${patient.balance.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-[13px] text-[#4a5565] tracking-[-0.15px]">
                        {patient.dateOfService}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-[13px] text-[#4a5565] tracking-[-0.15px]">
                        {patient.daysOutstanding}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-[11px] font-medium border ${
                        patient.status === 'Paid' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : patient.status === 'In progress'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : patient.status === 'Not contactable'
                          ? 'bg-gray-100 text-gray-700 border-gray-300'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-[12px] text-[#6a7282] tracking-[-0.15px]">
                        {patient.lastActivity}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <button className="text-[12px] text-[#101828] hover:text-[#1f2937] font-medium group-hover:underline flex items-center gap-1 ml-auto">
                        View bill
                        <ChevronRight className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}