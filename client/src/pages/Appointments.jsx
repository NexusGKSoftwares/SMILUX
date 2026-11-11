import React, { useState, useMemo } from 'react';
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
} from '@hugeicons/core-free-icons';

// ─── Initial Appointments Dataset ────────────────────────────────────────────
const INITIAL_APPOINTMENTS = [
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
    dayIndex: 0, // Mon Nov 09
    dateStr: '2026-11-09',
    startTime: '10:00',
    endTime: '10:30',
    duration: '30 min',
    color: 'emerald', // mint green
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
    dayIndex: 0, // Mon Nov 09
    dateStr: '2026-11-09',
    startTime: '12:00',
    endTime: '13:00',
    duration: '60 min',
    color: 'amber', // soft yellow
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
    dayIndex: 0, // Mon Nov 09
    dateStr: '2026-11-09',
    startTime: '13:00',
    endTime: '14:00',
    duration: '60 min',
    color: 'rose', // soft red/coral
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
    dayIndex: 0, // Mon Nov 09
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
    dayIndex: 1, // Tue Nov 10
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
    dayIndex: 1, // Tue Nov 10
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
    dayIndex: 1, // Tue Nov 10 (Selected featured appointment!)
    dateStr: '2026-11-10',
    startTime: '10:00',
    endTime: '10:45',
    duration: '45 min',
    color: 'sky', // electric blue / cyan
    status: 'Completed',
    note: 'Patient reported sensitivity in lower left quadrant. Scaling performed with ultrasound scaler. Gum tissue healthy.',
    services: [
      { name: 'Comprehensive Dental Exam', duration: '20 min', doctor: 'Dr. Darrell Steward', price: 3500 },
      { name: 'Full Ultrasonic Scaling & Airflow', duration: '25 min', doctor: 'Dr. Darrell Steward', price: 4500 },
    ],
    products: [
      { name: 'Chlorhexidine Mouthwash 0.2%', price: 750 },
    ],
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
    dayIndex: 1, // Tue Nov 10
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
    dayIndex: 1, // Tue Nov 10
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
    dayIndex: 1, // Tue Nov 10
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
    dayIndex: 2, // Wed Nov 11 (Today!)
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
    dayIndex: 2, // Wed Nov 11
    dateStr: '2026-11-11',
    startTime: '12:00',
    endTime: '13:30',
    duration: '90 min',
    color: 'purple',
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
    dayIndex: 2, // Wed Nov 11
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
    dayIndex: 2, // Wed Nov 11
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
    patientName: 'Walk-in Emergency',
    phone: '+254 722 001 992',
    email: 'emergency@smilux.co.ke',
    dentist: 'Dr. Ronald Barasa',
    chair: 'Emergency Chair 4',
    branch: 'Nairobi Main',
    service: 'Chipped Incisor Composite Bonding',
    category: 'Emergency',
    dayIndex: 2, // Wed Nov 11
    dateStr: '2026-11-11',
    startTime: '17:00',
    endTime: '18:00',
    duration: '60 min',
    color: 'pink',
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
    id: 'APT-116',
    patientName: 'Emma Chepkemoi',
    phone: '+254 733 990 011',
    email: 'emma.c@gmail.com',
    dentist: 'Dr. Amina Kassam',
    chair: 'Pediatric Suite A',
    branch: 'Karen Surgery Center',
    service: 'Pediatric Checkup',
    category: 'Pediatric',
    dayIndex: 3, // Thu Nov 12
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
    dayIndex: 3, // Thu Nov 12
    dateStr: '2026-11-12',
    startTime: '09:45',
    endTime: '11:00',
    duration: '75 min',
    color: 'purple',
    status: 'Scheduled',
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
    dayIndex: 3, // Thu Nov 12
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
    id: 'APT-119',
    patientName: 'Patrick Kiplagat',
    phone: '+254 722 554 433',
    email: 'patrick.k@gmail.com',
    dentist: 'Dr. Wanjiku Kimani',
    chair: 'Implant Suite 2',
    branch: 'Upper Hill Clinic',
    service: 'Implant Fixture Placement (#46)',
    category: 'Implantology',
    dayIndex: 4, // Fri Nov 13
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
];

// Week days definition for calendar grid (anchored on Nov 09 - Nov 15, 2026)
const WEEK_DAYS = [
  { dayIndex: 0, name: 'MON', date: '22', dateStr: 'Nov 09', count: 4 },
  { dayIndex: 1, name: 'TUE', date: '23', dateStr: 'Nov 10', count: 6 },
  { dayIndex: 2, name: 'WED', date: '24', dateStr: 'Nov 11', count: 5, isToday: true },
  { dayIndex: 3, name: 'THU', date: '25', dateStr: 'Nov 12', count: 3 },
  { dayIndex: 4, name: 'FRI', date: '26', dateStr: 'Nov 13', count: 1 },
];

const TIME_SLOTS = [
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
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('APT-107'); // Default selected: Kristin Watson
  const [isSlideoverOpen, setIsSlideoverOpen] = useState(true);
  const [viewMode, setViewMode] = useState('Week'); // 'Day' | 'Week' | 'Month' | 'Staff'
  const [statusFilter, setStatusFilter] = useState('All');
  const [staffFilter, setStaffFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // New booking form state
  const [newBooking, setNewBooking] = useState({
    patientName: '',
    phone: '',
    dentist: 'Dr. Darrell Steward',
    service: 'Comprehensive Dental Exam',
    date: '2026-11-11',
    dayIndex: 2,
    startTime: '11:00',
    endTime: '12:00',
    chair: 'Surgery Suite 1',
    branch: 'Nairobi Main',
    note: '',
  });

  // Currently selected appointment object
  const selectedAppointment = useMemo(() => {
    return (
      appointments.find((a) => a.id === selectedAppointmentId) || appointments[0]
    );
  }, [appointments, selectedAppointmentId]);

  // Filtered appointments
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
        if (!matchName && !matchService && !matchDoctor && !matchPhone) return false;
      }
      return true;
    });
  }, [appointments, statusFilter, staffFilter, searchQuery]);

  // Calculate card positioning inside weekly grid
  // Grid covers 08:00 AM (8.0) to 19:00 PM (19.0), total 11 hours.
  // Each hour slot is 64px tall (total grid height: 704px).
  const calculateCardPosition = (startTimeStr, endTimeStr) => {
    const parseHour = (timeStr) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h + m / 60;
    };
    const start = parseHour(startTimeStr);
    const end = parseHour(endTimeStr);
    const top = Math.max(0, (start - 8) * 64);
    const height = Math.max(34, (end - start) * 64 - 4);
    return { top: `${top}px`, height: `${height}px` };
  };

  // Color styles mapping matching inspiration screenshot
  const getColorStyles = (color, isSelected) => {
    if (isSelected) {
      return 'bg-[#0099ff] text-white shadow-md ring-2 ring-[#0099ff] ring-offset-1 border border-[#0088ee]';
    }
    switch (color) {
      case 'emerald':
        return 'bg-[#c6f6d5] text-[#1e5838] border-l-[3px] border-[#22543d] hover:bg-[#b2f2c8]';
      case 'amber':
        return 'bg-[#fef3c7] text-[#78350f] border-l-[3px] border-[#d97706] hover:bg-[#fde68a]';
      case 'purple':
        return 'bg-[#f3e8ff] text-[#581c87] border-l-[3px] border-[#9333ea] hover:bg-[#e9d5ff]';
      case 'pink':
        return 'bg-[#fce7f3] text-[#831843] border-l-[3px] border-[#db2777] hover:bg-[#fbcfe8]';
      case 'rose':
        return 'bg-[#ffe4e6] text-[#881337] border-l-[3px] border-[#e11d48] hover:bg-[#fecdd3]';
      case 'sky':
      default:
        return 'bg-[#e0f2fe] text-[#0369a1] border-l-[3px] border-[#0284c7] hover:bg-[#bae6fd]';
    }
  };

  // Handle Add Appointment submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!newBooking.patientName.trim()) return;

    const newApt = {
      id: `APT-${120 + appointments.length}`,
      patientName: newBooking.patientName,
      phone: newBooking.phone || '+254 700 000 000',
      email: `${newBooking.patientName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      dentist: newBooking.dentist,
      chair: newBooking.chair,
      branch: newBooking.branch,
      service: newBooking.service,
      category: 'General',
      dayIndex: Number(newBooking.dayIndex),
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

    setAppointments([...appointments, newApt]);
    setSelectedAppointmentId(newApt.id);
    setIsBookingModalOpen(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-68px)] -m-4 bg-white dark:bg-slate-900 overflow-hidden font-sans">
      {/* ─── Top Control Bar (Figma CSS Auto-Layout Spec) ─────────────────── */}
      <div className="box-border flex flex-col items-start px-4 py-3 w-full h-[58px] border-b border-[#E7E7E7] dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex flex-row justify-between items-center w-full h-8 gap-3">
          {/* Left: Search & Filter pill button */}
          <div className="flex flex-row items-center gap-2">
            {/* Pill Search Input */}
            <div className="relative flex items-center w-[226px] h-8">
              <span className="absolute left-3 text-[#686868] dark:text-slate-400 pointer-events-none">
                <HugeiconsIcon icon={Search01Icon} size={15} />
              </span>
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 text-[13px] text-[#222323] dark:text-white placeholder-[#8D8D8D] bg-white dark:bg-slate-800 border border-[#D4D4D4] dark:border-slate-700 rounded-full focus:outline-none focus:border-[#00884B]"
              />
            </div>

            {/* Pill Filters Button */}
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
              className="flex flex-row items-center justify-center px-3 h-8 bg-[#F5F5F5] dark:bg-slate-800 hover:bg-[#ebebeb] dark:hover:bg-slate-700 text-[#222323] dark:text-white rounded-full text-[13px] font-medium transition-colors cursor-pointer gap-1.5"
            >
              <HugeiconsIcon icon={FilterIcon} size={15} />
              <span>Filters</span>
            </button>
          </div>

          {/* Center: Date Navigator (Figma Spec: Arrow, Nov 11, 2026, Arrow) */}
          <div className="flex flex-row items-center justify-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentWeekOffset((prev) => prev - 1)}
              className="flex items-center justify-center w-9 h-8 rounded hover:bg-[#F5F5F5] dark:hover:bg-slate-800 text-[#222323] dark:text-white transition-colors cursor-pointer"
              title="Previous Week"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
            </button>
            <span className="text-[18px] font-medium text-[#222323] dark:text-white px-2">
              November 11, 2026
            </span>
            <button
              type="button"
              onClick={() => setCurrentWeekOffset((prev) => prev + 1)}
              className="flex items-center justify-center w-9 h-8 rounded hover:bg-[#F5F5F5] dark:hover:bg-slate-800 text-[#222323] dark:text-white transition-colors cursor-pointer"
              title="Next Week"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
            </button>
          </div>

          {/* Right: Today, View Switcher, Filter Dropdowns, Book Button */}
          <div className="flex flex-row items-center justify-end gap-2">
            {/* "Today" Button */}
            <button
              type="button"
              onClick={() => setCurrentWeekOffset(0)}
              className="px-3 h-8 bg-white dark:bg-slate-800 border border-[#D4D4D4] dark:border-slate-700 hover:bg-[#F5F5F5] dark:hover:bg-slate-700 rounded text-[13px] font-medium text-[#222323] dark:text-white transition-colors cursor-pointer"
            >
              Today
            </button>

            {/* View Mode Switcher: Day, Week, Month, Staff */}
            <div className="inline-flex rounded border border-[#D4D4D4] dark:border-slate-700 p-0.5 bg-white dark:bg-slate-800 h-8">
              {['Day', 'Week', 'Month', 'Staff'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`px-2.5 text-[12px] font-medium rounded transition-colors cursor-pointer ${viewMode === mode
                    ? 'bg-[#00884B] text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Status Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 px-2 text-[12px] bg-white dark:bg-slate-800 border border-[#D4D4D4] dark:border-slate-700 rounded text-[#222323] dark:text-white focus:outline-none"
            >
              <option value="All">All status</option>
              <option value="Completed">Completed</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Progress">In Progress</option>
              <option value="Scheduled">Scheduled</option>
            </select>

            {/* Staff Dropdown */}
            <select
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              className="h-8 px-2 text-[12px] bg-white dark:bg-slate-800 border border-[#D4D4D4] dark:border-slate-700 rounded text-[#222323] dark:text-white focus:outline-none"
            >
              <option value="All">All staff</option>
              <option value="Steward">Dr. Darrell Steward</option>
              <option value="Mutua">Dr. Faith Mutua</option>
              <option value="Ochieng">Dr. Kevin Ochieng</option>
              <option value="Kassam">Dr. Amina Kassam</option>
            </select>

            {/* Add Appointment Button */}
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="flex items-center gap-1 px-3 h-8 bg-[#00884B] hover:bg-[#00733f] text-white rounded text-[13px] font-medium transition-colors cursor-pointer shadow-xs"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={15} />
              <span className="hidden sm:inline">Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Metric KPI Cards Row (From Inspo Screenshot) ─────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-4 py-2.5 border-b border-[#E7E7E7] dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-900/60 shrink-0">
        <div className="flex items-center justify-between px-3.5 py-2 rounded bg-white dark:bg-slate-800 border border-[#E7E7E7] dark:border-slate-700/60 shadow-2xs">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <span>Total Appointments</span>
              <span className="text-[10px] text-slate-400">Last 7 days</span>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              140
            </div>
          </div>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            +12% vs last week
          </span>
        </div>

        <div className="flex items-center justify-between px-3.5 py-2 rounded bg-white dark:bg-slate-800 border border-[#E7E7E7] dark:border-slate-700/60 shadow-2xs">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <span>Compl. Appointment</span>
              <span className="text-[10px] text-slate-400">Last 7 days</span>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              85%
            </div>
          </div>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            +12% vs last week
          </span>
        </div>

        <div className="flex items-center justify-between px-3.5 py-2 rounded bg-white dark:bg-slate-800 border border-[#E7E7E7] dark:border-slate-700/60 shadow-2xs">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <span>No Show Appointment</span>
              <span className="text-[10px] text-slate-400">Last 7 days</span>
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              7%
            </div>
          </div>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
            +12% vs last week
          </span>
        </div>
      </div>

      {/* ─── Main Calendar Layout + Right Peek Panel Container ────────────── */}
      <div className="flex flex-row flex-1 overflow-hidden relative">
        {/* Calendar Grid Area */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-auto select-none">
          {/* Day Header Row */}
          <div className="sticky top-0 z-20 flex flex-row bg-white dark:bg-slate-900 border-b border-[#E7E7E7] dark:border-slate-800 min-w-[700px]">
            {/* Time zone corner */}
            <div className="w-16 h-11 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-400 border-r border-[#E7E7E7] dark:border-slate-800">
              GMT +3
            </div>

            {/* Day columns headers */}
            <div className="grid grid-cols-5 flex-1">
              {WEEK_DAYS.map((day) => (
                <div
                  key={day.dayIndex}
                  className={`h-11 px-3 py-1 flex items-center justify-between border-r border-[#E7E7E7] dark:border-slate-800 ${day.isToday ? 'bg-sky-50/50 dark:bg-sky-950/20' : ''
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${day.isToday
                        ? 'bg-[#0099ff] text-white'
                        : 'text-slate-900 dark:text-white'
                        }`}
                    >
                      {day.date}
                    </span>
                    <div className="leading-tight">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                        {day.name}
                      </span>
                      <span className="block text-[10px] text-slate-400">
                        {day.count} appointments
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Grid with Appointment Cards */}
          <div className="relative flex flex-row min-w-[700px] h-[768px]">
            {/* Left Time Slots column */}
            <div className="w-16 shrink-0 flex flex-col border-r border-[#E7E7E7] dark:border-slate-800">
              {TIME_SLOTS.map((time, idx) => (
                <div
                  key={time}
                  className="h-16 relative border-b border-[#E7E7E7]/60 dark:border-slate-800/60 text-right pr-2"
                >
                  <span className="text-[10px] font-semibold text-slate-400 relative -top-2">
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Red Live Current Time Indicator Line (at ~11:30 AM = 3.5 hours from 8:00 = 224px) */}
            <div
              className="absolute left-16 right-0 z-10 pointer-events-none flex items-center"
              style={{ top: '224px' }}
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 -ml-1"></div>
              <div className="flex-1 border-t-2 border-rose-500"></div>
              <span className="bg-rose-500 text-white text-[9px] font-bold px-1 rounded mr-2">
                11:30
              </span>
            </div>

            {/* 5-Day Columns */}
            <div className="grid grid-cols-5 flex-1 relative">
              {WEEK_DAYS.map((day) => (
                <div
                  key={day.dayIndex}
                  className="relative border-r border-[#E7E7E7] dark:border-slate-800 h-full"
                >
                  {/* Horizontal Hour Guideline Lines */}
                  {TIME_SLOTS.map((time) => (
                    <div
                      key={time}
                      className="h-16 border-b border-[#E7E7E7]/50 dark:border-slate-800/50"
                    />
                  ))}

                  {/* Appointments plotted on this day */}
                  {filteredAppointments
                    .filter((apt) => apt.dayIndex === day.dayIndex)
                    .map((apt) => {
                      const pos = calculateCardPosition(apt.startTime, apt.endTime);
                      const isSelected = selectedAppointmentId === apt.id;

                      return (
                        <div
                          key={apt.id}
                          onClick={() => {
                            setSelectedAppointmentId(apt.id);
                            setIsSlideoverOpen(true);
                          }}
                          style={{ top: pos.top, height: pos.height }}
                          className={`absolute left-1 right-1 rounded p-1.5 text-xs transition-all cursor-pointer overflow-hidden z-5 shadow-2xs ${getColorStyles(
                            apt.color,
                            isSelected
                          )}`}
                        >
                          <div className="flex items-center justify-between font-semibold leading-tight text-[11px] truncate">
                            <span className="truncate">
                              {apt.startTime}-{apt.endTime} {apt.patientName}
                            </span>
                            {isSelected && (
                              <span className="shrink-0 text-[10px] ml-1">●</span>
                            )}
                          </div>
                          <div
                            className={`text-[10px] truncate leading-tight mt-0.5 ${isSelected ? 'text-sky-100' : 'text-slate-600 dark:text-slate-300'
                              }`}
                          >
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

        {/* ─── Right Slide-over Details Peek Panel (From Inspo Screenshot) ── */}
        {isSlideoverOpen && selectedAppointment && (
          <aside className="w-[360px] lg:w-[410px] shrink-0 border-l border-[#E7E7E7] dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full overflow-y-auto animate-in slide-in-from-right duration-200 z-30">
            {/* Top Status Header Pill */}
            <div className="p-3 bg-[#0099ff] text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold">Appointment {selectedAppointment.status}</span>
                <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
              </div>
              <button
                type="button"
                onClick={() => setIsSlideoverOpen(false)}
                className="p-1 rounded hover:bg-white/20 transition-colors text-white"
                title="Close Peek Panel"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </button>
            </div>

            {/* Patient Header Block */}
            <div className="p-4 border-b border-[#E7E7E7] dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1e293b] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {selectedAppointment.patientName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedAppointment.patientName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedAppointment.phone}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert(`Editing patient record for ${selectedAppointment.patientName}`)}
                className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={PencilEdit01Icon} size={15} />
              </button>
            </div>

            {/* Date, Time & Operatory Details */}
            <div className="px-4 py-3 border-b border-[#E7E7E7] dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <HugeiconsIcon icon={Clock01Icon} size={14} className="text-slate-400" />
                  <span>
                    {selectedAppointment.startTime} → {selectedAppointment.endTime}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {selectedAppointment.dateStr} • {selectedAppointment.duration} • {selectedAppointment.chair}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {selectedAppointment.status}
              </span>
            </div>

            {/* Notes Section */}
            <div className="p-4 border-b border-[#E7E7E7] dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Clinical Note
              </div>
              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300">
                {selectedAppointment.note || 'No notes added for this appointment.'}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="p-4 border-b border-[#E7E7E7] dark:border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  alert(`Proceeding to Checkout / Invoice generation for ${selectedAppointment.patientName}`)
                }
                className="flex-1 py-2 px-4 rounded bg-[#0099ff] hover:bg-[#0088ee] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer text-center"
              >
                Checkout &amp; Invoice
              </button>
              <button
                type="button"
                onClick={() => alert('Additional Actions: Reschedule, Cancel, Send Reminder SMS')}
                className="w-9 h-8 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
              </button>
            </div>

            {/* Services List Breakdown */}
            <div className="p-4 border-b border-[#E7E7E7] dark:border-slate-800 flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Dental Services
                </span>
                <span className="text-[11px] text-slate-500">
                  {selectedAppointment.services.length} Services • {selectedAppointment.duration}
                </span>
              </div>

              <div className="space-y-2">
                {selectedAppointment.services.map((svc, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start justify-between text-xs"
                  >
                    <div className="flex items-start gap-2">
                      <div className="p-1 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 shrink-0 mt-0.5">
                        <HugeiconsIcon icon={DentalToothIcon} size={13} />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {svc.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {svc.duration} with {svc.doctor}
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      KES {svc.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Products Section (if any) */}
              {selectedAppointment.products.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1.5">
                    Products &amp; Prescriptions
                  </span>
                  {selectedAppointment.products.map((prod, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-700 dark:text-slate-300 truncate">
                        {prod.name}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        KES {prod.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Summary Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-[#E7E7E7] dark:border-slate-800 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Payment Summary
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${selectedAppointment.paymentStatus === 'Paid'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                >
                  {selectedAppointment.paymentStatus}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    KES {selectedAppointment.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (Exempt)</span>
                  <span className="font-medium text-slate-900 dark:text-white">KES 0</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white text-sm">
                  <span>Total Paid</span>
                  <span className="text-[#00884B] tabular-nums">
                    KES {selectedAppointment.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ─── Side Filter & Mini-Calendar Drawer (From Figma Auto-Layout Spec) ── */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-[300px] bg-white dark:bg-slate-900 border-l border-[#E7E7E7] dark:border-slate-800 shadow-2xl p-4 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E7] dark:border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={FilterIcon} size={16} />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Calendar Filters</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </button>
            </div>

            {/* Mini Month Calendar Widget (Figma spec: November 2026 table) */}
            <div className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-[#FAFAFA] dark:bg-slate-800/60 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  November 2026
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-0.5 hover:bg-slate-200 rounded text-slate-500">
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={13} />
                  </button>
                  <button className="p-0.5 hover:bg-slate-200 rounded text-slate-500">
                    <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-slate-400 mb-1">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              {/* 30 Days Grid with Nov 11 highlighted */}
              <div className="grid grid-cols-7 gap-0.5 text-center text-[11px]">
                {Array.from({ length: 30 }, (_, i) => {
                  const dayNum = i + 1;
                  const isCurrentDay = dayNum === 11;
                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => alert(`Jumping calendar to Nov ${dayNum}, 2026`)}
                      className={`h-6 w-full rounded flex items-center justify-center font-medium transition-colors ${isCurrentDay
                        ? 'bg-[#FFE5A2] text-[#BA510B] font-bold'
                        : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular Filter Toggles */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Filter by Category
              </h4>
              <div className="space-y-1.5 text-xs">
                {['Hygiene & Preventive', 'Oral Surgery', 'Orthodontics', 'Endodontics', 'Restorative', 'Emergency'].map(
                  (cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                      <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-600" />
                      <span>{cat}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(false)}
            className="w-full py-2 bg-[#00884B] hover:bg-[#00733f] text-white rounded font-medium text-xs transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}

      {/* ─── Book Appointment Modal ───────────────────────────────────────── */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Book New Appointment
                  </h3>
                  <p className="text-xs text-slate-500">
                    Schedule dental chair, practitioner, and procedure
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kristin Watson"
                    value={newBooking.patientName}
                    onChange={(e) => setNewBooking({ ...newBooking, patientName: e.target.value })}
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
                    <option value="Dr. Brian Mwangi">Dr. Brian Mwangi (General)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Dental Procedure / Service
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Comprehensive Dental Exam & Scaling"
                    value={newBooking.service}
                    onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Day of Week
                  </label>
                  <select
                    value={newBooking.dayIndex}
                    onChange={(e) => setNewBooking({ ...newBooking, dayIndex: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="0">Monday (Nov 09)</option>
                    <option value="1">Tuesday (Nov 10)</option>
                    <option value="2">Wednesday (Nov 11 - Today)</option>
                    <option value="3">Thursday (Nov 12)</option>
                    <option value="4">Friday (Nov 13)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Time Window
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={newBooking.startTime}
                      onChange={(e) => setNewBooking({ ...newBooking, startTime: e.target.value })}
                      className="w-full px-2 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    />
                    <span className="self-center text-xs text-slate-400">to</span>
                    <input
                      type="time"
                      value={newBooking.endTime}
                      onChange={(e) => setNewBooking({ ...newBooking, endTime: e.target.value })}
                      className="w-full px-2 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
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

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-[#00884B] hover:bg-[#00733f] transition-colors flex items-center gap-1.5"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={15} />
                  <span>Confirm Appointment Booking</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

