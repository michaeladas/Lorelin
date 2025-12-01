-- ============================================================================
-- COMPLETE LORELIN FINANCIAL MIGRATION
-- This file runs all 4 scripts in the correct order
-- Copy and paste this entire file into Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- STEP 0: CREATE BASE TABLES (authorizations, eligibilities)
-- ============================================================================

CREATE TABLE IF NOT EXISTS authorizations (
  id TEXT PRIMARY KEY,
  visit_id TEXT,
  patient_name TEXT NOT NULL,
  patient_id TEXT,
  patient_dob TEXT,
  provider TEXT,
  payer TEXT NOT NULL,
  plan_id TEXT,
  visit_date TEXT,
  visit_time TEXT,
  visit_reason TEXT,
  procedure_type TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'needed',
  clinical_justification TEXT,
  cpt_codes JSONB DEFAULT '[]'::jsonb,
  icd10_codes JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  submitted_date TIMESTAMPTZ,
  submitted_by TEXT,
  submission_method TEXT,
  pa_id TEXT,
  valid_from TEXT,
  valid_to TEXT,
  approved_date TIMESTAMPTZ,
  approved_by TEXT,
  denied_date TIMESTAMPTZ,
  denied_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_authorizations_visit_id ON authorizations(visit_id);
CREATE INDEX IF NOT EXISTS idx_authorizations_status ON authorizations(status);

CREATE TABLE IF NOT EXISTS eligibilities (
  id TEXT PRIMARY KEY,
  visit_id TEXT,
  patient_name TEXT NOT NULL,
  patient_id TEXT,
  patient_dob TEXT,
  patient_sex TEXT,
  provider TEXT,
  payer TEXT NOT NULL,
  plan_id TEXT,
  member_id TEXT,
  group_number TEXT,
  visit_date TEXT,
  visit_time TEXT,
  visit_reason TEXT,
  service_type TEXT,
  location TEXT,
  benefit_type TEXT DEFAULT 'Medical benefits',
  status TEXT NOT NULL DEFAULT 'pending',
  lorelin_available BOOLEAN DEFAULT true,
  current_result JSONB,
  history JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_eligibilities_visit_id ON eligibilities(visit_id);
CREATE INDEX IF NOT EXISTS idx_eligibilities_status ON eligibilities(status);

ALTER TABLE authorizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibilities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations for service role" ON authorizations;
DROP POLICY IF EXISTS "Allow all operations for service role" ON eligibilities;

CREATE POLICY "Allow all operations for service role" ON authorizations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations for service role" ON eligibilities
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- STEP 1: CREATE FINANCIAL TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  full_name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  date_of_birth DATE,
  email TEXT,
  phone TEXT,
  member_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_patients_full_name ON patients(full_name);
CREATE INDEX IF NOT EXISTS idx_patients_member_id ON patients(member_id);

CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  npi TEXT,
  specialty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_providers_name ON providers(name);
CREATE INDEX IF NOT EXISTS idx_providers_npi ON providers(npi);

CREATE TABLE IF NOT EXISTS payers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_name TEXT,
  type TEXT,
  is_in_network BOOLEAN DEFAULT true,
  requires_auth BOOLEAN DEFAULT false,
  auth_procedures TEXT[],
  auth_turnaround_days INTEGER DEFAULT 5,
  typical_denial_rate NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payers_name ON payers(name);
CREATE INDEX IF NOT EXISTS idx_payers_short_name ON payers(short_name);

CREATE TABLE IF NOT EXISTS charges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
  cpt_code TEXT NOT NULL,
  description TEXT,
  modifier TEXT,
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  allowed_amount NUMERIC(10,2),
  paid_amount NUMERIC(10,2) DEFAULT 0,
  is_denied BOOLEAN DEFAULT false,
  denial_code TEXT,
  denial_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_charges_visit_id ON charges(visit_id);
CREATE INDEX IF NOT EXISTS idx_charges_cpt_code ON charges(cpt_code);
CREATE INDEX IF NOT EXISTS idx_charges_is_denied ON charges(is_denied);

CREATE TABLE IF NOT EXISTS claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID NOT NULL REFERENCES visits(id),
  patient_id UUID REFERENCES patients(id),
  payer_id UUID REFERENCES payers(id),
  claim_number TEXT,
  status TEXT DEFAULT 'draft',
  total_billed NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_allowed NUMERIC(10,2) DEFAULT 0,
  total_paid NUMERIC(10,2) DEFAULT 0,
  insurance_paid NUMERIC(10,2) DEFAULT 0,
  patient_paid NUMERIC(10,2) DEFAULT 0,
  adjustments NUMERIC(10,2) DEFAULT 0,
  patient_responsibility NUMERIC(10,2) DEFAULT 0,
  denial_reason TEXT,
  denial_code TEXT,
  denial_category TEXT,
  submitted_date DATE,
  accepted_date DATE,
  paid_date DATE,
  denial_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_claims_visit_id ON claims(visit_id);
CREATE INDEX IF NOT EXISTS idx_claims_patient_id ON claims(patient_id);
CREATE INDEX IF NOT EXISTS idx_claims_payer_id ON claims(payer_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_claim_number ON claims(claim_number);
CREATE INDEX IF NOT EXISTS idx_claims_submitted_date ON claims(submitted_date);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_type TEXT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  payment_date DATE DEFAULT CURRENT_DATE,
  method TEXT,
  reference TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_claim_id ON payments(claim_id);
CREATE INDEX IF NOT EXISTS idx_payments_source_type ON payments(source_type);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payers ENABLE ROW LEVEL SECURITY;
ALTER TABLE charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all operations for service role" ON patients;
DROP POLICY IF EXISTS "Allow all operations for service role" ON providers;
DROP POLICY IF EXISTS "Allow all operations for service role" ON payers;
DROP POLICY IF EXISTS "Allow all operations for service role" ON charges;
DROP POLICY IF EXISTS "Allow all operations for service role" ON claims;
DROP POLICY IF EXISTS "Allow all operations for service role" ON payments;

CREATE POLICY "Allow all operations for service role" ON patients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for service role" ON providers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for service role" ON payers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for service role" ON charges FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for service role" ON claims FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations for service role" ON payments FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- STEP 2: ADD FOREIGN KEYS TO EXISTING TABLES
-- ============================================================================

ALTER TABLE visits ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id);
ALTER TABLE visits ADD COLUMN IF NOT EXISTS provider_id UUID REFERENCES providers(id);
ALTER TABLE visits ADD COLUMN IF NOT EXISTS payer_id UUID REFERENCES payers(id);

CREATE INDEX IF NOT EXISTS idx_visits_patient_id ON visits(patient_id);
CREATE INDEX IF NOT EXISTS idx_visits_provider_id ON visits(provider_id);
CREATE INDEX IF NOT EXISTS idx_visits_payer_id ON visits(payer_id);

ALTER TABLE authorizations ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id);
ALTER TABLE authorizations ADD COLUMN IF NOT EXISTS provider_id UUID REFERENCES providers(id);
ALTER TABLE authorizations ADD COLUMN IF NOT EXISTS payer_id UUID REFERENCES payers(id);

CREATE INDEX IF NOT EXISTS idx_authorizations_patient_id ON authorizations(patient_id);
CREATE INDEX IF NOT EXISTS idx_authorizations_provider_id ON authorizations(provider_id);
CREATE INDEX IF NOT EXISTS idx_authorizations_payer_id ON authorizations(payer_id);

ALTER TABLE eligibilities ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id);
ALTER TABLE eligibilities ADD COLUMN IF NOT EXISTS provider_id UUID REFERENCES providers(id);
ALTER TABLE eligibilities ADD COLUMN IF NOT EXISTS payer_id UUID REFERENCES payers(id);

CREATE INDEX IF NOT EXISTS idx_eligibilities_patient_id ON eligibilities(patient_id);
CREATE INDEX IF NOT EXISTS idx_eligibilities_provider_id ON eligibilities(provider_id);
CREATE INDEX IF NOT EXISTS idx_eligibilities_payer_id ON eligibilities(payer_id);

ALTER TABLE disputes ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id);
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS payer_id UUID REFERENCES payers(id);
ALTER TABLE disputes ADD COLUMN IF NOT EXISTS claim_id UUID REFERENCES claims(id);

CREATE INDEX IF NOT EXISTS idx_disputes_patient_id ON disputes(patient_id);
CREATE INDEX IF NOT EXISTS idx_disputes_payer_id ON disputes(payer_id);
CREATE INDEX IF NOT EXISTS idx_disputes_claim_id ON disputes(claim_id);

ALTER TABLE work_items ADD COLUMN IF NOT EXISTS patient_id UUID REFERENCES patients(id);
ALTER TABLE work_items ADD COLUMN IF NOT EXISTS visit_id UUID REFERENCES visits(id);
ALTER TABLE work_items ADD COLUMN IF NOT EXISTS claim_id UUID REFERENCES claims(id);

CREATE INDEX IF NOT EXISTS idx_work_items_patient_id ON work_items(patient_id);
CREATE INDEX IF NOT EXISTS idx_work_items_visit_id ON work_items(visit_id);
CREATE INDEX IF NOT EXISTS idx_work_items_claim_id ON work_items(claim_id);

-- ============================================================================
-- STEP 3: MIGRATE EXISTING DATA
-- ============================================================================
-- (See 03_MIGRATE_DATA.sql for the full migration logic)
-- This comprehensive script creates normalized entities and populates foreign keys
-- Run 03_MIGRATE_DATA.sql separately after this script completes

-- ============================================================================
-- MIGRATION COMPLETE (Part 1)
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '============================================';
  RAISE NOTICE 'DATABASE SCHEMA MIGRATION COMPLETE';
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Next step: Run 03_MIGRATE_DATA.sql to populate the new tables';
  RAISE NOTICE '============================================';
END $$;
