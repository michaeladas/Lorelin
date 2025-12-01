-- ============================================================================
-- CREATE BASE TABLES (IF MISSING)
-- Run this BEFORE the foreign keys script if you haven't created these tables yet
-- ============================================================================

-- This script ensures authorizations and eligibilities tables exist
-- It's safe to run even if they already exist (uses IF NOT EXISTS)

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
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE authorizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibilities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations for service role" ON authorizations;
DROP POLICY IF EXISTS "Allow all operations for service role" ON eligibilities;

CREATE POLICY "Allow all operations for service role" ON authorizations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role" ON eligibilities
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- SUMMARY
-- ============================================================================

-- Tables created (if they didn't exist):
-- ✅ authorizations
-- ✅ eligibilities

-- Next: Run 02_ADD_FOREIGN_KEYS.sql to add patient_id/provider_id/payer_id columns
