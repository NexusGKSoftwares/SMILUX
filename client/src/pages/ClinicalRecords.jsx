import React, { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout';
import DataTable from '../components/UI/DataTable.jsx';
import RowActionDropdown from '../components/UI/RowActionDropdown.jsx';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Upload01Icon,
  Download01Icon,
  DentalToothIcon,
  MoreHorizontalIcon,
  Cancel01Icon,
  PlusSignIcon,
  Doc01Icon,
  Calendar01Icon,
  Invoice01Icon,
  BubbleChatIcon,
  PencilEdit01Icon,
  Delete02Icon,
  Search01Icon,
  FilterHorizontalIcon,
  Settings02Icon,
  Idea01Icon,
  EyeIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  AlertCircleIcon,
  FileAttachmentIcon,
  PrinterIcon,
} from '@hugeicons/core-free-icons';

// ─── Initial Mock Dataset: Dental Clinical Records ────────────────────────────
const INITIAL_CLINICAL_RECORDS = [
  {
    id: 'REC-2026-0182',
    date: '09 Nov 2026, 09:30 AM',
    patientId: 'PAT-1082',
    patientName: 'Wanjiku Kamau',
    doctor: 'Dr. Avicena M.',
    tooth: '#36 (Lower Left First Molar)',
    category: 'Endodontics',
    procedure: 'Root Canal Obturation (Tooth #36)',
    diagnosis: 'Symptomatic Irreversible Pulpitis',
    soap: {
      s: 'Patient reports mild tenderness to percussion; thermal sensitivity resolved post-pulpectomy.',
      o: 'Canals dry, no purulence. Working lengths confirmed via electronic apex locator: MB 21mm, ML 21mm, D 21.5mm.',
      a: 'Treated pulpal necrosis & apical periodontitis; canals ready for obturation.',
      p: 'Obturation with AH Plus sealer & gutta-percha single cone technique. Cavit temporary restoration placed. Scheduled for crown prep.',
    },
    materials: 'AH Plus Sealer, Gutta-percha .04 taper, Cavit G',
    anesthetic: '2% Lidocaine with 1:100k Epinephrine (1.8ml IANB)',
    status: 'Completed',
    xrayCount: 2,
  },
  {
    id: 'REC-2026-0181',
    date: '09 Nov 2026, 11:15 AM',
    patientId: 'PAT-1081',
    patientName: 'Brian Omondi',
    doctor: 'Dr. Amina K.',
    tooth: '#14 (Upper Right First Premolar)',
    category: 'Restorative',
    procedure: 'Class II MO Composite Restoration',
    diagnosis: 'Interproximal Dental Caries',
    soap: {
      s: 'Food packing between #14 and #15, mild sensitivity to cold sweets.',
      o: 'Mesial cavitated lesion extending into outer half of dentin. Bitewing radiograph confirms D2 lesion.',
      a: 'Active dentinal caries #14 Mesio-Occlusal.',
      p: 'Rubber dam isolation. Conservative cavity preparation. Total-etch with 37% phosphoric acid, Prime&Bond active, Filtek Z350 XT shade A2.',
    },
    materials: 'Filtek Z350 XT (A2), Palodent V3 Matrix, Gluma Desensitizer',
    anesthetic: '4% Articaine with 1:100k Epinephrine (Infiltration 1.2ml)',
    status: 'Completed',
    xrayCount: 1,
  },
  {
    id: 'REC-2026-0180',
    date: '08 Nov 2026, 02:00 PM',
    patientId: 'PAT-1080',
    patientName: 'Mercy Njeri',
    doctor: 'Dr. Avicena M.',
    tooth: 'Full Mouth / Generalized',
    category: 'Periodontics',
    procedure: 'Full Mouth Scaling & Subgingival Debridement',
    diagnosis: 'Generalized Stage II Grade B Periodontitis',
    soap: {
      s: 'Patient notices bleeding gums during morning brushing for the past 3 months. No acute pain.',
      o: 'Generalized pocket depths 4-5mm on molars and premolars. Moderate supra- and subgingival calculus.',
      a: 'Chronic marginal gingivitis superimposed on localized moderate periodontitis.',
      p: 'Ultrasonic piezo scaling with chlorhexidine lavage. Subgingival root planing with Gracey curettes #11/12 and #13/14. Oral hygiene instruction (Bass technique).',
    },
    materials: 'Cavitron ultrasonic inserts, 0.12% Chlorhexidine gluconate',
    anesthetic: 'Topical Benzocaine 20% gel',
    status: 'Completed',
    xrayCount: 4,
  },
  {
    id: 'REC-2026-0179',
    date: '08 Nov 2026, 03:45 PM',
    patientId: 'PAT-1079',
    patientName: 'Kevin Mutua',
    doctor: 'Dr. Omondi P.',
    tooth: '#48 (Lower Right Third Molar)',
    category: 'Oral Surgery',
    procedure: 'Surgical Extraction of Mesioangular Impacted #48',
    diagnosis: 'Partial Bony Impaction & Recurrent Pericoronitis',
    soap: {
      s: 'Recurrent swelling and trismus in the lower right retromolar pad over past 6 weeks.',
      o: 'Class II Position B mesioangular impaction. Operculum inflamed and ulcerated. OPG shows roots clear of inferior alveolar nerve canal.',
      a: 'Symptomatic impacted tooth #48 with pericoronal inflammation.',
      p: 'Full thickness triangular envelope mucoperiosteal flap. Buccal guttering and crown sectioning with 702 fissure bur under copious saline irrigation. Tooth delivered in segments. Granulation debrided. 3-0 Silk suture x 2 placed. Post-op amoxicillin & ibuprofen prescribed.',
    },
    materials: '3-0 Silk Sutures, Sterile Saline, Surgicel hemostatic mesh',
    anesthetic: '2% Mepivacaine with 1:100k Adrenaline (IANB + Long Buccal)',
    status: 'Follow Up Required',
    xrayCount: 3,
  },
  {
    id: 'REC-2026-0178',
    date: '07 Nov 2026, 10:00 AM',
    patientId: 'PAT-1078',
    patientName: 'Grace Chebet',
    doctor: 'Dr. Amina K.',
    tooth: '#11, #21 (Maxillary Central Incisors)',
    category: 'Restorative',
    procedure: 'Direct Composite Veneering (Diastema Closure)',
    diagnosis: 'Midline Diastema (2.5mm) & Enamel Hypoplasia',
    soap: {
      s: 'Aesthetic concern regarding space between front teeth. Wishes to avoid orthodontic therapy if possible.',
      o: 'Maxillary midline diastema measured 2.4mm. Normal lip dynamic and smile arc.',
      a: 'Cosmetic maxillary midline diastema.',
      p: 'Shade mapping (DentinvA2, Enamel A1). Polishing without preparation. Bioclear matrix technique with heated composite. High gloss finish with Sof-Lex discs and diamond polishing paste. Patient delighted with immediate result.',
    },
    materials: 'Filtek Supreme Ultra, Bioclear Diamond Wedges, Prisma Gloss',
    anesthetic: 'None (Non-invasive)',
    status: 'Completed',
    xrayCount: 1,
  },
  {
    id: 'REC-2026-0177',
    date: '07 Nov 2026, 01:30 PM',
    patientId: 'PAT-1077',
    patientName: 'David Kipkorir',
    doctor: 'Dr. Avicena M.',
    tooth: '#21 (Upper Left Central Incisor)',
    category: 'Prosthodontics',
    procedure: 'Full Zirconia Crown Impression & Temporary Placement',
    diagnosis: 'Extensively Broken Down Tooth Post-Endodontics',
    soap: {
      s: 'Root canal completed last week. Ready for definitive crown coverage.',
      o: 'Tooth restored with fiber post and composite core. Good ferrule height (2mm circumferential).',
      a: 'Compromised coronal structure requiring full coverage restoration.',
      p: 'Chamfer preparation with 1.2mm axial reduction. Gingival retraction cord #000 placed. Digital intraoral 3D scan with Medit i700. Luxatemp provisional crown cemented with TempBond NE.',
    },
    materials: 'Luxatemp shade A3, TempBond NE, Ultrapak #000 retraction cord',
    anesthetic: '2% Lidocaine 1:100k Epi (Infiltration 1.0ml)',
    status: 'In Progress',
    xrayCount: 2,
  },
  {
    id: 'REC-2026-0176',
    date: '06 Nov 2026, 11:00 AM',
    patientId: 'PAT-1076',
    patientName: 'Amina Mohammed',
    doctor: 'Dr. Amina K.',
    tooth: '#54 (Upper Right Primary First Molar)',
    category: 'Pediatric',
    procedure: 'Pulpotomy & Stainless Steel Crown Placement',
    diagnosis: 'Deep Dentinal Caries Involving Coronal Pulp',
    soap: {
      s: 'Mother reports child woke up crying two nights ago; pain on eating.',
      o: 'Deep occlusal caries #54. Pre-op PA shows clear bifurcation with no furcation radiolucency.',
      a: 'Reversible coronal pulpitis in primary molar #54.',
      p: 'Coronal pulp amputated. Hemostasis achieved within 3 minutes with sterile cotton pellet. MTA (Mineral Trioxide Aggregate) placed over radicular stumps. Pre-crimped SSC size 4 cemented with Ketac Cem Glass Ionomer.',
    },
    materials: 'ProRoot MTA, 3M Stainless Steel Crown Size 4, Ketac Cem GIC',
    anesthetic: '2% Lidocaine Infiltration with 1:100k Adrenaline (0.9ml)',
    status: 'Completed',
    xrayCount: 2,
  },
  {
    id: 'REC-2026-0175',
    date: '06 Nov 2026, 03:00 PM',
    patientId: 'PAT-1075',
    patientName: 'Faith Mwangi',
    doctor: 'Dr. Omondi P.',
    tooth: 'Maxillary & Mandibular Arches',
    category: 'Orthodontics',
    procedure: 'Orthodontic Routine Wire Adjustment (0.016x0.022 SS)',
    diagnosis: 'Class II Division 1 Malocclusion (Month 7)',
    soap: {
      s: 'Patient compliant with intermaxillary elastics. No bracket debonds since last visit.',
      o: 'Overjet reduced from 6mm to 3.5mm. Canine relationship Class I bilaterally.',
      a: 'Favorable progression in space closure and leveling.',
      p: 'Archwires changed to 0.016x0.022 Stainless Steel upper & lower. Powerchain placed from #13 to #23. Class II elastics continued (3/16 4.5oz nightly). Next recall in 4 weeks.',
    },
    materials: '0.016x0.022 SS Archwire, Ormco Silver Powerchain, Fox Elastics',
    anesthetic: 'None',
    status: 'Completed',
    xrayCount: 0,
  },
  {
    id: 'REC-2026-0174',
    date: '05 Nov 2026, 09:00 AM',
    patientId: 'PAT-1074',
    patientName: 'Hassan Abdi',
    doctor: 'Dr. Avicena M.',
    tooth: '#46 (Lower Right First Molar)',
    category: 'Endodontics',
    procedure: 'Emergency Pulpectomy & Biomechanical Preparation',
    diagnosis: 'Acute Apical Abscess & Necrotic Pulp #46',
    soap: {
      s: 'Severe throbbing pain keeping patient awake all night. Exquisite tenderness on touch.',
      o: 'Vestibular fluctuant swelling adjacent to #46. Tooth non-responsive to cold. PA shows widened PDL space and periapical lucency.',
      a: 'Acute apical abscess secondary to pulpal necrosis #46.',
      p: 'Access cavity prepared under rubber dam. Purulent drainage vented through root canals. Copious irrigation with 3% NaOCl and 17% EDTA. Canals enlarged to size #20. Calcium hydroxide (Calcicur) intracanal medicament placed. Temporary seal with Coltosol. Follow-up in 10 days for obturation.',
    },
    materials: '3% Sodium Hypochlorite, Calcicur paste, Coltosol',
    anesthetic: '4% Articaine IANB + Supplemental PDL injection',
    status: 'In Progress',
    xrayCount: 3,
  },
  {
    id: 'REC-2026-0173',
    date: '05 Nov 2026, 02:15 PM',
    patientId: 'PAT-1073',
    patientName: 'Yvonne Wambui',
    doctor: 'Dr. Omondi P.',
    tooth: '#31, #41 (Lower Central Incisors)',
    category: 'Periodontics',
    procedure: 'Subepithelial Connective Tissue Graft (Cairo Class I)',
    diagnosis: 'Localized Gingival Recession (3mm) with Dentin Hypersensitivity',
    soap: {
      s: 'Sensitive to cold air and brushing; unhappy with root exposure.',
      o: '3mm Miller Class I recession on facial aspect of #31 and #41. Keratinized tissue band < 1mm.',
      a: 'Mucogingival defect with inadequate attached gingiva.',
      p: 'Tunnel preparation performed at recipient site. Autogenous subepithelial connective tissue graft harvested from palate using single incision technique. Graft positioned and secured with 5-0 PGA sutures. Coe-Pak periodontal dressing placed over palate.',
    },
    materials: '5-0 Vicryl Suture, Coe-Pak Periodontal Dressing, Sterile Saline',
    anesthetic: '2% Lidocaine with 1:50k Adrenaline for donor & recipient sites',
    status: 'Follow Up Required',
    xrayCount: 2,
  },
  {
    id: 'REC-2026-0172',
    date: '04 Nov 2026, 10:45 AM',
    patientId: 'PAT-1072',
    patientName: 'Peter Njoroge',
    doctor: 'Dr. Avicena M.',
    tooth: 'Maxillary & Mandibular Edentulous Ridges',
    category: 'Prosthodontics',
    procedure: 'Full Denture Final Secondary Wash Impression',
    diagnosis: 'Complete Bimaxillary Edentulism',
    soap: {
      s: 'Patient ready for final impression stages. Custom trays adjusted with good border clearance.',
      o: 'Well-formed maxillary ridge; moderately resorbed mandibular ridge.',
      a: 'Edentulous arches requiring complete dentures.',
      p: 'Green stick compound border molding along buccal and lingual sulci. Secondary wash impression recorded with zinc oxide eugenol paste (ZOE). Peripheral roll well-defined with good suction on upper tray. Sent to dental lab for wax bite rim fabrication.',
    },
    materials: 'Kerr Green Stick Compound, SS White ZOE Impression Paste',
    anesthetic: 'None',
    status: 'In Progress',
    xrayCount: 1,
  },
  {
    id: 'REC-2026-0171',
    date: '04 Nov 2026, 04:00 PM',
    patientId: 'PAT-1071',
    patientName: 'Sharon Akoth',
    doctor: 'Dr. Amina K.',
    tooth: 'Upper & Lower Arches',
    category: 'Orthodontics',
    procedure: 'Clear Aligner Delivery (Tray Set #05 to #08)',
    diagnosis: 'Mild Anterior Crowding & Rotation (#12, #22)',
    soap: {
      s: 'Aligners worn 22 hours/day. No discomfort. Tracking well.',
      o: 'Composite attachments on #13, #11, #21, #23 intact and undamaged. Interproximal contacts matching 3D staging software.',
      a: 'Excellent aligner compliance and tooth movement.',
      p: 'Delivered aligner trays #05, #06, #07, #08 with instructions to change every 10 days. Chewies provided for seating. Next clinical review at stage #09.',
    },
    materials: 'Invisalign Aligner Trays, Silicone Chewies, Aligner Case',
    anesthetic: 'None',
    status: 'Completed',
    xrayCount: 0,
  },
  {
    id: 'REC-2026-0170',
    date: '03 Nov 2026, 09:15 AM',
    patientId: 'PAT-1070',
    patientName: 'Samuel Gitau',
    doctor: 'Dr. Avicena M.',
    tooth: '#16 (Upper Right First Molar)',
    category: 'Oral Surgery',
    procedure: 'Surgical Root Tip Retrieval & Socket Preservation',
    diagnosis: 'Retained Palatal Root Fracture (#16)',
    soap: {
      s: 'Referred from peripheral clinic after crown fractured during attempted extraction.',
      o: 'Fractured palatal root fragment ~6mm embedded in bone. Intraoral PA shows root apex in close proximity to maxillary sinus floor.',
      a: 'Retained root apex tooth #16 without sinus perforation.',
      p: 'Conservative elevation with micro-luxator without heavy apical pressure. Root delivered intact. Valsalva maneuver negative (no oroantral communication). Socket grafted with Bio-Oss bovine bone mineral and Collatape collagen plug. 4-0 Silk cross-mattress suture.',
    },
    materials: 'Geistlich Bio-Oss 0.5g, Zimmer Collatape, 4-0 Silk',
    anesthetic: '2% Lidocaine 1:100k Adrenaline (PSA + Greater Palatine Block)',
    status: 'Completed',
    xrayCount: 3,
  },
  {
    id: 'REC-2026-0169',
    date: '03 Nov 2026, 01:00 PM',
    patientId: 'PAT-1069',
    patientName: 'Esther Moraa',
    doctor: 'Dr. Amina K.',
    tooth: '#24 (Upper Left First Premolar)',
    category: 'Restorative',
    procedure: 'Class V Composite Restoration (Cervical Abfraction)',
    diagnosis: 'Non-Carious Cervical Lesion (NCCL) & Hypersensitivity',
    soap: {
      s: 'Sharp sensitivity when drinking cold water or inhaling cold air.',
      o: '2mm deep V-shaped wedge defect at buccal cervical margin #24. No pulpal involvement.',
      a: 'Cervical abfraction lesion secondary to bruxism / heavy lateral excursion.',
      p: 'Gingival retraction cord placed. Selective enamel etching. Single Bond Universal adhesive cured for 10s. Flowable composite liner + Filtek One Bulk Fill A3. Occlusal adjustment in lateral excursive movements to reduce contact.',
    },
    materials: 'Single Bond Universal, Filtek Bulk Fill Flowable, Sof-Lex spiral wheels',
    anesthetic: 'None needed',
    status: 'Completed',
    xrayCount: 1,
  },
  {
    id: 'REC-2026-0168',
    date: '02 Nov 2026, 11:30 AM',
    patientId: 'PAT-1068',
    patientName: 'Francis Kiprop',
    doctor: 'Dr. Omondi P.',
    tooth: '#37 (Lower Left Second Molar)',
    category: 'Restorative',
    procedure: 'Occlusal Composite Filling (Tooth #37)',
    diagnosis: 'Arrested Pit and Fissure Caries with Staining',
    soap: {
      s: 'Routine examination finding, asymptomatic.',
      o: 'Deep stained fissure on occlusal surface, catch with dental explorer, ICDAS code 2.',
      a: 'Fissure caries #37 without dentinal cavitation.',
      p: 'Air abrasion cavity conditioning. Etched for 15 seconds, bonded, and restored with GrandioSO composite A2. Fissure sealant applied to adjacent #38.',
    },
    materials: 'GrandioSO A2, Heliobond, Grandio Seal',
    anesthetic: 'None',
    status: 'Completed',
    xrayCount: 1,
  },
];

export default function ClinicalRecords() {
  const [records, setRecords] = useState(INITIAL_CLINICAL_RECORDS);
  const [selectedRecordIds, setSelectedRecordIds] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Drawers state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [viewingRecord, setViewingRecord] = useState(null);

  // New Record Form State
  const [newRecordForm, setNewRecordForm] = useState({
    patientName: '',
    patientId: 'PAT-1082',
    doctor: 'Dr. Avicena M.',
    tooth: '#11',
    category: 'Restorative',
    procedure: '',
    diagnosis: '',
    soapS: '',
    soapO: '',
    soapA: '',
    soapP: '',
    materials: '',
    anesthetic: '2% Lidocaine with 1:100k Epinephrine',
    status: 'Completed',
  });

  // Tab categorization counts
  const tabCounts = useMemo(() => {
    return {
      all: records.length,
      restorative: records.filter((r) => r.category === 'Restorative' || r.category === 'Endodontics').length,
      surgery: records.filter((r) => r.category === 'Oral Surgery').length,
      periodontics: records.filter((r) => r.category === 'Periodontics').length,
      ortho: records.filter((r) => r.category === 'Orthodontics').length,
      followUp: records.filter((r) => r.status === 'Follow Up Required' || r.status === 'In Progress').length,
    };
  }, [records]);

  // Tabs structure matching PageHeader
  const tabs = [
    { id: 'all', label: 'All Records', count: tabCounts.all },
    { id: 'restorative', label: 'Restorative & Endo', count: tabCounts.restorative },
    { id: 'surgery', label: 'Oral Surgery', count: tabCounts.surgery },
    { id: 'periodontics', label: 'Periodontics', count: tabCounts.periodontics },
    { id: 'ortho', label: 'Orthodontics', count: tabCounts.ortho },
    { id: 'follow-up', label: 'Pending & Follow Up', count: tabCounts.followUp },
  ];

  // Tab filtering
  const tabFilteredRecords = useMemo(() => {
    let result = records;
    if (activeTab === 'restorative') {
      result = records.filter((r) => r.category === 'Restorative' || r.category === 'Endodontics');
    } else if (activeTab === 'surgery') {
      result = records.filter((r) => r.category === 'Oral Surgery');
    } else if (activeTab === 'periodontics') {
      result = records.filter((r) => r.category === 'Periodontics');
    } else if (activeTab === 'ortho') {
      result = records.filter((r) => r.category === 'Orthodontics');
    } else if (activeTab === 'follow-up') {
      result = records.filter((r) => r.status === 'Follow Up Required' || r.status === 'In Progress');
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.patientName.toLowerCase().includes(q) ||
          r.patientId.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.procedure.toLowerCase().includes(q) ||
          r.tooth.toLowerCase().includes(q) ||
          r.doctor.toLowerCase().includes(q)
      );
    }

    return result;
  }, [records, activeTab, searchTerm]);

  // Handle Add Record submit
  const handleCreateRecord = (e) => {
    e.preventDefault();
    if (!newRecordForm.patientName || !newRecordForm.procedure) {
      alert('Please fill in the Patient Name and Procedure details.');
      return;
    }

    const newRecord = {
      id: `REC-2026-${String(records.length + 185).padStart(4, '0')}`,
      date: 'Just now',
      patientId: newRecordForm.patientId || 'PAT-1083',
      patientName: newRecordForm.patientName,
      doctor: newRecordForm.doctor,
      tooth: newRecordForm.tooth,
      category: newRecordForm.category,
      procedure: newRecordForm.procedure,
      diagnosis: newRecordForm.diagnosis || 'Clinical evaluation performed',
      soap: {
        s: newRecordForm.soapS || 'No subjective complaints recorded.',
        o: newRecordForm.soapO || 'Clinical examination normal.',
        a: newRecordForm.soapA || newRecordForm.diagnosis,
        p: newRecordForm.soapP || 'Procedure executed as planned. Patient dismissed in good condition.',
      },
      materials: newRecordForm.materials || 'Standard restorative armamentarium',
      anesthetic: newRecordForm.anesthetic,
      status: newRecordForm.status,
      xrayCount: 0,
    };

    setRecords([newRecord, ...records]);
    setIsAddModalOpen(false);
    setNewRecordForm({
      patientName: '',
      patientId: 'PAT-1082',
      doctor: 'Dr. Avicena M.',
      tooth: '#11',
      category: 'Restorative',
      procedure: '',
      diagnosis: '',
      soapS: '',
      soapO: '',
      soapA: '',
      soapP: '',
      materials: '',
      anesthetic: '2% Lidocaine with 1:100k Epinephrine',
      status: 'Completed',
    });
  };

  // Header Dropdown more actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Clinical Records',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Clinical Records CSV / HL7 / DICOM opened'),
    },
    {
      id: 'add-multiple',
      label: 'Add Multiple Records',
      onClick: () => alert('Batch Clinical Entry Mode activated'),
    },
    {
      id: 'manage-roles',
      label: 'Manage Clinical Protocols',
      onClick: () => alert('Opening Clinical Governance & Audit Settings'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'id',
        title: 'Record ID & Date',
        minWidth: '190px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter record ID...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5 leading-tight">
            <span className="font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
              <HugeiconsIcon icon={Doc01Icon} size={13} className="text-emerald-700 dark:text-emerald-400" />
              {row.id}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {row.date}
            </span>
          </div>
        ),
      },
      {
        key: 'patientName',
        title: 'Patient Name & ID',
        minWidth: '200px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter patient...',
        render: (val, row) => (
          <div className="flex items-center gap-2 py-0.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0">
              {row.patientName.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-slate-800 dark:text-slate-100 truncate hover:text-emerald-700 cursor-pointer">
                {row.patientName}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {row.patientId}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: 'tooth',
        title: 'Tooth / FDI Area',
        minWidth: '180px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Tooth #...',
        render: (val) => (
          <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
            <HugeiconsIcon icon={DentalToothIcon} size={14} className="text-slate-400 shrink-0" />
            <span className="font-medium truncate">{val}</span>
          </div>
        ),
      },
      {
        key: 'procedure',
        title: 'Procedure Performed',
        minWidth: '250px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter procedure...',
        render: (val, row) => (
          <div className="flex flex-col py-0.5">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
              {val}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Dx: {row.diagnosis}
            </span>
          </div>
        ),
      },
      {
        key: 'category',
        title: 'Category',
        minWidth: '130px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          'Endodontics',
          'Restorative',
          'Oral Surgery',
          'Periodontics',
          'Orthodontics',
          'Prosthodontics',
          'Pediatric',
        ],
        render: (val) => {
          const colorStyles = {
            Endodontics: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300',
            Restorative: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300',
            'Oral Surgery': 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300',
            Periodontics: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
            Orthodontics: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300',
            Prosthodontics: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300',
            Pediatric: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${colorStyles}`}>
              {val}
            </span>
          );
        },
      },
      {
        key: 'doctor',
        title: 'Clinician / Provider',
        minWidth: '150px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter doctor...',
        render: (val) => (
          <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            {val}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: '140px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: ['Completed', 'In Progress', 'Follow Up Required'],
        render: (val) => {
          const badgeStyle = {
            Completed:
              'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
            'In Progress':
              'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
            'Follow Up Required':
              'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300',
          }[val] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeStyle}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${val === 'Completed' ? 'bg-emerald-500' : val === 'In Progress' ? 'bg-amber-500' : 'bg-rose-500'}`} />
              {val}
            </span>
          );
        },
      },
      {
        key: 'xrayCount',
        title: 'X-Rays & Media',
        minWidth: '120px',
        sortable: true,
        filterable: false,
        render: (val) => (
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <HugeiconsIcon icon={FileAttachmentIcon} size={13} className="text-slate-400" />
            <span>{val > 0 ? `${val} image${val > 1 ? 's' : ''}` : 'None'}</span>
          </div>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        minWidth: '80px',
        width: '80px',
        sortable: false,
        filterable: false,
        sticky: 'right',
        render: (val, row) => (
          <div className="flex items-center justify-center">
            <RowActionDropdown
              title={`Record ${row.id}`}
              align="right"
              triggerIcon={MoreHorizontalIcon}
              triggerClassName="h-7 w-7 rounded hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
              items={[
                {
                  id: 'view',
                  label: 'View Complete Clinical Note',
                  icon: EyeIcon,
                  onClick: () => setViewingRecord(row),
                },
                {
                  id: 'chart',
                  label: `Open Odontogram (${row.tooth.split(' ')[0]})`,
                  icon: DentalToothIcon,
                  onClick: () => alert(`Navigating to Odontogram for ${row.patientName}`),
                },
                {
                  id: 'print',
                  label: 'Print SOAP Note / Rx',
                  icon: PrinterIcon,
                  onClick: () => alert(`Generating PDF export for Record ${row.id}...`),
                },
                {
                  id: 'divider-1',
                  divider: true,
                },
                {
                  id: 'edit',
                  label: 'Edit Clinical Entry',
                  icon: PencilEdit01Icon,
                  onClick: () => alert(`Editing Record ${row.id}`),
                },
                {
                  id: 'delete',
                  label: 'Void / Delete Record',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    if (confirm(`Are you sure you want to void clinical record ${row.id}?`)) {
                      setRecords((prev) => prev.filter((r) => r.id !== row.id));
                    }
                  },
                },
              ]}
            />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className=" bg-slate-50/40 dark:bg-slate-950 font-sans mb-6">
      {/* ─── 1. Page Header (Exact composition matching Patients page) ────── */}
      <PageHeader
        title="Clinical Records"
        badge={`${tabCounts.all} Files`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn about clinical documentation standards, SOAP charting, and dental recordkeeping"
        moreActions={headerMoreActions}
        addLabel="Add Record"
        onAdd={() => setIsAddModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        // Toolbar props (Row 3)
        showToolbar={true}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search records, patient, tooth #, procedure..."
        filterPills={[
          {
            id: 'category',
            label: 'Category',
            onClick: () => alert('Quick Filter: Category selected'),
          },
          {
            id: 'clinician',
            label: 'Clinician',
            onClick: () => alert('Quick Filter: Clinician selected'),
          },
          {
            id: 'status',
            label: 'Record Status',
            onClick: () => alert('Quick Filter: Status selected'),
          },
        ]}
        showFilterButton={true}
        onFilterClick={() => alert('Advanced Clinical Filters drawer opened')}
        filterCount={0}
        pagination={{
          canPrev: false,
          canNext: true,
          onPrev: () => { },
          onNext: () => { },
        }}
        settings={{
          onClick: () => alert('Clinical Records View Preferences & Audit Settings'),
          hasNotification: true,
        }}
      />

      {/* ─── 2. Spreadsheet-Dense DataTable ─────────────────────────────────── */}
      <div className="">
        <DataTable
          title="Clinical Records"
          data={tabFilteredRecords}
          columns={columns}
          rowKey="id"
          stickyHeader={true}
          stickyFirstColumn={true}
          stickyLastColumn={true}
          maxHeight="calc(100vh - 250px)"
          initialDensity="normal"
          selectable={true}
          selectedRowKeys={selectedRecordIds}
          onSelectionChange={setSelectedRecordIds}
          initialSort={[{ key: 'id', direction: 'desc' }]}
          pageSizeOptions={[10, 25, 50, 100, 'All']}
          initialPageSize={25}
          showPagination={true}
          showColumnFiltersDefault={true}
          enableGlobalSearch={true}
          onRowClick={(row) => setViewingRecord(row)}
        />
      </div>

      {/* ─── 3. Add Clinical Record Modal ───────────────────────────────────── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    New Clinical Entry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Record SOAP notes, procedure details, and materials used
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wanjiku Kamau"
                    value={newRecordForm.patientName}
                    onChange={(e) =>
                      setNewRecordForm({ ...newRecordForm, patientName: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Patient File ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PAT-1082"
                    value={newRecordForm.patientId}
                    onChange={(e) =>
                      setNewRecordForm({ ...newRecordForm, patientId: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tooth / FDI Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. #36 (Lower Left Molar)"
                    value={newRecordForm.tooth}
                    onChange={(e) =>
                      setNewRecordForm({ ...newRecordForm, tooth: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newRecordForm.category}
                    onChange={(e) =>
                      setNewRecordForm({ ...newRecordForm, category: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Restorative">Restorative</option>
                    <option value="Endodontics">Endodontics</option>
                    <option value="Oral Surgery">Oral Surgery</option>
                    <option value="Periodontics">Periodontics</option>
                    <option value="Orthodontics">Orthodontics</option>
                    <option value="Prosthodontics">Prosthodontics</option>
                    <option value="Pediatric">Pediatric</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Procedure Performed *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Root Canal Obturation & Core Build-up"
                  value={newRecordForm.procedure}
                  onChange={(e) =>
                    setNewRecordForm({ ...newRecordForm, procedure: e.target.value })
                  }
                  className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Diagnosis
                </label>
                <input
                  type="text"
                  placeholder="e.g. Irreversible Pulpitis, Caries Class II"
                  value={newRecordForm.diagnosis}
                  onChange={(e) =>
                    setNewRecordForm({ ...newRecordForm, diagnosis: e.target.value })
                  }
                  className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* SOAP Documentation Fields */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  SOAP Clinical Notes
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      S (Subjective - Patient complaints, pain scale)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Reports lingering cold sensitivity..."
                      value={newRecordForm.soapS}
                      onChange={(e) =>
                        setNewRecordForm({ ...newRecordForm, soapS: e.target.value })
                      }
                      className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      O (Objective - Clinical examination & radiographic findings)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Deep mesial cavitation, no mobility..."
                      value={newRecordForm.soapO}
                      onChange={(e) =>
                        setNewRecordForm({ ...newRecordForm, soapO: e.target.value })
                      }
                      className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      A (Assessment - Working diagnosis & differential)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Dentinal caries #14..."
                      value={newRecordForm.soapA}
                      onChange={(e) =>
                        setNewRecordForm({ ...newRecordForm, soapA: e.target.value })
                      }
                      className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-0.5">
                      P (Plan & Treatment Rendered)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Composite restored with Filtek A2..."
                      value={newRecordForm.soapP}
                      onChange={(e) =>
                        setNewRecordForm({ ...newRecordForm, soapP: e.target.value })
                      }
                      className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Local Anesthetic
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2% Lidocaine 1:100k Epi (1.8ml)"
                    value={newRecordForm.anesthetic}
                    onChange={(e) =>
                      setNewRecordForm({ ...newRecordForm, anesthetic: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Record Status
                  </label>
                  <select
                    value={newRecordForm.status}
                    onChange={(e) =>
                      setNewRecordForm({ ...newRecordForm, status: e.target.value })
                    }
                    className="w-full text-xs rounded border border-slate-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Follow Up Required">Follow Up Required</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded text-white bg-[#027A48] hover:bg-[#02683E] shadow-xs transition-colors cursor-pointer"
                >
                  Save Clinical Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 4. View Record Detail Modal ────────────────────────────────────── */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl max-h-[85vh] overflow-y-auto animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={Doc01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {viewingRecord.id}
                  </h3>
                  <p className="text-xs text-slate-500">{viewingRecord.date}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingRecord(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Patient</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{viewingRecord.patientName}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{viewingRecord.patientId}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Clinician</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-0.5">{viewingRecord.doctor}</p>
                  <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">{viewingRecord.category}</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Tooth & Procedure</span>
                <p className="font-bold text-slate-800 dark:text-slate-100 mt-0.5">{viewingRecord.tooth}</p>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">{viewingRecord.procedure}</p>
                <p className="text-[11px] text-slate-500 italic mt-0.5">Diagnosis: {viewingRecord.diagnosis}</p>
              </div>

              {/* SOAP Breakdown */}
              <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  SOAP Progress Notes
                </span>

                <div className="space-y-2">
                  <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">S (Subjective):</span>{' '}
                    <span className="text-slate-700 dark:text-slate-300">{viewingRecord.soap.s}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">O (Objective):</span>{' '}
                    <span className="text-slate-700 dark:text-slate-300">{viewingRecord.soap.o}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">A (Assessment):</span>{' '}
                    <span className="text-slate-700 dark:text-slate-300">{viewingRecord.soap.a}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">P (Plan):</span>{' '}
                    <span className="text-slate-700 dark:text-slate-300">{viewingRecord.soap.p}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-3 grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <span className="text-slate-400 font-semibold">Anesthetic Used:</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{viewingRecord.anesthetic}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Materials & Consumables:</span>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{viewingRecord.materials}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <span className="text-[11px] text-slate-500">
                Attachments: {viewingRecord.xrayCount} diagnostic image(s)
              </span>
              <button
                type="button"
                onClick={() => setViewingRecord(null)}
                className="px-3.5 py-1.5 rounded text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-300 cursor-pointer"
              >
                Close Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. Learn Modal ─────────────────────────────────────────────────── */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  <HugeiconsIcon icon={Idea01Icon} size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Clinical Documentation Guide
                  </h3>
                  <p className="text-xs text-slate-500">
                    Standard operating procedures for dental record keeping
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsLearnModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-6 space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                  SOAP Progress Note Structure
                </h4>
                <p className="leading-relaxed">
                  Every clinical procedure must follow the 4-quadrant SOAP framework:
                  Patient complaints (Subjective), clinical & radiographic findings (Objective),
                  definitive diagnosis (Assessment), and treatment executed with informed consent (Plan).
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  FDI Two-Digit Tooth Notation System
                </h4>
                <p className="leading-relaxed">
                  Smilux uses the international ISO 3950 / FDI system. The first digit represents
                  quadrant (1=Upper Right, 2=Upper Left, 3=Lower Left, 4=Lower Right). The second digit
                  represents tooth index from midline (1=Central Incisor to 8=Third Molar).
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">
                  Audit Trails & Medical-Legal Compliance
                </h4>
                <p className="leading-relaxed">
                  All signed clinical notes are timestamped and linked to the provider credentials.
                  Edits create an immutable revision log in compliance with dental healthcare records regulations.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
              <button
                type="button"
                onClick={() => setIsLearnModalOpen(false)}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-[#027A48] text-white hover:bg-[#02683E] cursor-pointer"
              >
                Got it, thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

