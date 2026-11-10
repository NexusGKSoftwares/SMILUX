<div align="center">
  <img src="assets/logo.svg" alt="Smilux Logo" width="80" height="85" />
  <h1>Smilux</h1>
  <p align="center">
    <strong>A Modern, All-in-One Dental Practice Management System (PMS)</strong>
  </p>
  <p align="center">
    Designed to streamline clinical workflows, interactive dental charting, patient care, multi-chair scheduling, billing, and inventory across single and multi-branch dental practices.
  </p>
  <p align="center">
    <strong>A Proprietary Healthcare Platform Developed & Owned by <a href="https://tekvora.co.ke/">Tekvora Systems</a></strong>
  </p>

---

## Overview

**Smilux** is an enterprise-grade web application engineered and owned exclusively by **Tekvora Systems** to modernize every aspect of dental clinic administration. From high-resolution visual dental charting and detailed treatment planning to automated patient notifications, multi-currency invoicing, and localized payment integrations (including **Safaricom M-Pesa** and **SHA / Social Health Authority** health insurance in East Africa), Smilux equips dental surgeons, hygienists, nurses, and practice managers with a unified, intuitive workspace.

---

## Key Features

### 1. Interactive Dental Charting & Odontogram

- **Visual Tooth Charting**: Adult (permanent 32-tooth) and pediatric (deciduous 20-tooth) charts supporting FDI and Universal numbering systems.
- **Surface-Level Diagnosis**: Record caries, restorations, crowns, endodontic treatments, implants, and extractions per surface (mesial, distal, occlusal, buccal, lingual).
- **Periodontal & Soft Tissue Records**: Pocket depth tracking, mobility grading, bleeding indices, and clinical notations.

### 2. Patient Management & Electronic Dental Records (EDR)

- **Comprehensive Patient Profiles**: Demographics, medical history, systemic alerts, drug allergies, dental phobias, and preferred communication channels.
- **Clinical History**: Chronological timeline of visits, vitals, operative notes, diagnostic X-rays, and signed consent documentation.
- **Family Accounts & Guardianship**: Manage pediatric patients linked to primary guardians or family billing units.

### 3. Multi-Chair & Multi-Dentist Scheduling

- **Visual Operatory Calendar**: Day, week, and chair-based timeline views with color-coded appointment statuses (Booked, Arrived, In-Chair, Completed, No-Show).
- **Practitioner Rostering**: Manage working hours, chair allocations, and on-call availability for resident and visiting dental specialists.
- **Automated Communication**: Automated appointment reminders via SMS and WhatsApp to minimize clinic no-shows.

### 4. Treatment Planning & Procedure Catalog

- **Procedure Code Standardisation**: Categorized procedure catalog with standard dental procedure codes (e.g., ADA / FDI classifications).
- **Phased Treatment Plans**: Multi-stage treatment sequencing, clinical necessity notes, estimated chair-time, and pre-treatment cost projections.
- **Patient Consent & Sign-offs**: Digital acceptance workflows for planned surgical and cosmetic treatments.

### 5. Invoicing, Billing & M-Pesa Integration

- **Flexible Billing Engine**: Itemized invoices linked directly to completed treatment procedures.
- **M-Pesa Daraja Integration**: Instant mobile money payment collection via STK Push, C2B/B2C validation, and automatic receipt reconciliation.
- **Split Payments & Multi-Tender**: Support for cash, card, bank transfer, and mobile payments in a single transaction.

### 6. Insurance & SHA (Social Health Authority) Management

- **Provider Registry**: Manage private insurance carriers alongside government health schemes (e.g., Kenya Social Health Authority - SHA).
- **Pre-Authorizations & Claims**: Track pre-authorization submission, approval status, claim tracking, co-payments, and insurer deductions.

### 7. Inventory, Dental Supplies & Purchase Orders

- **Clinical Consumables Tracking**: Monitor dental materials (composites, bonding agents, anesthetics, impression kits, PPE).
- **Low Stock Alerts & Expiry Tracking**: Automated replenishment warnings and batch expiration notifications to maintain safety standards.
- **Supplier Directory & POs**: Track dental supply vendors, generate purchase orders, and track receipt into clinic storage.

### 8. Practice Analytics & Financial Intelligence

- **Executive Dashboard**: Real-time KPI summaries including daily gross production, net collections, chair utilization, and new patient acquisition.
- **Expense Tracking**: Categorized overhead accounting (rent, utilities, laboratory fees, staff payroll, maintenance).
- **Insightful Visualizations**: Recharts-powered analytics for procedure breakdown, revenue trajectories, and outstanding account balances.

### 9. Multi-Branch Operations & Role-Based Access (RBAC)

- **Branch Switching**: Seamlessly manage multiple physical clinic locations (e.g., Nairobi Main, Westlands, Mombasa Branch) from a single user account.
- **Role Permissions**: Pre-configured roles for `ClinicOwner`, `Dentist`, `DentalAssistant`, `Hygienist`, `Receptionist`, and `SuperAdmin`.

---

## Architecture & Tech Stack

```
Smilux Platform
├── client/                 # Single Page Application (SPA)
│   ├── React 19            # UI Library
│   ├── Vite 6              # Lightning-fast build tool & dev server
│   ├── Tailwind CSS        # Utility-first styling with custom dental UI theme
│   ├── React Router v7     # Declarative client-side routing & layouts
│   ├── Recharts            # Financial & clinic performance charts
│   └── Hugeicons & Lucide  # Consistent medical and enterprise iconography
│
└── server/                 # RESTful API Backend
    ├── Node.js 22 & Express # Robust asynchronous application server
    ├── MongoDB & Mongoose  # Document database for clinical schemas
    ├── JWT & Bcrypt        # Secure authentication & password encryption
    └── CORS & Dotenv       # Cross-origin security and environment configuration
```

---

## Repository Structure

```text
Smilux/
├── assets/                     # Project branding & SVG assets
│   └── logo.svg                # Smilux brand mark
├── client/                     # Frontend web application
│   ├── public/                 # Static assets & favicons
│   ├── src/
│   │   ├── api/                # Axios API client & endpoints
│   │   ├── components/         # Reusable UI component library
│   │   │   ├── auth/           # Login & onboarding screens
│   │   │   ├── common/         # Modals, badges, search bars
│   │   │   ├── layout/         # Header, sidebar, shell layout
│   │   │   └── UI/             # Date pickers, forms, dropdowns
│   │   ├── pages/              # Domain views (Patients, Charting, Invoices, etc.)
│   │   ├── store/              # State management & hooks
│   │   ├── utils/              # Currency formatting, date helpers
│   │   ├── App.jsx             # Top-level routing & layout orchestration
│   │   ├── main.jsx            # Application entry point
│   │   └── index.css           # Global Tailwind CSS definitions
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Backend Node.js API
│   ├── config/                 # Database connection (Mongoose/MongoDB)
│   ├── controllers/            # Business logic handlers
│   ├── middleware/             # Auth, validation & error handling
│   ├── models/                 # Mongoose schemas (Patient, Chart, Invoice, etc.)
│   ├── routes/                 # Express API v1 route definitions
│   ├── seed.js                 # Sample clinic & test data seeding script
│   ├── server.js               # Express application bootstrap
│   ├── package.json
│   └── .env.example
│
├── .githooks/                  # Git hooks (pre-push lint verification)
├── .github/workflows/          # Continuous Integration (CI) and Release workflows
└── README.md                   # Project documentation
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: `v20.x` or `v22.x` recommended
- **pnpm**: `v9.x` (`npm install -g pnpm`)
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or a MongoDB Atlas connection string.

---

### 1. Clone the Repository

```bash
git clone https://github.com/NexusGKSoftwares/SMILUX.git
cd SMILUX
```

---

### 2. Configure Backend Environment

Navigate into `server/` and create your `.env` file:

```bash
cd server
cp .env.example .env
```

Review and adjust the configuration in `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smilux
NODE_ENV=development
```

---

### 3. Install Dependencies

Install all dependencies across both client and server from the workspace root:

```bash
pnpm install
```

---

### 4. Seed Demo Data

Populate your database with a sample clinic (**Avicena Dental Clinic**), dental chairs, users, patient records, treatment plans, and inventory items:

```bash
pnpm seed
```

*(You will see confirmation logs as the seed script loads the database).*

---

### 5. Run the Application

You can start both client and server concurrently from the workspace root:

```bash
pnpm dev
```

Or run them individually:

```bash
# Start backend server (http://localhost:5000)
pnpm dev:server

# Start frontend web client (http://localhost:5173)
pnpm dev:client
```

To create a production build of the frontend client:

```bash
pnpm build
```

Open your browser and navigate to `http://localhost:5173`.

---

## Default Demo Accounts

After running `node seed.js`, you can sign in using any of the following accounts:

| Role                   | Name                | Email                       | Password             |
| :--------------------- | :------------------ | :-------------------------- | :------------------- |
| **Clinic Owner** | Darrell Steward     | `owner@avicena.co.ke`     | `password123`      |
| **Lead Dentist** | Dr. John Doe        | `dr.john@avicena.co.ke`   | `password123`      |
| **Receptionist** | Mary Wambui         | `reception@avicena.co.ke` | `password123`      |
| **Super Admin**  | Super Administrator | `admin@smilux.co.ke`      | `superpassword123` |

---

## API Reference Overview

The backend exposes a structured RESTful API under `/api/v1`:

| Route Prefix               | Description                                                   |
| :------------------------- | :------------------------------------------------------------ |
| `/api/health`            | Service health status check                                   |
| `/api/v1/auth`           | User authentication, token issuance & password recovery       |
| `/api/v1/clinics`        | Practice details, branches & clinic settings                  |
| `/api/v1/patients`       | Patient profiles, medical history & communication preferences |
| `/api/v1/dental-chart`   | Tooth-by-tooth conditions, surface states & restorations      |
| `/api/v1/appointments`   | Operatory chair calendar & scheduling                         |
| `/api/v1/treatments`     | Treatment procedures, ADA/FDI codes & phased treatment plans  |
| `/api/v1/invoices`       | Patient billing, itemized invoices & statements               |
| `/api/v1/payments/mpesa` | M-Pesa Daraja STK Push & transaction callbacks                |
| `/api/v1/insurance`      | Insurance providers, SHA claims & pre-authorizations          |
| `/api/v1/inventory`      | Dental materials, consumable stock & low-inventory alerts     |
| `/api/v1/expenses`       | Clinic overhead, utility & operational expense logs           |
| `/api/v1/dashboard`      | Aggregated clinic statistics & financial analytics            |
| `/api/v1/reports`        | Exportable practice intelligence & performance reports        |

---

## Code Quality & Contributing

### Linting

Both the frontend and backend enforce strict **ESLint 9** code quality rules:

```bash
# Check client code
cd client
pnpm lint

# Check server code
cd server
pnpm lint
```

### Git Pre-Push Hook

This repository includes a pre-push hook in `.githooks/` that runs lint checks across both `client` and `server` before allowing any push to remote. To activate it locally:

```bash
git config core.hooksPath .githooks
```

### Contribution Workflow

1. Fork or branch from `main` (or `develop`).
2. Create a descriptive feature branch (`git checkout -b feature/clinical-notes-audio`).
3. Commit your changes following conventional commits (`feat: add voice dictation for clinical notes`).
4. Ensure all linters pass (`pnpm lint` in both folders).
5. Open a Pull Request for review.

---

## Ownership & License

Copyright &copy; 2026 **Tekvora Systems**. All rights reserved.

This software, application codebase, architecture, user interface designs, database schemas, and all associated intellectual property are the exclusive, proprietary property of **[Tekvora Systems](https://tekvora.co.ke/)**.

- **Proprietary Owner**: Tekvora Systems
- **Official Website**: [https://tekvora.co.ke/](https://tekvora.co.ke/)
- **Usage & Licensing**: Strictly private and confidential. Authorized for use solely under license agreements granted directly by Tekvora Systems.
- **Restrictions**: No part of this codebase may be copied, adapted, reverse engineered, republished, distributed, sublicensed, or commercially exploited in any form or by any means without prior express written permission from Tekvora Systems.
