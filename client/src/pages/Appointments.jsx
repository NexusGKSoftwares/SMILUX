import React, { useState, useMemo, useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Calendar01Icon,
  Clock01Icon,
  Search01Icon,
  FilterIcon,
  PlusSignIcon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  MoreHorizontalIcon,
  PencilEdit01Icon,
  Delete02Icon,
  UserCircleIcon,
  CallIcon,
  Doc01Icon,
  Invoice01Icon,
  DentalToothIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Location01Icon,
  Building01Icon,
  Idea01Icon,
  PrinterIcon,
  EyeIcon,
} from '@hugeicons/core-free-icons';

// ─── Initial Appointments Dataset (Anchored on Nov 2026) ─────────────────────
const INITIAL_APPOINTMENTS = [
  // ── Week of Nov 02 - Nov 06 ──
  {
    id: 'APT-120',
    patientName: 'Mercy Chege',
    phone: '+254 712 111 222',
    email: 'mercy.chege@gmail.com',
    dentist: 'Dr. Darrell Steward',
    chair: 'Operatory Chair 1',
    branch: 'Nairobi Main',
    service: 'Routine Scaling & Oral Prophylaxis',
    category: 'Hygiene & Preventive',
    dayIndex: 0,
    dateStr: '2026-11-02',
    startTime: '10:00',
    endTime: '11:00',
    duration: '60 min',
    color: 'emerald',
    status: 'Completed',
    note: 'Supragingival plaque removed. Advised flossing regularly.',
    services: [
      { name: 'Ultrasonic Scaling', duration: '40 min', doctor: 'Dr. Darrell Steward', price: 3500 },
      { name: 'Polishing & Fluoride Treatment', duration: '20 min', doctor: 'Mercy Atieno (Nurse)', price: 1500 },
    ],
    products: [{ name: 'Fluoride Oral Rinse 250ml', price: 850 }],
    subtotal: 5000,
    tax: 0,
    total: 5850,
    paymentStatus: 'Paid',
    paymentMethod: 'M-Pesa (REF: QKA9912)',
  },
  {
    id: 'APT-121',
    patientName: 'David Kiprotich',
    phone: '+254 723 333 444',
    email: 'david.k@gmail.com',
    dentist: 'Dr. Kevin Ochieng',
    chair: 'Operatory Chair 3',
    branch: 'Nairobi Main',
    service: 'Root Canal Therapy Review',
    category: 'Endodontics',
    dayIndex: 2,
    dateStr: '2026-11-04',
    startTime: '14:00',
    endTime: '15:00',
    duration: '60 min',
    color: 'purple',
    status: 'Completed',
    note: 'Tooth #46 symptom-free. Canal dry. Final restoration scheduled.',
    services: [
      { name: 'Endodontic Review & Sealing', duration: '45 min', doctor: 'Dr. Kevin Ochieng', price: 6500 },
    ],
    products: [],
    subtotal: 6500,
    tax: 0,
    total: 6500,
    paymentStatus: 'Paid',
    paymentMethod: 'Britam Dental Insurance',
  },
  {
    id: 'APT-122',
    patientName: 'Grace Wangari',
    phone: '+254 734 555 666',
    email: 'grace.w@yahoo.com',
    dentist: 'Dr. Sarah Wambui',
    chair: 'Cosmetic Studio 1',
    branch: 'Karen Surgery Center',
    service: 'Laser Teeth Whitening',
    category: 'Cosmetic',
    dayIndex: 4,
    dateStr: '2026-11-06',
    startTime: '11:00',
    endTime: '12:30',
    duration: '90 min',
    color: 'pink',
    status: 'Completed',
    note: 'In-chair laser whitening. Shade brightened from A3 to B1.',
    services: [
      { name: 'In-Office Laser Teeth Whitening', duration: '90 min', doctor: 'Dr. Sarah Wambui', price: 25000 },
    ],
    products: [{ name: 'Post-Whitening Desensitizing Gel', price: 1200 }],
    subtotal: 25000,
    tax: 0,
    total: 26200,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card (Mastercard)',
  },

  // ── Week of Nov 09 - Nov 13 (Featured Active Week) ──
  {
    id: 'APT-101',
    patientName: 'Savannah Wambui',
    phone: '+254 712 345 678',
    email: 'savannah.w@gmail.com',
    dentist: 'Dr. Darrell Steward',
    chair: 'Operatory Chair 1',
    branch: 'Nairobi Main',
    service: 'Scaling & Polishing',
    category: 'Hygiene & Preventive',
    dayIndex: 0,
    dateStr: '2026-11-09',
    startTime: '10:00',
    endTime: '10:30',
    duration: '30 min',
    color: 'emerald',
    status: 'Completed',
    note: 'Routine scaling completed. Light tartar on lower anteriors.',
    services: [
      { name: 'Full Mouth Scaling & Root Planing', duration: '20 min', doctor: 'Dr. Darrell Steward', price: 3500 },
      { name: 'Fluoride Polish', duration: '10 min', doctor: 'Mercy Atieno (Nurse)', price: 1000 },
    ],
    products: [{ name: 'Sensodyne Rapid Relief Toothpaste', price: 650 }],
    subtotal: 4500,
    tax: 0,
    total: 5150,
    paymentStatus: 'Paid',
    paymentMethod: 'M-Pesa (REF: QKB7192)',
  },
  {
    id: 'APT-102',
    patientName: 'Lilia Chebet',
    phone: '+254 722 890 123',
    email: 'lilia.chebet@yahoo.com',
    dentist: 'Dr. Faith Mutua',
    chair: 'Operatory Chair 2',
    branch: 'Westlands Clinic',
    service: 'Composite Filling & Restoration',
    category: 'Restorative',
    dayIndex: 0,
    dateStr: '2026-11-09',
    startTime: '12:00',
    endTime: '13:00',
    duration: '60 min',
    color: 'amber',
    status: 'Completed',
    note: 'Mesial composite restoration on tooth #24. Good shade match (A2).',
    services: [
      { name: 'Composite Resin Filling (Tooth #24)', duration: '45 min', doctor: 'Dr. Faith Mutua', price: 6000 },
      { name: 'Dental X-Ray (Periapical)', duration: '15 min', doctor: 'Hellen Anyango (Tech)', price: 1200 },
    ],
    products: [],
    subtotal: 7200,
    tax: 0,
    total: 7200,
    paymentStatus: 'Paid',
    paymentMethod: 'Insurance (Jubilee Allianz)',
  },
  {
    id: 'APT-103',
    patientName: 'Walk-in Patient (John Gitau)',
    phone: '+254 733 445 566',
    email: 'j.gitau@outlook.com',
    dentist: 'Dr. Brian Mwangi',
    chair: 'Emergency Chair 4',
    branch: 'Nairobi Main',
    service: 'Emergency Pain Relief & Triage',
    category: 'Emergency',
    dayIndex: 0,
    dateStr: '2026-11-09',
    startTime: '13:00',
    endTime: '14:00',
    duration: '60 min',
    color: 'rose',
    status: 'Completed',
    note: 'Acute pulpitis #46. Prescribed amoxicillin and scheduled root canal.',
    services: [
      { name: 'Emergency Dental Consultation', duration: '30 min', doctor: 'Dr. Brian Mwangi', price: 2500 },
      { name: 'Local Infiltration Anesthesia', duration: '15 min', doctor: 'Dr. Brian Mwangi', price: 1500 },
    ],
    products: [{ name: 'Amoxicillin 500mg (15 Caps)', price: 800 }],
    subtotal: 4000,
    tax: 0,
    total: 4800,
    paymentStatus: 'Paid',
    paymentMethod: 'M-Pesa (REF: QKC8821)',
  },
  {
    id: 'APT-104',
    patientName: 'Zara Mutiso',
    phone: '+254 701 998 877',
    email: 'zara.mutiso@gmail.com',
    dentist: 'Dr. Faith Mutua',
    chair: 'Operatory Chair 2',
    branch: 'Westlands Clinic',
    service: 'Orthodontic Wire Adjustment',
    category: 'Orthodontics',
    dayIndex: 0,
    dateStr: '2026-11-09',
    startTime: '15:00',
    endTime: '17:00',
    duration: '120 min',
    color: 'emerald',
    status: 'Completed',
    note: 'Upper archwire changed to 0.016x0.022 NiTi. Power chains placed.',
    services: [
      { name: 'Orthodontic Adjustment Visit', duration: '90 min', doctor: 'Dr. Faith Mutua', price: 5000 },
      { name: 'Oral Hygiene & Floss Pack', duration: '30 min', doctor: 'John Kiprono (Hygienist)', price: 1500 },
    ],
    products: [{ name: 'Interdental Brush Set', price: 750 }],
    subtotal: 6500,
    tax: 0,
    total: 7250,
    paymentStatus: 'Paid',
    paymentMethod: 'Britam Dental Card',
  },
  {
    id: 'APT-105',
    patientName: 'Emma Njeri',
    phone: '+254 711 223 344',
    email: 'emma.njeri@gmail.com',
    dentist: 'Dr. Amina Kassam',
    chair: 'Pediatric Suite A',
    branch: 'Karen Surgery Center',
    service: 'Pediatric Preventive Coating',
    category: 'Pediatric',
    dayIndex: 1,
    dateStr: '2026-11-10',
    startTime: '08:00',
    endTime: '09:00',
    duration: '60 min',
    color: 'purple',
    status: 'Completed',
    note: 'Pit and fissure sealants applied to first permanent molars.',
    services: [
      { name: 'Pit & Fissure Sealants (4 molars)', duration: '40 min', doctor: 'Dr. Amina Kassam', price: 4000 },
      { name: 'Child Dental Prophylaxis', duration: '20 min', doctor: 'Dr. Amina Kassam', price: 2000 },
    ],
    products: [],
    subtotal: 6000,
    tax: 0,
    total: 6000,
    paymentStatus: 'Paid',
    paymentMethod: 'Self Pay (M-Pesa)',
  },
  {
    id: 'APT-106',
    patientName: 'Jasper Kipchumba',
    phone: '+254 720 123 456',
    email: 'jasper.k@gmail.com',
    dentist: 'Dr. Kevin Ochieng',
    chair: 'Operatory Chair 3',
    branch: 'Nairobi Main',
    service: 'Root Canal Stage 1 (#36)',
    category: 'Endodontics',
    dayIndex: 1,
    dateStr: '2026-11-10',
    startTime: '09:00',
    endTime: '09:45',
    duration: '45 min',
    color: 'purple',
    status: 'Completed',
    note: 'Canals located and extirpated under rubber dam. Ledermix placed.',
    services: [
      { name: 'Endodontic Pulpectomy & Canal Prep', duration: '45 min', doctor: 'Dr. Kevin Ochieng', price: 8500 },
    ],
    products: [],
    subtotal: 8500,
    tax: 0,
    total: 8500,
    paymentStatus: 'Paid',
    paymentMethod: 'SHA Direct (Civil Servants)',
  },
  {
    id: 'APT-107',
    patientName: 'Kristin Watson',
    phone: '+254 789 789 885',
    email: 'kristin.watson@gmail.com',
    dentist: 'Dr. Darrell Steward',
    chair: 'Surgery Suite 1',
    branch: 'Nairobi Main',
    service: 'Comprehensive Consultation & Scaling',
    category: 'General & Surgery',
    dayIndex: 1,
    dateStr: '2026-11-10',
    startTime: '10:00',
    endTime: '10:45',
    duration: '45 min',
    color: 'sky',
    status: 'Completed',
    note: 'Patient reported sensitivity in lower left quadrant. Scaling performed with ultrasound scaler. Gum tissue healthy.',
    services: [
      { name: 'Comprehensive Dental Exam', duration: '20 min', doctor: 'Dr. Darrell Steward', price: 3500 },
      { name: 'Full Ultrasonic Scaling & Airflow', duration: '25 min', doctor: 'Dr. Darrell Steward', price: 4500 },
    ],
    products: [{ name: 'Chlorhexidine Mouthwash 0.2%', price: 750 }],
    subtotal: 8000,
    tax: 0,
    total: 8750,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Pending Invoice',
  },
  {
    id: 'APT-108',
    patientName: 'John Omondi',
    phone: '+254 722 998 877',
    email: 'john.omondi@gmail.com',
    dentist: 'Dr. Darrell Steward',
    chair: 'Surgery Suite 1',
    branch: 'Nairobi Main',
    service: 'Tooth Extraction Post-Op',
    category: 'Oral Surgery',
    dayIndex: 1,
    dateStr: '2026-11-10',
    startTime: '10:45',
    endTime: '12:00',
    duration: '75 min',
    color: 'pink',
    status: 'Completed',
    note: 'Suture removal following molar extraction. Socket healing normally.',
    services: [
      { name: 'Post-Op Suture Removal & Review', duration: '30 min', doctor: 'Dr. Darrell Steward', price: 1500 },
      { name: 'Antiseptic Irrigation', duration: '15 min', doctor: 'Mercy Atieno (Nurse)', price: 800 },
    ],
    products: [],
    subtotal: 2300,
    tax: 0,
    total: 2300,
    paymentStatus: 'Paid',
    paymentMethod: 'AAR Healthcare',
  },
  {
    id: 'APT-109',
    patientName: 'Mia Wanjala',
    phone: '+254 734 556 677',
    email: 'mia.w@gmail.com',
    dentist: 'Dr. Sarah Wambui',
    chair: 'Cosmetic Studio 1',
    branch: 'Karen Surgery Center',
    service: 'Teeth Whitening Consultation',
    category: 'Cosmetic',
    dayIndex: 1,
    dateStr: '2026-11-10',
    startTime: '12:45',
    endTime: '13:30',
    duration: '45 min',
    color: 'pink',
    status: 'Completed',
    note: 'In-office Philips Zoom consultation and pre-whitening shade assessment (A3.5).',
    services: [
      { name: 'Cosmetic Smile Assessment', duration: '45 min', doctor: 'Dr. Sarah Wambui', price: 4000 },
    ],
    products: [],
    subtotal: 4000,
    tax: 0,
    total: 4000,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card (Visa)',
  },
  {
    id: 'APT-110',
    patientName: 'Omar Hassan',
    phone: '+254 710 445 566',
    email: 'omar.h@gmail.com',
    dentist: 'Dr. Kevin Ochieng',
    chair: 'Operatory Chair 3',
    branch: 'Nairobi Main',
    service: 'Molar Endodontic Obturation',
    category: 'Endodontics',
    dayIndex: 1,
    dateStr: '2026-11-10',
    startTime: '14:00',
    endTime: '15:15',
    duration: '75 min',
    color: 'pink',
    status: 'Completed',
    note: 'Gutta-percha obturation with bioceramic sealer. Temporary filling placed.',
    services: [
      { name: 'Canal Obturation & Radiograph', duration: '60 min', doctor: 'Dr. Kevin Ochieng', price: 9000 },
    ],
    products: [],
    subtotal: 9000,
    tax: 0,
    total: 9000,
    paymentStatus: 'Paid',
    paymentMethod: 'Old Mutual Health',
  },
  {
    id: 'APT-111',
    patientName: 'Ethan Kariuki',
    phone: '+254 721 889 900',
    email: 'ethan.k@gmail.com',
    dentist: 'Dr. Wanjiku Kimani',
    chair: 'Implant Suite 2',
    branch: 'Upper Hill Clinic',
    service: 'Dental Implant Consultation & CBCT',
    category: 'Implantology',
    dayIndex: 2,
    dateStr: '2026-11-11',
    startTime: '09:30',
    endTime: '10:30',
    duration: '60 min',
    color: 'purple',
    status: 'In Progress',
    note: '3D CBCT scan taken for missing lower right first molar (#46). Sufficient bone depth.',
    services: [
      { name: 'Implant Surgical Consultation', duration: '30 min', doctor: 'Dr. Wanjiku Kimani', price: 4000 },
      { name: '3D CBCT Cone Beam Scan', duration: '30 min', doctor: 'Hellen Anyango (Tech)', price: 7500 },
    ],
    products: [],
    subtotal: 11500,
    tax: 0,
    total: 11500,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Pending Invoice',
  },
  {
    id: 'APT-112',
    patientName: 'Sophie Achieng',
    phone: '+254 735 112 233',
    email: 'sophie.a@gmail.com',
    dentist: 'Dr. Brian Mwangi',
    chair: 'Operatory Chair 1',
    branch: 'Westlands Clinic',
    service: 'Full Mouth Scaling & Stain Removal',
    category: 'Hygiene & Preventive',
    dayIndex: 2,
    dateStr: '2026-11-11',
    startTime: '12:00',
    endTime: '13:30',
    duration: '90 min',
    color: 'emerald',
    status: 'Confirmed',
    note: 'Heavy tea/coffee stains. Airflow polishing planned.',
    services: [
      { name: 'Airflow Stain Removal & Scaling', duration: '60 min', doctor: 'John Kiprono (Hygienist)', price: 5000 },
    ],
    products: [],
    subtotal: 5000,
    tax: 0,
    total: 5000,
    paymentStatus: 'Paid',
    paymentMethod: 'M-Pesa (REF: QKD1109)',
  },
  {
    id: 'APT-113',
    patientName: 'Clara Mutua',
    phone: '+254 702 443 322',
    email: 'clara.mutua@gmail.com',
    dentist: 'Dr. Faith Mutua',
    chair: 'Operatory Chair 2',
    branch: 'Westlands Clinic',
    service: 'Clear Aligner Scan & Digital Impression',
    category: 'Orthodontics',
    dayIndex: 2,
    dateStr: '2026-11-11',
    startTime: '13:30',
    endTime: '14:45',
    duration: '75 min',
    color: 'pink',
    status: 'Confirmed',
    note: 'iTero intraoral 3D scanning for Invisalign clear aligners.',
    services: [
      { name: 'Digital 3D Intraoral Scan', duration: '45 min', doctor: 'Dr. Faith Mutua', price: 8000 },
    ],
    products: [],
    subtotal: 8000,
    tax: 0,
    total: 8000,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'APT-114',
    patientName: 'Liam Kipkorir',
    phone: '+254 714 667 788',
    email: 'liam.k@gmail.com',
    dentist: 'Dr. Peter Kiprotich',
    chair: 'Operatory Chair 1',
    branch: 'Upper Hill Clinic',
    service: 'Crown Preparation & Impression',
    category: 'Prosthodontics',
    dayIndex: 2,
    dateStr: '2026-11-11',
    startTime: '14:45',
    endTime: '15:45',
    duration: '60 min',
    color: 'amber',
    status: 'Confirmed',
    note: 'Tooth #16 prepared for zirconia crown. Temporary acrylic crown placed.',
    services: [
      { name: 'Zirconia Crown Prep & Temporization', duration: '60 min', doctor: 'Dr. Peter Kiprotich', price: 18000 },
    ],
    products: [],
    subtotal: 18000,
    tax: 0,
    total: 18000,
    paymentStatus: 'Paid',
    paymentMethod: 'Insurance (Jubilee)',
  },
  {
    id: 'APT-115',
    patientName: 'Walk-in Emergency (Kiprono)',
    phone: '+254 722 001 992',
    email: 'emergency@smilux.co.ke',
    dentist: 'Dr. Ronald Barasa',
    chair: 'Emergency Chair 4',
    branch: 'Nairobi Main',
    service: 'Chipped Incisor Composite Bonding',
    category: 'Emergency',
    dayIndex: 2,
    dateStr: '2026-11-11',
    startTime: '17:00',
    endTime: '18:00',
    duration: '60 min',
    color: 'rose',
    status: 'Confirmed',
    note: 'Sports injury chipped incisal edge #11. Direct composite bevel and bond.',
    services: [
      { name: 'Direct Aesthetic Bonding #11', duration: '45 min', doctor: 'Dr. Ronald Barasa', price: 5500 },
    ],
    products: [],
    subtotal: 5500,
    tax: 0,
    total: 5500,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Self Pay',
  },
  {
    id: 'APT-128',
    patientName: 'Caroline Wambui',
    phone: '+254 711 334 556',
    email: 'caroline.w@gmail.com',
    dentist: 'Dr. Darrell Steward',
    chair: 'Operatory Chair 1',
    branch: 'Nairobi Main',
    service: 'Morning Scaling & Plaque Assessment',
    category: 'Hygiene & Preventive',
    dayIndex: 3,
    dateStr: '2026-11-12',
    startTime: '08:00',
    endTime: '08:45',
    duration: '45 min',
    color: 'emerald',
    status: 'Completed',
    note: 'Full ultrasonic prophylaxis completed smoothly.',
    services: [
      { name: 'Full Ultrasonic Prophylaxis', duration: '45 min', doctor: 'Dr. Darrell Steward', price: 3500 },
    ],
    products: [],
    subtotal: 3500,
    tax: 0,
    total: 3500,
    paymentStatus: 'Paid',
    paymentMethod: 'M-Pesa (REF: QKE4411)',
  },
  {
    id: 'APT-116',
    patientName: 'Emma Chepkemoi',
    phone: '+254 733 990 011',
    email: 'emma.c@gmail.com',
    dentist: 'Dr. Amina Kassam',
    chair: 'Pediatric Suite A',
    branch: 'Karen Surgery Center',
    service: 'Pediatric Checkup',
    category: 'Pediatric',
    dayIndex: 3,
    dateStr: '2026-11-12',
    startTime: '09:00',
    endTime: '09:45',
    duration: '45 min',
    color: 'purple',
    status: 'Scheduled',
    note: 'Routine 6-month checkup and fluoride varnish application.',
    services: [
      { name: 'Pediatric Examination', duration: '30 min', doctor: 'Dr. Amina Kassam', price: 2500 },
    ],
    products: [],
    subtotal: 2500,
    tax: 0,
    total: 2500,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Cash',
  },
  {
    id: 'APT-117',
    patientName: 'Liam Ochieng',
    phone: '+254 700 889 900',
    email: 'liam.o@gmail.com',
    dentist: 'Dr. Darrell Steward',
    chair: 'Surgery Suite 1',
    branch: 'Nairobi Main',
    service: 'Wisdom Tooth Surgical Extraction',
    category: 'Oral Surgery',
    dayIndex: 3,
    dateStr: '2026-11-12',
    startTime: '09:45',
    endTime: '11:00',
    duration: '75 min',
    color: 'purple',
    status: 'In Progress',
    note: 'Impacted lower right third molar (#48) surgical extraction.',
    services: [
      { name: 'Surgical Disimpaction (Molar #48)', duration: '60 min', doctor: 'Dr. Darrell Steward', price: 15000 },
    ],
    products: [],
    subtotal: 15000,
    tax: 0,
    total: 15000,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Insurance Pre-Auth (AAR)',
  },
  {
    id: 'APT-118',
    patientName: 'Zara Kemunto',
    phone: '+254 711 776 655',
    email: 'zara.k@gmail.com',
    dentist: 'Dr. Faith Mutua',
    chair: 'Operatory Chair 2',
    branch: 'Westlands Clinic',
    service: 'Orthodontic Debonding & Retainers',
    category: 'Orthodontics',
    dayIndex: 3,
    dateStr: '2026-11-12',
    startTime: '11:00',
    endTime: '12:30',
    duration: '90 min',
    color: 'pink',
    status: 'Scheduled',
    note: 'Braces removal, glue polishing, and fitting of Essix clear retainers.',
    services: [
      { name: 'Braces Removal & Enamel Polish', duration: '60 min', doctor: 'Dr. Faith Mutua', price: 8000 },
      { name: 'Essix Clear Retainers (Pair)', duration: '30 min', doctor: 'Dennis Oduor (Lab Tech)', price: 12000 },
    ],
    products: [],
    subtotal: 20000,
    tax: 0,
    total: 20000,
    paymentStatus: 'Paid',
    paymentMethod: 'M-Pesa Installment',
  },
  {
    id: 'APT-129',
    patientName: 'Brian Kiprono',
    phone: '+254 722 889 001',
    email: 'brian.k@gmail.com',
    dentist: 'Dr. Brian Mwangi',
    chair: 'Operatory Chair 1',
    branch: 'Westlands Clinic',
    service: 'Composite Filling Tooth #14',
    category: 'Restorative',
    dayIndex: 3,
    dateStr: '2026-11-12',
    startTime: '14:00',
    endTime: '15:00',
    duration: '60 min',
    color: 'amber',
    status: 'Confirmed',
    note: 'Occlusal composite restoration scheduled.',
    services: [
      { name: 'Direct Composite Restoration', duration: '45 min', doctor: 'Dr. Brian Mwangi', price: 5500 },
    ],
    products: [],
    subtotal: 5500,
    tax: 0,
    total: 5500,
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'APT-119',
    patientName: 'Patrick Kiplagat',
    phone: '+254 722 554 433',
    email: 'patrick.k@gmail.com',
    dentist: 'Dr. Wanjiku Kimani',
    chair: 'Implant Suite 2',
    branch: 'Upper Hill Clinic',
    service: 'Implant Fixture Placement (#46)',
    category: 'Implantology',
    dayIndex: 4,
    dateStr: '2026-11-13',
    startTime: '09:00',
    endTime: '10:30',
    duration: '90 min',
    color: 'emerald',
    status: 'Scheduled',
    note: 'Straumann SLA active titanium implant placement under local.',
    services: [
      { name: 'Titanium Dental Implant Placement', duration: '75 min', doctor: 'Dr. Wanjiku Kimani', price: 45000 },
    ],
    products: [],
    subtotal: 45000,
    tax: 0,
    total: 45000,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Jubilee Pre-Approved',
  },

  // ── Weeks of Nov 16 - Nov 30 ──
  {
    id: 'APT-123',
    patientName: 'Samuel Mwenda',
    phone: '+254 728 889 001',
    email: 'samuel.m@gmail.com',
    dentist: 'Dr. Faith Mutua',
    chair: 'Operatory Chair 2',
    branch: 'Westlands Clinic',
    service: 'Orthodontic Routine Checkup',
    category: 'Orthodontics',
    dayIndex: 0,
    dateStr: '2026-11-16',
    startTime: '09:30',
    endTime: '10:30',
    duration: '60 min',
    color: 'emerald',
    status: 'Scheduled',
    note: 'Checking molar bracket alignment and archwire tension.',
    services: [
      { name: 'Orthodontic Routine Consultation', duration: '45 min', doctor: 'Dr. Faith Mutua', price: 4500 },
    ],
    products: [],
    subtotal: 4500,
    tax: 0,
    total: 4500,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Self Pay',
  },
  {
    id: 'APT-124',
    patientName: 'Beatrice Auma',
    phone: '+254 710 234 567',
    email: 'beatrice.a@gmail.com',
    dentist: 'Dr. Peter Kiprotich',
    chair: 'Operatory Chair 1',
    branch: 'Upper Hill Clinic',
    service: 'Zirconia Crown Fitting',
    category: 'Prosthodontics',
    dayIndex: 2,
    dateStr: '2026-11-18',
    startTime: '11:00',
    endTime: '12:00',
    duration: '60 min',
    color: 'amber',
    status: 'Scheduled',
    note: 'Try-in and cementation of permanent zirconia crown.',
    services: [
      { name: 'Crown Cementation & Occlusal Polish', duration: '45 min', doctor: 'Dr. Peter Kiprotich', price: 12000 },
    ],
    products: [],
    subtotal: 12000,
    tax: 0,
    total: 12000,
    paymentStatus: 'Unpaid',
    paymentMethod: 'Insurance',
  },
  {
    id: 'APT-125',
    patientName: 'Victor Korir',
    phone: '+254 725 667 889',
    email: 'victor.korir@gmail.com',
    dentist: 'Dr. Darrell Steward',
    chair: 'Surgery Suite 1',
    branch: 'Nairobi Main',
    service: 'Surgical Wisdom Tooth Review',
    category: 'Oral Surgery',
    dayIndex: 4,
    dateStr: '2026-11-20',
    startTime: '14:00',
    endTime: '15:00',
    duration: '60 min',
    color: 'purple',
    status: 'Scheduled',
    note: 'Post-op review for extracted impacted 38. Normal granulation.',
    services: [
      { name: 'Surgical Follow-up & Irrigation', duration: '30 min', doctor: 'Dr. Darrell Steward', price: 2000 },
    ],
    products: [],
    subtotal: 2000,
    tax: 0,
    total: 2000,
    paymentStatus: 'Paid',
    paymentMethod: 'Cash',
  },
  {
    id: 'APT-126',
    patientName: 'Anita Wanjiku',
    phone: '+254 731 990 221',
    email: 'anita.w@gmail.com',
    dentist: 'Dr. Amina Kassam',
    chair: 'Pediatric Suite A',
    branch: 'Karen Surgery Center',
    service: 'Pediatric Fluoride Varnish & Seal',
    category: 'Pediatric',
    dayIndex: 1,
    dateStr: '2026-11-24',
    startTime: '10:00',
    endTime: '10:45',
    duration: '45 min',
    color: 'sky',
    status: 'Scheduled',
    note: 'High-risk caries prevention. Topical fluoride applied.',
    services: [
      { name: 'Pediatric Topical Fluoride Treatment', duration: '30 min', doctor: 'Dr. Amina Kassam', price: 3000 },
    ],
    products: [],
    subtotal: 3000,
    tax: 0,
    total: 3000,
    paymentStatus: 'Unpaid',
    paymentMethod: 'M-Pesa',
  },
  {
    id: 'APT-127',
    patientName: 'George Njoroge',
    phone: '+254 703 123 789',
    email: 'george.n@gmail.com',
    dentist: 'Dr. Wanjiku Kimani',
    chair: 'Implant Suite 2',
    branch: 'Upper Hill Clinic',
    service: 'Dental Implant Osseointegration Check',
    category: 'Implantology',
    dayIndex: 3,
    dateStr: '2026-11-26',
    startTime: '15:30',
    endTime: '16:30',
    duration: '60 min',
    color: 'emerald',
    status: 'Scheduled',
    note: 'Periapical radiograph confirms stable bone integration around implant fixture.',
    services: [
      { name: 'Implant Assessment Radiography', duration: '30 min', doctor: 'Dr. Wanjiku Kimani', price: 5000 },
    ],
    products: [],
    subtotal: 5000,
    tax: 0,
    total: 5000,
    paymentStatus: 'Paid',
    paymentMethod: 'Insurance (Allianz)',
  },
];

// Start hour for clinic operations (04:00 AM to 11:00 PM)
const START_HOUR = 4;
const ROW_HEIGHT = 64; // Strict height in px for each 1-hour slot

const TIME_SLOTS = [
  '04:00 AM',
  '05:00 AM',
  '06:00 AM',
  '07:00 AM',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
  '11:00 PM',
];

const TOTAL_GRID_HEIGHT = TIME_SLOTS.length * ROW_HEIGHT; // 20 * 64 = 1280px

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [mainTab, setMainTab] = useState('Calendar'); // 'Calendar' | 'Log History'
  const [viewMode, setViewMode] = useState('Week'); // Week default as requested
  const [statusFilter, setStatusFilter] = useState('All');
  const [staffFilter, setStaffFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Real current live date and time
  const [now, setNow] = useState(() => new Date());

  // Active viewing date (defaults to the actual current date!)
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Modals and dropdowns state
  const [selectedAppointmentForModal, setSelectedAppointmentForModal] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isDentistMenuOpen, setIsDentistMenuOpen] = useState(false);

  // Calendar scroll container reference
  const calendarScrollRef = useRef(null);

  // Update current live time every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Format date helper: YYYY-MM-DD
  const formatDateToISO = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const todayISODate = useMemo(() => formatDateToISO(now), [now]);
  const currentISODate = useMemo(() => formatDateToISO(currentDate), [currentDate]);

  // Calculate live red line position and label from real current time
  const currentTimeIndicator = useMemo(() => {
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const decimalHours = hours + minutes / 60;

    // Top offset based on START_HOUR (4:00 AM) and ROW_HEIGHT (64px) per hour slot
    const top = (decimalHours - START_HOUR) * ROW_HEIGHT;
    const isVisible = decimalHours >= START_HOUR && decimalHours <= (START_HOUR + TIME_SLOTS.length);

    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return {
      top,
      topPx: `${Math.max(0, top)}px`,
      formattedTime,
      isVisible,
    };
  }, [now]);

  // Auto-scroll timeline to current time on mount / view switch
  useEffect(() => {
    if (calendarScrollRef.current && currentTimeIndicator.isVisible) {
      calendarScrollRef.current.scrollTop = Math.max(0, currentTimeIndicator.top - 120);
    }
  }, [viewMode, currentTimeIndicator.isVisible]);

  // New booking form state
  const [newBooking, setNewBooking] = useState({
    patientName: '',
    phone: '',
    email: '',
    dentist: 'Dr. Darrell Steward',
    service: 'Comprehensive Dental Exam',
    date: todayISODate,
    startTime: '10:00',
    endTime: '11:00',
    chair: 'Surgery Suite 1',
    branch: 'Nairobi Main',
    note: '',
  });

  // Filtered Appointments (Search + Status + Staff)
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      if (statusFilter !== 'All' && apt.status !== statusFilter) return false;
      if (staffFilter !== 'All' && !apt.dentist.includes(staffFilter)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = apt.patientName.toLowerCase().includes(q);
        const matchService = apt.service.toLowerCase().includes(q);
        const matchDoctor = apt.dentist.toLowerCase().includes(q);
        const matchPhone = apt.phone.toLowerCase().includes(q);
        const matchId = apt.id.toLowerCase().includes(q);
        if (!matchName && !matchService && !matchDoctor && !matchPhone && !matchId) return false;
      }
      return true;
    });
  }, [appointments, statusFilter, staffFilter, searchQuery]);

  // Navigate Previous
  const handlePrev = () => {
    const d = new Date(currentDate);
    if (viewMode === 'Day') {
      d.setDate(d.getDate() - 1);
    } else if (viewMode === 'Week') {
      d.setDate(d.getDate() - 7);
    } else if (viewMode === 'Month') {
      d.setMonth(d.getMonth() - 1);
    }
    setCurrentDate(d);
  };

  // Navigate Next
  const handleNext = () => {
    const d = new Date(currentDate);
    if (viewMode === 'Day') {
      d.setDate(d.getDate() + 1);
    } else if (viewMode === 'Week') {
      d.setDate(d.getDate() + 7);
    } else if (viewMode === 'Month') {
      d.setMonth(d.getMonth() + 1);
    }
    setCurrentDate(d);
  };

  // Reset to actual Today
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Compute 7 days of the active week (Monday to Sunday)
  const weekDays = useMemo(() => {
    const d = new Date(currentDate);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.getFullYear(), d.getMonth(), diff);

    const days = [];
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
      const dateISO = formatDateToISO(nextDay);
      const isToday = dateISO === todayISODate;
      const count = filteredAppointments.filter((a) => a.dateStr === dateISO).length;
      days.push({
        dayIndex: i,
        name: dayNames[i],
        date: String(nextDay.getDate()).padStart(2, '0'),
        dateStr: dateISO,
        monthStr: nextDay.toLocaleDateString('en-US', { month: 'short' }),
        displayTitle: `${dayNames[i]} ${nextDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        isToday,
        rawDate: nextDay,
        count,
      });
    }
    return days;
  }, [currentDate, todayISODate, filteredAppointments]);

  // Compute month calendar days for Month View
  const monthCalendarGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startDayIndex = firstDayOfMonth.getDay();
    let startOffset = (startDayIndex + 6) % 7;

    const totalDaysInMonth = lastDayOfMonth.getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const calendarCells = [];

    // Leading days
    for (let i = startOffset - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const prevDate = new Date(year, month - 1, dayNum);
      const dateISO = formatDateToISO(prevDate);
      calendarCells.push({
        dayNum,
        dateISO,
        isCurrentMonth: false,
        isToday: dateISO === todayISODate,
        appointments: filteredAppointments.filter((a) => a.dateStr === dateISO),
      });
    }

    // Days of current month
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const thisDate = new Date(year, month, d);
      const dateISO = formatDateToISO(thisDate);
      calendarCells.push({
        dayNum: d,
        dateISO,
        isCurrentMonth: true,
        isToday: dateISO === todayISODate,
        appointments: filteredAppointments.filter((a) => a.dateStr === dateISO),
      });
    }

    // Trailing days
    const remaining = (7 - (calendarCells.length % 7)) % 7;
    for (let n = 1; n <= remaining; n++) {
      const nextDate = new Date(year, month + 1, n);
      const dateISO = formatDateToISO(nextDate);
      calendarCells.push({
        dayNum: n,
        dateISO,
        isCurrentMonth: false,
        isToday: dateISO === todayISODate,
        appointments: filteredAppointments.filter((a) => a.dateStr === dateISO),
      });
    }

    return calendarCells;
  }, [currentDate, todayISODate, filteredAppointments]);

  // Date formatted exactly matching inspiration screenshot (e.g. "Fri, 16 May 2022")
  const formattedDateText = useMemo(() => {
    if (viewMode === 'Day') {
      return currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    }
    if (viewMode === 'Week') {
      const start = weekDays[0];
      const end = weekDays[6];
      return `${start.date} ${start.monthStr} – ${end.date} ${end.monthStr} ${currentDate.getFullYear()}`;
    }
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  }, [viewMode, currentDate, weekDays]);

  // Vertical card positioning inside timeline (based on START_HOUR = 4 and ROW_HEIGHT = 64)
  const calculateCardPosition = (startTimeStr, endTimeStr) => {
    const parseHour = (timeStr) => {
      if (!timeStr) return START_HOUR;
      const [h, m] = timeStr.split(':').map(Number);
      return (h || 0) + (m || 0) / 60;
    };
    const start = parseHour(startTimeStr);
    const end = parseHour(endTimeStr);
    const top = Math.max(0, (start - START_HOUR) * ROW_HEIGHT + 1);
    const durationHours = Math.max(0.25, end - start);
    const height = Math.max(30, durationHours * ROW_HEIGHT - 3);
    return { top: `${top}px`, height: `${height}px` };
  };

  // Color styles mapping
  const getColorStyles = (color, isSelected) => {
    if (isSelected) {
      return 'bg-[#5051F9] text-white shadow-md ring-2 ring-[#5051F9] ring-offset-1 border border-[#4041e8]';
    }
    switch (color) {
      case 'emerald':
        return 'bg-[#dcfce7] text-[#14532d] dark:bg-emerald-950/60 dark:text-emerald-200 border-l-[3.5px] border-[#16a34a] hover:bg-[#bbf7d0]';
      case 'amber':
        return 'bg-[#fef3c7] text-[#78350f] dark:bg-amber-950/60 dark:text-amber-200 border-l-[3.5px] border-[#d97706] hover:bg-[#fde68a]';
      case 'purple':
        return 'bg-[#f3e8ff] text-[#581c87] dark:bg-purple-950/60 dark:text-purple-200 border-l-[3.5px] border-[#9333ea] hover:bg-[#e9d5ff]';
      case 'pink':
        return 'bg-[#fce7f3] text-[#831843] dark:bg-pink-950/60 dark:text-pink-200 border-l-[3.5px] border-[#db2777] hover:bg-[#fbcfe8]';
      case 'rose':
        return 'bg-[#ffe4e6] text-[#881337] dark:bg-rose-950/60 dark:text-rose-200 border-l-[3.5px] border-[#e11d48] hover:bg-[#fecdd3]';
      case 'sky':
      default:
        return 'bg-[#e0f2fe] text-[#0369a1] dark:bg-sky-950/60 dark:text-sky-200 border-l-[3.5px] border-[#0284c7] hover:bg-[#bae6fd]';
    }
  };

  // Open Appointment Details Modal on clicking an appointment from calendar
  const handleAppointmentClick = (apt) => {
    setSelectedAppointmentForModal(apt);
  };

  // Open Book New Appointment Modal on clicking an empty slot or date from calendar
  const handleCalendarEmptySlotClick = (dateStr, hourStr) => {
    const startHour = hourStr || '10:00';
    const [h] = startHour.split(':').map(Number);
    const endH = String(Math.min(23, h + 1)).padStart(2, '0');
    const endHour = `${endH}:00`;

    setNewBooking((prev) => ({
      ...prev,
      date: dateStr || currentISODate,
      startTime: startHour,
      endTime: endHour,
    }));
    setIsBookingModalOpen(true);
  };

  // Status update directly from modal
  const handleUpdateStatus = (appointmentId, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
    );
    if (selectedAppointmentForModal && selectedAppointmentForModal.id === appointmentId) {
      setSelectedAppointmentForModal((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Handle Add Appointment submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!newBooking.patientName.trim()) return;

    const newApt = {
      id: `APT-${130 + appointments.length}`,
      patientName: newBooking.patientName,
      phone: newBooking.phone || '+254 700 000 000',
      email: newBooking.email || `${newBooking.patientName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      dentist: newBooking.dentist,
      chair: newBooking.chair,
      branch: newBooking.branch,
      service: newBooking.service,
      category: 'General Care',
      dayIndex: new Date(newBooking.date).getDay(),
      dateStr: newBooking.date,
      startTime: newBooking.startTime,
      endTime: newBooking.endTime,
      duration: '45 min',
      color: 'sky',
      status: 'Confirmed',
      note: newBooking.note || 'Booked online via Clinic Reception',
      services: [
        { name: newBooking.service, duration: '45 min', doctor: newBooking.dentist, price: 4000 },
      ],
      products: [],
      subtotal: 4000,
      tax: 0,
      total: 4000,
      paymentStatus: 'Unpaid',
      paymentMethod: 'Pending Invoice',
    };

    setAppointments((prev) => [newApt, ...prev]);
    setIsBookingModalOpen(false);
    setSelectedAppointmentForModal(newApt);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] dark:bg-slate-950 font-sans">
      {/* ─── 1. Top Tabs Row (Matching Screenshot: Calendar | Log History) ───── */}
      <div className="bg-white dark:bg-slate-900 border-b border-[#EAEAEA] dark:border-slate-800 px-6 pt-3">
        <div className="flex items-center gap-7 text-sm">
          <button
            type="button"
            onClick={() => setMainTab('Calendar')}
            className={`pb-2.5 font-medium transition-all relative cursor-pointer select-none ${mainTab === 'Calendar'
              ? 'text-[#5051F9] dark:text-[#7072ff] font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
          >
            Calendar
            {mainTab === 'Calendar' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5051F9] dark:bg-[#7072ff] rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMainTab('Log History')}
            className={`pb-2.5 font-medium transition-all relative cursor-pointer select-none ${mainTab === 'Log History'
              ? 'text-[#5051F9] dark:text-[#7072ff] font-semibold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
          >
            Log History
            {mainTab === 'Log History' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#5051F9] dark:bg-[#7072ff] rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* ─── 2. Top Action Bar (Matching Inspiration Screenshot Exactly) ────── */}
      <div className="bg-white dark:bg-slate-900 border-b border-[#EAEAEA] dark:border-slate-800 px-6 py-2.5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Left: Total Appointments with Badge Icon */}
          <div className="flex items-center gap-2.5 self-start lg:self-center">
            <div className="w-8 h-8 rounded bg-[#F3F4F6] dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
              <HugeiconsIcon icon={Calendar01Icon} size={16} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[19px] font-bold text-slate-800 dark:text-white leading-none">
                {filteredAppointments.length}
              </span>
              <span className="text-[13px] text-slate-400 font-normal">
                total appointments
              </span>
            </div>
          </div>

          {/* Center: [Today]  <  >  Fri, 16 May 2022  |  [ Day | Week ] */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            {/* "Today" pill button with soft purple/indigo border */}
            <button
              type="button"
              onClick={handleToday}
              className="px-3.5 py-1 rounded border border-[#5051F9]/50 dark:border-[#7072ff]/50 bg-white dark:bg-slate-800 text-[#5051F9] dark:text-[#7072ff] text-xs font-semibold hover:bg-[#5051F9]/5 transition-colors cursor-pointer shadow-2xs"
            >
              Today
            </button>

            {/* Left & Right chevron arrows */}
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="Previous"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title="Next"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </button>
            </div>

            {/* Date Display (e.g. "Fri, 16 May 2022") */}
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100 px-1">
              {formattedDateText}
            </span>

            {/* Vertical Separator */}
            <span className="h-5 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:inline-block" />

            {/* Segmented Switcher: [Day] [Week] [Month] (Week default) */}
            <div className="inline-flex items-center p-0.5 bg-[#F3F4F6] dark:bg-slate-800 rounded text-xs">
              {['Day', 'Week', 'Month'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded-md text-xs transition-all cursor-pointer ${viewMode === mode
                    ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white font-bold shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-white'
                    }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Right: [All Dentist v]  [Filters]  [+ Book] */}
          <div className="flex items-center gap-2 self-end lg:self-center">
            {/* All Dentist Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDentistMenuOpen(!isDentistMenuOpen)}
                className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={UserCircleIcon} size={15} className="text-slate-500" />
                <span className="font-medium">
                  {staffFilter === 'All' ? 'All Dentist' : `Dr. ${staffFilter}`}
                </span>
                <HugeiconsIcon icon={ArrowDown01Icon} size={13} className="text-slate-400" />
              </button>

              {isDentistMenuOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-800 rounded shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-30 animate-in fade-in-0 zoom-in-95 duration-100">
                  {[
                    { val: 'All', label: 'All Dentist' },
                    { val: 'Steward', label: 'Dr. Darrell Steward' },
                    { val: 'Mutua', label: 'Dr. Faith Mutua' },
                    { val: 'Ochieng', label: 'Dr. Kevin Ochieng' },
                    { val: 'Kassam', label: 'Dr. Amina Kassam' },
                    { val: 'Kimani', label: 'Dr. Wanjiku Kimani' },
                    { val: 'Mwangi', label: 'Dr. Brian Mwangi' },
                  ].map((dentist) => (
                    <button
                      key={dentist.val}
                      type="button"
                      onClick={() => {
                        setStaffFilter(dentist.val);
                        setIsDentistMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${staffFilter === dentist.val
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-[#5051F9] dark:text-[#7072ff] font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                    >
                      <span>{dentist.label}</span>
                      {staffFilter === dentist.val && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters Button (with blue dot indicator) */}
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
            >
              <span className="relative flex items-center">
                <HugeiconsIcon icon={FilterIcon} size={15} className="text-slate-500" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#0099ff]" />
              </span>
              <span className="font-medium">Filters</span>
            </button>

            {/* Book Appointment CTA */}
            <button
              type="button"
              onClick={() => {
                setNewBooking((prev) => ({
                  ...prev,
                  date: todayISODate,
                }));
                setIsBookingModalOpen(true);
              }}
              className="px-3 py-1.5 rounded bg-[#00884B] hover:bg-[#00733f] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={14} />
              <span>Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 3. Main Content: Calendar Views OR Log History ─────────────────── */}
      {mainTab === 'Calendar' ? (
        <div className="flex-1 p-4 overflow-x-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-xs overflow-hidden">
            {/* ════════════════════════════════════════════════════════════════
                VIEW 1: DAY VIEW
               ════════════════════════════════════════════════════════════════ */}
            {viewMode === 'Day' && (
              <div className="flex flex-col min-w-[700px]">
                {/* Day View Subheader */}
                <div className="px-4 py-2.5 bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#5051F9] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      {currentDate.getDate()}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-white">
                      {currentDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-xs text-slate-500">
                      {
                        filteredAppointments.filter((a) => a.dateStr === currentISODate).length
                      }{' '}
                      appointments
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCalendarEmptySlotClick(currentISODate, '09:00')}
                    className="text-xs font-semibold text-[#5051F9] dark:text-[#7072ff] hover:underline cursor-pointer"
                  >
                    + Add to this day
                  </button>
                </div>

                {/* Day Timeline Grid */}
                <div
                  ref={calendarScrollRef}
                  className="relative overflow-y-auto max-h-[calc(100vh-210px)] min-h-[600px] bg-white dark:bg-slate-900"
                  style={{ height: '768px' }}
                >
                  <div
                    className="relative flex flex-row flex-1"
                    style={{ height: `${TOTAL_GRID_HEIGHT}px`, minHeight: `${TOTAL_GRID_HEIGHT}px` }}
                  >
                    {/* Left Time Slots column */}
                    <div
                      className="w-16 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 select-none"
                      style={{ height: `${TOTAL_GRID_HEIGHT}px` }}
                    >
                      {TIME_SLOTS.map((time) => (
                        <div
                          key={time}
                          style={{ height: `${ROW_HEIGHT}px` }}
                          className="relative border-b border-slate-200/70 dark:border-slate-800/70 text-right pr-2 box-border shrink-0"
                        >
                          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 absolute -top-2.5 right-2">
                            {time}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic Red Live Current Time Indicator Line for Today */}
                    {currentISODate === todayISODate && currentTimeIndicator.isVisible && (
                      <div
                        className="absolute left-16 right-0 z-20 pointer-events-none flex items-center transition-all duration-300"
                        style={{ top: currentTimeIndicator.topPx }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 -ml-1.5 shadow-sm"></div>
                        <div className="flex-1 border-t-2 border-rose-500 shadow-sm"></div>
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-3 shadow-sm">
                          {currentTimeIndicator.formattedTime} (Now)
                        </span>
                      </div>
                    )}

                    {/* Main Single Day Timeline Column */}
                    <div
                      className="relative flex-1 bg-white dark:bg-slate-900 box-border"
                      style={{ height: `${TOTAL_GRID_HEIGHT}px` }}
                    >
                      {/* Horizontal Hour Lines (Clickable to book at that hour) */}
                      {TIME_SLOTS.map((time, idx) => {
                        const hourNumber = String(START_HOUR + idx).padStart(2, '0');
                        return (
                          <div
                            key={time}
                            style={{ height: `${ROW_HEIGHT}px` }}
                            onClick={() =>
                              handleCalendarEmptySlotClick(currentISODate, `${hourNumber}:00`)
                            }
                            title={`Click to book appointment at ${time}`}
                            className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 cursor-pointer transition-colors relative group box-border shrink-0"
                          >
                            <span className="absolute right-3 top-2 text-[10px] text-[#5051F9] dark:text-[#7072ff] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                              + Book at {time}
                            </span>
                          </div>
                        );
                      })}

                      {/* Plotted Appointments for Active Day */}
                      {filteredAppointments
                        .filter((apt) => apt.dateStr === currentISODate)
                        .map((apt) => {
                          const pos = calculateCardPosition(apt.startTime, apt.endTime);
                          return (
                            <div
                              key={apt.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAppointmentClick(apt);
                              }}
                              style={{ top: pos.top, height: pos.height }}
                              className={`absolute left-3 right-3 rounded p-3 text-xs transition-all cursor-pointer overflow-hidden z-10 shadow-xs border ${getColorStyles(
                                apt.color,
                                false
                              )} hover:shadow-md hover:scale-[1.005]`}
                            >
                              <div className="flex items-center justify-between font-bold text-xs">
                                <span className="flex items-center gap-2">
                                  <span className="font-extrabold">{apt.startTime} – {apt.endTime}</span>
                                  <span>•</span>
                                  <span>{apt.patientName}</span>
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/70 dark:bg-slate-900/70 border border-slate-300 dark:border-slate-700">
                                    {apt.chair}
                                  </span>
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white/80 dark:bg-slate-800/80 shadow-2xs">
                                  {apt.status}
                                </span>
                              </div>

                              <div className="flex items-center justify-between text-xs mt-1">
                                <div className="font-medium truncate">
                                  {apt.service} — <span className="opacity-80">{apt.dentist}</span>
                                </div>
                                <div className="font-bold shrink-0 ml-2">
                                  KES {apt.total.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════════
                VIEW 2: WEEK VIEW (7 Days Columns) - DEFAULT VIEW
               ════════════════════════════════════════════════════════════════ */}
            {viewMode === 'Week' && (
              <div className="flex flex-col min-w-[850px]">
                {/* Day Header Row */}
                <div className="sticky top-0 z-20 flex flex-row bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-800">
                  <div className="w-16 h-12 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-400 border-r border-slate-200 dark:border-slate-800">
                    GMT +3
                  </div>

                  <div className="grid grid-cols-7 flex-1">
                    {weekDays.map((day) => (
                      <div
                        key={day.dateStr}
                        onClick={() => {
                          setCurrentDate(day.rawDate);
                          setViewMode('Day');
                        }}
                        title="Click to view this Day"
                        className={`h-12 px-2.5 py-1 flex items-center justify-between border-r border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors ${day.isToday ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${day.isToday
                              ? 'bg-[#5051F9] text-white shadow-2xs'
                              : 'text-slate-900 dark:text-white'
                              }`}
                          >
                            {day.date}
                          </span>
                          <div className="leading-tight">
                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 block">
                              {day.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {day.count} apt{day.count === 1 ? '' : 's'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Grid with Plotted Appointment Cards */}
                <div
                  ref={calendarScrollRef}
                  className="relative overflow-y-auto max-h-[calc(100vh-210px)] min-h-[600px] bg-white dark:bg-slate-900"
                  style={{ height: '768px' }}
                >
                  {/* Inner Canvas with explicit total grid height */}
                  <div
                    className="relative flex flex-row"
                    style={{ height: `${TOTAL_GRID_HEIGHT}px`, minHeight: `${TOTAL_GRID_HEIGHT}px` }}
                  >
                    {/* Left Time Slots column */}
                    <div
                      className="w-16 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 select-none"
                      style={{ height: `${TOTAL_GRID_HEIGHT}px` }}
                    >
                      {TIME_SLOTS.map((time) => (
                        <div
                          key={time}
                          style={{ height: `${ROW_HEIGHT}px` }}
                          className="relative border-b border-slate-200/70 dark:border-slate-800/70 text-right pr-2 box-border shrink-0"
                        >
                          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 absolute -top-2.5 right-2">
                            {time}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Dynamic Red Live Current Time Indicator Line across today's week */}
                    {weekDays.some((d) => d.isToday) && currentTimeIndicator.isVisible && (
                      <div
                        className="absolute left-16 right-0 z-20 pointer-events-none flex items-center transition-all duration-300"
                        style={{ top: currentTimeIndicator.topPx }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 -ml-1.5 shadow-sm"></div>
                        <div className="flex-1 border-t-2 border-rose-500 shadow-sm"></div>
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded mr-2 shadow-sm">
                          {currentTimeIndicator.formattedTime} (Now)
                        </span>
                      </div>
                    )}

                    {/* 7-Day Columns Grid */}
                    <div
                      className="grid grid-cols-7 flex-1 relative bg-white dark:bg-slate-900"
                      style={{ height: `${TOTAL_GRID_HEIGHT}px` }}
                    >
                      {weekDays.map((day) => (
                        <div
                          key={day.dateStr}
                          className="relative border-r border-slate-200/80 dark:border-slate-800 box-border shrink-0"
                          style={{ height: `${TOTAL_GRID_HEIGHT}px` }}
                        >
                          {/* Hour Guideline Rows (Clickable to open booking modal) */}
                          {TIME_SLOTS.map((time, idx) => {
                            const hourNumber = String(START_HOUR + idx).padStart(2, '0');
                            return (
                              <div
                                key={time}
                                style={{ height: `${ROW_HEIGHT}px` }}
                                onClick={() =>
                                  handleCalendarEmptySlotClick(day.dateStr, `${hourNumber}:00`)
                                }
                                title={`Click to book on ${day.displayTitle} at ${time}`}
                                className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 cursor-pointer transition-colors box-border shrink-0"
                              />
                            );
                          })}

                          {/* Plotted Appointments for this Day */}
                          {filteredAppointments
                            .filter((apt) => apt.dateStr === day.dateStr)
                            .map((apt) => {
                              const pos = calculateCardPosition(apt.startTime, apt.endTime);
                              return (
                                <div
                                  key={apt.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAppointmentClick(apt);
                                  }}
                                  style={{ top: pos.top, height: pos.height }}
                                  className={`absolute left-1 right-1 rounded p-1.5 text-xs transition-all cursor-pointer overflow-hidden z-10 shadow-2xs border ${getColorStyles(
                                    apt.color,
                                    false
                                  )} hover:shadow-md hover:scale-[1.01]`}
                                >
                                  <div className="flex items-center justify-between font-bold leading-tight text-[11px] truncate">
                                    <span className="truncate">
                                      {apt.startTime}-{apt.endTime} {apt.patientName}
                                    </span>
                                  </div>
                                  <div className="text-[10px] truncate leading-tight mt-0.5 opacity-90">
                                    {apt.service}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════════
                VIEW 3: MONTH VIEW (Full 7-Column Monthly Grid)
               ════════════════════════════════════════════════════════════════ */}
            {viewMode === 'Month' && (
              <div className="flex flex-col min-w-[700px]">
                {/* Day Headers (Mon - Sun) */}
                <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-800 text-center text-xs font-bold text-slate-600 dark:text-slate-300 py-2.5">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>

                {/* Month Grid Cells */}
                <div className="grid grid-cols-7 auto-rows-fr bg-slate-200 dark:bg-slate-800 gap-[1px]">
                  {monthCalendarGrid.map((cell) => (
                    <div
                      key={cell.dateISO}
                      onClick={() => handleCalendarEmptySlotClick(cell.dateISO, '10:00')}
                      className={`min-h-[110px] p-2 bg-white dark:bg-slate-900 transition-colors cursor-pointer group flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-slate-850 ${!cell.isCurrentMonth ? 'opacity-40 bg-slate-50/50 dark:bg-slate-950/50' : ''
                        }`}
                    >
                      {/* Top Row: Date Number + Quick Add Button */}
                      <div className="flex items-center justify-between mb-1">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentDate(new Date(cell.dateISO));
                            setViewMode('Day');
                          }}
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-transform hover:scale-110 ${cell.isToday
                            ? 'bg-[#5051F9] text-white shadow-2xs'
                            : 'text-slate-700 dark:text-slate-200'
                            }`}
                          title="Click to open Day view"
                        >
                          {cell.dayNum}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCalendarEmptySlotClick(cell.dateISO, '10:00');
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-[#5051F9] rounded transition-opacity"
                          title={`Book appointment on ${cell.dateISO}`}
                        >
                          <HugeiconsIcon icon={PlusSignIcon} size={13} />
                        </button>
                      </div>

                      {/* Appointment Chips List (Max 3 visible) */}
                      <div className="space-y-1 flex-1 overflow-hidden">
                        {cell.appointments.slice(0, 3).map((apt) => (
                          <div
                            key={apt.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAppointmentClick(apt);
                            }}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold truncate transition-colors border cursor-pointer ${getColorStyles(
                              apt.color,
                              false
                            )} hover:brightness-95`}
                            title={`${apt.startTime} - ${apt.patientName} (${apt.service})`}
                          >
                            <span className="font-bold">{apt.startTime}</span> {apt.patientName}
                          </div>
                        ))}

                        {cell.appointments.length > 3 && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentDate(new Date(cell.dateISO));
                              setViewMode('Day');
                            }}
                            className="text-[10px] font-bold text-slate-500 hover:text-[#5051F9] dark:text-slate-400 pl-1 cursor-pointer"
                          >
                            +{cell.appointments.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ════════════════════════════════════════════════════════════════════
            LOG HISTORY TAB VIEW
           ════════════════════════════════════════════════════════════════════ */
        <div className="flex-1 p-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Appointment Audit &amp; Activity Log
                </h3>
                <p className="text-xs text-slate-500">
                  Track appointment creation, check-ins, status updates, and checkout events
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {appointments.length} Event Records
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => handleAppointmentClick(apt)}
                  className="p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                      {apt.patientName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{apt.patientName}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {apt.id}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        {apt.service} • {apt.dentist} • {apt.chair}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="font-semibold text-slate-700 dark:text-slate-200">
                        {apt.dateStr} at {apt.startTime}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        KES {apt.total.toLocaleString()} ({apt.paymentStatus})
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${apt.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : apt.status === 'In Progress'
                          ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── 4. Appointment Details Modal (Opens on Calendar Click) ────────── */}
      {selectedAppointmentForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in-0 duration-200">
          <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  <HugeiconsIcon icon={Calendar01Icon} size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Appointment Details
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {selectedAppointmentForModal.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {selectedAppointmentForModal.branch} • {selectedAppointmentForModal.chair}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedAppointmentForModal.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : selectedAppointmentForModal.status === 'In Progress'
                      ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                >
                  {selectedAppointmentForModal.status}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedAppointmentForModal(null)}
                  className="p-1.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto text-xs">
              {/* Patient Banner */}
              <div className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {selectedAppointmentForModal.patientName
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedAppointmentForModal.patientName}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      {selectedAppointmentForModal.phone} • {selectedAppointmentForModal.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${selectedAppointmentForModal.phone}`}
                    className="p-2 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
                    title="Call Patient"
                  >
                    <HugeiconsIcon icon={CallIcon} size={14} />
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      alert(`Sending reminder SMS to ${selectedAppointmentForModal.phone}...`)
                    }
                    className="px-2.5 py-1.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors font-medium text-[11px] cursor-pointer"
                  >
                    Send SMS
                  </button>
                </div>
              </div>

              {/* Timing & Practitioner Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Date & Day</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedAppointmentForModal.dateStr}
                  </p>
                </div>

                <div className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Time Window</span>
                  <p className="font-bold text-[#5051F9] dark:text-[#7072ff] mt-0.5">
                    {selectedAppointmentForModal.startTime} → {selectedAppointmentForModal.endTime}
                  </p>
                </div>

                <div className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Practitioner</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                    {selectedAppointmentForModal.dentist}
                  </p>
                </div>
              </div>

              {/* Clinical Notes */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Clinical Notes & Symptoms
                </span>
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  {selectedAppointmentForModal.note || 'No clinical notes recorded.'}
                </div>
              </div>

              {/* Services Breakdown */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Procedures & Dental Services
                </span>
                <div className="space-y-1.5">
                  {selectedAppointmentForModal.services.map((svc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                          <HugeiconsIcon icon={DentalToothIcon} size={14} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {svc.name}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {svc.duration} with {svc.doctor}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold font-mono text-slate-900 dark:text-white">
                        KES {svc.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary Box */}
              <div className="p-3.5 rounded bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Payment Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${selectedAppointmentForModal.paymentStatus === 'Paid'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                  >
                    {selectedAppointmentForModal.paymentStatus} (
                    {selectedAppointmentForModal.paymentMethod})
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="font-bold text-slate-900 dark:text-white">Total Amount:</span>
                  <span className="font-extrabold text-sm text-[#00884B] dark:text-emerald-400 font-mono">
                    KES {selectedAppointmentForModal.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Status Updater Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-slate-400 text-xs font-semibold mr-1">Update Status:</span>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(selectedAppointmentForModal.id, 'In Progress')
                  }
                  className="px-2.5 py-1 rounded bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800 hover:bg-sky-100 font-semibold text-[11px] transition-colors cursor-pointer"
                >
                  In Progress
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(selectedAppointmentForModal.id, 'Completed')
                  }
                  className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 font-semibold text-[11px] transition-colors cursor-pointer"
                >
                  Completed
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(selectedAppointmentForModal.id, 'Cancelled')
                  }
                  className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 font-semibold text-[11px] transition-colors cursor-pointer"
                >
                  Cancel Apt
                </button>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
              <button
                type="button"
                onClick={() =>
                  alert(`Printing appointment sheet for ${selectedAppointmentForModal.patientName}...`)
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={PrinterIcon} size={14} />
                <span>Print</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAppointmentForModal(null)}
                  className="px-4 py-1.5 rounded border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      `Proceeding to Invoice generation for ${selectedAppointmentForModal.patientName} (KES ${selectedAppointmentForModal.total.toLocaleString()})`
                    );
                    setSelectedAppointmentForModal(null);
                  }}
                  className="px-4 py-1.5 rounded bg-[#00884B] hover:bg-[#00733f] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Checkout &amp; Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. Book Appointment Modal (Opens from empty calendar slot or button) ── */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in-0 duration-200">
          <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Book New Appointment
                  </h3>
                  <p className="text-xs text-slate-500">
                    Schedule dental chair, practitioner, and procedure
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kristin Watson"
                    value={newBooking.patientName}
                    onChange={(e) =>
                      setNewBooking({ ...newBooking, patientName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone (+254) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={newBooking.phone}
                    onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Dentist / Practitioner
                  </label>
                  <select
                    value={newBooking.dentist}
                    onChange={(e) => setNewBooking({ ...newBooking, dentist: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Dr. Darrell Steward">Dr. Darrell Steward (Surgeon)</option>
                    <option value="Dr. Faith Mutua">Dr. Faith Mutua (Orthodontist)</option>
                    <option value="Dr. Kevin Ochieng">Dr. Kevin Ochieng (Endodontist)</option>
                    <option value="Dr. Amina Kassam">Dr. Amina Kassam (Pediatric)</option>
                    <option value="Dr. Wanjiku Kimani">Dr. Wanjiku Kimani (Implantologist)</option>
                    <option value="Dr. Brian Mwangi">Dr. Brian Mwangi (General)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Dental Procedure / Service *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scaling & Polishing, Root Canal, Crown Prep"
                    value={newBooking.service}
                    onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newBooking.date}
                    onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Operatory Chair
                  </label>
                  <select
                    value={newBooking.chair}
                    onChange={(e) => setNewBooking({ ...newBooking, chair: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Operatory Chair 1">Operatory Chair 1</option>
                    <option value="Operatory Chair 2">Operatory Chair 2</option>
                    <option value="Operatory Chair 3">Operatory Chair 3</option>
                    <option value="Surgery Suite 1">Surgery Suite 1</option>
                    <option value="Pediatric Suite A">Pediatric Suite A</option>
                    <option value="Emergency Chair 4">Emergency Chair 4</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Time Window (Start to End)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={newBooking.startTime}
                      onChange={(e) =>
                        setNewBooking({ ...newBooking, startTime: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    />
                    <span className="text-slate-400 font-bold">to</span>
                    <input
                      type="time"
                      value={newBooking.endTime}
                      onChange={(e) =>
                        setNewBooking({ ...newBooking, endTime: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Clinical Notes / Symptoms
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter relevant patient medical alerts or visit reasons..."
                    value={newBooking.note}
                    onChange={(e) => setNewBooking({ ...newBooking, note: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-xs font-bold text-white bg-[#00884B] hover:bg-[#00733f] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={15} />
                  <span>Confirm Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 6. Filter Drawer ───────────────────────────────────────────────── */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-[300px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-4 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={FilterIcon} size={16} />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Calendar Filters
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </button>
            </div>

            {/* Quick Status Filter */}
            <div className="space-y-2 mb-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Filter by Status
              </h4>
              <div className="space-y-1.5 text-xs">
                {['All', 'Confirmed', 'In Progress', 'Completed', 'Scheduled'].map((st) => (
                  <label
                    key={st}
                    className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    <input
                      type="radio"
                      name="statusDrawerFilter"
                      checked={statusFilter === st}
                      onChange={() => setStatusFilter(st)}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{st}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Filter by Category
              </h4>
              <div className="space-y-1.5 text-xs">
                {[
                  'Hygiene & Preventive',
                  'Oral Surgery',
                  'Orthodontics',
                  'Endodontics',
                  'Restorative',
                  'Emergency',
                ].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(false)}
            className="w-full py-2 bg-[#00884B] hover:bg-[#00733f] text-white rounded font-bold text-xs transition-colors shadow-xs cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
