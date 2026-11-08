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
} from '@hugeicons/core-free-icons';

// Initial mock dataset for patients (with more records to demonstrate paging & multi-sort)

const INITIAL_PATIENTS = [
  {
    id: 'PAT-1082', name: 'Wanjiku Kamau', phone: '+254 712 345 678',
    email: 'wanjiku.kamau@gmail.com', age: 34, gender: 'Female',
    insurance: 'SHA / Jubilee Insurance', insuranceType: 'insured',
    lastVisit: 'Today', nextAppointment: 'Tomorrow, 10:00 AM',
    treatment: 'Orthodontic Adjustment', dentalAlert: 'Penicillin Allergy',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1081', name: 'Brian Omondi', phone: '+254 722 987 654',
    email: 'brian.omondi@outlook.com', age: 29, gender: 'Male',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '10 Nov 2026', nextAppointment: '18 Nov 2026',
    treatment: 'Molar Root Canal (Tooth #36)', dentalAlert: 'None',
    balance: 'KES 4,500', status: 'Active',
  },
  {
    id: 'PAT-1080', name: 'Mercy Njeri', phone: '+254 733 112 233',
    email: 'mercy.njeri@yahoo.com', age: 42, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '04 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Composite Filling & Scaling', dentalAlert: 'Hypertension',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1079', name: 'Kevin Mutua', phone: '+254 701 445 566',
    email: 'kmutua@techcorp.co.ke', age: 26, gender: 'Male',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '15 Sep 2026', nextAppointment: '22 Nov 2026',
    treatment: 'Wisdom Tooth Extraction', dentalAlert: 'Latex Sensitivity',
    balance: 'KES 1,200', status: 'Follow Up',
  },
  {
    id: 'PAT-1078', name: 'Grace Chebet', phone: '+254 718 778 899',
    email: 'gchebet@uonbi.ac.ke', age: 38, gender: 'Female',
    insurance: 'SHA Direct (Civil Servants)', insuranceType: 'insured',
    lastVisit: '01 Aug 2026', nextAppointment: 'None scheduled',
    treatment: 'Teeth Whitening & Polish', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1077', name: 'David Kipkorir', phone: '+254 720 334 455',
    email: 'david.kipkorir@gmail.com', age: 51, gender: 'Male',
    insurance: 'Old Mutual Health', insuranceType: 'insured',
    lastVisit: '12 Jul 2026', nextAppointment: 'None scheduled',
    treatment: 'Crown Placement (#21)', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 8,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1076', name: 'Amina Mohammed', phone: '+254 734 556 677',
    email: 'amina.m@coastdental.com', age: 31, gender: 'Female',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '05 May 2026', nextAppointment: 'None scheduled',
    treatment: 'Pediatric Consultation', dentalAlert: 'None',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-1075', name: 'Faith Mwangi', phone: '+254 711 223 344',
    email: 'faith.mwangi@gmail.com', age: 23, gender: 'Female',
    insurance: 'Jubilee Allianz', insuranceType: 'insured',
    lastVisit: '14 Oct 2026', nextAppointment: '28 Nov 2026',
    treatment: 'Ceramic Veneers Fitting', dentalAlert: 'None',
    balance: 'KES 15,000', status: 'Active',
  },
  {
    id: 'PAT-1074', name: 'Hassan Abdi', phone: '+254 723 445 566',
    email: 'hassan.abdi@gmail.com', age: 45, gender: 'Male',
    insurance: 'CIC Dental Care', insuranceType: 'insured',
    lastVisit: '22 Aug 2026', nextAppointment: 'None scheduled',
    treatment: 'Full Mouth Scaling', dentalAlert: 'Asthmatic',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1073', name: 'Yvonne Wambui', phone: '+254 799 887 766',
    email: 'yvonne.w@yahoo.com', age: 33, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '19 Sep 2026', nextAppointment: '05 Dec 2026',
    treatment: 'Gingival Grafting', dentalAlert: 'Sulfa Allergy',
    balance: 'KES 2,500', status: 'Follow Up',
  },
  {
    id: 'PAT-1072', name: 'Peter Njoroge', phone: '+254 700 112 233',
    email: 'peter.njoroge@gmail.com', age: 62, gender: 'Male',
    insurance: 'SHA / NHIF Senior', insuranceType: 'insured',
    lastVisit: '02 Jun 2026', nextAppointment: 'None scheduled',
    treatment: 'Dentures Fabrication', dentalAlert: 'Cardiac Pacemaker',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-1071', name: 'Sharon Akoth', phone: '+254 740 556 677',
    email: 'sharon.akoth@med.co.ke', age: 28, gender: 'Female',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '03 Nov 2026', nextAppointment: '15 Nov 2026',
    treatment: 'Invisalign Scan #4', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },

  {
    id: 'PAT-1070', name: 'Samuel Kiptoo', phone: '+254 710 234 567',
    email: 'samuel.kiptoo@gmail.com', age: 36, gender: 'Male',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '06 Nov 2026', nextAppointment: '20 Nov 2026',
    treatment: 'Dental Implant Consultation', dentalAlert: 'None',
    balance: 'KES 5,000', status: 'Active',
  },
  {
    id: 'PAT-1069', name: 'Lucy Atieno', phone: '+254 721 456 789',
    email: 'lucy.atieno@gmail.com', age: 27, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '02 Nov 2026', nextAppointment: 'None scheduled',
    treatment: 'Teeth Cleaning', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1068', name: 'James Mwangi', phone: '+254 722 111 222',
    email: 'james.mwangi@gmail.com', age: 48, gender: 'Male',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '28 Oct 2026', nextAppointment: '12 Nov 2026',
    treatment: 'Root Canal Treatment (#46)', dentalAlert: 'Penicillin Allergy',
    balance: 'KES 12,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1067', name: 'Esther Jepkosgei', phone: '+254 733 222 333',
    email: 'esther.jepkosgei@gmail.com', age: 40, gender: 'Female',
    insurance: 'Jubilee Insurance', insuranceType: 'insured',
    lastVisit: '15 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Crown', dentalAlert: 'Hypertension',
    balance: 'KES 3,500', status: 'Active',
  },
  {
    id: 'PAT-1066', name: 'Mohamed Ali', phone: '+254 734 333 444',
    email: 'mohamed.ali@gmail.com', age: 32, gender: 'Male',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '01 Nov 2026', nextAppointment: '19 Nov 2026',
    treatment: 'Wisdom Tooth Extraction', dentalAlert: 'Asthmatic',
    balance: 'KES 2,000', status: 'Active',
  },
  {
    id: 'PAT-1065', name: 'Caroline Wairimu', phone: '+254 701 222 333',
    email: 'caroline.w@gmail.com', age: 30, gender: 'Female',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '12 Sep 2026', nextAppointment: 'None scheduled',
    treatment: 'Orthodontic Consultation', dentalAlert: 'None',
    balance: 'KES 0', status: 'Follow Up',
  },
  {
    id: 'PAT-1064', name: 'Joseph Maina', phone: '+254 711 334 455',
    email: 'joseph.maina@gmail.com', age: 55, gender: 'Male',
    insurance: 'Old Mutual Health', insuranceType: 'insured',
    lastVisit: '20 Aug 2026', nextAppointment: 'None scheduled',
    treatment: 'Partial Dentures', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 6,500', status: 'Active',
  },
  {
    id: 'PAT-1063', name: 'Nancy Chepkemoi', phone: '+254 720 445 566',
    email: 'nancy.chepkemoi@gmail.com', age: 24, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '05 Nov 2026', nextAppointment: '25 Nov 2026',
    treatment: 'Composite Filling', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1062', name: 'Daniel Ochieng', phone: '+254 722 556 677',
    email: 'daniel.ochieng@gmail.com', age: 43, gender: 'Male',
    insurance: 'CIC Dental Care', insuranceType: 'insured',
    lastVisit: '17 Jul 2026', nextAppointment: 'None scheduled',
    treatment: 'Periodontal Treatment', dentalAlert: 'Latex Sensitivity',
    balance: 'KES 4,000', status: 'Archived',
  },
  {
    id: 'PAT-1061', name: 'Beatrice Nyambura', phone: '+254 733 667 788',
    email: 'beatrice.n@gmail.com', age: 37, gender: 'Female',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '07 Nov 2026', nextAppointment: '21 Nov 2026',
    treatment: 'Scaling and Polishing', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1060', name: 'Patrick Kiplagat', phone: '+254 700 778 899',
    email: 'patrick.k@gmail.com', age: 50, gender: 'Male',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '09 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Implant', dentalAlert: 'Hypertension',
    balance: 'KES 18,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1059', name: 'Diana Achieng', phone: '+254 710 889 900',
    email: 'diana.achieng@gmail.com', age: 22, gender: 'Female',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '03 Nov 2026', nextAppointment: '16 Nov 2026',
    treatment: 'Teeth Whitening', dentalAlert: 'None',
    balance: 'KES 1,500', status: 'Active',
  },
  {
    id: 'PAT-1058', name: 'Francis Githinji', phone: '+254 721 990 011',
    email: 'francis.g@gmail.com', age: 60, gender: 'Male',
    insurance: 'SHA / NHIF Senior', insuranceType: 'insured',
    lastVisit: '14 Jun 2026', nextAppointment: 'None scheduled',
    treatment: 'Full Dentures', dentalAlert: 'Cardiac Condition',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-1057', name: 'Ruth Muthoni', phone: '+254 734 111 222',
    email: 'ruth.muthoni@gmail.com', age: 35, gender: 'Female',
    insurance: 'Jubilee Insurance', insuranceType: 'insured',
    lastVisit: '30 Oct 2026', nextAppointment: '14 Nov 2026',
    treatment: 'Root Canal Treatment (#16)', dentalAlert: 'Sulfa Allergy',
    balance: 'KES 7,500', status: 'Active',
  },
  {
    id: 'PAT-1056', name: 'Eric Barasa', phone: '+254 701 333 444',
    email: 'eric.barasa@gmail.com', age: 28, gender: 'Male',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '21 Sep 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Filling', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1055', name: 'Alice Wanjala', phone: '+254 711 444 555',
    email: 'alice.wanjala@gmail.com', age: 44, gender: 'Female',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '08 Aug 2026', nextAppointment: 'None scheduled',
    treatment: 'Gum Disease Treatment', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 2,800', status: 'Follow Up',
  },
  {
    id: 'PAT-1054', name: 'Michael Kariuki', phone: '+254 720 555 666',
    email: 'michael.kariuki@gmail.com', age: 39, gender: 'Male',
    insurance: 'CIC Dental Care', insuranceType: 'insured',
    lastVisit: '06 Nov 2026', nextAppointment: '24 Nov 2026',
    treatment: 'Dental Crown (#11)', dentalAlert: 'None',
    balance: 'KES 9,000', status: 'Active',
  },
  {
    id: 'PAT-1053', name: 'Janet Naliaka', phone: '+254 722 666 777',
    email: 'janet.naliaka@gmail.com', age: 26, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '02 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Orthodontic Braces', dentalAlert: 'Latex Sensitivity',
    balance: 'KES 5,000', status: 'Active',
  },
  {
    id: 'PAT-1052', name: 'George Odhiambo', phone: '+254 733 777 888',
    email: 'george.odhiambo@gmail.com', age: 46, gender: 'Male',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '18 Oct 2026', nextAppointment: '18 Nov 2026',
    treatment: 'Wisdom Tooth Extraction', dentalAlert: 'Asthmatic',
    balance: 'KES 0', status: 'Follow Up',
  },
  {
    id: 'PAT-1051', name: 'Miriam Chebet', phone: '+254 700 888 999',
    email: 'miriam.chebet@gmail.com', age: 33, gender: 'Female',
    insurance: 'Jubilee Allianz', insuranceType: 'insured',
    lastVisit: '04 Nov 2026', nextAppointment: '27 Nov 2026',
    treatment: 'Veneers Consultation', dentalAlert: 'None',
    balance: 'KES 3,000', status: 'Active',
  },
  {
    id: 'PAT-1050', name: 'Anthony Musyoka', phone: '+254 710 999 000',
    email: 'anthony.musyoka@gmail.com', age: 57, gender: 'Male',
    insurance: 'Old Mutual Health', insuranceType: 'insured',
    lastVisit: '12 May 2026', nextAppointment: 'None scheduled',
    treatment: 'Tooth Extraction', dentalAlert: 'Hypertension',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-1049', name: 'Susan Wambui', phone: '+254 721 123 456',
    email: 'susan.wambui@gmail.com', age: 41, gender: 'Female',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '07 Nov 2026', nextAppointment: '30 Nov 2026',
    treatment: 'Dental Cleaning', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1048', name: 'Robert Kipchoge', phone: '+254 734 234 567',
    email: 'robert.kipchoge@gmail.com', age: 31, gender: 'Male',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '23 Oct 2026', nextAppointment: '13 Nov 2026',
    treatment: 'Dental Implant Consultation', dentalAlert: 'Penicillin Allergy',
    balance: 'KES 11,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1047', name: 'Christine Akello', phone: '+254 701 345 678',
    email: 'christine.akello@gmail.com', age: 25, gender: 'Female',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '05 Nov 2026', nextAppointment: '19 Nov 2026',
    treatment: 'Composite Filling', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1046', name: 'Stephen Ndegwa', phone: '+254 711 456 789',
    email: 'stephen.ndegwa@gmail.com', age: 53, gender: 'Male',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '15 Jul 2026', nextAppointment: 'None scheduled',
    treatment: 'Periodontal Surgery', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 6,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1045', name: 'Pauline Jepchirchir', phone: '+254 720 567 890',
    email: 'pauline.j@gmail.com', age: 29, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '01 Nov 2026', nextAppointment: '17 Nov 2026',
    treatment: 'Teeth Whitening', dentalAlert: 'None',
    balance: 'KES 2,000', status: 'Active',
  },
  {
    id: 'PAT-1044', name: 'Dennis Muli', phone: '+254 722 678 901',
    email: 'dennis.muli@gmail.com', age: 47, gender: 'Male',
    insurance: 'CIC Dental Care', insuranceType: 'insured',
    lastVisit: '19 Sep 2026', nextAppointment: 'None scheduled',
    treatment: 'Root Canal Treatment (#26)', dentalAlert: 'Asthmatic',
    balance: 'KES 10,500', status: 'Active',
  },
  {
    id: 'PAT-1043', name: 'Rose Nyokabi', phone: '+254 733 789 012',
    email: 'rose.nyokabi@gmail.com', age: 36, gender: 'Female',
    insurance: 'Jubilee Insurance', insuranceType: 'insured',
    lastVisit: '06 Nov 2026', nextAppointment: '20 Nov 2026',
    treatment: 'Dental Crown Placement', dentalAlert: 'None',
    balance: 'KES 4,000', status: 'Active',
  },
  {
    id: 'PAT-1042', name: 'Charles Ouma', phone: '+254 700 890 123',
    email: 'charles.ouma@gmail.com', age: 64, gender: 'Male',
    insurance: 'SHA / NHIF Senior', insuranceType: 'insured',
    lastVisit: '11 Jun 2026', nextAppointment: 'None scheduled',
    treatment: 'Complete Dentures', dentalAlert: 'Cardiac Pacemaker',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-1041', name: 'Vivian Wairimu', phone: '+254 710 901 234',
    email: 'vivian.wairimu@gmail.com', age: 32, gender: 'Female',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '03 Nov 2026', nextAppointment: '22 Nov 2026',
    treatment: 'Gum Treatment', dentalAlert: 'Sulfa Allergy',
    balance: 'KES 1,000', status: 'Active',
  },
  {
    id: 'PAT-1040', name: 'Kennedy Rotich', phone: '+254 721 012 345',
    email: 'kennedy.rotich@gmail.com', age: 40, gender: 'Male',
    insurance: 'Old Mutual Health', insuranceType: 'insured',
    lastVisit: '29 Oct 2026', nextAppointment: '16 Nov 2026',
    treatment: 'Dental Bridge', dentalAlert: 'Hypertension',
    balance: 'KES 8,500', status: 'Follow Up',
  },
  {
    id: 'PAT-1039', name: 'Eunice Auma', phone: '+254 734 123 456',
    email: 'eunice.auma@gmail.com', age: 21, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '08 Nov 2026', nextAppointment: '29 Nov 2026',
    treatment: 'Dental Checkup', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1038', name: 'Benjamin Karanja', phone: '+254 701 234 567',
    email: 'ben.karanja@gmail.com', age: 49, gender: 'Male',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '25 Aug 2026', nextAppointment: 'None scheduled',
    treatment: 'Tooth Extraction (#38)', dentalAlert: 'Latex Sensitivity',
    balance: 'KES 3,500', status: 'Follow Up',
  },
  {
    id: 'PAT-1037', name: 'Tabitha Chepkorir', phone: '+254 711 345 678',
    email: 'tabitha.chep@gmail.com', age: 30, gender: 'Female',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '07 Nov 2026', nextAppointment: '23 Nov 2026',
    treatment: 'Orthodontic Adjustment', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1036', name: 'Isaac Wekesa', phone: '+254 720 456 789',
    email: 'isaac.wekesa@gmail.com', age: 35, gender: 'Male',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '15 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Filling', dentalAlert: 'Penicillin Allergy',
    balance: 'KES 2,500', status: 'Active',
  },
  {
    id: 'PAT-1035', name: 'Margaret Nyambura', phone: '+254 722 567 890',
    email: 'margaret.n@gmail.com', age: 58, gender: 'Female',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '09 Sep 2026', nextAppointment: 'None scheduled',
    treatment: 'Full Mouth Rehabilitation', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 20,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1034', name: 'Elijah Omondi', phone: '+254 733 678 901',
    email: 'elijah.omondi@gmail.com', age: 27, gender: 'Male',
    insurance: 'CIC Dental Care', insuranceType: 'insured',
    lastVisit: '05 Nov 2026', nextAppointment: '18 Nov 2026',
    treatment: 'Scaling and Polishing', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1033', name: 'Veronica Jepkoech', phone: '+254 700 789 012',
    email: 'veronica.j@gmail.com', age: 34, gender: 'Female',
    insurance: 'Jubilee Allianz', insuranceType: 'insured',
    lastVisit: '22 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Ceramic Veneers', dentalAlert: 'Asthmatic',
    balance: 'KES 13,000', status: 'Active',
  },
  {
    id: 'PAT-1032', name: 'Martin Kamau', phone: '+254 710 890 123',
    email: 'martin.kamau@gmail.com', age: 52, gender: 'Male',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '18 Jul 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Crown', dentalAlert: 'Hypertension',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-1031', name: 'Lydia Wanjiru', phone: '+254 721 901 234',
    email: 'lydia.wanjiru@gmail.com', age: 23, gender: 'Female',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '04 Nov 2026', nextAppointment: '26 Nov 2026',
    treatment: 'Orthodontic Braces', dentalAlert: 'None',
    balance: 'KES 6,000', status: 'Active',
  },
  {
    id: 'PAT-1030', name: 'Peter Kibet', phone: '+254 734 012 345',
    email: 'peter.kibet@gmail.com', age: 45, gender: 'Male',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '14 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Root Canal Treatment (#37)', dentalAlert: 'Sulfa Allergy',
    balance: 'KES 9,500', status: 'Follow Up',
  },
  {
    id: 'PAT-1029', name: 'Daisy Atieno', phone: '+254 701 123 456',
    email: 'daisy.atieno@gmail.com', age: 28, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '06 Nov 2026', nextAppointment: '19 Nov 2026',
    treatment: 'Tooth Extraction', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1028', name: 'Simon Njoroge', phone: '+254 711 234 567',
    email: 'simon.njoroge@gmail.com', age: 61, gender: 'Male',
    insurance: 'SHA / NHIF Senior', insuranceType: 'insured',
    lastVisit: '01 Jul 2026', nextAppointment: 'None scheduled',
    treatment: 'Partial Dentures', dentalAlert: 'Cardiac Condition',
    balance: 'KES 4,500', status: 'Archived',
  },
  {
    id: 'PAT-1027', name: 'Joyce Muthoni', phone: '+254 720 345 678',
    email: 'joyce.muthoni@gmail.com', age: 39, gender: 'Female',
    insurance: 'Old Mutual Health', insuranceType: 'insured',
    lastVisit: '02 Nov 2026', nextAppointment: '17 Nov 2026',
    treatment: 'Periodontal Treatment', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 5,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1026', name: 'Allan Musau', phone: '+254 722 456 789',
    email: 'allan.musau@gmail.com', age: 33, gender: 'Male',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '07 Nov 2026', nextAppointment: '21 Nov 2026',
    treatment: 'Dental Cleaning', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1025', name: 'Edith Chebet', phone: '+254 733 567 890',
    email: 'edith.chebet@gmail.com', age: 46, gender: 'Female',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '11 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Implant', dentalAlert: 'Hypertension',
    balance: 'KES 15,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1024', name: 'Victor Ochieng', phone: '+254 700 678 901',
    email: 'victor.ochieng@gmail.com', age: 30, gender: 'Male',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '05 Nov 2026', nextAppointment: '25 Nov 2026',
    treatment: 'Composite Filling', dentalAlert: 'None',
    balance: 'KES 1,500', status: 'Active',
  },
  {
    id: 'PAT-1023', name: 'Helen Wairimu', phone: '+254 710 789 012',
    email: 'helen.wairimu@gmail.com', age: 36, gender: 'Female',
    insurance: 'Jubilee Insurance', insuranceType: 'insured',
    lastVisit: '16 Aug 2026', nextAppointment: 'None scheduled',
    treatment: 'Gum Grafting', dentalAlert: 'Latex Sensitivity',
    balance: 'KES 7,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1022', name: 'Moses Kiplangat', phone: '+254 721 890 123',
    email: 'moses.kiplangat@gmail.com', age: 42, gender: 'Male',
    insurance: 'CIC Dental Care', insuranceType: 'insured',
    lastVisit: '03 Nov 2026', nextAppointment: '17 Nov 2026',
    treatment: 'Dental Crown', dentalAlert: 'None',
    balance: 'KES 8,000', status: 'Active',
  },
  {
    id: 'PAT-1021', name: 'Catherine Akoth', phone: '+254 734 901 234',
    email: 'catherine.akoth@gmail.com', age: 25, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '08 Nov 2026', nextAppointment: '22 Nov 2026',
    treatment: 'Dental Checkup', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1020', name: 'Fredrick Maina', phone: '+254 701 012 345',
    email: 'fred.maina@gmail.com', age: 56, gender: 'Male',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '21 Sep 2026', nextAppointment: 'None scheduled',
    treatment: 'Full Dentures', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 11,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1019', name: 'Purity Naliaka', phone: '+254 711 123 456',
    email: 'purity.naliaka@gmail.com', age: 31, gender: 'Female',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '01 Nov 2026', nextAppointment: '15 Nov 2026',
    treatment: 'Scaling and Polishing', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1018', name: 'Collins Wekesa', phone: '+254 720 234 567',
    email: 'collins.wekesa@gmail.com', age: 38, gender: 'Male',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '14 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Wisdom Tooth Extraction', dentalAlert: 'Asthmatic',
    balance: 'KES 3,000', status: 'Active',
  },
  {
    id: 'PAT-1017', name: 'Agnes Nyokabi', phone: '+254 722 345 678',
    email: 'agnes.nyokabi@gmail.com', age: 50, gender: 'Female',
    insurance: 'Old Mutual Health', insuranceType: 'insured',
    lastVisit: '10 Jun 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Bridge', dentalAlert: 'Hypertension',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-1016', name: 'Dennis Kiptoo', phone: '+254 733 456 789',
    email: 'dennis.kiptoo@gmail.com', age: 27, gender: 'Male',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '06 Nov 2026', nextAppointment: '20 Nov 2026',
    treatment: 'Orthodontic Adjustment', dentalAlert: 'None',
    balance: 'KES 2,000', status: 'Active',
  },
  {
    id: 'PAT-1015', name: 'Maureen Achieng', phone: '+254 700 567 890',
    email: 'maureen.achieng@gmail.com', age: 34, gender: 'Female',
    insurance: 'Jubilee Allianz', insuranceType: 'insured',
    lastVisit: '18 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Ceramic Veneers', dentalAlert: 'Sulfa Allergy',
    balance: 'KES 14,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1014', name: 'Geoffrey Karanja', phone: '+254 710 678 901',
    email: 'geoffrey.karanja@gmail.com', age: 44, gender: 'Male',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '04 Nov 2026', nextAppointment: '18 Nov 2026',
    treatment: 'Root Canal Treatment (#47)', dentalAlert: 'None',
    balance: 'KES 6,500', status: 'Active',
  },
  {
    id: 'PAT-1013', name: 'Stella Jepchirchir', phone: '+254 721 789 012',
    email: 'stella.j@gmail.com', age: 29, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '07 Nov 2026', nextAppointment: '21 Nov 2026',
    treatment: 'Teeth Whitening', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1012', name: 'Richard Odhiambo', phone: '+254 734 890 123',
    email: 'richard.odhiambo@gmail.com', age: 59, gender: 'Male',
    insurance: 'SHA / NHIF Senior', insuranceType: 'insured',
    lastVisit: '02 Jul 2026', nextAppointment: 'None scheduled',
    treatment: 'Complete Dentures', dentalAlert: 'Cardiac Condition',
    balance: 'KES 5,000', status: 'Archived',
  },
  {
    id: 'PAT-1011', name: 'Millicent Wambui', phone: '+254 701 901 234',
    email: 'millicent.w@gmail.com', age: 40, gender: 'Female',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '29 Oct 2026', nextAppointment: '12 Nov 2026',
    treatment: 'Periodontal Treatment', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 4,500', status: 'Follow Up',
  },
  {
    id: 'PAT-1010', name: 'Emmanuel Barasa', phone: '+254 711 012 345',
    email: 'emmanuel.barasa@gmail.com', age: 24, gender: 'Male',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '08 Nov 2026', nextAppointment: '22 Nov 2026',
    treatment: 'Dental Cleaning', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1009', name: 'Jacqueline Muthoni', phone: '+254 720 123 456',
    email: 'jacqueline.m@gmail.com', age: 37, gender: 'Female',
    insurance: 'CIC Dental Care', insuranceType: 'insured',
    lastVisit: '15 Sep 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Implant', dentalAlert: 'Hypertension',
    balance: 'KES 16,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1008', name: 'Benson Musyoka', phone: '+254 722 234 567',
    email: 'benson.musyoka@gmail.com', age: 41, gender: 'Male',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '05 Nov 2026', nextAppointment: '19 Nov 2026',
    treatment: 'Dental Crown', dentalAlert: 'None',
    balance: 'KES 7,000', status: 'Active',
  },
  {
    id: 'PAT-1007', name: 'Irene Atieno', phone: '+254 733 345 678',
    email: 'irene.atieno@gmail.com', age: 26, gender: 'Female',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '01 Nov 2026', nextAppointment: '16 Nov 2026',
    treatment: 'Composite Filling', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1006', name: 'Timothy Ndegwa', phone: '+254 700 456 789',
    email: 'timothy.ndegwa@gmail.com', age: 54, gender: 'Male',
    insurance: 'Old Mutual Health', insuranceType: 'insured',
    lastVisit: '12 Aug 2026', nextAppointment: 'None scheduled',
    treatment: 'Root Canal Treatment', dentalAlert: 'Penicillin Allergy',
    balance: 'KES 9,000', status: 'Follow Up',
  },
  {
    id: 'PAT-1005', name: 'Phoebe Chebet', phone: '+254 710 567 890',
    email: 'phoebe.chebet@gmail.com', age: 32, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '03 Nov 2026', nextAppointment: '17 Nov 2026',
    treatment: 'Scaling and Polishing', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1004', name: 'Dennis Ouma', phone: '+254 721 678 901',
    email: 'dennis.ouma@gmail.com', age: 46, gender: 'Male',
    insurance: 'Jubilee Insurance', insuranceType: 'insured',
    lastVisit: '22 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Wisdom Tooth Extraction', dentalAlert: 'Asthmatic',
    balance: 'KES 3,800', status: 'Active',
  },
  {
    id: 'PAT-1003', name: 'Salome Wairimu', phone: '+254 734 789 012',
    email: 'salome.wairimu@gmail.com', age: 35, gender: 'Female',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '06 Nov 2026', nextAppointment: '20 Nov 2026',
    treatment: 'Orthodontic Adjustment', dentalAlert: 'None',
    balance: 'KES 2,500', status: 'Active',
  },
  {
    id: 'PAT-1002', name: 'Paul Kiprono', phone: '+254 701 890 123',
    email: 'paul.kiprono@gmail.com', age: 63, gender: 'Male',
    insurance: 'SHA / NHIF Senior', insuranceType: 'insured',
    lastVisit: '17 Jun 2026', nextAppointment: 'None scheduled',
    treatment: 'Full Dentures', dentalAlert: 'Cardiac Pacemaker',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-1001', name: 'Monica Naliaka', phone: '+254 711 901 234',
    email: 'monica.naliaka@gmail.com', age: 28, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '07 Nov 2026', nextAppointment: '21 Nov 2026',
    treatment: 'Dental Checkup', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-1000', name: 'Augustine Kibet', phone: '+254 720 012 345',
    email: 'augustine.kibet@gmail.com', age: 39, gender: 'Male',
    insurance: 'CIC Dental Care', insuranceType: 'insured',
    lastVisit: '28 Oct 2026', nextAppointment: '14 Nov 2026',
    treatment: 'Dental Bridge', dentalAlert: 'Hypertension',
    balance: 'KES 6,000', status: 'Follow Up',
  },
  {
    id: 'PAT-0999', name: 'Lilian Akoth', phone: '+254 722 123 456',
    email: 'lilian.akoth@gmail.com', age: 43, gender: 'Female',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '04 Nov 2026', nextAppointment: '18 Nov 2026',
    treatment: 'Gum Disease Treatment', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 5,500', status: 'Active',
  },
  {
    id: 'PAT-0998', name: 'Kenneth Mwangi', phone: '+254 733 234 567',
    email: 'kenneth.mwangi@gmail.com', age: 27, gender: 'Male',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '08 Nov 2026', nextAppointment: '23 Nov 2026',
    treatment: 'Dental Filling', dentalAlert: 'None',
    balance: 'KES 1,200', status: 'Active',
  },
  {
    id: 'PAT-0997', name: 'Ann Wanjiku', phone: '+254 700 345 678',
    email: 'ann.wanjiku@gmail.com', age: 33, gender: 'Female',
    insurance: 'Jubilee Allianz', insuranceType: 'insured',
    lastVisit: '19 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Veneers Consultation', dentalAlert: 'Latex Sensitivity',
    balance: 'KES 8,000', status: 'Follow Up',
  },
  {
    id: 'PAT-0996', name: 'Vincent Kiptoo', phone: '+254 710 456 789',
    email: 'vincent.kiptoo@gmail.com', age: 48, gender: 'Male',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '02 Nov 2026', nextAppointment: '16 Nov 2026',
    treatment: 'Root Canal Treatment (#36)', dentalAlert: 'None',
    balance: 'KES 4,000', status: 'Active',
  },
  {
    id: 'PAT-0995', name: 'Hellen Jepkoech', phone: '+254 721 567 890',
    email: 'hellen.jepkoech@gmail.com', age: 30, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '06 Nov 2026', nextAppointment: '20 Nov 2026',
    treatment: 'Teeth Whitening', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-0994', name: 'Martin Ochieng', phone: '+254 734 678 901',
    email: 'martin.ochieng@gmail.com', age: 57, gender: 'Male',
    insurance: 'Old Mutual Health', insuranceType: 'insured',
    lastVisit: '13 Jul 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Extraction', dentalAlert: 'Asthmatic',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-0993', name: 'Beatrice Muli', phone: '+254 701 789 012',
    email: 'beatrice.muli@gmail.com', age: 38, gender: 'Female',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '05 Nov 2026', nextAppointment: '19 Nov 2026',
    treatment: 'Dental Crown Placement', dentalAlert: 'None',
    balance: 'KES 7,500', status: 'Active',
  },
  {
    id: 'PAT-0992', name: 'John Karanja', phone: '+254 711 890 123',
    email: 'john.karanja@gmail.com', age: 45, gender: 'Male',
    insurance: 'CIC Dental Care', insuranceType: 'insured',
    lastVisit: '20 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Periodontal Treatment', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 3,000', status: 'Follow Up',
  },
  {
    id: 'PAT-0991', name: 'Evelyn Njeri', phone: '+254 720 901 234',
    email: 'evelyn.njeri@gmail.com', age: 24, gender: 'Female',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '07 Nov 2026', nextAppointment: '21 Nov 2026',
    treatment: 'Dental Cleaning', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-0990', name: 'Caleb Barasa', phone: '+254 722 012 345',
    email: 'caleb.barasa@gmail.com', age: 36, gender: 'Male',
    insurance: 'SHA', insuranceType: 'insured',
    lastVisit: '03 Nov 2026', nextAppointment: '17 Nov 2026',
    treatment: 'Wisdom Tooth Extraction', dentalAlert: 'Penicillin Allergy',
    balance: 'KES 2,000', status: 'Active',
  },
  {
    id: 'PAT-0989', name: 'Margaret Achieng', phone: '+254 733 123 456',
    email: 'margaret.achieng@gmail.com', age: 52, gender: 'Female',
    insurance: 'Jubilee Insurance', insuranceType: 'insured',
    lastVisit: '18 Sep 2026', nextAppointment: 'None scheduled',
    treatment: 'Full Mouth Scaling', dentalAlert: 'Hypertension',
    balance: 'KES 4,500', status: 'Follow Up',
  },
  {
    id: 'PAT-0988', name: 'Evans Musau', phone: '+254 700 234 567',
    email: 'evans.musau@gmail.com', age: 29, gender: 'Male',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '08 Nov 2026', nextAppointment: '22 Nov 2026',
    treatment: 'Composite Filling', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
  {
    id: 'PAT-0987', name: 'Florence Wambui', phone: '+254 710 345 678',
    email: 'florence.wambui@gmail.com', age: 41, gender: 'Female',
    insurance: 'AAR Healthcare', insuranceType: 'insured',
    lastVisit: '12 Aug 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Implant Consultation', dentalAlert: 'Latex Sensitivity',
    balance: 'KES 12,000', status: 'Follow Up',
  },
  {
    id: 'PAT-0986', name: 'Alfred Kipchoge', phone: '+254 721 456 789',
    email: 'alfred.kipchoge@gmail.com', age: 55, gender: 'Male',
    insurance: 'SHA / NHIF Senior', insuranceType: 'insured',
    lastVisit: '09 Jun 2026', nextAppointment: 'None scheduled',
    treatment: 'Complete Dentures', dentalAlert: 'Cardiac Condition',
    balance: 'KES 0', status: 'Archived',
  },
  {
    id: 'PAT-0985', name: 'Cynthia Nyambura', phone: '+254 734 567 890',
    email: 'cynthia.nyambura@gmail.com', age: 27, gender: 'Female',
    insurance: 'Self Pay (M-Pesa)', insuranceType: 'self-pay',
    lastVisit: '06 Nov 2026', nextAppointment: '20 Nov 2026',
    treatment: 'Orthodontic Adjustment', dentalAlert: 'None',
    balance: 'KES 3,000', status: 'Active',
  },
  {
    id: 'PAT-0984', name: 'Dennis Kiplangat', phone: '+254 701 678 901',
    email: 'dennis.kiplangat@gmail.com', age: 43, gender: 'Male',
    insurance: 'Britam Dental', insuranceType: 'insured',
    lastVisit: '24 Oct 2026', nextAppointment: 'None scheduled',
    treatment: 'Dental Bridge', dentalAlert: 'Diabetic Type 2',
    balance: 'KES 9,000', status: 'Follow Up',
  },
  {
    id: 'PAT-0983', name: 'Janet Wairimu', phone: '+254 711 789 012',
    email: 'janet.wairimu@gmail.com', age: 35, gender: 'Female',
    insurance: 'Self Pay (Cash)', insuranceType: 'self-pay',
    lastVisit: '08 Nov 2026', nextAppointment: '24 Nov 2026',
    treatment: 'Dental Checkup & Cleaning', dentalAlert: 'None',
    balance: 'KES 0', status: 'Active',
  },
];


export default function PatientsPage() {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);
  const [activeTab, setActiveTab] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLearnModalOpen, setIsLearnModalOpen] = useState(false);
  const [selectedPatientIds, setSelectedPatientIds] = useState([]);

  // New patient modal state
  const [newPatient, setNewPatient] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Female',
    insurance: 'Self Pay (M-Pesa)',
    treatment: 'General Consultation',
    dentalAlert: 'None',
  });

  // Calculate tab counts
  const tabCounts = useMemo(() => {
    return {
      all: patients.length,
      active: patients.filter((p) => p.status === 'Active').length,
      followUp: patients.filter((p) => p.status === 'Follow Up').length,
      archived: patients.filter((p) => p.status === 'Archived').length,
    };
  }, [patients]);

  const tabs = [
    { id: 'all', label: 'All Patients', count: tabCounts.all },
    { id: 'active', label: 'Active', count: tabCounts.active },
    { id: 'follow-up', label: 'Follow Up', count: tabCounts.followUp },
    { id: 'archived', label: 'Archived', count: tabCounts.archived },
  ];

  // Tab filter
  const tabFilteredPatients = useMemo(() => {
    if (activeTab === 'active') return patients.filter((p) => p.status === 'Active');
    if (activeTab === 'follow-up') return patients.filter((p) => p.status === 'Follow Up');
    if (activeTab === 'archived') return patients.filter((p) => p.status === 'Archived');
    return patients;
  }, [patients, activeTab]);

  // Handle Add Patient submit
  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name.trim() || !newPatient.phone.trim()) return;

    const created = {
      id: `PAT-${1083 + patients.length}`,
      name: newPatient.name,
      phone: newPatient.phone,
      email: newPatient.email || `${newPatient.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      age: Number(newPatient.age) || 30,
      gender: newPatient.gender,
      insurance: newPatient.insurance,
      insuranceType: newPatient.insurance.includes('Self') ? 'self-pay' : 'insured',
      lastVisit: 'Today',
      nextAppointment: 'Scheduled',
      treatment: newPatient.treatment || 'Consultation',
      dentalAlert: newPatient.dentalAlert || 'None',
      balance: 'KES 0',
      status: 'Active',
    };

    setPatients([created, ...patients]);
    setIsAddModalOpen(false);
    setNewPatient({
      name: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Female',
      insurance: 'Self Pay (M-Pesa)',
      treatment: 'General Consultation',
      dentalAlert: 'None',
    });
  };

  // Header Dropdown more actions
  const headerMoreActions = [
    {
      id: 'import',
      label: 'Import Patients',
      icon: Upload01Icon,
      iconPosition: 'right',
      onClick: () => alert('Import Patients CSV / Excel wizard opened'),
    },
    {
      id: 'export',
      label: 'Export Patient List',
      icon: Download01Icon,
      iconPosition: 'right',
      onClick: () => alert(`Exporting ${tabFilteredPatients.length} patient records to CSV...`),
    },
    {
      id: 'add-multiple',
      label: 'Add Multiple Patients',
      onClick: () => alert('Batch Patient Entry Mode activated'),
    },
    {
      id: 'divider',
      divider: true,
    },
    {
      id: 'manage-roles',
      label: 'Manage Patient Privacy & Access',
      onClick: () => alert('Opening Patient Privacy and Consent Settings'),
    },
  ];

  // ─── DataTable Columns Configuration ───────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: 'Patient Name & File ID',
        minWidth: '220px',
        sortable: true,
        filterable: true,
        filterPlaceholder: 'Filter by name or ID...',
        render: (val, row) => {
          const initials = row.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2);

          return (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center justify-center   shrink-0 border border-emerald-300">
                {initials}
              </div>
              <div className="truncate min-w-0">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 leading-tight">
                  <span className="truncate">{row.name}</span>
                  {row.dentalAlert !== 'None' && (
                    <span
                      title={`Allergy / Medical Alert: ${row.dentalAlert}`}
                      className="px-1 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shrink-0"
                    >
                      {row.dentalAlert}
                    </span>
                  )}
                </div>
                <div className="  text-slate-500 font-medium leading-none mt-0.5">
                  {row.id}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        key: 'phone',
        title: 'Phone Number',
        minWidth: '135px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {row.phone}
          </span>
        ),
      },
      {
        key: 'email',
        title: 'Email Address',
        minWidth: '170px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-600 dark:text-slate-400 truncate block max-w-[160px]">
            {row.email}
          </span>
        ),
      },
      {
        key: 'age',
        title: 'Age / Sex',
        minWidth: '95px',
        sortable: true,
        filterable: true,
        filterType: 'number',
        render: (val, row) => (
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {row.age} yrs <span className="text-slate-400 font-normal">({row.gender[0]})</span>
          </span>
        ),
      },
      {
        key: 'insurance',
        title: 'Insurance Scheme',
        minWidth: '175px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        render: (val, row) => (
          <span
            className={`inline-block px-1.5 py-0.5 rounded   font-medium truncate max-w-[165px] ${row.insuranceType === 'insured'
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/60'
              : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200/60'
              }`}
          >
            {row.insurance}
          </span>
        ),
      },
      {
        key: 'treatment',
        title: 'Procedure / Care',
        minWidth: '185px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span
            className="text-slate-700 dark:text-slate-300 truncate block max-w-[175px]"
            title={row.treatment}
          >
            {row.treatment}
          </span>
        ),
      },
      {
        key: 'lastVisit',
        title: 'Last Visit',
        minWidth: '95px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-500 dark:text-slate-400 font-medium  ">
            {row.lastVisit}
          </span>
        ),
      },
      {
        key: 'nextAppointment',
        title: 'Next Visit',
        minWidth: '135px',
        sortable: true,
        filterable: true,
        render: (val, row) => (
          <span className="text-slate-600 dark:text-slate-300   truncate block">
            {row.nextAppointment}
          </span>
        ),
      },
      {
        key: 'balance',
        title: 'Balance',
        minWidth: '95px',
        sortable: true,
        filterable: true,
        align: 'right',
        render: (val, row) => (
          <span
            className={`font-medium font-medium text-right block tabular-nums ${row.balance !== 'KES 0'
              ? 'text-amber-600 dark:text-amber-400 font-semibold'
              : 'text-slate-500'
              }`}
          >
            {row.balance}
          </span>
        ),
      },
      {
        key: 'status',
        title: 'Status',
        minWidth: '95px',
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterOptions: [
          { value: 'Active', label: 'Active' },
          { value: 'Follow Up', label: 'Follow Up' },
          { value: 'Archived', label: 'Archived' },
        ],
        render: (val, row) => (
          <span
            className={`inline-block px-1.5 py-0.2 rounded-full   font-semibold ${row.status === 'Active'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
              : row.status === 'Follow Up'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
          >
            {row.status}
          </span>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        width: '90px',
        minWidth: '90px',
        sortable: false,
        filterable: false,
        align: 'right',
        render: (val, row) => (
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              title="Open FDI Dental Chart"
              onClick={(e) => {
                e.stopPropagation();
                alert(`Opening Dental Chart for ${row.name} (${row.id})`);
              }}
              className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-emerald-700 dark:text-emerald-400 transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={DentalToothIcon} size={14} />
            </button>

            {/* Three Dots Interactive Action Dropdown */}
            <RowActionDropdown
              title={`Actions for ${row.name}`}
              items={[
                {
                  id: 'view',
                  label: 'View Clinical File',
                  icon: Doc01Icon,
                  onClick: () => alert(`Opening Clinical File for ${row.name} (${row.id})`),
                },
                {
                  id: 'chart',
                  label: 'Open Dental Chart',
                  icon: DentalToothIcon,
                  onClick: () => alert(`Opening Dental Chart for ${row.name} (${row.id})`),
                },
                {
                  id: 'book',
                  label: 'Book Appointment',
                  icon: Calendar01Icon,
                  onClick: () => alert(`Scheduling appointment for ${row.name}`),
                },
                {
                  id: 'invoice',
                  label: 'Create Invoice / Bill',
                  icon: Invoice01Icon,
                  onClick: () => alert(`Generating new invoice for ${row.name}`),
                },
                {
                  id: 'sms',
                  label: 'Send SMS / Reminder',
                  icon: BubbleChatIcon,
                  onClick: () => alert(`Composing SMS reminder to ${row.phone}`),
                },
                { divider: true },
                {
                  id: 'edit',
                  label: 'Edit Patient Details',
                  icon: PencilEdit01Icon,
                  onClick: () => alert(`Editing profile for ${row.name}`),
                },
                {
                  id: 'archive',
                  label: 'Archive Patient Record',
                  icon: Delete02Icon,
                  danger: true,
                  onClick: () => {
                    setPatients((prev) =>
                      prev.map((p) => (p.id === row.id ? { ...p, status: 'Archived' } : p))
                    );
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
    <div>

      <PageHeader
        title="Patients"
        badge={`${tabCounts.all} Files`}
        showLearn={true}
        learnLabel="Learn"
        onLearn={() => setIsLearnModalOpen(true)}
        learnTooltip="Learn how to manage dental patient files, charts & records"
        moreActions={headerMoreActions}
        addLabel="Add Patient"
        onAdd={() => setIsAddModalOpen(true)}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />


      {/* ─── Spreadsheet-Dense DataTable ─── */}
      <DataTable
        title="Patients"
        data={tabFilteredPatients}
        columns={columns}
        rowKey="id"
        // Sticky Header & Sticky Columns
        stickyHeader={true}
        stickyFirstColumn={true}
        stickyLastColumn={true}
        maxHeight="calc(100vh - 250px)"
        // Ultra-dense spreadsheet mode by default
        initialDensity="normal"
        // Row multi-selection
        selectable={true}
        selectedRowKeys={selectedPatientIds}
        onSelectionChange={setSelectedPatientIds}
        // Multi-column sorting
        initialSort={[{ key: 'name', direction: 'asc' }]}
        // Paging
        pageSizeOptions={[10, 25, 50, 100, 'All']}
        initialPageSize={25}
        showPagination={true}
        // Per-column filters enabled by default
        showColumnFiltersDefault={true}
        enableGlobalSearch={true}
        // Row click opens chart or file
        onRowClick={(row) => {
          // row click handler
        }}
      />

      {/* ─── Add Patient Modal ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <HugeiconsIcon icon={PlusSignIcon} size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Register New Patient
                  </h3>
                  <p className="text-xs text-slate-500">
                    Create medical file and assign patient identification number
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPatient} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Waweru"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone Number (+254) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Age & Gender
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Age"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                      className="w-20 px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    />
                    <select
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                      className="flex-1 px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Child">Pediatric</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Insurance / Payment Scheme
                  </label>
                  <select
                    value={newPatient.insurance}
                    onChange={(e) => setNewPatient({ ...newPatient, insurance: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Self Pay (M-Pesa)">Self Pay (M-Pesa)</option>
                    <option value="Self Pay (Cash)">Self Pay (Cash)</option>
                    <option value="SHA / Jubilee Insurance">SHA / Jubilee Insurance</option>
                    <option value="AAR Healthcare">AAR Healthcare</option>
                    <option value="Britam Dental">Britam Dental</option>
                    <option value="Old Mutual Health">Old Mutual Health</option>
                    <option value="SHA Direct (Civil Servants)">SHA Direct (Civil Servants)</option>
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Medical / Allergy Alerts
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Penicillin allergy, diabetic, pregnant, none"
                    value={newPatient.dentalAlert}
                    onChange={(e) => setNewPatient({ ...newPatient, dentalAlert: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-[#057a55] hover:bg-[#046c4b] shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <HugeiconsIcon icon={PlusSignIcon} size={15} />
                  <span>Register Patient</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── Learn Drawer / Modal ─── */}
      {isLearnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Patients Directory: Quick Guide
                </h3>
              </div>
              <button
                onClick={() => setIsLearnModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 rounded">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1">
                  Spreadsheet Power & Compliance
                </p>
                <p>
                  This table is built for high-throughput dental staff. You can filter every column individually, sort multiple columns at once by holding Shift, and toggle row densities.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Key Table Features</h4>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Multi-Column Sorting:</strong> Click any header to sort. Hold <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-medium  ">Shift</kbd> + click to sort by multiple columns with precedence numbers (1, 2, 3).
                  </li>
                  <li>
                    <strong>Per-Column Filters:</strong> Enter text or pick from dropdowns in the filter row to narrow down columns directly.
                  </li>
                  <li>
                    <strong>Fixed Header & Pinned Columns:</strong> The header row stays fixed when scrolling vertically. Patient Name/ID (first column) and Actions (last column) stay pinned when scrolling horizontally.
                  </li>
                  <li>
                    <strong>Spreadsheet Density:</strong> Use the "Dense" / "Normal" / "Cozy" buttons in the toolbar to adjust row heights to your preference.
                  </li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsLearnModalOpen(false)}
                  className="px-4 py-2 rounded text-xs font-medium text-white bg-emerald-700 hover:bg-emerald-800 transition-colors"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
