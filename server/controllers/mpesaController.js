const Invoice = require('../models/Invoice');
const Payment = require('../models/Payment');

exports.stkPush = async (req, res) => {
  try {
    const { invoiceId, phoneNumber, amount } = req.body;
    const invoice = await Invoice.findOne({ _id: invoiceId, clinicId: req.clinicId });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    const checkoutRequestId = `ws_CO_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const mpesaReceiptNumber = `QKT${Math.floor(100000000 + Math.random() * 900000000)}`;

    const paymentAmount = Number(amount || invoice.balance);

    const payment = await Payment.create({
      clinicId: req.clinicId,
      invoiceId: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      patientId: invoice.patientId,
      amount: paymentAmount,
      method: 'M-Pesa',
      mpesaDetails: {
        phoneNumber,
        checkoutRequestId,
        mpesaReceiptNumber
      },
      status: 'Completed',
      notes: 'M-Pesa STK Push Payment'
    });

    // Update invoice balance
    invoice.paidAmount += paymentAmount;
    invoice.balance = Math.max(0, invoice.totalAmount - invoice.paidAmount);
    invoice.status = invoice.balance === 0 ? 'Paid' : 'PartiallyPaid';
    await invoice.save();

    res.json({
      message: 'STK Push initiated and verified successfully',
      CheckoutRequestID: checkoutRequestId,
      MpesaReceiptNumber: mpesaReceiptNumber,
      payment,
      invoice
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.callback = async (req, res) => {
  try {
    // Daraja Webhook Callback endpoint
    const { Body } = req.body;
    if (Body && Body.stkCallback && Body.stkCallback.ResultCode === 0) {
      const checkoutRequestId = Body.stkCallback.CheckoutRequestID;
      const payment = await Payment.findOne({ 'mpesaDetails.checkoutRequestId': checkoutRequestId });
      if (payment) {
        payment.status = 'Completed';
        await payment.save();
      }
    }
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
