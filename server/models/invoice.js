const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    invoiceNo: { type: String, required: true },
    items: [{
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        discount: { type: Number, required: true },
        gst: { type: Number, required: true },
        amount: { type: Number, required: true }
    }],
    billTo: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        contactNo: { type: String, required: true }
    },
    shippingTo: {
        name: { type: String },
        address: { type: String },
        gstinNo: { type: String }
    },
    invoiceDate: { type: Date, required: true },
    state: { type: String, required: true },
    subTotal: { type: Number, required: true },
    discountTotal: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
    total: { type: Number, required: true },
    balance: { type: Number, required: true },
    received: { type: Number, required: true },
    amountInWords: { type: String, required: true },
    termsAndConditions: { type: String },
    companyDetails: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phoneNo: { type: String, required: true },
        emailId: { type: String, required: true },
        gstin: { type: String, required: true }
    }
});

const Invoice = mongoose.model('GstBill', InvoiceSchema);

module.exports = Invoice;
