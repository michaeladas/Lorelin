-- ============================================================================
-- CREATE ALL BASE TABLES FOR LORELIN
-- This script creates ALL the tables your backend expects to exist
-- Run this FIRST before any migration scripts
-- ============================================================================

-- This creates: visits, authorizations, eligibilities, work_items, disputes
-- These are the tables your app currently uses

-- ============================================================================
-- VISITS TABLE (The main table - was missing!)
-- ============================================================================

CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  patient_age INTEGER,
  visit_date DATE NOT NULL,
  visit_time TEXT NOT NULL,
  provider TEXT NOT NULL,
  payer TEXT NOT NULL,
  visit_reason TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('to-record', 'transcribing', 'to-review', 'approved', 'sent', 'paid')),
  charge_estimate INTEGER NOT NULL,
  member_id TEXT,
  group_number TEXT,
  pre_visit_step TEXT,
  pre_visit_risk TEXT CHECK (pre_visit_risk IN ('ready', 'at-risk', 'blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_visits_date ON visits(visit_date);
CREATE INDEX IF NOT EXISTS idx_visits_status ON visits(status);
CREATE INDEX IF NOT EXISTS idx_visits_pre_visit_risk ON visits(pre_visit_risk);

-- ============================================================================
-- AUTHORIZATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS authorizations (
  id TEXT PRIMARY KEY,
  visit_id TEXT,
  
  -- Patient information
  patient_name TEXT NOT NULL,
  patient_id TEXT,
  patient_dob TEXT,
  
  -- Provider and payer info
  provider TEXT,
  payer TEXT NOT NULL,
  plan_id TEXT,
  
  -- Visit details
  visit_date TEXT,
  visit_time TEXT,
  visit_reason TEXT,
  procedure_type TEXT,
  location TEXT,
  
  -- Authorization status and details
  status TEXT NOT NULL DEFAULT 'needed',
  clinical_justification TEXT,
  cpt_codes JSONB DEFAULT '[]'::jsonb,
  icd10_codes JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  
  -- Submission tracking
  submitted_date TIMESTAMPTZ,
  submitted_by TEXT,
  submission_method TEXT,
  
  -- Decision tracking
  pa_id TEXT,
  valid_from TEXT,
  valid_to TEXT,
  approved_date TIMESTAMPTZ,
  approved_by TEXT,
  denied_date TIMESTAMPTZ,
  denied_reason TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_authorizations_visit_id ON authorizations(visit_id);
CREATE INDEX IF NOT EXISTS idx_authorizations_status ON authorizations(status);

-- ============================================================================
-- ELIGIBILITIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS eligibilities (
  id TEXT PRIMARY KEY,
  visit_id TEXT,
  
  -- Patient information
  patient_name TEXT NOT NULL,
  patient_id TEXT,
  patient_dob TEXT,
  patient_sex TEXT,
  
  -- Provider and payer info
  provider TEXT,
  payer TEXT NOT NULL,
  plan_id TEXT,
  member_id TEXT,
  group_number TEXT,
  
  -- Visit details
  visit_date TEXT,
  visit_time TEXT,
  visit_reason TEXT,
  service_type TEXT,
  location TEXT,
  benefit_type TEXT DEFAULT 'Medical benefits',
  
  -- Eligibility status
  status TEXT NOT NULL DEFAULT 'pending',
  lorelin_available BOOLEAN DEFAULT true,
  
  -- Current result
  current_result JSONB,
  
  -- History of checks
  history JSONB DEFAULT '[]'::jsonb,
  
  -- Notes
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_eligibilities_visit_id ON eligibilities(visit_id);
CREATE INDEX IF NOT EXISTS idx_eligibilities_status ON eligibilities(status);

-- ============================================================================
-- WORK ITEMS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS work_items (
  id SERIAL PRIMARY KEY,
  
  -- Work item type and step
  type TEXT NOT NULL, -- visit, claim
  step TEXT NOT NULL, -- to-record, to-review, ready-to-send, flagged
  
  -- Details
  patient_name TEXT NOT NULL,
  description TEXT NOT NULL,
  provider TEXT,
  payer TEXT,
  
  -- Value
  value NUMERIC,
  value_label TEXT,
  
  -- Deadline
  deadline TEXT,
  deadline_label TEXT,
  
  -- Priority
  urgency TEXT, -- high, medium, low
  
  -- References
  visit_id TEXT,
  dispute_id TEXT,
  
  -- Status
  completed BOOLEAN DEFAULT false,
  assigned_to TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_work_items_type ON work_items(type);
CREATE INDEX IF NOT EXISTS idx_work_items_step ON work_items(step);
CREATE INDEX IF NOT EXISTS idx_work_items_completed ON work_items(completed);

-- ============================================================================
-- DISPUTES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS disputes (
  id SERIAL PRIMARY KEY,
  
  -- Patient and claim info
  patient_name TEXT NOT NULL,
  claim_id TEXT NOT NULL,
  procedure_name TEXT NOT NULL,
  procedure_code TEXT,
  
  -- Payer info
  payer TEXT NOT NULL, -- Changed from payer_name to match backend usage
  plan_type TEXT,
  
  -- Financial details
  billed NUMERIC NOT NULL,
  paid NUMERIC NOT NULL,
  potential NUMERIC,
  contract_expected NUMERIC,
  contract_gap NUMERIC,
  
  -- Dispute classification
  type TEXT NOT NULL, -- OON - IDR, OON - Negotiation, INN - Denial appeal, INN - Underpayment
  path TEXT, -- Federal IDR, State IDR, Appeal only
  issue TEXT,
  
  -- Status and actions
  status TEXT NOT NULL,
  next_action TEXT,
  
  -- Deadlines
  deadline_date TEXT,
  deadline_label TEXT,
  
  -- Additional info
  path_tooltip TEXT,
  is_urgent BOOLEAN DEFAULT false,
  assigned_to TEXT,
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);
CREATE INDEX IF NOT EXISTS idx_disputes_deadline ON disputes(deadline_date);
CREATE INDEX IF NOT EXISTS idx_disputes_urgent ON disputes(is_urgent);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (avoid conflicts)
DROP POLICY IF EXISTS "Allow all operations for service role" ON visits;
DROP POLICY IF EXISTS "Allow all operations on visits" ON visits;
DROP POLICY IF EXISTS "Allow all operations for service role" ON authorizations;
DROP POLICY IF EXISTS "Allow all operations for service role" ON eligibilities;
DROP POLICY IF EXISTS "Allow all operations for service role" ON work_items;
DROP POLICY IF EXISTS "Allow all operations for service role" ON disputes;

-- Create permissive policies
CREATE POLICY "Allow all operations for service role" ON visits
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role" ON authorizations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role" ON eligibilities
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role" ON work_items
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role" ON disputes
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_visits_updated_at ON visits;
CREATE TRIGGER update_visits_updated_at
  BEFORE UPDATE ON visits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Exec SQL function (for bypassing PostgREST cache)
CREATE OR REPLACE FUNCTION exec_sql(query TEXT)
RETURNS SETOF JSON AS $$
BEGIN
  RETURN QUERY EXECUTE 'SELECT row_to_json(t) FROM (' || query || ') t';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';

-- ============================================================================
-- SUMMARY
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '============================================';
  RAISE NOTICE 'BASE TABLES CREATED SUCCESSFULLY';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Tables created:';
  RAISE NOTICE '✅ visits';
  RAISE NOTICE '✅ authorizations';
  RAISE NOTICE '✅ eligibilities';
  RAISE NOTICE '✅ work_items';
  RAISE NOTICE '✅ disputes';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Next: Run 01_FINANCIAL_TABLES.sql';
  RAISE NOTICE '============================================';
END $$;
