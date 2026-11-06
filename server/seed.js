const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const Clinic = require('./models/Clinic');
const Branch = require('./models/Branch');
const User = require('./models/User');
const Patient = require('./models/Patient');
const DentalChart = require('./models/DentalChart');
const Appointment = require('./models/Appointment');
const Treatment = require('./models/Treatment');
const TreatmentPlan = require('./models/TreatmentPlan');
const Invoice = require('./models/Invoice');
const Payment = require('./models/Payment');
const Product = require('./models/Product');
const Expense = require('./models/Expense');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smilux');
    console.log('Database connected for seeding...');

    // Clear existing data
    await Promise.all([
      Clinic.deleteMany({}),
      Branch.deleteMany({}),
      User.deleteMany({}),
      Patient.deleteMany({}),
      DentalChart.deleteMany({}),
      Appointment.deleteMany({}),
      Treatment.deleteMany({}),
      TreatmentPlan.deleteMany({}),
      Invoice.deleteMany({}),
      Payment.deleteMany({}),
      Product.deleteMany({}),
      Expense.deleteMany({})
    ]);

    console.log('Cleared old data...');

    // 1. Create Clinic & Branch
    const clinic = await Clinic.create({
      name: 'Avicena Dental Clinic',
      code: 'AVICENA',
      address: '845 Euclid Avenue, CA',
      phone: '+254 700 123 456',
      email: 'info@avicena.co.ke',
      currency: 'KES'
    });

    const branch = await Branch.create({
      clinicId: clinic._id,
      name: 'Avicena Main Branch',
      code: 'MAIN',
      address: '845 Euclid Avenue, CA',
      phone: '+254 700 123 456',
      email: 'info@avicena.co.ke',
      isMainBranch: true
    });

    // 2. Create Staff & Users
    const defaultPassword = await bcrypt.hash('password123', 10);
    const superPassword = await bcrypt.hash('superpassword123', 10);

    const owner = await User.create({
      clinicId: clinic._id,
      branchId: branch._id,
      name: 'Darrell Steward',
      email: 'owner@avicena.co.ke',
      password: defaultPassword,
      role: 'ClinicOwner',
      phone: '+254 711 000 111'
    });

    const dentist = await User.create({
      clinicId: clinic._id,
      branchId: branch._id,
      name: 'Dr. John Doe',
      email: 'dr.john@avicena.co.ke',
      password: defaultPassword,
      role: 'Dentist',
      specialisation: 'General Dentistry & Endodontics',
      phone: '+254 722 000 222'
    });

    const receptionist = await User.create({
      clinicId: clinic._id,
      branchId: branch._id,
      name: 'Mary Wambui',
      email: 'reception@avicena.co.ke',
      password: defaultPassword,
      role: 'Receptionist',
      phone: '+254 733 000 333'
    });

    await User.create({
      clinicId: clinic._id,
      branchId: branch._id,
      name: 'Super Administrator',
      email: 'admin@smilux.co.ke',
      password: superPassword,
      role: 'SuperAdmin'
    });

    console.log('Created Users & Staff...');

    // 3. Create Patients
    const patient1 = await Patient.create({
      clinicId: clinic._id,
      branchId: branch._id,
      patientNumber: 'PAT-2026-0001',
      firstName: 'Darrell',
      lastName: 'Steward',
      dob: new Date('1990-05-15'),
      gender: 'Male',
      phone: '+254 712 345 678',
      email: 'darrell.steward@example.com',
      address: 'Nairobi, Kenya',
      preferredContact: 'WhatsApp',
      medicalHistory: {
        allergies: ['Penicillin'],
        conditions: ['Mild Hypertension'],
        medications: ['Amlodipine 5mg'],
        notes: 'Patient prefers morning appointments.'
      },
      insuranceInfo: {
        providerName: 'Jubilee Insurance',
        policyNumber: 'JUB-884920',
        shaNumber: 'SHA-99201-KE',
        status: 'Active'
      }
    });

    const patient2 = await Patient.create({
      clinicId: clinic._id,
      branchId: branch._id,
      patientNumber: 'PAT-2026-0002',
      firstName: 'Alice',
      lastName: 'Wanjiku',
      dob: new Date('1994-08-22'),
      gender: 'Female',
      phone: '+254 723 456 789',
      email: 'alice.w@example.com',
      address: 'Westlands, Nairobi',
      preferredContact: 'SMS'
    });

    console.log('Created Patients...');

    // 4. Create Dental Chart
    await DentalChart.create({
      clinicId: clinic._id,
      patientId: patient1._id,
      teeth: [
        { toothNumber: 16, surface: 'Occlusal', condition: 'Cavity', dentistId: dentist._id, dentistName: dentist.name, notes: 'Deep cavity noted on distal aspect' },
        { toothNumber: 24, surface: 'Buccal', condition: 'Filling', dentistId: dentist._id, dentistName: dentist.name, notes: 'Composite resin filling done' },
        { toothNumber: 46, surface: 'General', condition: 'Crown', dentistId: dentist._id, dentistName: dentist.name, notes: 'Porcelain fused to metal crown' }
      ],
      history: [
        { toothNumber: 16, previousCondition: 'Healthy', newCondition: 'Cavity', dentistId: dentist._id, dentistName: dentist.name, notes: 'Initial assessment' }
      ]
    });

    // 5. Create Treatments
    const t1 = await Treatment.create({ clinicId: clinic._id, name: 'Scaling Teeth', category: 'Preventive', cost: 3500, durationMinutes: 30 });
    const t2 = await Treatment.create({ clinicId: clinic._id, name: 'Tooth Extraction', category: 'Surgery', cost: 5000, durationMinutes: 45 });
    const t3 = await Treatment.create({ clinicId: clinic._id, name: 'General Checkup', category: 'Preventive', cost: 2000, durationMinutes: 20 });
    const t4 = await Treatment.create({ clinicId: clinic._id, name: 'Root Canal Treatment', category: 'Endodontics', cost: 18000, durationMinutes: 60 });

    // 6. Create Appointments
    const today = new Date().toISOString().split('T')[0];
    await Appointment.create({
      clinicId: clinic._id,
      branchId: branch._id,
      patientId: patient1._id,
      dentistId: dentist._id,
      date: today,
      startTime: '09:00',
      endTime: '09:30',
      type: 'Scaling & Cleaning',
      status: 'Confirmed'
    });

    await Appointment.create({
      clinicId: clinic._id,
      branchId: branch._id,
      patientId: patient2._id,
      dentistId: dentist._id,
      date: today,
      startTime: '10:00',
      endTime: '10:45',
      type: 'General Checkup',
      status: 'Scheduled'
    });

    // 7. Create Invoices & Payments
    const invoice = await Invoice.create({
      clinicId: clinic._id,
      invoiceNumber: 'INV-2026-0001',
      patientId: patient1._id,
      items: [
        { description: 'Scaling & Cleaning', amount: 3500 },
        { description: 'Composite Filling (Tooth 24)', amount: 4500 }
      ],
      subtotal: 8000,
      discountAmount: 0,
      taxAmount: 0,
      totalAmount: 8000,
      paidAmount: 8000,
      balance: 0,
      status: 'Paid'
    });

    await Payment.create({
      clinicId: clinic._id,
      invoiceId: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      patientId: patient1._id,
      amount: 8000,
      method: 'M-Pesa',
      mpesaDetails: {
        phoneNumber: '+254712345678',
        checkoutRequestId: 'ws_CO_2026_SEED',
        mpesaReceiptNumber: 'QKT9849201'
      },
      status: 'Completed'
    });

    // 8. Create Products / Inventory
    await Product.create({
      clinicId: clinic._id,
      branchId: branch._id,
      name: 'Dental Brush',
      sku: 'PROD-001',
      category: 'Hygiene',
      unit: 'Pcs',
      purchasePrice: 150,
      quantity: 3,
      minStockLevel: 10
    });

    await Product.create({
      clinicId: clinic._id,
      branchId: branch._id,
      name: 'Charmflex Regular',
      sku: 'PROD-002',
      category: 'Restorative',
      unit: 'Box',
      purchasePrice: 2500,
      quantity: 2,
      minStockLevel: 5
    });

    await Product.create({
      clinicId: clinic._id,
      branchId: branch._id,
      name: 'Latex Examination Gloves',
      sku: 'PROD-003',
      category: 'Consumable',
      unit: 'Box',
      purchasePrice: 850,
      quantity: 45,
      minStockLevel: 10
    });

    // 9. Create Expenses
    await Expense.create({ clinicId: clinic._id, title: 'Fiber Internet Subscription', category: 'Internet', amount: 113.64, paymentMethod: 'BankTransfer' });
    await Expense.create({ clinicId: clinic._id, title: 'Power & Utility Bill', category: 'Electricity', amount: 113.64, paymentMethod: 'BankTransfer' });
    await Expense.create({ clinicId: clinic._id, title: 'POS & M-Pesa Merchant Fees', category: 'Transactions', amount: 113.64, paymentMethod: 'M-Pesa' });
    await Expense.create({ clinicId: clinic._id, title: 'Clinic Building Rent', category: 'Rental Cost', amount: 113.64, paymentMethod: 'BankTransfer' });

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
