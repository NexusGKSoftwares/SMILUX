const Invoice = require('../models/Invoice');
const Expense = require('../models/Expense');

exports.getFinancialReport = async (req, res) => {
  try {
    const invoices = await Invoice.find({ clinicId: req.clinicId, status: { $ne: 'Cancelled' } });
    const expenses = await Expense.find({ clinicId: req.clinicId });

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const netProfit = totalRevenue - totalExpenses;

    res.json({
      totalRevenue,
      totalExpenses,
      netProfit,
      invoicesCount: invoices.length,
      expensesCount: expenses.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
