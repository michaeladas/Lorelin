# Quick Start: SQL Migration for Lorelin

## ⚠️ ERROR FIX: "relation does not exist"

If you're getting errors about missing tables (`visits`, `authorizations`, `disputes`, etc.), follow these steps:

## Step-by-Step Instructions

### 1. Open Supabase SQL Editor
- Go to your Supabase Dashboard
- Click **SQL Editor** in the left sidebar

### 2. Run Script 0 (Base Tables) - **DO THIS FIRST**
- Open `/sql/00_CREATE_ALL_BASE_TABLES.sql`
- Copy the entire file
- Paste into Supabase SQL Editor
- Click **Run**
- Wait for "Success" message

**This creates:** `visits`, `authorizations`, `eligibilities`, `work_items`, `disputes`

### 3. Run Script 1 (Financial Tables)
- Open `/sql/01_FINANCIAL_TABLES.sql`
- Copy the entire file
- Paste into Supabase SQL Editor
- Click **Run**
- Wait for "Success" message

**This creates:** `patients`, `providers`, `payers`, `charges`, `claims`, `payments`

### 4. Run Script 2 (Add Foreign Keys)
- Open `/sql/02_ADD_FOREIGN_KEYS.sql`
- Copy the entire file
- Paste into Supabase SQL Editor
- Click **Run**
- Wait for "Success" message

**This adds:** Foreign key columns to all existing tables

### 5. Run Script 3 (Migrate Data)
- Open `/sql/03_MIGRATE_DATA.sql`
- Copy the entire file
- Paste into Supabase SQL Editor
- Click **Run**
- Wait for "Success" message
- You'll see a summary showing how many records were created

**This migrates:** All your existing text data into the new normalized tables

### 6. Reload Schema Cache
- In Supabase Dashboard, go to **Settings** → **API**
- Scroll down to **PostgREST schema cache**
- Click **"Reload schema cache"**
- Wait 10-15 seconds

### 7. Done! ✅
Your database now has:
- ✅ All base tables (visits, authorizations, etc.)
- ✅ All financial tables (patients, providers, payers, claims, etc.)
- ✅ Foreign key relationships
- ✅ Migrated data from text fields to normalized records

## What If Something Goes Wrong?

### "column already exists" error
- **Safe to ignore** - the scripts check for existing columns
- Or: You already ran that script, skip to the next one

### "relation already exists" error
- **Safe to ignore** - the scripts check for existing tables
- Or: You already ran that script, skip to the next one

### "function already exists" error
- **Safe to ignore** - the scripts drop and recreate functions

### No data after migration
- Check if your `visits` table had data before migration
- Run: `SELECT COUNT(*) FROM visits;`
- If 0, you need to initialize sample data first (your app does this automatically)

## Quick Test

After running all scripts, test with this query:

```sql
SELECT 
  'Patients' as table_name, COUNT(*) as count FROM patients
UNION ALL
SELECT 'Providers', COUNT(*) FROM providers
UNION ALL
SELECT 'Payers', COUNT(*) FROM payers
UNION ALL
SELECT 'Visits', COUNT(*) FROM visits
UNION ALL
SELECT 'Claims', COUNT(*) FROM claims
UNION ALL
SELECT 'Charges', COUNT(*) FROM charges;
```

You should see counts > 0 for all tables (except maybe charges/claims if you had no visits yet).

## Need More Help?

See `/sql/README_SQL_MIGRATION.md` for detailed documentation.
