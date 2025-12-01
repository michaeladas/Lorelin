-- ============================================================================
-- LORELIN FINANCIAL TABLES
-- Part 1: Create new normalized tables for patients, providers, payers, 
--         charges, claims, and payments
-- ============================================================================

-- ============================================================================
-- PATIENTS TABLE
-- Normalized patient data (no more patient_name as text everywhere)
-- ============================================================================

CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  full_name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  date_of_birth DATE,
  email TEXT,
  phone TEXT,
  member_id TEXT, -- Primary insurance member ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for searching by name
CREATE INDEX IF NOT EXISTS idx_patients_full_name ON patients(full_name);
CREATE INDEX IF NOT EXISTS idx_patients_member_id ON patients(member_id);

-- ============================================================================
-- PROVIDERS TABLE
-- Normalized provider data (no more provider as text)
-- ============================================================================

CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  npi TEXT, -- National Provider Identifier
  specialty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for searching by name
CREATE INDEX IF NOT EXISTS idx_providers_name ON providers(name);
CREATE INDEX IF NOT EXISTS idx_providers_npi ON providers(npi);

-- ============================================================================
-- PAYERS TABLE
-- Insurance companies and their rules
-- ============================================================================

CREATE TABLE IF NOT EXISTS payers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- "BCBS PPO", "UHC", "Medicare"
  short_name TEXT, -- "BCBS", "UHC", etc.
  type TEXT, -- "commercial", "medicare", "medicaid"
  is_in_network BOOLEAN DEFAULT true,
  
  -- Authorization rules
  requires_auth BOOLEAN DEFAULT false,
  auth_procedures TEXT[], -- Array of procedure types requiring auth
  auth_turnaround_days INTEGER DEFAULT 5,
  
  -- Denial tracking
  typical_denial_rate NUMERIC(5,2), -- Percentage (e.g., 12.50 for 12.5%)
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for searching
CREATE INDEX IF NOT EXISTS idx_payers_name ON payers(name);
CREATE INDEX IF NOT EXISTS idx_payers_short_name ON payers(short_name);

-- ============================================================================
-- CHARGES TABLE
-- Line items for what was billed (CPT codes)
-- ============================================================================

CREATE TABLE IF NOT EXISTS charges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID NOT NULL REFERENCES visits(id) ON DELETE CASCADE,
  
  -- Procedure details
  cpt_code TEXT NOT NULL, -- CPT procedure code
  description TEXT,
  modifier TEXT, -- CPT modifier if applicable
  
  -- Amounts
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL, -- What we charged
  allowed_amount NUMERIC(10,2), -- What insurance allows
  paid_amount NUMERIC(10,2) DEFAULT 0, -- What was actually paid
  
  -- Denial tracking
  is_denied BOOLEAN DEFAULT false,
  denial_code TEXT, -- CARC/RARC code
  denial_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_charges_visit_id ON charges(visit_id);
CREATE INDEX IF NOT EXISTS idx_charges_cpt_code ON charges(cpt_code);
CREATE INDEX IF NOT EXISTS idx_charges_is_denied ON charges(is_denied);

-- ============================================================================
-- CLAIMS TABLE
-- Billing submissions to insurance (one per visit typically)
-- ============================================================================

CREATE TABLE IF NOT EXISTS claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id UUID NOT NULL REFERENCES visits(id),
  patient_id UUID REFERENCES patients(id), -- Will be populated during migration
  payer_id UUID REFERENCES payers(id), -- Will be populated during migration
  
  -- Claim tracking
  claim_number TEXT, -- Insurance claim number
  status TEXT DEFAULT 'draft', 
  -- Status values: draft, submitted, accepted, denied, partially_paid, paid, appealed, rejected
  
  -- Financial amounts
  total_billed NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_allowed NUMERIC(10,2) DEFAULT 0, -- What insurance allows
  total_paid NUMERIC(10,2) DEFAULT 0, -- What's been paid so far
  insurance_paid NUMERIC(10,2) DEFAULT 0,
  patient_paid NUMERIC(10,2) DEFAULT 0,
  adjustments NUMERIC(10,2) DEFAULT 0, -- Contractual adjustments
  patient_responsibility NUMERIC(10,2) DEFAULT 0,
  
  -- Denial tracking
  denial_reason TEXT,
  denial_code TEXT, -- CARC/RARC codes
  denial_category TEXT, -- "eligibility", "authorization", "medical_necessity", "coding", etc.
  
  -- Dates
  submitted_date DATE,
  accepted_date DATE,
  paid_date DATE,
  denial_date DATE,
  
  -- Notes
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_claims_visit_id ON claims(visit_id);
CREATE INDEX IF NOT EXISTS idx_claims_patient_id ON claims(patient_id);
CREATE INDEX IF NOT EXISTS idx_claims_payer_id ON claims(payer_id);
CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);
CREATE INDEX IF NOT EXISTS idx_claims_claim_number ON claims(claim_number);
CREATE INDEX IF NOT EXISTS idx_claims_submitted_date ON claims(submitted_date);

-- ============================================================================
-- PAYMENTS TABLE
-- Track all payment activity (insurance + patient)
-- ============================================================================

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  
  -- Payment details
  source_type TEXT NOT NULL, -- 'insurance' or 'patient'
  amount NUMERIC(10,2) NOT NULL,
  
  -- Payment method
  payment_date DATE DEFAULT CURRENT_DATE,
  method TEXT, -- 'ERA', 'check', 'card', 'ach', 'adjustment', 'cash'
  reference TEXT, -- Check number, transaction ID, ERA trace number
  
  -- Additional details
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_payments_claim_id ON payments(claim_id);
CREATE INDEX IF NOT EXISTS idx_payments_source_type ON payments(source_type);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON payments(payment_date);

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payers ENABLE ROW LEVEL SECURITY;
ALTER TABLE charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies for all new tables
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
-- SUMMARY
-- ============================================================================

-- Tables created:
-- ✅ patients - Normalized patient records
-- ✅ providers - Normalized provider records
-- ✅ payers - Insurance companies with rules
-- ✅ charges - Line items (CPT codes) for billing
-- ✅ claims - Billing submissions with status tracking
-- ✅ payments - Payment history (insurance + patient)
