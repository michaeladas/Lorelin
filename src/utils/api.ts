import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-e8ce19db`;

async function apiCall(endpoint: string, method: string = 'GET', body?: any) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API call failed: ${response.status} ${errorText}`);
  }

  return response.json();
}

export interface Visit {
  id: string;
  patient_name: string;
  patient_age: number;
  visit_date: string;
  visit_time: string;
  provider: string;
  payer: string;
  visit_reason: string;
  status: 'to-record' | 'transcribing' | 'to-review' | 'approved' | 'sent';
  charge_estimate: number;
  member_id?: string;
  group_number?: string;
  pre_visit_step?: string;
  pre_visit_risk?: 'ready' | 'at-risk' | 'blocked';
  created_at?: string;
  updated_at?: string;
}

// Diagnose database connectivity
export async function diagnoseDatabase() {
  return apiCall('/diagnose');
}

// Initialize visits table with sample data
export async function initVisits() {
  return apiCall('/init-visits', 'POST');
}

// Get all visits
export async function getVisits() {
  return apiCall('/visits');
}

// Get today's visits
export async function getTodayVisits() {
  return apiCall('/visits/today');
}

// Get pre-visit items
export async function getPreVisitItems(days: number | string = 7) {
  return apiCall(`/visits/pre-visit?days=${days}`);
}

// Update visit
export async function updateVisit(id: string, updates: Partial<Visit>) {
  return apiCall(`/visits/${id}`, 'PUT', updates);
}

// ============================================================================
// DISPUTES API
// ============================================================================

export interface Dispute {
  id: string;
  created_at?: string;
  updated_at?: string;
  patient_name: string;
  claim_id: string;
  procedure_name: string;
  procedure_code: string;
  payer_name: string;
  plan_type?: string | null;
  billed: number;
  paid: number;
  potential: number;
  contract_expected?: number | null;
  contract_gap?: number | null;
  type: string;
  path: string;
  issue?: string | null;
  status: string;
  next_action: string;
  deadline_date?: string | null;
  deadline_label?: string | null;
  path_tooltip?: string | null;
  is_urgent: boolean;
  assigned_to?: string | null;
  notes?: string | null;
}

export async function getDisputes() {
  return apiCall('/disputes');
}

export async function getDispute(id: string) {
  return apiCall(`/disputes/${id}`);
}

export async function updateDispute(id: string, data: Partial<Dispute>) {
  return apiCall(`/disputes/${id}`, 'PUT', data);
}

export async function initDisputes() {
  return apiCall('/init-disputes', 'POST');
}

// ============================================================================
// WORK ITEMS API
// ============================================================================

export interface WorkItem {
  id: string;
  created_at?: string;
  updated_at?: string;
  type: 'visit' | 'claim';
  step: 'to-record' | 'to-review' | 'ready-to-send' | 'flagged';
  patient_name: string;
  description: string;
  provider: string;
  payer: string;
  value: number;
  value_label: string;
  deadline?: string | null;
  deadline_label?: string | null;
  urgency: 'high' | 'medium' | 'low';
  visit_id?: string | null;
  dispute_id?: string | null;
  completed: boolean;
  assigned_to?: string | null;
}

export async function getWorkItems(typeFilter?: string, stepFilter?: string) {
  let url = '/work-items';
  const params = new URLSearchParams();
  if (typeFilter) params.append('type', typeFilter);
  if (stepFilter) params.append('step', stepFilter);
  const queryString = params.toString();
  if (queryString) url += `?${queryString}`;
  return apiCall(url);
}

export async function updateWorkItem(id: string, data: Partial<WorkItem>) {
  return apiCall(`/work-items/${id}`, 'PUT', data);
}

export async function initWorkItems() {
  return apiCall('/init-work-items', 'POST');
}