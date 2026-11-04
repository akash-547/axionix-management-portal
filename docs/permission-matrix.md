# AXIONIX X Agency Management Portal
## Permission Matrix — Draft v1.0

**Status:** Draft — For Internal Review  
**Purpose:** Define the permissions of Admin and Contractor users for v1.

### 1. Admin Permissions

- **Dashboard:** View company-wide project and financial overview.
- **Contractors:** View, create, edit, and deactivate contractor accounts.
- **Projects:** View, create, and edit projects and contractor assignments.
- **Commission Rules:** View and manage company-level commission rules.
- **Commission Calculations:** View calculated commissions and perform authorized manual overrides.
- **Payout Ledger:** View all contractor payout records.
- **Audit History:** Access relevant records of changes and manual overrides, according to the approved audit policy.

### 2. Contractor Permissions

- **Dashboard:** View only information permitted for that contractor.
- **Profile:** View and update permitted personal profile information.
- **Projects:** View only projects assigned to that contractor.
- **Commission Rules:** No access to manage company-level rules.
- **Commission Calculations:** View only permitted commission information related to their own assignments.
- **Payout Ledger:** View only their own payout records.
- **Manual Overrides:** Cannot perform commission or payout overrides.
- **Audit History:** No access by default.

### 3. Security Requirements

- Permissions must be enforced by the server and database, not only by hiding frontend controls.
- Contractors must not be able to access another contractor's projects or payout records by changing a URL or request.
- Manual overrides must record the responsible Admin, reason, timestamp, and relevant before-and-after values.
- Access to sensitive financial information must follow the approved permission rules.
- Database Row Level Security (RLS) policies must be reviewed and tested before production use.

### 4. Review Notes

This document is an initial draft for internal review. Any unclear permissions or exceptions must be confirmed with the CTO before implementation is finalized.

**Approval Status:** Pending review.
