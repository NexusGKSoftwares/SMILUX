const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  name: { type: String, required: true },
  sku: { type: String, required: true },
  category: { type: String, default: 'Consumable' }, // e.g. Consumable, Equipment, Hygiene, Restorative
  unit: { type: String, default: 'Pcs' },
  supplier: { type: String, default: '' },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, default: 0 },
  quantity: { type: Number, required: true, default: 0 },
  minStockLevel: { type: Number, default: 5 },
  batchNumber: { type: String, default: '' },
  expiryDate: { type: Date }
}, { timestamps: true });

productSchema.index({ clinicId: 1, sku: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);
