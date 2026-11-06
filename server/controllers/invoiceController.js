const Invoice = require('../models/Invoice');
const Payment = require('../models/Payment');

exports.getInvoices = async (req, res) => {
  try {
    const { status, patientId } = req.query;
    const query = { clinicId: req.clinicId };
    if (status) query.status = status;
    if (patientId) query.patientId = patientId;

    const invoices = await Invoice.find(query)
      .populate('patientId', 'firstName lastName patientNumber phone email')
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, clinicId: req.clinicId })
      .populate('patientId', 'firstName lastName patientNumber phone email address');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    const payments = await Payment.find({ invoiceId: invoice._id }).sort({ createdAt: -1 });
    res.json({ invoice, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createInvoice = async (req, res) => {
  try {
    const { patientId, items, discountAmount = 0, taxAmount = 0 } = req.body;
    const count = await Invoice.countDocuments({ clinicId: req.clinicId });
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const subtotal = items.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalAmount = Math.max(0, subtotal + Number(taxAmount) - Number(discountAmount));

    const invoice = await Invoice.create({
      clinicId: req.clinicId,
      invoiceNumber,
      patientId,
      items,
      subtotal,
      taxAmount,
      discountAmount,
      totalAmount,
      paidAmount: 0,
      balance: totalAmount,
      status: 'Issued',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    });

    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.recordPayment = async (req, res) => {
  try {
    const { invoiceId, amount, method, notes } = req.body;
    const invoice = await Invoice.findOne({ _id: invoiceId, clinicId: req.clinicId });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    const paymentAmount = Number(amount);
    const payment = await Payment.create({
      clinicId: req.clinicId,
      invoiceId: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      patientId: invoice.patientId,
      amount: paymentAmount,
      method,
      status: 'Completed',
      notes: notes || ''
    });

    invoice.paidAmount += paymentAmount;
    invoice.balance = Math.max(0, invoice.totalAmount - invoice.paidAmount);
    if (invoice.balance === 0) {
      invoice.status = 'Paid';
    } else {
      invoice.status = 'PartiallyPaid';
    }
    await invoice.save();

    res.status(201).json({ payment, invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ clinicId: req.clinicId })
      .populate('patientId', 'firstName lastName patientNumber')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
